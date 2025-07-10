import { ChevronDown } from "lucide-react";

interface FilterSectionProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
  categories: string[];
}

export const FilterSection = ({ onCategoryChange, activeCategory, categories }: FilterSectionProps) => {
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
              <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>🌱 — vegetarian</option>
                <option>🌾 — gluten free</option>
                <option>🔥 — spicy</option>
                <option>⭐ — popular</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <label className="text-sm font-medium text-gray-700">Sort by</label>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>Default order</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Prep Time</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};