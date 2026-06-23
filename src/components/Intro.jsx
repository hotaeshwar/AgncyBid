import React, { useEffect, useRef } from 'react';

const Intro = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate]');

    const animateOnScroll = () => {
      if (!elements) return;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.95) {
          el.classList.add('is-visible');
        }
      });
    };

    // Run on mount (handles refresh)
    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

        [data-animate] {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        [data-delay="1"] { transition-delay: 0.1s; }
        [data-delay="2"] { transition-delay: 0.22s; }
        [data-delay="3"] { transition-delay: 0.34s; }
        [data-delay="4"] { transition-delay: 0.46s; }
        [data-delay="5"] { transition-delay: 0.58s; }

        .intro-section {
          background-color: #ffffff;
          font-family: 'Nunito', sans-serif;
        }

        .welcome-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.75rem, 1.5vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.05;
          font-size: clamp(2.4rem, 6vw, 5rem);
        }

        .brand-name span {
          color: #fe8d00;
        }

        .tagline {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #63c000;
          font-size: clamp(1.1rem, 2.5vw, 1.75rem);
          line-height: 1.3;
        }

        .intro-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #334155;
          line-height: 1.85;
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
        }

        .divider-bar {
          height: 5px;
          width: 72px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        .highlight-box {
          border-left: 4px solid #fe8d00;
          background: rgba(254, 141, 0, 0.05);
          border-radius: 0 10px 10px 0;
          padding: 18px 24px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(1, 40, 105, 0.06);
          border: 1.5px solid rgba(1, 40, 105, 0.15);
          border-radius: 999px;
          padding: 6px 16px;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          color: #012869;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #63c000;
          animation: blink 1.6s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }

        .orange-line {
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
          border-radius: 2px;
        }

        .service-tag {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 6px 16px;
          border-radius: 6px;
          background: rgba(99, 192, 0, 0.08);
          color: #012869;
          border: 1.5px solid rgba(99, 192, 0, 0.3);
          letter-spacing: 0.04em;
        }

        .stat-card-navy {
          flex: 1;
          border-radius: 12px;
          padding: 20px;
          background: #012869;
          color: #fff;
        }

        .stat-card-green {
          flex: 1;
          border-radius: 12px;
          padding: 20px;
          background: #63c000;
          color: #fff;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 2rem;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          margin-top: 4px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.85;
        }
      `}</style>

      <section ref={sectionRef} className="intro-section w-full">

        {/* Top color bar */}
        <div className="orange-line" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32">

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 flex flex-col gap-6">

              {/* WELCOME TO */}
              <div data-animate data-delay="1">
                <p className="welcome-label">WELCOME TO</p>
              </div>

              {/* BuildingIndiaDigital */}
              <div data-animate data-delay="2">
                <h1 className="brand-name">
                  Building<span>India</span>Digital
                </h1>
              </div>

              {/* Divider */}
              <div data-animate data-delay="3">
                <div className="divider-bar" />
              </div>

              {/* One Step IT Solutions */}
              <div data-animate data-delay="4">
                <p className="tagline">One Step IT Solutions</p>
              </div>

              {/* Live badge */}
              <div data-animate data-delay="5">
                <span className="badge">
                  <span className="badge-dot" />
                  Digital Marketing Experts
                </span>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex-1 flex flex-col gap-6 justify-center">

              {/* Paragraph with exact given text */}
              <div data-animate data-delay="2">
                <div className="highlight-box">
                  <p className="intro-para">
                    We're a digital marketing powerhouse, fueling brands with top-notch SEO, PPC, and social media expertise. Trust us to amplify your online presence and drive meaningful results.
                  </p>
                </div>
              </div>

              {/* Service tags */}
              <div data-animate data-delay="3" className="flex flex-wrap gap-3 mt-2">
                {['SEO', 'PPC', 'Social Media', 'IT Solutions', 'Brand Growth'].map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>

              {/* Stat cards */}
              <div data-animate data-delay="4" className="flex flex-col sm:flex-row gap-4 mt-2">

                <div className="stat-card-navy">
                  <p className="stat-number" style={{ color: '#fe8d00' }}>500+</p>
                  <p className="stat-label" style={{ color: '#cbd5e1' }}>Brands Empowered</p>
                </div>

                <div className="stat-card-green">
                  <p className="stat-number" style={{ color: '#fff' }}>One Stop</p>
                  <p className="stat-label" style={{ color: '#ecfdf5' }}>IT Solutions Hub</p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Bottom color bar */}
        <div className="orange-line" />

      </section>
    </>
  );
};

export default Intro;