import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type FaqItem = { question: string; answer: string };
export function FaqGrid({ items }: { items: FaqItem[] }) {
  return <Accordion type="single" collapsible defaultValue="faq-0" className="faq-list">
    {items.map((item, index) => <AccordionItem className="faq-item" value={`faq-${index}`} key={item.question}>
      <AccordionTrigger className="faq-question">
        <span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.question}</h3>
      </AccordionTrigger>
      <AccordionContent className="faq-answer"><p>{item.answer}</p></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
