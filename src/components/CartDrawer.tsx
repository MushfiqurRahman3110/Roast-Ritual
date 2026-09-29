import React, { useState } from 'react';
import { CartItem } from '../types/coffee';
import { X, Plus, Minus, Trash2, Sparkles, Coffee, ArrowRight } from 'lucide-react';
import { RippleButton } from './RippleButton';
import confetti from 'canvas-confetti';
import { ReceiptModal } from './ReceiptModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
  } | null>(null);

  if (!isOpen && !completedOrder) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Fire golden confetti
    try {
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#E6B980', '#C68E56', '#F5E6D3', '#FFFFFF', '#FFD166'],
      });
    } catch {
      // Ignore
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();

    setCompletedOrder({
      orderNumber,
      items: [...items],
      subtotal,
      tax,
      total,
    });

    onClearCart();
  };

  return (
    <>
      {/* Sliding Drawer */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
          <div className="w-full sm:w-screen sm:max-w-md bg-[#22160E] border-l border-[#E6B980]/30 shadow-2xl flex flex-col justify-between text-[#FFF8F0] relative">
            {/* Ambient Gold Edge */}
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#E6B980]/80 to-transparent pointer-events-none" />

            {/* Top Bar */}
            <div className="p-5 sm:p-6 border-b border-[#E6B980]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C68E56]/20 border border-[#E6B980]/30 flex items-center justify-center shrink-0">
                  <Coffee className="w-5 h-5 text-[#E6B980]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF8F0]">
                    Your Ritual Cart
                  </h3>
                  <span className="text-xs font-mono text-[#E6B980]">
                    {items.length} {items.length === 1 ? 'Creation' : 'Creations'} Selected
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 text-[#F5E6D3]/70 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#F5E6D3]/60">
                  <div className="w-16 h-16 rounded-full border border-[#E6B980]/20 bg-[#2B1D14]/60 flex items-center justify-center mb-4 text-[#E6B980]">
                    <Coffee className="w-8 h-8 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg text-[#FFF8F0] mb-1">
                    Your Chalice is Empty
                  </h4>
                  <p className="text-xs max-w-xs leading-relaxed">
                    Select one of our four core artisanal rituals above to begin your sensory extraction.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-4 rounded-2xl glass-card border border-[#E6B980]/20 flex items-start gap-3.5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E6B980]/30"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-[#FFF8F0] truncate">
                          {item.product.title}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-[#E6B980] ml-2">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#F5E6D3]/70 font-light mt-0.5">
                        {item.customization.temperature.split(' ')[0]} • {item.customization.milk.split(' (')[0]}
                        {item.customization.extraShot && ' • +1 Shot'}
                      </p>

                      {/* Quantity Controls with minimum 44px touch targets */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E6B980]/10">
                        <div className="flex items-center gap-2 bg-[#180F0A]/80 rounded-xl p-1 border border-[#E6B980]/20">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center hover:bg-white/10 text-[#F5E6D3] active:scale-95"
                            aria-label={`Decrease quantity of ${item.product.title}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono px-2 font-bold text-[#FFF8F0]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center hover:bg-white/10 text-[#F5E6D3] active:scale-95"
                            aria-label={`Increase quantity of ${item.product.title}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="min-w-[44px] min-h-[44px] text-[#F5E6D3]/50 hover:text-red-400 p-2 transition-colors flex items-center justify-center"
                          title="Remove item"
                          aria-label={`Remove ${item.product.title} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout Section with min 48px touch target */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-[#E6B980]/20 bg-[#180F0A]/95 space-y-4 shrink-0">
                <div className="space-y-1.5 text-xs text-[#F5E6D3]/80">
                  <div className="flex justify-between font-mono">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Estimated Tax (8.875%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#FFF8F0] pt-2 border-t border-[#E6B980]/15">
                    <span>Order Total</span>
                    <span className="text-[#E6B980]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <RippleButton
                  onClick={handleCheckout}
                  variant="gold"
                  className="w-full min-h-[48px] py-4 rounded-xl flex items-center justify-center gap-2 shadow-2xl font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Check Out Ritual • ${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </RippleButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed Order Receipt Modal */}
      {completedOrder && (
        <ReceiptModal
          orderNumber={completedOrder.orderNumber}
          items={completedOrder.items}
          subtotal={completedOrder.subtotal}
          tax={completedOrder.tax}
          total={completedOrder.total}
          onClose={() => {
            setCompletedOrder(null);
            onClose();
          }}
        />
      )}
    </>
  );
};
