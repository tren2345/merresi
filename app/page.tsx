import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AssemblyAnimation } from "@/components/assembly-animation"
import { LogicMapSection } from "@/components/logic-map-section"
import { FeaturesSection } from "@/components/features-section"
import { VisibilityEngineSection } from "@/components/visibility-engine-section"
import { ComparisonSection } from "@/components/comparison-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background scroll-smooth">
      <Header />
      <HeroSection />
      <AssemblyAnimation />
      <LogicMapSection />
      <FeaturesSection />
      <VisibilityEngineSection />
      <ComparisonSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
