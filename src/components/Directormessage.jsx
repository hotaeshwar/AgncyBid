import React, { useEffect, useRef } from 'react';
import { Quote, Star, TrendingUp, Users } from 'lucide-react';

const DirectorMessage = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animatables = sectionRef.current?.querySelectorAll('[data-animate], [data-animate-left]');
    const run = () => {
      if (!animatables) return;
      animatables.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
          el.classList.add('is-visible');
        }
      });
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const stats = [
    { icon: Users, value: '500+', label: 'Brands Served' },
    { icon: TrendingUp, value: '10X', label: 'Avg. Growth' },
    { icon: Star, value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

        [data-animate] {
          opacity: 0;
          transform: translateY(44px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        [data-animate-left] {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
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

        .dm-section {
          background: #ffffff;
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .top-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
        }

        .dm-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        .dm-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.08;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
        }

        .gradient-bar {
          height: 5px;
          width: 64px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        /* ── Avatar card ── */
        .dm-avatar-card {
          background: linear-gradient(160deg, #012869 0%, #011d4a 100%);
          border-radius: 24px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(1,40,105,0.22);
          height: 100%;
        }
        .dm-avatar-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(254,141,0,0.1);
        }
        .dm-avatar-card::after {
          content: '';
          position: absolute;
          bottom: -50px; left: -50px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(99,192,0,0.08);
        }

        .dm-avatar-ring {
          width: 110px; height: 110px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fe8d00, #63c000);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(254,141,0,0.35);
          flex-shrink: 0;
        }

        .dm-avatar-initials {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 2rem;
          color: #fff;
        }

        .dm-director-name {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fff;
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          text-align: center;
          line-height: 1.25;
          position: relative;
          z-index: 1;
        }

        .dm-director-title {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          font-size: 0.8rem;
          text-align: center;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        .dm-divider-line {
          width: 44px; height: 3px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
          position: relative;
          z-index: 1;
        }

        .dm-stat {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 10px 14px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .dm-stat-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: rgba(254,141,0,0.15);
          border: 1px solid rgba(254,141,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dm-stat-value {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fe8d00;
          font-size: 1rem;
          line-height: 1;
        }

        .dm-stat-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }

        /* ── Message card ── */
        .dm-message-card {
          background: #f8faff;
          border-radius: 24px;
          padding: 36px 32px;
          border: 1.5px solid rgba(1,40,105,0.07);
          box-shadow: 0 8px 32px rgba(1,40,105,0.06);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dm-quote-icon {
          width: 48px; height: 48px;
          border-radius: 13px;
          background: rgba(254,141,0,0.1);
          border: 1.5px solid rgba(254,141,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fe8d00;
          margin-bottom: 16px;
          flex-shrink: 0;
        }

        .dm-message-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          line-height: 1.35;
          margin-bottom: 16px;
        }

        .dm-message-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #334155;
          line-height: 1.85;
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          flex: 1;
        }

        .dm-signature {
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1.5px solid rgba(1,40,105,0.08);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dm-sig-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #63c000;
          animation: sig-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes sig-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.5; }
        }

        .dm-sig-name {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: 0.95rem;
        }

        .dm-sig-role {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #64748b;
          font-size: 0.78rem;
          margin-top: 2px;
        }

        .dm-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <section ref={sectionRef} className="dm-section w-full">

        <div className="dm-blob" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(254,141,0,0.07) 0%, transparent 70%)', top: -80, right: -80 }} />
        <div className="dm-blob" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,192,0,0.07) 0%, transparent 70%)', bottom: 0, left: -60 }} />

        <div className="top-line" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">

          {/* ── Section header — tight gap mb-8 ── */}
          <div className="flex flex-col gap-3 mb-8">
            <div data-animate data-delay="1">
              <p className="dm-label">Director's Message</p>
            </div>
            <div data-animate data-delay="2">
              <h2 className="dm-heading">
                A word from our <span style={{ color: '#fe8d00' }}>Director</span>
              </h2>
            </div>
            <div data-animate data-delay="3">
              <div className="gradient-bar" />
            </div>
          </div>

          {/* ── Two column layout ── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

            {/* LEFT — Avatar card */}
            <div className="w-full lg:w-5/12 xl:w-4/12" data-animate-left data-delay="2">
              <div className="dm-avatar-card">
                <div className="dm-avatar-ring">
                  <span className="dm-avatar-initials">MK</span>
                </div>
                <div>
                  <p className="dm-director-name">Manjeet Kaur<br />Khanegwal</p>
                </div>
                <p className="dm-director-title">Founder & Director</p>
                <div className="dm-divider-line" />
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  Building India Digital
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  {stats.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="dm-stat">
                      <div className="dm-stat-icon">
                        <Icon size={17} color="#fe8d00" />
                      </div>
                      <div>
                        <p className="dm-stat-value">{value}</p>
                        <p className="dm-stat-label">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Message card */}
            <div className="w-full lg:w-7/12 xl:w-8/12" data-animate data-delay="3">
              <div className="dm-message-card">

                <div className="dm-quote-icon">
                  <Quote size={22} />
                </div>

                <h3 className="dm-message-heading">
                  Empowering Every Business with Digital Excellence
                </h3>

                <p className="dm-message-para">
                  At Building India Digital, our mission has always been simple — to help every business harness the true power of digital marketing. My son Himanshu and I founded this company on the core values of trust, innovation, and measurable results.
                  <br /><br />
                  We understand that every brand has a unique story. That is why we craft personalized SEO, PPC, social media, and content strategies that drive real growth. Our dedicated team stays ahead of industry trends, ensuring your business never falls behind in the digital race.
                  <br /><br />
                  We don't just deliver services — we build long-term partnerships. Your success is our success. I personally invite you to experience the Building India Digital difference and take your brand to the next level.
                </p>

                <div className="dm-signature">
                  <div className="dm-sig-dot" />
                  <div>
                    <p className="dm-sig-name">Manjeet Kaur Khanegwal</p>
                    <p className="dm-sig-role">Founder & Director, Building India Digital</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <div className="top-line" />

      </section>
    </>
  );
};

export default DirectorMessage;