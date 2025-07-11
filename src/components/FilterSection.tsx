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
    <div className="bg-white border-b py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <div className="relative">
              <select 
                value={activeCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryNames[category] || category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <div className="relative">
              <select 
                value={typeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Items</option>
                <option value="vegetarian">🌱 — Vegetarian</option>
                <option value="gluten-free">🌾 — Gluten Free</option>
                <option value="spicy">🔥 — Spicy</option>
                <option value="popular">⭐ — Popular</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <label className="text-sm font-medium text-gray-700">Sort by</label>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="default">Default Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="prep-time">Prep Time</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};