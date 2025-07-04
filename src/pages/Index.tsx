import { Layout } from "@/components/Layout";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedItemsSection } from "@/components/sections/FeaturedItemsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { db } from "@/firebase";
import { categories, DonationItem } from "@/lib/data";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [featuredItems, setFeaturedItems] = useState<DonationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    const fetchFeaturedItems = async () => {
      try {
        setIsLoading(true);
        const itemsRef = collection(db, "bens");
        const q = query(itemsRef, where("status", "==", "available"));
        const snapshot = await getDocs(q);

        const items: DonationItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            condition: data.condition,
            imageUrl: data.imageUrl,
            location: data.location,
            pickupDates: data.pickupDates,
            pickupTimes: data.pickupTimes,
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            interests: data.interests,
            userId: data.userId,
          });
        });

        setFeaturedItems(items.slice(0, 3));
      } catch (err) {
        toast("Erro ao carregar os itens.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

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
