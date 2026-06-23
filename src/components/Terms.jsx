import React from 'react';

const Terms = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-[#012869]">
      <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#012869] mb-4 text-center">
        Terms & Conditions
      </h1>
      <p className="text-sm text-[#012869]/60 font-bold mb-10 text-center">
        Last updated: June 23, 2026
      </p>

      <div className="bg-white/60 backdrop-blur-md border border-[#012869]/10 rounded-2xl p-8 space-y-6 font-medium text-[#012869]/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using the services of Building India Digital, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">2. Service Proposals and Estimates</h2>
          <p>
            Any estimate or proposal issued by Building India Digital remains valid for 30 days from the date of issue. Upon approval of the proposal, any changes to the scope of work will require a written amendment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">3. Payments and Retainers</h2>
          <p>
            Projects require an advance retainer fee as outlined in our agreement. Final assets or code files will be deployed or transferred only upon receipt of full payment of all outstanding invoices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">4. Intellectual Property</h2>
          <p>
            Once final payments are cleared, the custom code, designs, and files developed for you will become your intellectual property. Building India Digital reserves the right to showcase the completed project in our portfolios.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
