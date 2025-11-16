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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Animated Background Gradient */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(30, 64, 175, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      {/* Content */}
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