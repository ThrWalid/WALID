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
  if (!(request.headers.get('content-type') || '').startsWith('application/json')) return NextResponse.json({ error: 'Unsupported format.' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Unauthorized origin.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 12_000) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  const result = parseInquiry(body);
  if (!result.data) return NextResponse.json({ error: result.error }, { status: 400 });
  const inquiry = result.data;
  const messages = inquiry.locale === 'fr' ? {
    unavailable: 'Le formulaire est momentanément indisponible. Utilisez l’adresse e-mail directe.', failed: 'Le message n’a pas pu être envoyé. Réessayez ou utilisez l’adresse e-mail directe.', success: 'Votre demande a bien été envoyée. Je vous répondrai sous 24 à 48 heures ouvrées.',
  } : inquiry.locale === 'es' ? {
    unavailable: 'El formulario no está disponible temporalmente. Utiliza la dirección de correo electrónico.', failed: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o utiliza la dirección de correo.', success: 'Tu solicitud se ha enviado correctamente. Responderé en 1–2 días laborables.',
  } : {
    unavailable: 'The form is temporarily unavailable. Please use the direct email address.', failed: 'Your message could not be sent. Try again or use the direct email address.', success: 'Your inquiry has been sent. I will reply within 1–2 business days.',
  };
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact form: missing email configuration.');
    return NextResponse.json({ error: messages.unavailable }, { status: 503 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: [to], reply_to: inquiry.email, subject: `New project — ${inquiry.service} — ${inquiry.name}`,
      html: `<h2>New portfolio inquiry</h2><p><strong>Contact:</strong> ${safeHtml(inquiry.name)}</p><p><strong>Company:</strong> ${safeHtml(inquiry.company || 'Not provided')}</p><p><strong>Email:</strong> ${safeHtml(inquiry.email)}</p><p><strong>Phone:</strong> ${safeHtml(inquiry.phone || 'Not provided')}</p><p><strong>Project:</strong> ${safeHtml(inquiry.service)}</p><p><strong>Budget:</strong> ${safeHtml(inquiry.budget)}</p><p><strong>Timeline:</strong> ${safeHtml(inquiry.timeline)}</p><hr><p style="white-space:pre-wrap">${safeHtml(inquiry.message)}</p>`,
      text: `New portfolio inquiry\n\nContact: ${inquiry.name}\nCompany: ${inquiry.company || 'Not provided'}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || 'Not provided'}\nProject: ${inquiry.service}\nBudget: ${inquiry.budget}\nTimeline: ${inquiry.timeline}\n\n${inquiry.message}`,
    }), signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!response?.ok) {
    console.error('Contact form: email delivery failed.', response?.status);
    return NextResponse.json({ error: messages.failed }, { status: 502 });
  }
  return NextResponse.json({ ok: true, message: messages.success });
}
