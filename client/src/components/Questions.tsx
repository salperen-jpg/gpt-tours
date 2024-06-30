import SectionSeperator from "./SectionSeperator";
import SectionTitle from "./SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Questions = () => {
  return (
    <>
      <section className="sub-section mx-auto max-w-2xl px-8">
        <SectionTitle title="FAQ" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How many tokens initially assigned to user?
            </AccordionTrigger>
            <AccordionContent>
              Every user initially has 1000 tokens to discover the application.
              When you use chat or create tour , tokens will be decreased
              accordingly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How to top up tokens?</AccordionTrigger>
            <AccordionContent>
              Payment methods will be developed shortly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Which AI model used in this app?
            </AccordionTrigger>
            <AccordionContent>
              OpenAI turbo has been used to develop the app.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <SectionSeperator />
    </>
  );
};
export default Questions;
