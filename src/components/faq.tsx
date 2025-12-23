import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is DealLock?",
    answer: "DealLock is a secure platform for real estate transactions that connects sellers, buyers, and brokers. We verify all parties and listings to ensure a safe and transparent process from start to finish.",
  },
  {
    question: "Who is DealLock for?",
    answer: "DealLock is designed for individual buyers and sellers, real estate investors, and commercial brokers who require a secure and efficient way to manage property deals.",
  },
  {
    question: "How does the verification process work?",
    answer: "Our team manually verifies every listing and user on the platform. This includes checking property documents, ownership records, and the identity of all parties involved to prevent fraud and ensure legitimacy.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, security is our top priority. We use end-to-end encryption for all communications and document storage. Your data is protected by industry-leading security protocols.",
  },
  {
    question: "What are the fees for using DealLock?",
    answer: "We offer various subscription plans tailored to different needs. Please visit our pricing page for detailed information on our fees and features.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-lg font-medium text-left hover:no-underline text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
