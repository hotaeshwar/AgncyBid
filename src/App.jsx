import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Aboutus from './components/Aboutus';
import Services from './components/Services';
import Packages from './components/Packages';
import Custom from './components/Custom';
import Clientscarousel from './components/Clientscarousel';
import Directormessage from './components/Directormessage';
import Footer from './components/Footer';

// Main home component with all sections
const HomePage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <section id="home">
      <Hero />
    </section>
    <Intro />
    <section id="about">
      <Aboutus />
    </section>
    <section id="services">
      <Services />
    </section>
    <section id="packages">
      <Packages />
    </section>
    <Custom />
    <Clientscarousel />
    <Directormessage />
    <footer id="contact">
      <Footer />
    </footer>
  </div>
);

// About page component
const AboutPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <section id="about">
      <Aboutus />
    </section>
    <Footer />
  </div>
);

// Services page component
const ServicesPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <section id="services">
      <Services />
    </section>
    <Footer />
  </div>
);

// Packages page component
const PackagesPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <section id="packages">
      <Packages />
    </section>
    <Footer />
  </div>
);

// Contact page component
const ContactPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <footer id="contact">
      <Footer />
    </footer>
  </div>
);

// Wrapper component to handle scroll to section when on home page
const AppContent = () => {
  const location = useLocation();

  React.useEffect(() => {
    // For HashRouter, location.hash includes the route path
    // We need to extract the section id from the hash
    let hash = location.hash;
    
    // If there's a hash and it's not just the route separator
    if (hash && hash !== '#/' && hash !== '#' && location.pathname === '/') {
      // Remove the #/ prefix if present
      let sectionId = hash.replace('#/', '').replace('#', '');
      
      // If sectionId is not empty and not a route path
      if (sectionId && !['about', 'services', 'packages', 'contact', 'aboutus', 'contactus'].includes(sectionId)) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (location.pathname === '/' && location.hash === '#/') {
      // Just home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/aboutus" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/contactus" element={<ContactPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      {/* Fixed navbar - now with router support */}
      <Navbar />
      <AppContent />
    </Router>
  );
};

export default App;