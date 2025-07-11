
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
    <header className="bg-card/80 backdrop-blur-xl shadow-luxury border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold-gradient rounded-xl shadow-gold">
              <Utensils className="h-6 w-6 text-luxury" />
            </div>
            <h1 className="text-2xl font-bold text-gold font-playfair tracking-wide">Epicurean Collection</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {categoryItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onCategoryChange(item.key)}
                className={`text-sm font-medium ${item.color} flex items-center space-x-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gold/10 border border-transparent ${
                  activeCategory === item.key ? 'font-bold bg-gold/20 border-gold/30 shadow-gold text-shimmer' : 'hover:border-gold/20'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="font-inter">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
