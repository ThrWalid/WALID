import { Plus } from 'lucide-react';

type FaqItem = { question: string; answer: string };
export function FaqGrid({ items }: { items: FaqItem[] }) {
  return <div className="faq-list">{items.map(item => <details className="faq-item" key={item.question}>
    <summary><h3>{item.question}</h3><Plus aria-hidden="true" /></summary><p>{item.answer}</p>
  </details>)}</div>;
}
