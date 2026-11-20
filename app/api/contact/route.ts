import { NextRequest, NextResponse } from 'next/server';
import { parseInquiry } from '@/lib/inquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.resetAt <= now) { buckets.set(ip, { count: 1, resetAt: now + 900_000 }); return false; }
  current.count += 1;
  return current.count > 5;
}

function safeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character);
}

export async function POST(request: NextRequest) {
  if (!(request.headers.get('content-type') || '').startsWith('application/json')) return NextResponse.json({ error: 'Format non accepté.' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 12_000) return NextResponse.json({ error: 'Requête trop volumineuse.' }, { status: 413 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 }); }
  const result = parseInquiry(body);
  if (!result.data) return NextResponse.json({ error: result.error }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact form: missing email configuration.');
    return NextResponse.json({ error: 'Le formulaire est momentanément indisponible. Utilisez l’adresse e-mail directe.' }, { status: 503 });
  }

  const inquiry = result.data;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: [to], reply_to: inquiry.email, subject: `Nouveau projet — ${inquiry.service} — ${inquiry.name}`,
      html: `<h2>Nouvelle demande depuis le portfolio</h2><p><strong>Contact :</strong> ${safeHtml(inquiry.name)}</p><p><strong>Entreprise :</strong> ${safeHtml(inquiry.company || 'Non précisée')}</p><p><strong>E-mail :</strong> ${safeHtml(inquiry.email)}</p><p><strong>Téléphone :</strong> ${safeHtml(inquiry.phone || 'Non précisé')}</p><p><strong>Projet :</strong> ${safeHtml(inquiry.service)}</p><p><strong>Budget :</strong> ${safeHtml(inquiry.budget)}</p><p><strong>Calendrier :</strong> ${safeHtml(inquiry.timeline)}</p><hr><p style="white-space:pre-wrap">${safeHtml(inquiry.message)}</p>`,
      text: `Nouvelle demande depuis le portfolio\n\nContact : ${inquiry.name}\nEntreprise : ${inquiry.company || 'Non précisée'}\nE-mail : ${inquiry.email}\nTéléphone : ${inquiry.phone || 'Non précisé'}\nProjet : ${inquiry.service}\nBudget : ${inquiry.budget}\nCalendrier : ${inquiry.timeline}\n\n${inquiry.message}`,
    }), signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!response?.ok) {
    console.error('Contact form: email delivery failed.', response?.status);
    return NextResponse.json({ error: 'Le message n’a pas pu être envoyé. Réessayez ou utilisez l’adresse e-mail directe.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, message: 'Votre demande a bien été envoyée. Je vous répondrai sous 24 à 48 heures ouvrées.' });
}
