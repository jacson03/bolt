
import { Clock, Star, Plus } from "lucide-react";
import { MenuItemType } from "@/types/menu";

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem = ({ item }: MenuItemProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="aspect-square bg-gray-50 overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center text-6xl p-8 group-hover:bg-gray-100 transition-colors h-full">
            {item.emoji}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          {item.popular && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
              Popular
            </span>
          )}
        </div>
        
        <div className="flex items-center mb-3">
          {renderStars(Math.floor(item.rating))}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{item.prepTime}</span>
          </div>
          <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            🌱
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </div>
          
          <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
