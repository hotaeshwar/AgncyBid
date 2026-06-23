import React, { useEffect, useRef } from 'react';
import { Users, BarChart2, Lightbulb, ShieldCheck, Eye, Target, Handshake } from 'lucide-react';

const AboutUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animatables = sectionRef.current?.querySelectorAll('[data-animate], [data-animate-left]');

    const animateOnScroll = () => {
      if (!animatables) return;
      animatables.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add('is-visible');
        }
      });
    };

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

        /* ── Scroll animations ── */
        [data-animate] {
          opacity: 0;
          transform: translateY(44px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-animate-left] {
          opacity: 0;
          transform: translateX(-55px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-animate].is-visible,
        [data-animate-left].is-visible {
          opacity: 1;
          transform: translate(0, 0);
        }
        [data-delay="1"] { transition-delay: 0.08s; }
        [data-delay="2"] { transition-delay: 0.18s; }
        [data-delay="3"] { transition-delay: 0.28s; }
        [data-delay="4"] { transition-delay: 0.38s; }
        [data-delay="5"] { transition-delay: 0.48s; }
        [data-delay="6"] { transition-delay: 0.58s; }
        [data-delay="7"] { transition-delay: 0.68s; }
        [data-delay="8"] { transition-delay: 0.78s; }

        /* ── Base ── */
        .about-section {
          background: #f8faff;
          font-family: 'Nunito', sans-serif;
        }

        /* ── Section label ── */
        .section-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        /* ── Main heading — font-size now handled by Tailwind ── */
        .about-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.08;
        }

        /* ── Sub heading (Vision / Mission / Why) ── */
        .sub-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Paragraph ── */
        .about-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #334155;
          line-height: 1.82;
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
        }

        /* ── Gradient bar ── */
        .gradient-bar {
          height: 5px;
          width: 64px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        /* ── Top full-width color line ── */
        .top-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
        }

        /* ── Icon accent circle ── */
        .icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(254, 141, 0, 0.12);
          border: 1.5px solid rgba(254, 141, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fe8d00;
          flex-shrink: 0;
        }

        /* ── Vision / Mission card ── */
        .vm-card {
          background: #fff;
          border-radius: 14px;
          padding: 24px 28px;
          box-shadow: 0 4px 24px rgba(1, 40, 105, 0.07);
          border-top: 4px solid #012869;
        }

        /* ── Why Choose Us tag ── */
        .why-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border-radius: 10px;
          padding: 14px 18px;
          box-shadow: 0 3px 16px rgba(1, 40, 105, 0.07);
          border-left: 4px solid #63c000;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          color: #012869;
          font-size: clamp(0.85rem, 1.3vw, 0.98rem);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .why-tag:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(1, 40, 105, 0.12);
        }

        /* ── Why choose paragraph card ── */
        .why-para-card {
          background: #012869;
          border-radius: 14px;
          padding: 24px 28px;
        }

        /* ── Lottie iframe wrapper ── */
        .lottie-wrapper {
          width: 100%;
          max-width: 480px;
          aspect-ratio: 1 / 1;
          border-radius: 20px;
          overflow: hidden;
          margin: 0 auto;
          background: transparent;
        }
        .lottie-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>

      <section ref={sectionRef} className="about-section w-full">

        {/* Top color bar */}
        <div className="top-line" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32">

          {/* ════════════════════════════════════════
              ROW 1 — Lottie LEFT | Heading + VM RIGHT
          ════════════════════════════════════════ */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* LEFT — Lottie Animation */}
            <div className="w-full lg:w-5/12 flex justify-center" data-animate-left data-delay="1">
              <div className="lottie-wrapper">
                <iframe
                  src="https://lottie.host/embed/1f01cde4-53b0-4670-91df-0b9a83b866bc/yFxUUDqSBu.lottie"
                  title="About Us Animation"
                  allowFullScreen
                />
              </div>
            </div>

            {/* RIGHT — Text Content */}
            <div className="w-full lg:w-7/12 flex flex-col gap-7">

              {/* Label */}
              <div data-animate data-delay="1">
                <p className="section-label">About Building India Digital</p>
              </div>

              {/* Main Heading — responsive via Tailwind text-* classes */}
              <div data-animate data-delay="2">
                <h2 className="about-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                  Empowering businesses through innovative digital marketing solutions
                </h2>
              </div>

              {/* Gradient bar */}
              <div data-animate data-delay="3">
                <div className="gradient-bar" />
              </div>

              {/* Vision Card */}
              <div data-animate data-delay="4">
                <div className="vm-card">
                  <h3 className="sub-heading mb-3">
                    <span className="icon-circle">
                      <Eye size={18} />
                    </span>
                    Our Vision
                  </h3>
                  <p className="about-para">
                    To become India's leading digital marketing agency, empowering businesses of all sizes to achieve unprecedented growth through innovative, data-driven digital solutions. We envision a future where every business can harness the full potential of digital marketing to reach new heights of success.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div data-animate data-delay="5">
                <div className="vm-card" style={{ borderTopColor: '#fe8d00' }}>
                  <h3 className="sub-heading mb-3">
                    <span className="icon-circle" style={{ background: 'rgba(99,192,0,0.1)', borderColor: 'rgba(99,192,0,0.3)', color: '#63c000' }}>
                      <Target size={18} />
                    </span>
                    Our Mission
                  </h3>
                  <p className="about-para">
                    To deliver exceptional, customized digital marketing solutions that drive measurable results for our clients. We are committed to staying at the forefront of industry trends, utilizing cutting-edge technologies, and maintaining the highest standards of service excellence in everything we do.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════
              ROW 2 — Why Choose Us (full width)
          ════════════════════════════════════════ */}
          <div className="mt-16 sm:mt-20 lg:mt-24 flex flex-col gap-8">

            {/* Section heading — responsive via Tailwind text-* classes */}
            <div data-animate data-delay="1">
              <p className="section-label mb-2">Why Choose Us</p>
              <h2 className="about-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                We Build <span style={{ color: '#fe8d00' }}>Partnerships,</span> Not Just Services
              </h2>
            </div>

            {/* Two-column layout: para + tags */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-stretch">

              {/* Why Choose paragraph */}
              <div className="w-full lg:w-1/2" data-animate data-delay="2">
                <div className="why-para-card h-full flex flex-col justify-center gap-4">
                  <span className="icon-circle" style={{ background: 'rgba(254,141,0,0.15)', borderColor: 'rgba(254,141,0,0.4)', color: '#fe8d00' }}>
                    <Handshake size={18} />
                  </span>
                  <p className="about-para" style={{ color: '#cbd5e1' }}>
                    At Building India Digital, we don't just deliver services—we build partnerships. Our team of digital marketing experts works closely with each client to understand their unique challenges and create tailored solutions that exceed expectations.
                  </p>
                </div>
              </div>

              {/* Why Choose tags grid */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Users size={20} />, label: 'Expert Team', delay: '3' },
                  { icon: <BarChart2 size={20} />, label: 'Data-Driven Results', delay: '4' },
                  { icon: <Lightbulb size={20} />, label: 'Innovative Solutions', delay: '5' },
                  { icon: <ShieldCheck size={20} />, label: 'Proven Track Record', delay: '6' },
                ].map(({ icon, label, delay }) => (
                  <div key={label} data-animate data-delay={delay}>
                    <div className="why-tag">
                      <span style={{ color: '#63c000', flexShrink: 0 }}>{icon}</span>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom color bar */}
        <div className="top-line" />

      </section>
    </>
  );
};

export default AboutUs;
