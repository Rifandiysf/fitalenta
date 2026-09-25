import { AboutSection } from "@/components/sections/about-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ExpertsSection } from "@/components/sections/expert-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { InsightsSection } from "@/components/sections/insight-section";
import { PartnersSection } from "@/components/sections/partner-card";
import { ServicesSection } from "@/components/sections/service.section";
import { TestimonialsSection } from "@/components/sections/testimonial-section";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ImpactSection />
      <ExpertsSection />
      <InsightsSection />
      <TestimonialsSection/>
      <PartnersSection />
      <CtaSection />
    </>
  );
}
