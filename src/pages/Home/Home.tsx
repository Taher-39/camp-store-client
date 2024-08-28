import { HeroSection } from "@/components/HeroSection/HeroSection";
import BestSellingSection from "@/components/BestSellingSection/BestSellingSection";
import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import FeaturedProductsSection from "@/components/FeaturedProducts/FeaturedProducts";
import UniqueSection from "@/components/UniqueSection/UniqueSection";
import FAQSection from "@/components/FAQSection/FAQSection";
export default function Home() {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <BestSellingSection />
      <CategoriesSection/>
      <FeaturedProductsSection />
      <UniqueSection />
      <FAQSection />
    </div>
  );
}
