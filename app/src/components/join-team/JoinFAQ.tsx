import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function JoinFAQ() {
  const faqAccordionData = [
    {
      id: "faq-1",
      question: "Who can apply for positions at Pearlaw Corporate",
      answer:
        "We welcome applications from qualified legal professionals, including lawyers, paralegals, legal interns, and support staff with relevant experience in corporate, commercial, or intellectual property law. Candidates should hold appropriate qualifications (e.g., a law degree and bar admission where required) and demonstrate a passion for delivering high-quality legal services to businesses. As a virtual firm, we are open to applicants from various locations, provided they can work effectively in a remote environment.",
    },
    {
      id: "faq-2",
      question: "When will I be contacted after applying?",
      answer:
        "We review applications on a rolling basis. If your profile matches our current needs, we aim to contact shortlisted candidates within 2-4 weeks of receiving your application. Due to the volume of applications, we may not be able to respond to every applicant individually. If you haven't heard from us within 4 weeks, feel free to follow up via email.",
    },
    {
      id: "faq-3",
      question: "What does the selection process involve?",
      answer:
        "Our selection process typically includes: 1) Initial application review (resume, cover letter, and supporting documents); 2) A phone or video screening interview; 3) One or more in-depth interviews (which may include case studies or practical assessments); 4) Reference checks; and 5) A final offer. The process is designed to assess your legal expertise, problem-solving skills, and fit with our virtual team culture. The timeline usually spans 4-8 weeks.",
    },
  ];

  return (
    <div className="w-5/6 max-w-xl mx-auto space-y-4 flex flex-col  p-5  mt-12 ">
      <div className="">
        <h4 className="max-w-sm text-center text-2xl font-semibold">Frequently asked Questions</h4>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue="gem"
        className="space-y-4">
        {faqAccordionData.map((plan) => (
          <AccordionItem
            key={plan.id}
            value={plan.id}
            className=" rounded-xl  overflow-hidden">
            <AccordionTrigger className="px-5 py-4 text-left border ">
              {plan.question}
            </AccordionTrigger>

            <AccordionContent className="border-none p-0">
              <div className="overflow-clip">
                <div className="px-5 py-4 flex border-0 overflow-hidden">
                  {plan.answer}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
        <div className="opacity-0"></div>
      </Accordion>
    </div>
  );
}

export default JoinFAQ;
