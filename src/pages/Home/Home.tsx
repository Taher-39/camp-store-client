// import { HeroSection } from "@/components/HeroSection/HeroSection";
import FeaturedProductsSection from "@/components/FeaturedProducts/FeaturedProducts";
import FAQSection from "@/components/FAQSection/FAQSection";
import Features from "../Features/Features";
export default function Home() {
  return (
    <div  className="container mx-auto">
      {/* <HeroSection /> */}
      <FeaturedProductsSection />
      <Features/>
      <FAQSection />
    </div>
  );
}
