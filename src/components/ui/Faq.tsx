import { RiAddLine, RiSubtractLine } from "@remixicon/react";

const faqs = [
  {
    question: "Is it safe to run this script?",
    answer:
      "Yes. The generated snippet uses native ExchangeOnlineManagement and Outlook COM modules provided by Microsoft. It does not download or install any external software. The script simply automates the repetitive UI clicks you would normally do to create rules.",
  },
  {
    question: "Do I need admin rights?",
    answer:
      "No. Creating and managing your own inbox rules only requires standard user privileges to your own directory/mailbox.",
  },
  {
    question: "Can I read the code before running it?",
    answer:
      "Absolutely. Our built-in syntax highlighter lets you preview exactly what the PowerShell snippet will do before you copy it. You are encouraged to review it.",
  },
];

export function Faq() {
  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <div className="w-full">
        <div className="text-center mb-12 animate-slide-up-fade">
          <h2
            className="text-[2rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10]"
            style={{ letterSpacing: '-0.64px', fontFeatureSettings: '"ss01"' }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-4 text-[16px] font-[300] text-[#64748d] dark:text-slate-400"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Everything you need to know about safety, privacy, and running the script.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-[6px] border border-[#e5edf5] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 [&_summary::-webkit-details-marker]:hidden animate-slide-up-fade shadow-[rgba(23,23,23,0.06)_0px_3px_6px]"
              style={{ animationDuration: `${500 + index * 100}ms` }}
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#533afd] rounded-[4px]"
              >
                <span
                  className="text-[16px] font-[300] text-[#061b31] dark:text-slate-50"
                  style={{ fontFeatureSettings: '"ss01"' }}
                >
                  {faq.question}
                </span>
                <span className="relative size-5 shrink-0 ml-4 flex items-center justify-center text-[#64748d] group-open:text-[#533afd] dark:group-open:text-[#b9b9f9] transition-colors">
                  <RiAddLine className="absolute size-5 transition-opacity group-open:opacity-0" />
                  <RiSubtractLine className="absolute size-5 opacity-0 transition-opacity group-open:opacity-100" />
                </span>
              </summary>
              <p
                className="mt-4 text-[16px] font-[300] text-[#64748d] dark:text-slate-400 leading-[1.40] opacity-0 transition-opacity duration-300 group-open:opacity-100"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
