
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedItemsSection } from "@/components/sections/FeaturedItemsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CTASection } from "@/components/sections/CTASection";
import { categories, mockDonationItems } from "@/lib/data";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter only available items for display
  const featuredItems = mockDonationItems
    .filter(item => item.status === "available")
    .slice(0, 3);
  
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection categories={categories} isLoaded={isLoaded} />
      <FeaturedItemsSection items={featuredItems} isLoaded={isLoaded} />
      <HowItWorksSection isLoaded={isLoaded} />
      <CTASection />
    </Layout>
  );
};

export default Index;
