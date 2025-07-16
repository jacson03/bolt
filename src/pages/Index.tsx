
import { useState, useMemo, useEffect } from "react";
import { MenuCategory } from "@/components/MenuCategory";
import { MenuHeader } from "@/components/MenuHeader";
import { HeroSection } from "@/components/HeroSection";
import { FilterSection } from "@/components/FilterSection";
import { ItemSidebar } from "@/components/ItemSidebar";
import { LoadingCard } from "@/components/LoadingCard";
import { menuData } from "@/data/menuData";
import { MenuItemType, CartItem } from "@/types/menu";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("beverages");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);

  const navigate = useNavigate();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let items = menuData[activeCategory as keyof typeof menuData] || [];
    
    // Apply search filter
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      items = items.filter(item => {
        switch (typeFilter) {
          case "popular":
            return item.popular;
          case "vegetarian":
            return item.description.toLowerCase().includes("vegetarian") || 
                   item.description.toLowerCase().includes("veggie");
          case "gluten-free":
            return item.description.toLowerCase().includes("gluten");
          case "spicy":
            return item.description.toLowerCase().includes("spicy") ||
                   item.description.toLowerCase().includes("hot");
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    const sortedItems = [...items];
    switch (sortBy) {
      case "price-low":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.rating - a.rating);
        break;
      case "prep-time":
        sortedItems.sort((a, b) => {
          const aTime = parseInt(a.prepTime?.replace(/\D/g, '') || '0');
          const bTime = parseInt(b.prepTime?.replace(/\D/g, '') || '0');
          return aTime - bTime;
        });
        break;
      default:
        // Keep original order
        break;
    }
    
    return sortedItems;
  }, [activeCategory, searchTerm, typeFilter, sortBy]);

  // New: Gather all items for global search
  const allMenuItems = useMemo(() => {
    return Object.entries(menuData).flatMap(([category, items]) =>
      (items as MenuItemType[]).map(item => ({ ...item, _category: category }))
    );
  }, []);

  // New: Filtered items for global search
  const globalSearchResults = useMemo(() => {
    if (!searchTerm) return null;
    return allMenuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allMenuItems, searchTerm]);

  const handleItemSelect = async (item: MenuItemType) => {
    setIsAddingToCart(item.id);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    setIsAddingToCart(null);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCloseSidebar = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Professional Background */}
      <div className="absolute inset-0 bg-professional-glow pointer-events-none opacity-50" />
      <div className="relative z-10 flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${cartItems.length > 0 ? 'mr-80' : ''}`}>
          <MenuHeader 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <HeroSection 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <FilterSection 
            categories={Object.keys(menuData)}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
          <div className="container mx-auto px-4 py-12">
            {isLoading ? (
              <LoadingCard message="Preparing your menu..." />
            ) : searchTerm && globalSearchResults ? (
              globalSearchResults.length === 0 ? (
                <div className="text-center text-muted-foreground text-lg py-12">No results found for "{searchTerm}".</div>
              ) : (
                <div>
                  <div className="text-xl font-bold mb-6">Search Results for "{searchTerm}"</div>
                  {/* Group results by category and render with MenuCategory */}
                  {Object.entries(
                    globalSearchResults.reduce((acc, item) => {
                      if (!acc[item._category]) acc[item._category] = [];
                      acc[item._category].push(item);
                      return acc;
                    }, {} as Record<string, typeof allMenuItems>)
                  ).map(([category, items]) => (
                    <div key={category} className="mb-10">
                      <div className="text-lg font-semibold mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1')}</div>
                      <MenuCategory 
                        category={category}
                        items={items}
                        onItemSelect={handleItemSelect}
                        isAddingToCart={isAddingToCart}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <MenuCategory 
                category={activeCategory}
                items={filteredAndSortedItems}
                onItemSelect={handleItemSelect}
                isAddingToCart={isAddingToCart}
              />
            )}
          </div>
        </div>
        {/* Sidebar */}
        {cartItems.length > 0 && (
          <div className="fixed right-0 top-0 h-full z-[100]">
            <ItemSidebar 
              selectedItems={cartItems}
              onClose={handleCloseSidebar}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
