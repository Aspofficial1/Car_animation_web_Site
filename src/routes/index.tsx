import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
// @ts-expect-error
import Intro from "../components/Intro.jsx";
// @ts-expect-error
import Navbar from "../components/Navbar.jsx";
// @ts-expect-error
import HeroSection from "../sections/HeroSection.jsx";
// @ts-expect-error
import CustomizationSection from "../sections/CustomizationSection.jsx";
// @ts-expect-error
import ServicesSection from "../sections/ServicesSection.jsx";
// @ts-expect-error
import ProcessSection from "../sections/ProcessSection.jsx";
// @ts-expect-error
import WhyUsSection from "../sections/WhyUsSection.jsx";
// @ts-expect-error
import TestimonialsSection from "../sections/TestimonialsSection.jsx";
// @ts-expect-error
import PricingSection from "../sections/PricingSection.jsx";
// @ts-expect-error
import FAQSection from "../sections/FAQSection.jsx";
// @ts-expect-error
import ContactSection from "../sections/ContactSection.jsx";
// @ts-expect-error
import CTASection from "../sections/CTASection.jsx";
// @ts-expect-error
import Footer from "../sections/Footer.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASP Auto Hub — Premium Car Interior Customization | Kurunegala, Sri Lanka" },
      { name: "description", content: "Luxury custom car interiors hand-built in Kurunegala. Leather, carbon fibre, ambient lighting and bespoke cockpits across Sri Lanka." },
      { property: "og:title", content: "ASP Auto Hub" },
      { property: "og:description", content: "Premium Car Interior Customization studio — Kurunegala, Sri Lanka." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [introDone, setIntroDone] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <Navbar visible={navVisible} />
      {introDone && (
        <main>
          <HeroSection onHeroReady={() => setNavVisible(true)} />
          <div className="section-wrapper">
            <CustomizationSection />
            <ServicesSection />
            <ProcessSection />
            <WhyUsSection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
            <CTASection />
            <Footer />
          </div>
        </main>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

