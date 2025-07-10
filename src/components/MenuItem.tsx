
import { Star, Clock } from "lucide-react";
import { MenuItemType } from "@/types/menu";

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
        <div className="text-6xl">{item.emoji}</div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <span className="text-2xl font-bold text-amber-600">${item.price}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
          </div>
          {item.prepTime && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{item.prepTime}</span>
            </div>
          )}
        </div>
        {item.popular && (
          <div className="mt-3">
            <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Popular Choice
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
