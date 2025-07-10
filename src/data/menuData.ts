
import { MenuData } from "@/types/menu";

// Import food images
import artisanCoffeeImg from "@/assets/artisan-coffee.jpg";
import orangeJuiceImg from "@/assets/orange-juice.jpg";
import greenTeaLatteImg from "@/assets/green-tea-latte.jpg";
import grilledSalmonImg from "@/assets/grilled-salmon.jpg";
import ribeyesteakImg from "@/assets/ribeye-steak.jpg";
import chickenParmesanImg from "@/assets/chicken-parmesan.jpg";
import truffleFriesImg from "@/assets/truffle-fries.jpg";
import loadedNachosImg from "@/assets/loaded-nachos.jpg";
import chickenWingsImg from "@/assets/chicken-wings.jpg";
import avocadoToastImg from "@/assets/avocado-toast.jpg";
import chocolateLavaCakeImg from "@/assets/chocolate-lava-cake.jpg";
import cremeBruleeImg from "@/assets/creme-brulee.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";
import bruschettaImg from "@/assets/bruschetta.jpg";
import calamariRingsImg from "@/assets/calamari-rings.jpg";
import shrimpCocktailImg from "@/assets/shrimp-cocktail.jpg";

export const menuData: MenuData = {
  beverages: [
    {
      id: "bev-1",
      name: "Artisan Coffee",
      description: "Freshly roasted single-origin beans with rich, bold flavor and smooth finish",
      price: 4.50,
      emoji: "☕",
      image: artisanCoffeeImg,
      rating: 4.8,
      prepTime: "3 min",
      popular: true
    },
    {
      id: "bev-2",
      name: "Fresh Orange Juice",
      description: "Squeezed daily from premium Valencia oranges, packed with vitamin C",
      price: 3.25,
      emoji: "🍊",
      image: orangeJuiceImg,
      rating: 4.6,
      prepTime: "2 min"
    },
    {
      id: "bev-3",
      name: "Green Tea Latte",
      description: "Ceremonial grade matcha blended with steamed milk and honey",
      price: 5.75,
      emoji: "🍵",
      image: greenTeaLatteImg,
      rating: 4.7,
      prepTime: "4 min"
    },
    {
      id: "bev-4",
      name: "Craft Beer",
      description: "Local brewery's signature IPA with citrus notes and hoppy finish",
      price: 6.00,
      emoji: "🍺",
      rating: 4.5,
      prepTime: "1 min"
    },
    {
      id: "bev-5",
      name: "Smoothie Bowl",
      description: "Blended acai, banana, and berries topped with granola and coconut",
      price: 8.50,
      emoji: "🥤",
      rating: 4.9,
      prepTime: "5 min",
      popular: true
    },
    {
      id: "bev-6",
      name: "Sparkling Water",
      description: "Premium mineral water with natural bubbles and a hint of lime",
      price: 2.75,
      emoji: "💧",
      rating: 4.3,
      prepTime: "1 min"
    }
  ],
  mainDishes: [
    {
      id: "main-1",
      name: "Grilled Salmon",
      description: "Atlantic salmon with herb crust, served with roasted vegetables and quinoa",
      price: 24.99,
      emoji: "🐟",
      image: grilledSalmonImg,
      rating: 4.9,
      prepTime: "18 min",
      popular: true
    },
    {
      id: "main-2",
      name: "Ribeye Steak",
      description: "12oz prime cut with garlic mashed potatoes and seasonal greens",
      price: 32.99,
      emoji: "🥩",
      image: ribeyesteakImg,
      rating: 4.8,
      prepTime: "25 min"
    },
    {
      id: "main-3",
      name: "Chicken Parmesan",
      description: "Breaded chicken breast with marinara sauce, mozzarella, and pasta",
      price: 19.99,
      emoji: "🍗",
      image: chickenParmesanImg,
      rating: 4.7,
      prepTime: "20 min"
    },
    {
      id: "main-4",
      name: "Vegetable Curry",
      description: "Coconut curry with seasonal vegetables, served over jasmine rice",
      price: 16.99,
      emoji: "🍛",
      rating: 4.6,
      prepTime: "15 min"
    },
    {
      id: "main-5",
      name: "Fish Tacos",
      description: "Grilled white fish with cabbage slaw, avocado, and lime crema",
      price: 18.99,
      emoji: "🌮",
      rating: 4.8,
      prepTime: "12 min",
      popular: true
    },
    {
      id: "main-6",
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan",
      price: 21.99,
      emoji: "🍄",
      rating: 4.7,
      prepTime: "22 min"
    }
  ],
  snacks: [
    {
      id: "snack-1",
      name: "Truffle Fries",
      description: "Crispy golden fries with truffle oil, parmesan, and fresh herbs",
      price: 8.99,
      emoji: "🍟",
      image: truffleFriesImg,
      rating: 4.8,
      prepTime: "8 min",
      popular: true
    },
    {
      id: "snack-2",
      name: "Loaded Nachos",
      description: "Tortilla chips with cheese, jalapeños, guacamole, and sour cream",
      price: 12.99,
      emoji: "🧀",
      image: loadedNachosImg,
      rating: 4.6,
      prepTime: "10 min"
    },
    {
      id: "snack-3",
      name: "Chicken Wings",
      description: "Buffalo wings with celery sticks and blue cheese dipping sauce",
      price: 11.99,
      emoji: "🍗",
      image: chickenWingsImg,
      rating: 4.7,
      prepTime: "12 min"
    },
    {
      id: "snack-4",
      name: "Avocado Toast",
      description: "Sourdough bread with smashed avocado, cherry tomatoes, and hemp seeds",
      price: 9.99,
      emoji: "🥑",
      image: avocadoToastImg,
      rating: 4.5,
      prepTime: "5 min"
    },
    {
      id: "snack-5",
      name: "Pretzel Bites",
      description: "Warm soft pretzel pieces with honey mustard and cheese sauce",
      price: 7.99,
      emoji: "🥨",
      rating: 4.4,
      prepTime: "6 min"
    },
    {
      id: "snack-6",
      name: "Hummus Plate",
      description: "House-made hummus with pita bread, olives, and fresh vegetables",
      price: 10.99,
      emoji: "🫘",
      rating: 4.6,
      prepTime: "3 min"
    }
  ],
  desserts: [
    {
      id: "dessert-1",
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      emoji: "🍫",
      image: chocolateLavaCakeImg,
      rating: 4.9,
      prepTime: "8 min",
      popular: true
    },
    {
      id: "dessert-2",
      name: "Crème Brûlée",
      description: "Classic French custard with caramelized sugar crust and fresh berries",
      price: 7.99,
      emoji: "🍮",
      image: cremeBruleeImg,
      rating: 4.8,
      prepTime: "5 min"
    },
    {
      id: "dessert-3",
      name: "Tiramisu",
      description: "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 9.99,
      emoji: "🧁",
      image: tiramisuImg,
      rating: 4.7,
      prepTime: "3 min"
    },
    {
      id: "dessert-4",
      name: "Fresh Fruit Tart",
      description: "Buttery pastry shell with pastry cream and seasonal fresh fruits",
      price: 6.99,
      emoji: "🍓",
      rating: 4.6,
      prepTime: "2 min"
    },
    {
      id: "dessert-5",
      name: "Ice Cream Sundae",
      description: "Three scoops with hot fudge, whipped cream, nuts, and cherry",
      price: 5.99,
      emoji: "🍨",
      rating: 4.5,
      prepTime: "3 min"
    },
    {
      id: "dessert-6",
      name: "Cheesecake",
      description: "New York style cheesecake with graham crust and berry compote",
      price: 8.99,
      emoji: "🍰",
      rating: 4.8,
      prepTime: "2 min",
      popular: true
    }
  ],
  appetizers: [
    {
      id: "app-1",
      name: "Bruschetta",
      description: "Grilled bread topped with fresh tomatoes, basil, and balsamic glaze",
      price: 9.99,
      emoji: "🍅",
      image: bruschettaImg,
      rating: 4.7,
      prepTime: "5 min"
    },
    {
      id: "app-2",
      name: "Calamari Rings",
      description: "Crispy fried squid rings with marinara sauce and lemon wedges",
      price: 12.99,
      emoji: "🦑",
      image: calamariRingsImg,
      rating: 4.6,
      prepTime: "8 min",
      popular: true
    },
    {
      id: "app-3",
      name: "Stuffed Mushrooms",
      description: "Button mushrooms filled with herbs, breadcrumbs, and cheese",
      price: 10.99,
      emoji: "🍄",
      rating: 4.5,
      prepTime: "10 min"
    },
    {
      id: "app-4",
      name: "Shrimp Cocktail",
      description: "Chilled jumbo shrimp with cocktail sauce and lemon",
      price: 14.99,
      emoji: "🍤",
      image: shrimpCocktailImg,
      rating: 4.8,
      prepTime: "3 min"
    },
    {
      id: "app-5",
      name: "Spinach Artichoke Dip",
      description: "Creamy hot dip served with tortilla chips and bread",
      price: 11.99,
      emoji: "🥬",
      rating: 4.7,
      prepTime: "6 min"
    },
    {
      id: "app-6",
      name: "Meatballs",
      description: "Italian-style meatballs in marinara sauce with fresh herbs",
      price: 13.99,
      emoji: "🍝",
      rating: 4.6,
      prepTime: "7 min"
    }
  ]
};
