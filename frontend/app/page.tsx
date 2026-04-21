import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ProductDemoSection } from "@/components/home/product-demo-section";
import { FeaturesSection } from "@/components/home/features-section";
import { AiMotionSection } from "@/components/home/ai-motion-section";
import { ParallaxScrollSection } from "@/components/home/parallax-scroll-section";
import { FeatureSpotlightCards } from "@/components/home/feature-spotlight-cards";
import { IntegrationsSection } from "@/components/home/integrations-section";
import { ComponentShowcase } from "@/components/home/component-showcase";
import { PlatformHighlightsSection } from "@/components/home/platform-highlights-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { getComponentCounts } from "@/lib/site-metrics";

export default function HomePage() {
  const { total, free, pro } = getComponentCounts();

  return (
    <div className="min-h-screen bg-[#050008] text-foreground">
      <Navbar />
      <main>
        <HeroSection totalComponents={total} freeComponents={free} />
        <ProductDemoSection />
        <FeaturesSection totalComponents={total} />
        <AiMotionSection />
        <ParallaxScrollSection />
        <FeatureSpotlightCards />
        <IntegrationsSection />
        <ComponentShowcase />
        <PlatformHighlightsSection totalComponents={total} freeComponents={free} proComponents={pro} />
        <PricingSection totalComponents={total} freeComponents={free} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
