import { ChevronDown } from "lucide-react";

interface FilterSectionProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
  categories: string[];
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export const FilterSection = ({ 
  onCategoryChange, 
  activeCategory, 
  categories,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange
}: FilterSectionProps) => {
  const categoryNames: { [key: string]: string } = {
    beverages: "Beverages",
    mainDishes: "Main Dishes", 
    snacks: "Snacks",
    desserts: "Desserts",
    appetizers: "Appetizers"
  };

  return (
    <div className="bg-card/60 backdrop-blur-xl border-b border-gold/20 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gold font-inter tracking-wide">Category</label>
            <div className="relative">
              <select 
                value={activeCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none bg-card/40 backdrop-blur-sm border border-gold/20 rounded-xl px-6 py-3 pr-12 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/40 transition-all duration-300 shadow-pearl hover:shadow-gold"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-card text-foreground">
                    {categoryNames[category] || category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/60 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gold font-inter tracking-wide">Type</label>
            <div className="relative">
              <select 
                value={typeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="appearance-none bg-card/40 backdrop-blur-sm border border-gold/20 rounded-xl px-6 py-3 pr-12 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/40 transition-all duration-300 shadow-pearl hover:shadow-gold"
              >
                <option value="all" className="bg-card text-foreground">All Items</option>
                <option value="vegetarian" className="bg-card text-foreground">🌱 — Vegetarian</option>
                <option value="gluten-free" className="bg-card text-foreground">🌾 — Gluten Free</option>
                <option value="spicy" className="bg-card text-foreground">🔥 — Spicy</option>
                <option value="popular" className="bg-card text-foreground">⭐ — Popular</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/60 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <label className="text-sm font-semibold text-gold font-inter tracking-wide">Sort by</label>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="appearance-none bg-card/40 backdrop-blur-sm border border-gold/20 rounded-xl px-6 py-3 pr-12 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/40 transition-all duration-300 shadow-pearl hover:shadow-gold"
              >
                <option value="default" className="bg-card text-foreground">Default Order</option>
                <option value="price-low" className="bg-card text-foreground">Price: Low to High</option>
                <option value="price-high" className="bg-card text-foreground">Price: High to Low</option>
                <option value="rating" className="bg-card text-foreground">Rating</option>
                <option value="prep-time" className="bg-card text-foreground">Prep Time</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/60 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};