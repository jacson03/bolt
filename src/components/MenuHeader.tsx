
import { Utensils } from "lucide-react";

interface MenuHeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const MenuHeader = ({ activeCategory, onCategoryChange }: MenuHeaderProps) => {
  const categoryItems = [
    { key: "beverages", emoji: "🥤", label: "Beverages", color: "text-orange-600 hover:text-orange-700" },
    { key: "mainDishes", emoji: "🍽️", label: "Main Dishes", color: "text-green-600 hover:text-green-700" },
    { key: "snacks", emoji: "🍿", label: "Snacks", color: "text-blue-600 hover:text-blue-700" },
    { key: "desserts", emoji: "🍰", label: "Desserts", color: "text-pink-600 hover:text-pink-700" },
    { key: "appetizers", emoji: "🥗", label: "Appetizers", color: "text-purple-600 hover:text-purple-700" }
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Restaurant Menu</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            {categoryItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onCategoryChange(item.key)}
                className={`text-sm font-medium ${item.color} flex items-center space-x-1 transition-colors ${
                  activeCategory === item.key ? 'font-bold' : ''
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
