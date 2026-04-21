import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is the check-in and check-out time?",
      a: "Standard check-in is at 1:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested subject to availability."
    },
    {
      q: "Are meals included in the price?",
      a: "Breakfast is included in all stays. Lunch and Dinner can be provided on request for an additional cost, prepared fresh using local ingredients."
    },
    {
      q: "Is there Wi-Fi available at the homestays?",
      a: "Most of our stays have high-speed Wi-Fi (Starlink or local fiber). However, since we are in nature, weather can occasionally affect connectivity."
    },
    {
      q: "Are pets allowed?",
      a: "The Forest Cabin and Riverside Cottage are pet-friendly! Please let us know in advance if you're bringing your furry friends."
    },
    {
      q: "What is your cancellation policy?",
      a: "Full refund for cancellations made 7 days in advance. 50% refund for cancellations made 48 hours in advance. No refund within 48 hours of check-in."
    },
    {
      q: "How do I reach the properties?",
      a: "Once your booking is confirmed, we will send you a detailed location pin and contact of our local manager who can help coordinate your arrival."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Everything you need to know about your upcoming stay.</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-border rounded-2xl px-6">
            <AccordionTrigger className="hover:no-underline font-bold text-left py-6">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-16 p-8 bg-secondary/30 rounded-3xl text-center">
         <h3 className="font-bold mb-2">Still have questions?</h3>
         <p className="text-sm text-muted-foreground mb-6">Can't find the answer you're looking for? Please chat with our AI assistant or message us on WhatsApp.</p>
         <a href="/contact">
           <Button variant="outline">Contact Support</Button>
         </a>
      </div>
    </div>
  );
}
