// import { HeroSection } from "@/components/HeroSection/HeroSection";
// import BestSellingSection from "@/components/BestSellingSection/BestSellingSection";
// import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import FeaturedProductsSection from "@/components/FeaturedProducts/FeaturedProducts";
// import UniqueSection from "@/components/UniqueSection/UniqueSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import Features from "../Features/Features";
export default function Home() {
  return (
    <div  className="container mx-auto">
      {/* <HeroSection /> */}
      {/* <BestSellingSection />
      <CategoriesSection/> */}
      <FeaturedProductsSection />
      {/* <UniqueSection /> */}
      <Features/>
      <FAQSection />
    </div>
  );
}
