
import { useState } from "react";
import { MenuCategory } from "@/components/MenuCategory";
import { MenuHeader } from "@/components/MenuHeader";
import { CategoryNav } from "@/components/CategoryNav";
import { menuData } from "@/data/menuData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("beverages");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      <MenuHeader />
      <div className="container mx-auto px-4 py-8">
        <CategoryNav 
          categories={Object.keys(menuData)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <MenuCategory 
          category={activeCategory}
          items={menuData[activeCategory as keyof typeof menuData]}
        />
      </div>
    </div>
  );
};

export default Index;
