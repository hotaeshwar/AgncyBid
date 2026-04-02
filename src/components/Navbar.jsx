import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Only track active section on home page
      if (location.pathname === '/') {
        const sectionIds = ['about', 'services', 'packages', 'contact'];
        let current = 'home';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 100) current = id;
        }
        setActiveLink(current);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e, hash, path) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = hash.replace('#', '');
    setActiveLink(id);

    if (path) {
      // For internal pages like /about, /services - open in new tab
      window.open(path, '_blank', 'noopener,noreferrer');
    } else if (id === 'home') {
      // Navigate to home
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Navigate to section on home page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(id), 100);
      } else {
        scrollToSection(id);
      }
    }
  };

  const leftLinks = [
    { hash: '#home', label: 'Home' },
    { hash: '#about', label: 'About', path: '/about' },
    { hash: '#services', label: 'Services', path: '/services' },
  ];

  const rightLinks = [
    { hash: '#packages', label: 'Packages', path: '/packages' },
    { hash: '#contact', label: 'Contact', path: '/contact' },
    { hash: 'https://portfolio.buildingindiadigital.com/', label: 'Portfolio', external: true },
  ];

  const backlinks = [
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Services' },
    { path: '/packages', label: 'Pricing & Packages' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/terms', label: 'Terms & Conditions' },
    { path: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Playfair+Display:wght@700;900&display=swap');

        html { scroll-padding-top: 80px; }

        .nb {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }

        .nb.nb-top {
          background: none !important;
          box-shadow: none !important;
        }

        .nb.nb-scrolled {
          background: rgba(253, 243, 224, 0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(1,40,105,0.1);
        }

        .nb-bar {
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #012869 0%, #63c000 50%, #fe8d00 100%);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s ease;
        }
        .nb.nb-scrolled .nb-bar {
          transform: scaleY(1);
        }

        .nb-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 40px);
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0;
        }

        .nb-links {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2.2vw, 34px);
        }
        .nb-links.nb-right {
          justify-content: flex-end;
        }

        .nb-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(0.74rem, 0.95vw, 0.87rem);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          text-decoration: none;
          padding: 4px 0;
          cursor: pointer;
          white-space: nowrap;
          color: #000;
          transition: color 0.2s;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: #fe8d00;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-link:hover { color: #fe8d00; }
        .nb-link:hover::after { width: 100%; }
        .nb-link.nb-active { color: #fe8d00; }
        .nb-link.nb-active::after { width: 100%; }

        .nb.nb-scrolled .nb-link { color: #012869; }
        .nb.nb-scrolled .nb-link:hover { color: #fe8d00; }
        .nb.nb-scrolled .nb-link.nb-active { color: #fe8d00; }

        .nb-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(0.74rem, 0.95vw, 0.87rem);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: #fff;
          background: #fe8d00;
          padding: 8px 18px;
          border-radius: 24px;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(254,141,0,0.4);
          transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
        }
        .nb-pill:hover {
          background: #d47200;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(254,141,0,0.5);
        }
        .nb-pill-arrow { transition: transform 0.22s; font-size: 0.9em; }
        .nb-pill:hover .nb-pill-arrow { transform: translate(2px,-2px); }

        .nb-logo-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
        }
        .nb-logo {
          height: clamp(46px, 5.5vw, 60px);
          width: auto;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), filter 0.3s;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
        }
        .nb-logo:hover {
          transform: scale(1.07) translateY(-2px);
          filter: drop-shadow(0 6px 16px rgba(254,141,0,0.55));
        }
        .nb-logo-fb {
          display: none;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1.3rem;
        }

        .nb-ham {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .nb.nb-scrolled .nb-ham {
          border-color: rgba(1,40,105,0.2);
          background: rgba(1,40,105,0.06);
        }
        .nb-ham:hover { background: rgba(254,141,0,0.18); }
        .nb-ham span {
          display: block;
          width: 20px; height: 2px;
          border-radius: 2px;
          background: #fff;
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
          transform-origin: center;
        }
        .nb.nb-scrolled .nb-ham span { background: #012869; }
        .nb-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-ham.open span:nth-child(2) { opacity: 0; width: 0; }
        .nb-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nb-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(3px);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .nb-overlay.open { opacity: 1; pointer-events: all; }

        .nb-drawer {
          display: none;
          position: fixed;
          top: 0; right: 0;
          width: min(300px, 82vw);
          height: 100vh;
          background: #fdf3e0;
          z-index: 999;
          flex-direction: column;
          padding: 90px 28px 40px;
          box-shadow: -8px 0 40px rgba(0,0,0,0.2);
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
          border-left: 3px solid #fe8d00;
        }
        .nb-drawer.open { transform: translateX(0); }

        .nb-dlink {
          display: block;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          color: #012869;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 14px 0;
          border: none;
          border-bottom: 1px solid rgba(1,40,105,0.1);
          background: none;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s, padding-left 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-dlink:hover { color: #fe8d00; padding-left: 10px; }
        .nb-dlink.nb-active { color: #fe8d00; font-weight: 700; }

        .nb-dpill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #fff;
          background: #fe8d00;
          border-radius: 12px;
          padding: 14px 20px;
          margin-top: 18px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background 0.2s;
        }
        .nb-dpill:hover { background: #d47200; }

        .nb-drawer-section {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid rgba(1,40,105,0.1);
        }

        .nb-drawer-section-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fe8d00;
          margin-bottom: 10px;
        }

        .nb-dbacklink {
          display: block;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          color: #012869;
          text-decoration: none;
          padding: 10px 0;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s, padding-left 0.25s;
        }
        .nb-dbacklink:hover {
          color: #fe8d00;
          padding-left: 10px;
        }

        .nb-backlink-icon {
          display: inline-block;
          margin-left: 6px;
          font-size: 0.7rem;
          opacity: 0.7;
        }

        @media (max-width: 900px) {
          .nb-links { display: none; }
          .nb-ham { display: flex; }
          .nb-drawer { display: flex; }
          .nb-overlay { display: block; }
          .nb-inner {
            display: flex;
            justify-content: space-between;
          }
        }
      `}</style>

      <nav className={`nb ${scrolled ? 'nb-scrolled' : 'nb-top'}`} ref={menuRef}>
        <div className="nb-bar" />
        <div className="nb-inner">

          {/* LEFT - Logo */}
          <a href="/" className="nb-logo-wrap" onClick={(e) => handleNavClick(e, '#home')}>
            <img
              src="/media/bid.png"
              alt="Building India Digital"
              className="nb-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'block';
                }
              }}
            />
            <span className="nb-logo-fb">
              <span style={{ color: '#fe8d00' }}>B</span>
              <span style={{ color: '#63c000' }}>I</span>
              <span style={{ color: '#012869' }}>D</span>
            </span>
          </a>

          {/* RIGHT - All Links */}
          <div className="nb-links nb-right">
            {leftLinks.map(({ hash, label, path }) => {
              const id = hash.replace('#', '');
              return (
                <a
                  key={hash}
                  href={path || "/"}
                  className={`nb-link ${activeLink === id ? 'nb-active' : ''}`}
                  onClick={(e) => handleNavClick(e, hash, path)}
                >
                  {label}
                </a>
              );
            })}
            {rightLinks.map((item) =>
              item.external ? (
                <a
                  key={item.hash}
                  href={item.hash}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-pill"
                >
                  {item.label} <span className="nb-pill-arrow">↗</span>
                </a>
              ) : (
                <a
                  key={item.hash}
                  href={item.path || "/"}
                  className={`nb-link ${activeLink === item.hash.replace('#', '') ? 'nb-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.hash, item.path)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* HAMBURGER */}
          <button
            className={`nb-ham ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nb-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`nb-drawer ${menuOpen ? 'open' : ''}`}>
        {/* Main navigation links */}
        {[...leftLinks, ...rightLinks.filter((l) => !l.external)].map(({ hash, label, path }) => {
          const id = hash.replace('#', '');
          return (
            <a
              key={hash}
              href={path || "/"}
              className={`nb-dlink ${activeLink === id ? 'nb-active' : ''}`}
              onClick={(e) => handleNavClick(e, hash, path)}
            >
              {label}
            </a>
          );
        })}
        
        {/* External Portfolio link */}
        <a
          href="https://portfolio.buildingindiadigital.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-dpill"
          onClick={() => setMenuOpen(false)}
        >
          Portfolio ↗
        </a>

        {/* Backlinks section */}
        <div className="nb-drawer-section">
          <div className="nb-drawer-section-title">Quick Links</div>
          {backlinks.map(({ path, label }) => (
            <a
              key={path}
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-dbacklink"
              onClick={() => setMenuOpen(false)}
            >
              {label} <span className="nb-backlink-icon">↗</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;