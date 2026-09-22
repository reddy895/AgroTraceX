// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { WhyAgroTraceXSection } from '../components/landing/WhyAgroTraceXSection';
import { PlatformsSection } from '../components/landing/PlatformsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { EndToEndTraceabilitySection } from '../components/landing/EndToEndTraceabilitySection';
import { ProductPreviewSection } from '../components/landing/ProductPreviewSection';
import { ImpactSection } from '../components/landing/ImpactSection';
import { LandingCtaSection } from '../components/landing/LandingCtaSection';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleExplorePlatform = () => {
    const el = document.getElementById('platforms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* SECTION 1: Hero with 3D Plant */}
      <HeroSection
        onGetStarted={handleGetStarted}
        onExplorePlatform={handleExplorePlatform}
      />

      {/* SECTION 2: Why AgroTraceX */}
      <WhyAgroTraceXSection />

      {/* SECTION 3: Platforms (8 Capabilities) */}
      <PlatformsSection />

      {/* SECTION 4: How It Works (6-Stage Pipeline) */}
      <HowItWorksSection />

      {/* SECTION 5: End-to-End Traceability */}
      <EndToEndTraceabilitySection />

      {/* SECTION 6: Interactive Product Preview */}
      <ProductPreviewSection />

      {/* SECTION 7: Impact / Metrics */}
      <ImpactSection />

      {/* SECTION 8: CTA */}
      <LandingCtaSection onGetStarted={handleGetStarted} />

      {/* SECTION 9: Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
