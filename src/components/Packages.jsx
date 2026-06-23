import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'GOLD',
    tier: 'Professional',
    price: '22,500',
    headerBg: 'linear-gradient(135deg, #63c000 0%, #4a9400 100%)',
    accent: '#63c000',
    checkColor: '#63c000',
    features: [
      'Platform: Facebook, Instagram, LinkedIn & Twitter',
      'Daily Social Media Posts',
      'Social Media Management',
      'New Year Promo Plan - 30 sec',
      'GMB Setup and Design Logo & Cover',
      'Optimizing BIO & Interface',
      'Social Media Analytics Report',
      'Content Calendar Planning',
      'Basic SEO Optimization',
      'Monthly Performance Reports',
    ],
  },
  {
    name: 'PLATINUM',
    tier: 'Business',
    price: '35,000',
    headerBg: 'linear-gradient(135deg, #fe8d00 0%, #d47200 100%)',
    accent: '#fe8d00',
    checkColor: '#fe8d00',
    popular: true,
    features: [
      'Platform: Facebook, Instagram, LinkedIn & Twitter',
      'Platform: YouTube (Basic: Update Channel Art)',
      'SEO work: Listing 1 hour - Blog',
      'Technology 2 ads and posting of graphics',
      'SEO work Indexing of 3 keyword',
      'GMB Profile Optimization',
      'Google My Business optimization & Keyword',
      'Advanced Analytics & Reporting',
      'Competitor Analysis',
      'Email Marketing Integration',
    ],
  },
  {
    name: 'DIAMOND',
    tier: 'Enterprise',
    price: '50,000',
    headerBg: 'linear-gradient(135deg, #012869 0%, #011d4a 100%)',
    accent: '#012869',
    checkColor: '#012869',
    features: [
      'Platform: Facebook, Instagram, LinkedIn & Twitter',
      'New Events Updates',
      'New Social Media Post',
      'Monthly 2 ads and budget inclusions',
      '25 Keyword Optimization',
      'WhatsApp Bulk SMS',
      'Requirements list: You specify the details',
      '24/7 Priority Support',
      'Advanced Marketing Automation',
      'Custom Landing Pages',
      'Conversion Rate Optimization',
    ],
  },
];

const PREVIEW_COUNT = 5;

const PlanCard = ({ plan, animDelay }) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const visible = expanded ? plan.features : plan.features.slice(0, PREVIEW_COUNT);

  return (
    <div data-animate data-delay={animDelay} style={{ position: 'relative', paddingTop: plan.popular ? '28px' : '0', height: '100%' }}>

      {/* Badge ABOVE the card */}
      {plan.popular && (
        <div className="pkg-popular-badge">
          ⭐ MOST POPULAR
        </div>
      )}

      <div
        ref={cardRef}
        className="pkg-card"
        style={{ '--accent': plan.accent }}
        onMouseEnter={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = `0 0 0 2px ${plan.accent}60, 0 20px 60px ${plan.accent}45, 0 8px 24px ${plan.accent}30, 0 1px 2px rgba(255,255,255,0.9) inset`;
            cardRef.current.style.transform = 'translateY(-10px) scale(1.015)';
            cardRef.current.style.borderColor = `${plan.accent}70`;
          }
        }}
        onMouseLeave={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = '0 8px 32px rgba(1,40,105,0.08), 0 1px 2px rgba(255,255,255,0.9) inset';
            cardRef.current.style.transform = 'translateY(0) scale(1)';
            cardRef.current.style.borderColor = 'rgba(255,255,255,0.95)';
          }
        }}
      >
        {/* Header */}
        <div className="pkg-header" style={{ background: plan.headerBg }}>
          <h3 className="pkg-plan-name">{plan.name}</h3>
          <p className="pkg-plan-tier">{plan.tier}</p>
        </div>

        {/* Price */}
        <div className="pkg-price-block">
          <p className="pkg-price" style={{ color: plan.accent }}>
            <span className="pkg-rupee">₹</span>
            {plan.price}
          </p>
          <p className="pkg-per">per month</p>
        </div>

        {/* Divider */}
        <div
          className="pkg-divider"
          style={{ background: `linear-gradient(90deg, ${plan.accent}, ${plan.accent}40)` }}
        />

        {/* Features */}
        <ul className="pkg-features">
          {visible.map((f, i) => (
            <li key={i} className="pkg-feature-item">
              <span
                className="pkg-check"
                style={{
                  color: plan.checkColor,
                  borderColor: `${plan.checkColor}35`,
                  background: `${plan.checkColor}12`,
                }}
              >
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="pkg-feature-text">{f}</span>
            </li>
          ))}
        </ul>

        {/* View More / Less */}
        {plan.features.length > PREVIEW_COUNT && (
          <button
            className="pkg-toggle"
            style={{ color: plan.accent }}
            onClick={() => setExpanded(!expanded)}
          >
            <span className="pkg-toggle-dash">—</span>
            {expanded ? 'View Less' : `View More (+${plan.features.length - PREVIEW_COUNT})`}
          </button>
        )}

        {/* CTA */}
        <button
          className="pkg-cta"
          style={{ background: plan.headerBg }}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

const Packages = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animatables = sectionRef.current?.querySelectorAll('[data-animate]');
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
        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        [data-delay="1"] { transition-delay: 0.05s; }
        [data-delay="2"] { transition-delay: 0.15s; }
        [data-delay="3"] { transition-delay: 0.25s; }
        [data-delay="4"] { transition-delay: 0.35s; }
        [data-delay="5"] { transition-delay: 0.45s; }
        [data-delay="6"] { transition-delay: 0.55s; }

        .pkg-section {
          background: linear-gradient(160deg, #f0f4ff 0%, #f9fff0 50%, #fff8f0 100%);
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .pkg-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .top-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
        }

        .pkg-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        .pkg-main-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.08;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
        }

        .pkg-sub-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #475569;
          line-height: 1.8;
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          max-width: 620px;
        }

        .gradient-bar {
          height: 5px;
          width: 64px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        /* ── Most Popular badge — sits ABOVE the card ── */
        .pkg-popular-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          background: linear-gradient(135deg, #fe8d00, #d47200);
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 20px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(254,141,0,0.45);
        }

        /* Glassmorphic card */
        .pkg-card {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 22px;
          border: 1.5px solid rgba(255,255,255,0.95);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 8px 32px rgba(1,40,105,0.08),
                      0 1px 2px rgba(255,255,255,0.9) inset;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.35s ease;
        }

        /* Header */
        .pkg-header {
          padding: 28px 24px 20px;
          text-align: center;
        }

        .pkg-plan-name {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fff;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          letter-spacing: 0.06em;
          line-height: 1;
          margin: 0;
        }

        .pkg-plan-tier {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          font-size: 0.88rem;
          margin-top: 6px;
          letter-spacing: 0.04em;
        }

        /* Price */
        .pkg-price-block {
          padding: 24px 28px 12px;
          text-align: center;
        }

        .pkg-price {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2.2rem, 4vw, 3rem);
          line-height: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 4px;
        }

        .pkg-rupee {
          font-size: 55%;
          margin-top: 6px;
          font-weight: 900;
        }

        .pkg-per {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        /* Divider */
        .pkg-divider {
          height: 2px;
          margin: 4px 28px 16px;
          border-radius: 99px;
          opacity: 0.4;
        }

        /* Features */
        .pkg-features {
          list-style: none;
          padding: 0 24px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .pkg-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .pkg-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .pkg-feature-text {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #334155;
          font-size: clamp(0.82rem, 1.1vw, 0.92rem);
          line-height: 1.55;
        }

        /* Toggle */
        .pkg-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 14px 24px 8px;
          letter-spacing: 0.02em;
          transition: opacity 0.2s;
        }
        .pkg-toggle:hover { opacity: 0.7; }
        .pkg-toggle-dash { font-size: 1rem; }

        /* CTA */
        .pkg-cta {
          margin: 16px 24px 24px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #fff;
          letter-spacing: 0.04em;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .pkg-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
      `}</style>

      <section ref={sectionRef} className="pkg-section w-full">

        {/* Background blobs */}
        <div className="pkg-blob" style={{ width: 480, height: 480, background: 'radial-gradient(circle, rgba(99,192,0,0.12) 0%, transparent 70%)', top: -100, left: -120 }} />
        <div className="pkg-blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(254,141,0,0.12) 0%, transparent 70%)', bottom: 0, right: -80 }} />
        <div className="pkg-blob" style={{ width: 320, height: 320, background: 'radial-gradient(circle, rgba(1,40,105,0.08) 0%, transparent 70%)', top: '40%', left: '45%' }} />

        <div className="top-line" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-28">

          {/* Header */}
          <div className="flex flex-col gap-5 mb-14 sm:mb-16">
            <div data-animate data-delay="1">
              <p className="pkg-label">Our Packages</p>
            </div>
            <div data-animate data-delay="2">
              <h2 className="pkg-main-heading">
                Choose the right plan<br className="hidden sm:block" />
                for your business
              </h2>
            </div>
            <div data-animate data-delay="3">
              <div className="gradient-bar" />
            </div>
            <div data-animate data-delay="4">
              <p className="pkg-sub-para">
                Transparent pricing with no hidden fees. Pick a plan that suits your goals and scale as you grow.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} animDelay={String(i + 4)} />
            ))}
          </div>

        </div>

        <div className="top-line" />

      </section>
    </>
  );
};

export default Packages;