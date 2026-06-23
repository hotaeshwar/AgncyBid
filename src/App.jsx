import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// SEO & Subpages
import SEO from './components/SEO';
import Blog from './components/Blog';
import Faq from './components/Faq';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import NotFound from './components/NotFound';

// Main home component with all sections
const HomePage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Building India Digital | Web Development & Digital Marketing Company"
      description="Building India Digital offers web development, SEO, digital marketing, UI/UX design and branding services to grow your business online in India."
      keywords="web development India, SEO services India, digital marketing agency India, UI UX design, branding company India"
    />
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
    <SEO
      title="About Us | Building India Digital"
      description="Learn more about Building India Digital, a leading digital marketing and web development agency dedicated to boosting your online presence."
      keywords="about Building India Digital, web agency team, digital marketing experts India"
    />
    <section id="about">
      <Aboutus />
    </section>
    <Footer />
  </div>
);

// Services page component
const ServicesPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Our Services | Web Development & SEO | Building India Digital"
      description="Explore our web development, SEO, social media marketing, branding, and UI/UX design services tailored to your business growth."
      keywords="web development services, SEO optimization, social media management, brand strategy"
    />
    <section id="services">
      <Services />
    </section>
    <Footer />
  </div>
);

// Packages page component
const PackagesPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Pricing & Packages | Building India Digital"
      description="Choose from our affordable web development, SEO, and digital marketing packages designed for startups and enterprises."
      keywords="web development pricing, SEO packages, digital marketing costs, branding packages"
    />
    <section id="packages">
      <Packages />
    </section>
    <Footer />
  </div>
);

// Contact page component
const ContactPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Contact Us | Get a Free Quote | Building India Digital"
      description="Get in touch with Building India Digital. Contact our team for a free consultation and quote on your next web development project."
      keywords="contact Building India Digital, free consultation, web development quote"
    />
    <footer id="contact">
      <Footer />
    </footer>
  </div>
);

// Blog page component
const BlogPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Blog & Digital Insights | Building India Digital"
      description="Read our latest articles on web development, SEO strategies, digital marketing trends, and business branding insights."
      keywords="web design blog, SEO tips, digital marketing blog, technology updates"
    />
    <Blog />
    <Footer />
  </div>
);

// FAQ page component
const FAQPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Frequently Asked Questions | Building India Digital"
      description="Find answers to common questions about our web development process, project timelines, pricing, and digital marketing services."
      keywords="web development FAQ, SEO questions, digital marketing support"
    />
    <Faq />
    <Footer />
  </div>
);

// Terms page component
const TermsPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Terms & Conditions | Building India Digital"
      description="Read the terms of service and conditions for using the website and services of Building India Digital."
      keywords="terms and conditions, terms of service, agreement"
    />
    <Terms />
    <Footer />
  </div>
);

// Privacy page component
const PrivacyPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="Privacy Policy | Building India Digital"
      description="Learn how Building India Digital collects, protects, and uses your personal data in our privacy policy statement."
      keywords="privacy policy, data protection, privacy statement"
    />
    <Privacy />
    <Footer />
  </div>
);

// NotFound page component
const NotFoundPage = () => (
  <div className="overflow-x-hidden w-full max-w-[100vw]">
    <SEO
      title="404 Page Not Found | Building India Digital"
      description="The page you are looking for does not exist on Building India Digital."
      keywords="404, page not found"
    />
    <NotFound />
    <Footer />
  </div>
);

// Wrapper component to handle scroll to section when on home page
const AppContent = () => {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    if (hash && location.pathname === '/') {
      const sectionId = hash.replace('#', '');
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
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
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppContent />
    </Router>
  );
};

export default App;