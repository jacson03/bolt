
import { useState, useMemo } from "react";
import { MenuCategory } from "@/components/MenuCategory";
import { MenuHeader } from "@/components/MenuHeader";
import { HeroSection } from "@/components/HeroSection";
import { FilterSection } from "@/components/FilterSection";
import { menuData } from "@/data/menuData";
import { MenuItemType } from "@/types/menu";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("beverages");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSortedItems = useMemo(() => {
    let items = menuData[activeCategory as keyof typeof menuData] || [];
    
    // Apply search filter
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      items = items.filter(item => {
        switch (typeFilter) {
          case "popular":
            return item.popular;
          case "vegetarian":
            return item.description.toLowerCase().includes("vegetarian") || 
                   item.description.toLowerCase().includes("veggie");
          case "gluten-free":
            return item.description.toLowerCase().includes("gluten");
          case "spicy":
            return item.description.toLowerCase().includes("spicy") ||
                   item.description.toLowerCase().includes("hot");
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    const sortedItems = [...items];
    switch (sortBy) {
      case "price-low":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.rating - a.rating);
        break;
      case "prep-time":
        sortedItems.sort((a, b) => {
          const aTime = parseInt(a.prepTime?.replace(/\D/g, '') || '0');
          const bTime = parseInt(b.prepTime?.replace(/\D/g, '') || '0');
          return aTime - bTime;
        });
        break;
      default:
        // Keep original order
        break;
    }
    
    return sortedItems;
  }, [activeCategory, searchTerm, typeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Clean Professional Background */
      <div className="absolute inset-0 bg-professional-glow pointer-events-none opacity-50" />
      <div className="relative z-10">
        <MenuHeader 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <HeroSection 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <FilterSection 
          categories={Object.keys(menuData)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
        <div className="container mx-auto px-4 py-12">
          <MenuCategory 
            category={activeCategory}
            items={filteredAndSortedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
