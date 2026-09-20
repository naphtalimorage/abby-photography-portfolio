import { HeroSection } from '../components/home/HeroSection';
import VideoReels from '../components/home/VideoReelsSection';
import Portfolio from '../components/home/PortfolioGallerySection';
import { AboutSection } from '../components/home/AboutSection';
import ServicesSection  from '../components/home/ServicesSection';
import FAQ from '../components/home/FAQSection';
import  Contact  from '../components/home/ContactSection.tsx';
import  FloatingButton  from '../components/common/FloatingButton';

export function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <VideoReels />
      <Portfolio />
      <AboutSection />
      <ServicesSection />
      <FAQ />
      <Contact />
      <FloatingButton />
    </div>
  );
}
