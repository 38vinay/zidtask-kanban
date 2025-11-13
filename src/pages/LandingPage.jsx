// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import HowToUse from '../components/landing/HowToUse';
import FAQ from '../components/landing/FAQ';
import Support from '../components/landing/Support';
import Footer from '../components/common/Footer';

const LandingPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Animated Background Gradient */}
      <div className="animated-bg" />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <HowToUse />
        <FAQ />
        <Support />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;