
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryLabels: { [key: string]: string } = {
  beverages: "Beverages",
  mainDishes: "Main Dishes",
  snacks: "Snacks",
  desserts: "Desserts",
  appetizers: "Appetizers"
};

export const CategoryNav = ({ categories, activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105",
              activeCategory === category
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
            )}
          >
            {categoryLabels[category] || category}
          </button>
        ))}
      </div>
    </nav>
  );
};
