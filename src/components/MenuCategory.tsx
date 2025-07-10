
import { MenuItem } from "@/components/MenuItem";
import { MenuItemType } from "@/types/menu";

interface MenuCategoryProps {
  category: string;
  items: MenuItemType[];
}

const categoryTitles: { [key: string]: string } = {
  beverages: "Refreshing Beverages",
  mainDishes: "Signature Main Dishes",
  snacks: "Delicious Snacks",
  desserts: "Sweet Desserts",
  appetizers: "Tempting Appetizers"
};

export const MenuCategory = ({ category, items }: MenuCategoryProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        {categoryTitles[category] || category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
