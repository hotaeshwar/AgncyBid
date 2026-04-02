import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Mail, MapPin, Check } from 'lucide-react';

const packages = {
  gold: {
    name: 'Gold Package',
    price: '₹22,500',
    features: [
      'Platform: Facebook, Instagram, LinkedIn & Twitter',
      'Daily Social Media Posts',
      'Social media Management',
      'New Year Promo Plan - 30 sec',
      'GMB Setup and Design Logo & Cover',
      'Optimizing BIO & Interface',
      'Social Media Analytics Report',
      'Content Calendar Planning',
      'Basic SEO Optimization',
      'Monthly Performance Reports',
    ],
  },
  platinum: {
    name: 'Platinum Package',
    price: '₹35,000',
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
  diamond: {
    name: 'Diamond Package',
    price: '₹50,000',
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
};

const addonOptions = [
  { id: 'linkedin-facebook', name: 'LinkedIn & Facebook page management', price: '₹5,000' },
  { id: 'facebook-boost', name: 'Live Facebook page boost', price: '₹3,000' },
  { id: 'youtube-optimization', name: 'YouTube content optimization', price: '₹4,000' },
  { id: 'google-ads', name: 'Google Ads Management', price: '₹8,000' },
  { id: 'google-ads-boost', name: 'Google Ads Boost (15000+)', price: '₹15,000' },
  { id: 'advanced-seo', name: 'Advanced SEO Package', price: '₹6,000' },
  { id: 'content-creation', name: 'Additional Content Creation', price: '₹4,500' },
  { id: 'influencer-marketing', name: 'Influencer Marketing Campaign', price: '₹10,000' },
];

const CustomPackage = () => {
  const sectionRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    selectedPackage: '',
    selectedAddons: [],
    customFeatures: '',
    budget: '',
    timeline: '',
    additionalRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Pure JS scroll animation
  useEffect(() => {
    const el = sectionRef.current;
    const run = () => {
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        setIsVisible(true);
      }
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  // Lock body scroll when popup open
  useEffect(() => {
    document.body.style.overflow = showPopup ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPopup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddonToggle = (addonId) => {
    setForm(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }));
  };

  const calculateTotal = () => {
    const base = form.selectedPackage === 'gold' ? 22500
               : form.selectedPackage === 'platinum' ? 35000
               : form.selectedPackage === 'diamond' ? 50000 : 0;
    const addons = form.selectedAddons.reduce((sum, id) => {
      const a = addonOptions.find(o => o.id === id);
      return sum + (a ? parseInt(a.price.replace('₹', '').replace(',', '')) : 0);
    }, 0);
    return base + addons;
  };

  const isFormValid = () =>
    form.name.trim() && form.phone.trim() && form.email.trim() && form.selectedPackage;

  const handleSubmit = async () => {
    if (!isFormValid()) { alert('Please fill in all required fields.'); return; }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const uuid = Math.floor(100000 + Math.random() * 900000);
      const addonNames = form.selectedAddons.map(id => {
        const a = addonOptions.find(o => o.id === id);
        return `${a.name} (${a.price})`;
      });

      const formEl = document.createElement('form');
      formEl.action = 'https://formsubmit.co/himanshukhanegwal@gmail.com';
      formEl.method = 'POST';
      formEl.style.display = 'none';

      const fields = {
        'Customer ID': uuid,
        'Name': form.name,
        'Phone': form.phone,
        'Email': form.email,
        'Base Package': form.selectedPackage
          ? `${packages[form.selectedPackage].name} (${packages[form.selectedPackage].price}/month)`
          : 'Not selected',
        'Selected Addons': addonNames.length ? addonNames.join(', ') : 'No addons selected',
        'Estimated Total': `₹${calculateTotal().toLocaleString()}/month`,
        'Custom Features': form.customFeatures || 'None',
        'Budget Range': form.budget || 'Not specified',
        'Timeline': form.timeline || 'Not specified',
        'Additional Requests': form.additionalRequests || 'None',
        'Timestamp': new Date().toLocaleString(),
        '_subject': `Custom Package Request - Customer ID: ${uuid}`,
        '_next': window.location.href,
        '_captcha': 'false',
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden'; input.name = name; input.value = value;
        formEl.appendChild(input);
      });
      document.body.appendChild(formEl);
      formEl.submit();
      setTimeout(() => { if (document.body.contains(formEl)) document.body.removeChild(formEl); }, 1000);

      setForm({
        name: '', phone: '', email: '', selectedPackage: '',
        selectedAddons: [], customFeatures: '', budget: '', timeline: '', additionalRequests: '',
      });
      setSubmitStatus('success');
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

        .cp-section {
          font-family: 'Nunito', sans-serif;
          background: linear-gradient(135deg, #f0f4ff 0%, #f0fff4 50%, #fff8f0 100%);
          position: relative;
          overflow: hidden;
        }

        .cp-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .top-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #fe8d00 0%, #63c000 50%, #012869 100%);
        }

        /* ── Scroll fade in ── */
        .cp-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .cp-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cp-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fe8d00;
        }

        .cp-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #012869;
          line-height: 1.08;
          font-size: clamp(1.8rem, 4vw, 3rem);
        }

        .cp-para {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #475569;
          line-height: 1.8;
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
        }

        .gradient-bar {
          height: 5px;
          width: 64px;
          border-radius: 99px;
          background: linear-gradient(90deg, #fe8d00, #63c000);
        }

        /* ── Banner card ── */
        .cp-banner {
          background: linear-gradient(135deg, #012869 0%, #011d4a 100%);
          border-radius: 24px;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(1,40,105,0.25);
        }
        .cp-banner::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: rgba(254,141,0,0.1);
        }
        .cp-banner::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(99,192,0,0.08);
        }

        .cp-banner-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fff;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.15;
        }

        .cp-banner-sub {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          line-height: 1.75;
          max-width: 480px;
        }

        /* Addon tags */
        .cp-addon-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 10px 16px;
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          font-size: clamp(0.8rem, 1.1vw, 0.9rem);
        }

        .cp-check-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(99,192,0,0.2);
          border: 1.5px solid rgba(99,192,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #63c000;
        }

        /* CTA button */
        .cp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #fe8d00, #d47200);
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          padding: 16px 36px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(254,141,0,0.4);
          transition: transform 0.25s, box-shadow 0.25s, opacity 0.2s;
          letter-spacing: 0.03em;
        }
        .cp-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(254,141,0,0.5);
        }

        /* ── Popup overlay ── */
        .cp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .cp-popup {
          background: #fff;
          border-radius: 22px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(1,40,105,0.2);
        }

        .cp-popup-header {
          background: linear-gradient(135deg, #012869 0%, #011d4a 100%);
          padding: 28px 32px;
          border-radius: 22px 22px 0 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .cp-popup-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fff;
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
        }

        .cp-popup-sub {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          font-size: 0.88rem;
          margin-top: 4px;
        }

        .cp-close-btn {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .cp-close-btn:hover { background: rgba(255,255,255,0.22); }

        /* Form field */
        .cp-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          color: #334155;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #f8faff;
        }
        .cp-input:focus {
          border-color: #fe8d00;
          box-shadow: 0 0 0 3px rgba(254,141,0,0.12);
          background: #fff;
        }

        .cp-section-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: 1.05rem;
          margin-bottom: 14px;
        }

        /* Radio / Checkbox rows */
        .cp-option-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #f8faff;
        }
        .cp-option-row:hover {
          border-color: #fe8d00;
          background: #fff8f0;
        }
        .cp-option-row input[type="radio"],
        .cp-option-row input[type="checkbox"] {
          accent-color: #fe8d00;
          width: 16px; height: 16px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .cp-option-label {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          color: #012869;
          font-size: 0.9rem;
        }
        .cp-option-price {
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          color: #64748b;
          font-size: 0.82rem;
        }

        /* Summary sidebar */
        .cp-summary-box {
          background: #f8faff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
        }

        .cp-summary-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #012869;
          font-size: 1rem;
          margin-bottom: 14px;
        }

        .cp-total-price {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #fe8d00;
          font-size: 1.5rem;
        }

        /* Contact info box */
        .cp-contact-box {
          background: rgba(1,40,105,0.04);
          border: 1.5px solid rgba(1,40,105,0.1);
          border-radius: 14px;
          padding: 20px;
        }

        /* Footer buttons */
        .cp-popup-footer {
          border-top: 1.5px solid #e2e8f0;
          padding: 20px 28px;
          background: #f8faff;
          border-radius: 0 0 22px 22px;
          position: sticky;
          bottom: 0;
        }

        .cp-cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          font-size: 0.92rem;
          transition: background 0.2s;
        }
        .cp-cancel-btn:hover { background: #f1f5f9; }

        .cp-submit-btn {
          flex: 2;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #fe8d00, #d47200);
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(254,141,0,0.3);
          letter-spacing: 0.02em;
        }
        .cp-submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .cp-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <section className="cp-section w-full">

        {/* Background blobs */}
        <div className="cp-blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(254,141,0,0.1) 0%, transparent 70%)', top: -80, right: -80, position: 'absolute' }} />
        <div className="cp-blob" style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(99,192,0,0.09) 0%, transparent 70%)', bottom: 0, left: -60, position: 'absolute' }} />

        <div className="top-line" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-28">

          {/* Section header */}
          <div className="flex flex-col gap-5 mb-14">
            <div ref={sectionRef} className={`cp-animate ${isVisible ? 'is-visible' : ''}`}>
              <p className="cp-label">Custom Package</p>
            </div>
            <div className={`cp-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <h2 className="cp-heading">
                Build your own<br className="hidden sm:block" />
                <span style={{ color: '#fe8d00' }}>perfect package</span>
              </h2>
            </div>
            <div className={`cp-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <div className="gradient-bar" />
            </div>
            <div className={`cp-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <p className="cp-para" style={{ maxWidth: 620 }}>
                Choose a base plan and add premium features to craft a solution that fits your exact business needs and budget.
              </p>
            </div>
          </div>

          {/* Banner */}
          <div className={`cp-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className="cp-banner">
              <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">

                {/* Left text */}
                <div className="flex-1 flex flex-col gap-5">
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fe8d00' }}>
                    PREMIUM ADD-ONS
                  </p>
                  <h3 className="cp-banner-heading">
                    Supercharge your plan<br />with premium features
                  </h3>
                  <p className="cp-banner-sub">
                    Mix and match from our premium add-on services. You pick, we deliver — fully customized to your business goals.
                  </p>
                  <div>
                    <button className="cp-cta-btn" onClick={() => setShowPopup(true)}>
                      Customize My Package →
                    </button>
                  </div>
                </div>

                {/* Right addon tags */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addonOptions.map((addon) => (
                    <div key={addon.id} className="cp-addon-tag">
                      <span className="cp-check-icon">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span>{addon.name}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="top-line" />
      </section>

      {/* ══════════════════════════════════
          POPUP
      ══════════════════════════════════ */}
      {showPopup && (
        <div className="cp-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div className="cp-popup">

            {/* Header */}
            <div className="cp-popup-header">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p className="cp-popup-title">Build Your Custom Package</p>
                  <p className="cp-popup-sub">Select a base plan and add premium features for a personalized quote</p>
                </div>
                <button className="cp-close-btn" onClick={() => setShowPopup(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '28px 28px 0', display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="lg:grid-cols-3">

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="lg:col-span-2">

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div style={{ padding: 16, background: 'rgba(99,192,0,0.1)', border: '1.5px solid #63c000', borderRadius: 10, fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#3a7a00', fontSize: '0.9rem' }}>
                    ✅ Your custom package request has been sent! We'll contact you with a personalized quote.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div style={{ padding: 16, background: 'rgba(220,38,38,0.08)', border: '1.5px solid #dc2626', borderRadius: 10, fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>
                    ❌ Error sending your request. Please try again.
                  </div>
                )}

                {/* Contact info */}
                <div>
                  <p className="cp-section-title">Contact Information</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <input className="cp-input" type="text" name="name" placeholder="Your Name *" value={form.name} onChange={handleInputChange} />
                    <input className="cp-input" type="tel" name="phone" placeholder="Your Phone *" value={form.phone} onChange={handleInputChange} />
                  </div>
                  <input className="cp-input" type="email" name="email" placeholder="Your Email *" value={form.email} onChange={handleInputChange} />
                </div>

                {/* Base package */}
                <div>
                  <p className="cp-section-title">Select Base Package *</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Object.entries(packages).map(([key, pkg]) => (
                      <label key={key} className="cp-option-row">
                        <input type="radio" name="selectedPackage" value={key} checked={form.selectedPackage === key} onChange={handleInputChange} />
                        <div style={{ flex: 1 }}>
                          <p className="cp-option-label">{pkg.name}</p>
                          <p className="cp-option-price">{pkg.price}/month</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Addons */}
                <div>
                  <p className="cp-section-title">Select Add-ons (Optional)</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {addonOptions.map((addon) => (
                      <label key={addon.id} className="cp-option-row">
                        <input type="checkbox" checked={form.selectedAddons.includes(addon.id)} onChange={() => handleAddonToggle(addon.id)} />
                        <div style={{ flex: 1 }}>
                          <p className="cp-option-label">{addon.name}</p>
                          <p className="cp-option-price">{addon.price}/month</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extra fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input className="cp-input" type="text" name="budget" placeholder="Your Budget Range" value={form.budget} onChange={handleInputChange} />
                  <input className="cp-input" type="text" name="timeline" placeholder="Expected Timeline" value={form.timeline} onChange={handleInputChange} />
                </div>
                <textarea className="cp-input" name="customFeatures" placeholder="Describe any custom features or modifications..." rows={3} value={form.customFeatures} onChange={handleInputChange} style={{ resize: 'vertical' }} />
                <textarea className="cp-input" name="additionalRequests" placeholder="Any additional requirements or special requests..." rows={2} value={form.additionalRequests} onChange={handleInputChange} style={{ resize: 'vertical' }} />

              </div>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>

                {/* Summary */}
                <div className="cp-summary-box">
                  <p className="cp-summary-title">Package Summary</p>

                  {form.selectedPackage && (
                    <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#012869', fontSize: '0.88rem' }}>Base Package</p>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#64748b', fontSize: '0.82rem' }}>{packages[form.selectedPackage].name}</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#63c000', fontSize: '1.2rem' }}>{packages[form.selectedPackage].price}/mo</p>
                    </div>
                  )}

                  {form.selectedAddons.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#012869', fontSize: '0.88rem', marginBottom: 8 }}>Selected Add-ons</p>
                      {form.selectedAddons.map(id => {
                        const a = addonOptions.find(o => o.id === id);
                        return (
                          <div key={id} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', marginBottom: 6 }}>
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#334155', fontSize: '0.8rem' }}>{a.name}</span>
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#fe8d00', fontSize: '0.8rem', flexShrink: 0, marginLeft: 8 }}>{a.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(form.selectedPackage || form.selectedAddons.length > 0) && (
                    <div style={{ borderTop: '1.5px solid #e2e8f0', paddingTop: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#012869', fontSize: '0.9rem' }}>Estimated Total</span>
                        <span className="cp-total-price">₹{calculateTotal().toLocaleString()}<span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>/mo</span></span>
                      </div>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#94a3b8', fontSize: '0.72rem', marginTop: 4 }}>*Final pricing may vary based on custom requirements</p>
                    </div>
                  )}

                  {!form.selectedPackage && form.selectedAddons.length === 0 && (
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '16px 0' }}>Select a package to see your summary</p>
                  )}
                </div>

                {/* Contact */}
                <div className="cp-contact-box">
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#012869', fontSize: '0.95rem', marginBottom: 12 }}>Need Help?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Phone size={16} color="#fe8d00" />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>08054481253</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Mail size={16} color="#fe8d00" />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#334155', fontSize: '0.78rem' }}>info@buildinngindiadigital.com</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <MapPin size={16} color="#fe8d00" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#334155', fontSize: '0.78rem', lineHeight: 1.6 }}>
                        SCO 246 Upper Ground Floor,<br />Devaji Plaza, Zirakpur 140603
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="cp-popup-footer">
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="cp-cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                <button className="cp-submit-btn" onClick={handleSubmit} disabled={isSubmitting || !isFormValid()}>
                  {isSubmitting ? 'Sending...' : 'Send Custom Package Request'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CustomPackage;