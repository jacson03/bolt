import { X, Clock, Star } from "lucide-react";
import { MenuItemType } from "@/types/menu";

interface ItemSidebarProps {
  selectedItem: MenuItemType | null;
  onClose: () => void;
}

export const ItemSidebar = ({ selectedItem, onClose }: ItemSidebarProps) => {
  if (!selectedItem) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-gold fill-current' : 'text-muted-foreground/30'}`} 
      />
    ));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-96 bg-card border-r border-border shadow-professional z-50 transform transition-transform duration-300 ease-out animate-slide-in-left">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground font-playfair">Item Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Item Image */}
            <div className="relative mb-6 rounded-xl overflow-hidden">
              {selectedItem.image ? (
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center text-6xl p-8 bg-muted/20 h-48">
                  {selectedItem.emoji}
                </div>
              )}
              {selectedItem.popular && (
                <div className="absolute top-3 right-3 bg-gold text-gold-foreground px-2 py-1 rounded-full text-xs font-bold">
                  ⭐ Popular
                </div>
              )}
            </div>

            {/* Item Name */}
            <h3 className="text-2xl font-bold text-foreground font-playfair mb-2">
              {selectedItem.name}
            </h3>

            {/* Price */}
            <div className="text-3xl font-bold text-primary mb-4 font-playfair">
              ${selectedItem.price.toFixed(2)}
            </div>

            {/* Rating and Prep Time */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(selectedItem.rating))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({selectedItem.rating}/5)
                </span>
              </div>
              {selectedItem.prepTime && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedItem.prepTime}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                Description
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Divider */}
            <div className="divider-hotel mb-6" />

            {/* Action Button */}
            <button className="w-full bg-primary text-primary-foreground rounded-lg py-3 px-4 font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-hotel">
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};