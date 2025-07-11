
import { useState } from "react";
import { MenuCategory } from "@/components/MenuCategory";
import { MenuHeader } from "@/components/MenuHeader";
import { HeroSection } from "@/components/HeroSection";
import { FilterSection } from "@/components/FilterSection";
import { menuData } from "@/data/menuData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("beverages");

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHeader 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <HeroSection />
      <FilterSection 
        categories={Object.keys(menuData)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="container mx-auto px-4 py-8">
        <MenuCategory 
          category={activeCategory}
          items={menuData[activeCategory as keyof typeof menuData]}
        />
      </div>
    </div>
  );
};

export default Index;
