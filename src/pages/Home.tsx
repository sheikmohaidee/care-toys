import { Hero } from "@/components/home/Hero";
import { PromoGrid } from "@/components/home/PromoGrid";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { BenefitBar } from "@/components/home/BenefitBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <PromoGrid />
      <CategoryHighlights />
      <FeaturedProducts />
      <BrandStory />
      <NewsletterSection />
      <BenefitBar />
    </>
  );
}
