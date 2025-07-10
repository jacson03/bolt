
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
