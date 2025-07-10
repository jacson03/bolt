
export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  rating: number;
  prepTime?: string;
  popular?: boolean;
}

export interface MenuData {
  beverages: MenuItemType[];
  mainDishes: MenuItemType[];
  snacks: MenuItemType[];
  desserts: MenuItemType[];
  appetizers: MenuItemType[];
}
