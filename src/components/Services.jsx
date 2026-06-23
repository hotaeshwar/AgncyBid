import React, { useEffect, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  Mail,
  Video,
  Code2,
  Search,
  Megaphone,
  Share2,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Internship and Placement',
    desc: 'Unlock your future: internships and placements for career success!',
    accent: '#fe8d00',
  },
  {
    icon: BookOpen,
    title: 'University Admission Compliance',
    desc: 'Ensure your future: comply with university admission requirements for a seamless entry.',
    accent: '#012869',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    desc: 'Email marketing services provide targeted campaigns, automation, and analytics tools.',
    accent: '#63c000',
  },
  {
    icon: Video,
    title: 'Video and Photography',
    desc: 'Professional video and photography services for capturing memorable moments perfectly.',
    accent: '#fe8d00',
  },
  {
    icon: Code2,
    title: 'App & Web Development',
    desc: 'App and web development services deliver customized, user-friendly digital solutions.',
    accent: '#012869',
  },
  {
    icon: Search,
    title: 'SEO',
    desc: 'Search engine optimization improves website visibility and ranking on search engines.',
    accent: '#63c000',
  },
  {
    icon: Megaphone,
    title: 'Meta Ads',
    desc: 'Meta ads services boost online presence through targeted, data-driven advertising.',
    accent: '#fe8d00',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'Social media marketing services enhance brand engagement and drive growth.',
    accent: '#012869',
  },
  {
    icon: ShieldCheck,
    title: 'ORM (Online Reputation Management)',
    desc: 'Online reputation management services improve and maintain your digital image.',
    accent: '#63c000',
  },
];

const Services = () => {
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
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1),
                      transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        [data-delay="1"]  { transition-delay: 0.05s; }
        [data-delay="2"]  { transition-delay: 0.12s; }
        [data-delay="3"]  { transition-delay: 0.19s; }
        [data-delay="4"]  { transition-delay: 0.26s; }
        [data-delay="5"]  { transition-delay: 0.33s; }
        [data-delay="6"]  { transition-delay: 0.40s; }
        [data-delay="7"]  { transition-delay: 0.47s; }
        [data-delay="8"]  { transition-delay: 0.54s; }
        [data-delay="9"]  { transition-delay: 0.61s; }
        [data-delay="10"] { transition-delay: 0.68s; }
        [data-delay="11"] { transition-delay: 0.75s; }
        [data-delay="12"] { transition-delay: 0.82s; }

        /* ── Section background with gradient for glass effect ── */
        .svc-section {
          background: linear-gradient(135deg, #eef2ff 0%, #f0fdf4 50%, #fff7ed 100%);
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Soft background blobs */
        .svc-blob-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(254,141,0,0.13) 0%, transparent 70%);
          top: -120px; left: -150px;
          pointer-events: none;
        }
        .svc-blob-2 {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,192,0,0.11) 0%, transparent 70%);
          bottom: 40px; right: -100px;
          pointer-events: none;
        }
        .svc-blob-3 {
          position: absolute;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(1,40,105,0.07) 0%, transparent 70%);
          top: 40%; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .svc-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        .svc-main-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.08;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
        }

        .svc-sub-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #475569;
          line-height: 1.8;
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          max-width: 680px;
        }

        .gradient-bar {
          height: 5px;
          width: 64px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        .top-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
        }

        /* ── Glassmorphic white card ── */
        .svc-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 30px 26px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 24px rgba(1,40,105,0.06),
                      0 1px 2px rgba(255,255,255,0.8) inset;
        }
        .svc-card:hover {
          transform: translateY(-7px) scale(1.01);
        }

        .svc-icon-wrap {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .svc-card-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.3;
        }

        .svc-card-desc {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #475569;
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          line-height: 1.75;
        }

        /* ── Intro card ── */
        .svc-intro-card {
          background: rgba(1, 40, 105, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 32px 28px;
          border: 1.5px solid rgba(255,255,255,0.12);
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          box-shadow: 0 8px 32px rgba(1,40,105,0.28),
                      0 0 0 1px rgba(254,141,0,0.12);
        }

        .svc-intro-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(254,141,0,0.15);
          border: 1px solid rgba(254,141,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svc-intro-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #ffffff;
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 1.4;
        }

        .svc-intro-desc {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #94a3b8;
          font-size: clamp(0.85rem, 1.1vw, 0.95rem);
          line-height: 1.75;
        }
      `}</style>

      <section ref={sectionRef} className="svc-section w-full">

        {/* Background blobs */}
        <div className="svc-blob-1" />
        <div className="svc-blob-2" />
        <div className="svc-blob-3" />

        <div className="top-line" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-28">

          {/* ── Header ── */}
          <div className="flex flex-col gap-5 mb-14 sm:mb-16">
            <div data-animate data-delay="1">
              <p className="svc-label">Business Service</p>
            </div>
            <div data-animate data-delay="2">
              <h2 className="svc-main-heading">
                We offer a range of digital<br className="hidden sm:block" />
                marketing services
              </h2>
            </div>
            <div data-animate data-delay="3">
              <div className="gradient-bar" />
            </div>
            <div data-animate data-delay="4">
              <p className="svc-sub-para">
                We offer a range of digital marketing services to help businesses reach their target audience and achieve their marketing goals. Our services include:
              </p>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Intro card */}
            <div data-animate data-delay="5" className="sm:col-span-2 lg:col-span-1">
              <div className="svc-intro-card">
                <div className="svc-intro-icon">
                  <Briefcase size={26} color="#fe8d00" />
                </div>
                <p className="svc-intro-title">
                  Tailored business solutions delivering efficiency, growth, and innovation.
                </p>
                <p className="svc-intro-desc">
                  Strategize, implement, and optimize operations, technology, and marketing to propel your business forward.
                </p>
              </div>
            </div>

            {/* Service cards — glass white, no Contact us */}
            {SERVICES.map(({ icon: Icon, title, desc, accent }, i) => (
              <div
                key={title}
                data-animate
                data-delay={String(Math.min(i + 6, 12))}
              >
                <div
                  className="svc-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 20px 48px ${accent}35, 0 4px 12px ${accent}20, 0 1px 2px rgba(255,255,255,0.9) inset`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 4px 24px rgba(1,40,105,0.06), 0 1px 2px rgba(255,255,255,0.8) inset`;
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    borderRadius: '20px 20px 0 0',
                    background: `linear-gradient(90deg, ${accent}, ${accent}70)`,
                  }} />

                  <div
                    className="svc-icon-wrap"
                    style={{
                      background: `${accent}18`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <Icon size={24} color={accent} />
                  </div>

                  <h3 className="svc-card-title">{title}</h3>
                  <p className="svc-card-desc">{desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="top-line" />

      </section>
    </>
  );
};

export default Services;