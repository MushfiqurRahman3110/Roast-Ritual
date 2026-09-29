import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { SensoryLab } from './components/SensoryLab';
import { BrewRitualTimer } from './components/BrewRitualTimer';
import { RoastCraftsmanship } from './components/RoastCraftsmanship';
import { Footer } from './components/Footer';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductItem, CartItem, CustomizationOptions } from './types/coffee';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart total calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Direct "Add to Cart" with defaults
  const handleAddToCart = (product: ProductItem) => {
    const defaultCustomization: CustomizationOptions = {
      milk: product.id === 'latte' || product.id === 'mocha' ? 'Whole Milk' : 'None',
      temperature: 'Steaming Hot (68°C)',
      sweetness: 'Unsweetened (0%)',
      extraShot: false,
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.customization.milk === defaultCustomization.milk &&
          item.customization.temperature === defaultCustomization.temperature &&
          !item.customization.extraShot
      );

      if (existing) {
        return prev.map((item) =>
          item.cartId === existing.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          cartId: `${product.id}-${Date.now()}`,
          product,
          quantity: 1,
          customization: defaultCustomization,
          unitPrice: product.price,
        },
      ];
    });

    showToast(`Added ${product.title} to your Ritual Cart`);
  };

  // Direct Check Out trigger: adds to cart and immediately opens the checkout drawer
  const handleCheckOut = (product: ProductItem) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  // Customization modal confirmation
  const handleConfirmCustomization = (
    product: ProductItem,
    options: CustomizationOptions,
    finalPrice: number
  ) => {
    setCart((prev) => [
      ...prev,
      {
        cartId: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        customization: options,
        unitPrice: finalPrice,
      },
    ]);

    showToast(`Customized ${product.title} added to Ritual Cart`);
  };

  // Cart quantity actions
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="relative min-h-screen bg-[#180F0A] text-[#FFF8F0] selection:bg-[#C68E56] selection:text-[#180F0A] overflow-x-hidden">
      {/* Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Full-screen 3D Hero */}
        <HeroSection />

        {/* The Core 2x2 Glassmorphic Product Grid */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onCheckOut={handleCheckOut}
          onOpenCustomizer={(product) => setCustomizingProduct(product)}
        />

        {/* Interactive Sensory Lab */}
        <SensoryLab />

        {/* Interactive Brew Ritual Timer */}
        <BrewRitualTimer />

        {/* Roasting Craftsmanship & Heritage */}
        <RoastCraftsmanship />
      </main>

      {/* Minimalist Footer with Socials & Map Pin */}
      <Footer />

      {/* Product Customizer Modal */}
      {customizingProduct && (
        <CustomizationModal
          product={customizingProduct}
          onClose={() => setCustomizingProduct(null)}
          onConfirm={handleConfirmCustomization}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-[90vw] flex items-center gap-3 backdrop-blur-xl bg-[#2B1D14]/95 border border-[#E6B980]/50 text-[#FFF8F0] px-4 sm:px-5 py-3.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] animate-fadeIn">
          <div className="w-7 h-7 rounded-full bg-[#E6B980] flex items-center justify-center text-[#180F0A] shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="min-w-0">
            <p className="font-serif text-xs sm:text-sm font-semibold truncate">{toastMessage}</p>
            <span className="text-[10px] font-mono text-[#E6B980] flex items-center gap-1">
              <Sparkles className="w-3 h-3 shrink-0" /> Sensory Lab Order Queue
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
