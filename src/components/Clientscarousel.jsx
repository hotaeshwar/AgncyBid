import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ClientsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [clientCount, setClientCount] = useState(0);
  const [industryCount, setIndustryCount] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const carouselRef = useRef(null);
  const statsRef = useRef(null);

  // Client logos array
  const clients = [
    {
      id: 1,
      name: 'Oren Kasauli',
      logo: '/media/orenkasauli-logo.png',
    },
    {
      id: 2,
      name: 'LOTD2',
      logo: '/media/lotd2.png',
    },
    {
      id: 3,
      name: 'Lavaang - DumokMII',
      logo: '/media/Lavaang -DumokMII.png',
    },
    {
      id: 4,
      name: 'IHG Hotels',
      logo: '/media/ihg-logo-nav.png',
    },
    {
      id: 5,
      name: 'Antral',
      logo: '/media/antral.png',
    },
  ];

  // Duplicate clients for infinite scroll effect
  const duplicatedClients = [...clients, ...clients, ...clients];

  // Fixed counting animation using requestAnimationFrame
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const targetValues = {
            clients: 200,
            industries: 15,
            satisfaction: 98
          };
          
          const durations = {
            clients: 1500, // 1.5 seconds
            industries: 1500,
            satisfaction: 1500
          };
          
          const startTimes = {
            clients: Date.now(),
            industries: Date.now(),
            satisfaction: Date.now()
          };
          
          const animate = (type, setter, target, duration, startTime) => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuad = (t) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);
            
            const currentValue = Math.floor(easedProgress * target);
            
            setter(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(() => 
                animate(type, setter, target, duration, startTime)
              );
            } else {
              // Ensure final value is exactly the target
              setter(target);
            }
          };
          
          // Start animations
          requestAnimationFrame(() => 
            animate('clients', setClientCount, targetValues.clients, durations.clients, startTimes.clients)
          );
          requestAnimationFrame(() => 
            animate('industries', setIndustryCount, targetValues.industries, durations.industries, startTimes.industries)
          );
          requestAnimationFrame(() => 
            animate('satisfaction', setSatisfactionRate, targetValues.satisfaction, durations.satisfaction, startTimes.satisfaction)
          );
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, clients.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? clients.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % clients.length;
    goToSlide(newIndex);
  };

  return (
    <section id="clients" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-[#012869]/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,192,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,192,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#f98e09]/10 to-[#63c000]/10 border-2 border-[#63c000] mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#f98e09] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#012869]">Trusted by Leading Brands</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#012869] mb-3 sm:mb-4">
            Our Valued Clients
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#012869]/80 max-w-2xl mx-auto">
            Partnering with industry leaders to deliver exceptional digital solutions
          </p>
        </div>

        {/* Desktop & Tablet: Infinite Scroll Carousel */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 lg:gap-8 animate-scroll-continuous"
              style={{
                width: 'fit-content',
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-48 lg:w-56 xl:w-64 h-32 lg:h-36 xl:h-40 bg-white rounded-xl lg:rounded-2xl border-2 border-[#63c000]/30 hover:border-[#63c000] transition-all duration-500 hover:shadow-2xl hover:shadow-[#63c000]/20 hover:scale-105 flex items-center justify-center p-6 lg:p-8 group"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-l from-[#012869]/5 to-transparent pointer-events-none" />
        </div>

        {/* Mobile: Carousel with Navigation */}
        <div className="md:hidden relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl border-2 border-[#63c000]/30 shadow-lg h-40 flex items-center justify-center p-8">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white border-2 border-[#63c000] text-[#63c000] rounded-full p-2 shadow-lg hover:bg-[#63c000] hover:text-white transition-all duration-300 z-10"
            aria-label="Previous client"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white border-2 border-[#63c000] text-[#63c000] rounded-full p-2 shadow-lg hover:bg-[#63c000] hover:text-white transition-all duration-300 z-10"
            aria-label="Next client"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 h-2 bg-[#63c000]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[#63c000]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Client Count Stats with Counting Animation */}
        <div ref={statsRef} className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#63c000]/30 px-6 sm:px-10 py-4 sm:py-6 shadow-xl">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f98e09] min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                {clientCount}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-semibold text-[#012869] mt-1 sm:mt-2">Happy Clients</div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-[#63c000]/30" />
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#012869] min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                {industryCount}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-semibold text-[#012869] mt-1 sm:mt-2">Industries Served</div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-[#63c000]/30" />
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#63c000] min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                {satisfactionRate}%
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-semibold text-[#012869] mt-1 sm:mt-2">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Infinite Scroll */}
      <style jsx>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-continuous {
          animation: scroll-continuous 20s linear infinite;
        }

        .animate-scroll-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientsCarousel;