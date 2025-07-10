
import { Utensils } from "lucide-react";

export const MenuHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Restaurant Menu</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#beverages" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center space-x-1">
              <span>🥤</span>
              <span>Beverages</span>
            </a>
            <a href="#mainDishes" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center space-x-1">
              <span>🍽️</span>
              <span>Main Dishes</span>
            </a>
            <a href="#snacks" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <span>🍿</span>
              <span>Snacks</span>
            </a>
            <a href="#desserts" className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center space-x-1">
              <span>🍰</span>
              <span>Desserts</span>
            </a>
            <a href="#appetizers" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center space-x-1">
              <span>🥗</span>
              <span>Appetizers</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
