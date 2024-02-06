import * as Accordion from "@radix-ui/react-accordion";
import { faq } from "../services/const";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

const Faq = () => {
    return (
    <Accordion.Root type="single" className="bg-white border-2 shadow rounded-md" defaultValue="item-1" collapsible>
        {
            faq.map((faq: FaqItem) => {
                return (
                    <Accordion.Item value={`item-${faq.id}`} key={faq.id} className=" odd:bg-gray-100 p-1 focus-within:shadow-primary mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]">
                        <Accordion.AccordionTrigger className="w-full text-primary group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none outline-none'">
                            <h2 className="font-semibold">{faq.question}</h2>
                        </Accordion.AccordionTrigger>
                        <Accordion.AccordionContent className=" text-gray-600 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-xs px-5">
                            <p>{faq.answer}</p>
                        </Accordion.AccordionContent>
                    </Accordion.Item>
                )
            })
        }
    </Accordion.Root>
    )
};

export default Faq;