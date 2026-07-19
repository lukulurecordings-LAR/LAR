import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { CoursesSection } from '../components/CoursesSection';
import { PricingSection } from '../components/PricingSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { StudioBooking } from '../components/StudioBooking';
import { BeatStore } from '../components/BeatStore';
import { DesignServices } from '../components/DesignServices';
import { StudentPipeline } from '../components/StudentPipeline';
import { LabelSection } from '../components/LabelSection';
import { Footer } from '../components/Footer';
export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <PricingSection />
      <BenefitsSection />
      <StudentPipeline />
      <StudioBooking />
      <BeatStore />
      <DesignServices />
      <LabelSection />
      <Footer />
    </>);

}
