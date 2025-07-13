
export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  image?: string;
  rating: number;
  prepTime?: string;
  popular?: boolean;
}

export interface CartItem extends MenuItemType {
  quantity: number;
}

export interface MenuData {
  beverages: MenuItemType[];
  mainDishes: MenuItemType[];
  snacks: MenuItemType[];
  desserts: MenuItemType[];
  appetizers: MenuItemType[];
}
