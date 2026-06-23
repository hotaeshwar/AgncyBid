import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-[#012869]">
      <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#012869] mb-4 text-center">
        Privacy Policy
      </h1>
      <p className="text-sm text-[#012869]/60 font-bold mb-10 text-center">
        Last updated: June 23, 2026
      </p>

      <div className="bg-white/60 backdrop-blur-md border border-[#012869]/10 rounded-2xl p-8 space-y-6 font-medium text-[#012869]/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us voluntarily when you submit a contact or inquiry form on our website. This includes your name, phone number, email address, and message details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">2. How We Use Your Information</h2>
          <p>
            We use your information to respond to your queries, provide you with project quotes, deliver our services, and communicate updates about your project.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">3. Data Protection and Security</h2>
          <p>
            We deploy standard security measures to protect your submitted data. We do not sell, trade, or distribute your personal information to external third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif text-[#012869] mb-3">4. Cookies and Analytics</h2>
          <p>
            Our website may use cookies to improve user experience and analyze site traffic patterns via tracking services like Google Analytics. You can adjust your browser settings to decline cookies if preferred.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
