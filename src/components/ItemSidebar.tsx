import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { CartItem } from "@/types/menu";

interface ItemSidebarProps {
  selectedItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const ItemSidebar = ({ selectedItems = [], onClose, onUpdateQuantity, onRemoveItem }: ItemSidebarProps) => {
  if (selectedItems.length === 0) return null;

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="w-96 bg-card border-l border-border shadow-professional h-full flex flex-col animate-slide-in-right">
      <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground font-playfair">Your Order</h2>
              <span className="text-sm text-muted-foreground">({selectedItems.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="bg-muted/20 rounded-lg p-3 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary text-primary-foreground rounded-lg py-3 px-4 font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-hotel">
              Place Order
            </button>
          </div>
      </div>
    </div>
  );
};