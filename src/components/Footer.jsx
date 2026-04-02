import React, { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const footerRef = useRef(null);

  // ── Pure JS scroll + refresh reveal (no IntersectionObserver) ──
  useEffect(() => {
    const items = footerRef.current?.querySelectorAll('[data-reveal]') || [];
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(36px)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`;
    });

    const run = () => {
      const wh = window.innerHeight;
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < wh - 40) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    setTimeout(run, 80);
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  // ── Contact form state ──
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () =>
    form.name.trim() && form.phone.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async () => {
    if (!isValid()) { alert('Please fill in all fields.'); return; }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const formEl = document.createElement('form');
      formEl.action = 'https://formsubmit.co/himanshukhanegwal@gmail.com';
      formEl.method = 'POST';
      formEl.style.display = 'none';

      const fields = {
        Name: form.name,
        'Mobile No.': form.phone,
        Email: form.email,
        Message: form.message,
        _subject: `New Contact Form Submission from ${form.name}`,
        _next: window.location.href,
        _captcha: 'false',
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden'; input.name = name; input.value = value;
        formEl.appendChild(input);
      });
      document.body.appendChild(formEl);
      formEl.submit();
      setTimeout(() => {
        if (document.body.contains(formEl)) document.body.removeChild(formEl);
      }, 1000);

      setForm({ name: '', phone: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const year = new Date().getFullYear();

  const navLinks = ['Home', 'About Us', 'Services', 'Projects', 'Contact'];
  const services = [
    'Web Development',
    'Digital Marketing',
    'UI/UX Design',
    'Brand Strategy',
    'SEO Optimization',
    'Social Media',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600;700&display=swap');

        .ft-root {
          font-family: 'DM Sans', sans-serif;
          background: #012869;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .ft-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .ft-top-bar {
          height: 4px;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 55%, #012869 100%);
          width: 100%;
        }
        .ft-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #fe8d00;
          font-size: 1.05rem;
          margin-bottom: 6px;
        }
        .ft-brand-name {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          line-height: 1.15;
          color: #fff;
        }
        .ft-para {
          font-weight: 600;
          color: rgba(255,255,255,0.70);
          font-size: 0.87rem;
          line-height: 1.8;
        }
        .ft-link {
          display: inline-block;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          font-size: 0.87rem;
          transition: color 0.22s;
          position: relative;
        }
        .ft-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: #63c000;
          transition: width 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .ft-link:hover { color: #63c000; }
        .ft-link:hover::after { width: 100%; }

        .ft-accent-bar {
          height: 3px;
          width: 44px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
          margin-bottom: 18px;
        }
        .ft-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.18);
          color: #fff;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, transform 0.22s;
        }
        .ft-social:hover {
          background: #fe8d00;
          border-color: #fe8d00;
          transform: translateY(-3px) scale(1.08);
        }
        .ft-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .ft-info-icon {
          width: 28px; height: 28px;
          background: rgba(254,141,0,0.15);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ft-form-wrap {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 28px;
        }
        .ft-form-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(1.25rem, 2.2vw, 1.5rem);
          color: #fff;
          margin-bottom: 6px;
        }
        .ft-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
          box-sizing: border-box;
        }
        .ft-input::placeholder { color: rgba(255,255,255,0.38); }
        .ft-input:focus {
          border-color: #fe8d00;
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(254,141,0,0.15);
        }
        .ft-submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #fe8d00, #d47200);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          letter-spacing: 0.03em;
          box-shadow: 0 8px 24px rgba(254,141,0,0.35);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
        }
        .ft-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(254,141,0,0.45);
        }
        .ft-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ft-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin: 0;
        }
        .ft-bottom { background: rgba(0,0,0,0.22); }
        .ft-logo-glow { filter: drop-shadow(0 0 14px rgba(254,141,0,0.4)); }

        /* Grid helpers */
        .ft-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 640px) {
          .ft-main-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1280px) {
          .ft-main-grid { grid-template-columns: 2.2fr 1fr 1fr 1.6fr 2.4fr; gap: 28px; }
        }
        .ft-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 400px) {
          .ft-two-col { grid-template-columns: 1fr; }
        }
        .ft-bottom-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        @media (min-width: 640px) {
          .ft-bottom-inner {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>

      <footer className="ft-root" ref={footerRef}>
        {/* Background orbs */}
        <div className="ft-orb" style={{ width: 420, height: 420, top: -140, right: -100, background: 'radial-gradient(circle, rgba(254,141,0,0.07) 0%, transparent 70%)' }} />
        <div className="ft-orb" style={{ width: 300, height: 300, bottom: 60, left: -80, background: 'radial-gradient(circle, rgba(99,192,0,0.06) 0%, transparent 70%)' }} />

        <div className="ft-top-bar" />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,48px)', position: 'relative', zIndex: 10 }}>

          {/* ── MAIN GRID ── */}
          <div className="ft-main-grid" style={{ marginBottom: 48 }}>

            {/* 1 — Brand + About */}
            <div data-reveal>
              <a href="/" style={{ display: 'inline-block', marginBottom: 18 }}>
                <img
                  src="/media/bid.png"
                  alt="Building India Digital"
                  className="ft-logo-glow"
                  style={{ height: 58, width: 'auto', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                {/* Fallback text logo */}
                <div style={{ display: 'none' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.3rem' }}>
                    <span style={{ color: '#fe8d00' }}>Building</span>{' '}
                    <span style={{ color: '#63c000' }}>India</span>{' '}
                    <span style={{ color: '#fff' }}>Digital</span>
                  </span>
                </div>
              </a>
              <p className="ft-brand-name" style={{ marginBottom: 8 }}>Building India Digital</p>
              <div className="ft-accent-bar" />
              <p className="ft-para" style={{ marginBottom: 22 }}>
                At Building India Digital, we pride ourselves on delivering high-quality services that exceed our clients' expectations. Our team of experts works closely with clients to deliver customized solutions that meet their unique needs.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href="https://www.facebook.com/profile.php?id=100087588905846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/buildingindiadigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 2 — Quick Links */}
            <div data-reveal>
              <h3 className="ft-heading">Quick Links</h3>
              <div className="ft-accent-bar" />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="ft-link">
                      <span style={{ color: '#63c000', marginRight: 7 }}>›</span>{link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 — Services */}
            <div data-reveal>
              <h3 className="ft-heading">Our Services</h3>
              <div className="ft-accent-bar" />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {services.map((s) => (
                  <li key={s}>
                    <a href="#" className="ft-link">
                      <span style={{ color: '#fe8d00', marginRight: 7 }}>›</span>{s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4 — Contact Info */}
            <div data-reveal>
              <h3 className="ft-heading">Contact Info</h3>
              <div className="ft-accent-bar" />

              {/* Phone */}
              <div className="ft-info-row">
                <div className="ft-info-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fe8d00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.72rem', color: '#fe8d00', marginBottom: 3, letterSpacing: '0.1em' }}>CALL US</p>
                  <a href="tel:+919041499964" className="ft-link" style={{ display: 'block', marginBottom: 3 }}>+91 90414 99964</a>
                  <a href="tel:+919041499973" className="ft-link">+91 90414 99973</a>
                </div>
              </div>

              {/* Email */}
              <div className="ft-info-row">
                <div className="ft-info-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fe8d00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.72rem', color: '#fe8d00', marginBottom: 3, letterSpacing: '0.1em' }}>EMAIL US</p>
                  <a href="mailto:info@buildingindiadigital.com" className="ft-link" style={{ wordBreak: 'break-all', fontSize: '0.82rem' }}>info@buildingindiadigital.com</a>
                </div>
              </div>

              {/* Addresses */}
              <div className="ft-info-row">
                <div className="ft-info-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fe8d00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.72rem', color: '#fe8d00', marginBottom: 6, letterSpacing: '0.1em' }}>OFFICES</p>
                  <p className="ft-para" style={{ fontSize: '0.82rem', marginBottom: 5 }}>#246, Devaji VIP Plaza, VIP Road, Zirakpur 140603</p>
                  <p className="ft-para" style={{ fontSize: '0.82rem', marginBottom: 5 }}>DLF, Cyber City, Gurugram</p>
                  <p className="ft-para" style={{ fontSize: '0.82rem' }}>
                    Plot No. 2466, Sec 82, Mohali
                    <span style={{ display: 'inline-block', background: 'rgba(254,141,0,0.18)', color: '#fe8d00', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>HEAD OFFICE</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 5 — Embedded Contact Form */}
            <div data-reveal>
              <div className="ft-form-wrap">
                <p className="ft-form-heading">Send a Message</p>
                <div className="ft-accent-bar" style={{ marginTop: 8 }} />

                {submitStatus === 'success' && (
                  <div style={{ padding: '12px 14px', background: 'rgba(99,192,0,0.12)', border: '1.5px solid rgba(99,192,0,0.35)', borderRadius: 10, fontWeight: 600, color: '#86efac', fontSize: '0.85rem', marginBottom: 14 }}>
                    ✅ Message sent! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div style={{ padding: '12px 14px', background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.35)', borderRadius: 10, fontWeight: 600, color: '#fca5a5', fontSize: '0.85rem', marginBottom: 14 }}>
                    ❌ Something went wrong. Please try again.
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="ft-two-col">
                    <input
                      className="ft-input"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <input
                      className="ft-input"
                      type="tel"
                      name="phone"
                      placeholder="Mobile No."
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    className="ft-input"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <textarea
                    className="ft-input"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                  <button
                    className="ft-submit-btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isValid()}
                  >
                    {isSubmitting ? 'Sending…' : 'Contact'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <hr className="ft-divider" />
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom" data-reveal>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px clamp(20px,4vw,48px)' }} className="ft-bottom-inner">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', justifyContent: 'center' }}>
              <a href="#" className="ft-link" style={{ fontSize: '0.78rem' }}>Privacy Policy</a>
              <a href="#" className="ft-link" style={{ fontSize: '0.78rem' }}>Terms of Service</a>
              <a href="#" className="ft-link" style={{ fontSize: '0.78rem' }}>Sitemap</a>
            </div>
            <p style={{ fontWeight: 600, color: 'rgba(255,255,255,0.42)', fontSize: '0.78rem', textAlign: 'center' }}>
              © {year}{' '}
              <span style={{ color: '#fe8d00', fontWeight: 700 }}>Building India Digital</span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;