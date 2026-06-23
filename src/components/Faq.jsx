import React, { useState } from 'react';

const Faq = () => {
  const faqs = [
    {
      question: 'What services does Building India Digital provide?',
      answer: 'We provide end-to-end digital services, including customized web development, search engine optimization (SEO), social media marketing, UI/UX graphic design, and strategic digital branding.'
    },
    {
      question: 'How long does a typical web development project take?',
      answer: 'A standard website takes between 2 to 4 weeks. Complex custom applications, e-commerce stores, or custom portal designs may take 6 to 12 weeks, depending on requirements.'
    },
    {
      question: 'Do you offer support after project deployment?',
      answer: 'Yes, we provide standard support and maintenance packages. This includes security updates, performance monitoring, content updates, and server setup support.'
    },
    {
      question: 'Can you improve the Google ranking of our existing website?',
      answer: 'Absolutely. We conduct full website SEO audits, repair technical site crawl errors, optimize speed, and establish search-friendly content strategies to rank for high-value search queries.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-[#012869]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#012869] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-[#012869]/80 font-medium">
          Get answers to common queries regarding our services, processes, and project timelines.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-md border border-[#012869]/10 rounded-2xl overflow-hidden transition-all duration-200">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-6 font-serif text-lg font-bold flex items-center justify-between text-[#012869] hover:text-[#fe8d00] transition-colors"
            >
              <span>{faq.question}</span>
              <span className="text-xl ml-4 font-normal text-[#012869]/60">
                {activeIndex === idx ? '−' : '+'}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === idx ? 'max-h-[300px] border-t border-[#012869]/10' : 'max-h-0'
              }`}
            >
              <p className="p-6 text-sm leading-relaxed text-[#012869]/70 font-medium bg-[#012869]/5">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
