import React, { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../types/coffee';
import { ProductCard } from './ProductCard';
import { Coffee, Flame, Droplets, Sparkles } from 'lucide-react';

export const CORE_PRODUCTS: ProductItem[] = [
  {
    id: 'mocha',
    title: 'Mocha',
    price: 5.5,
    priceFormatted: '$5.50',
    buttonLabel: 'Add Mocha - $5.50',
    description: 'A seductive blend of rich espresso and velvety dark chocolate.',
    image: '/images/mocha.jpg',
    imageAlt: 'Layered mocha in glass mug with whipped cream and cocoa dust',
    imageDescription:
      'A glass mug showing layers of dark chocolate and espresso, topped with a swirl of whipped cream and cocoa dust.',
    notes: ['Valrhona Cacao', 'Creamy Vanilla', 'Dark Espresso'],
    roastLevel: 'Dark Espresso',
    origin: 'Huila, Colombia & Ecuador Cacao',
    caffeine: '150mg',
  },
  {
    id: 'latte',
    title: 'Latte',
    price: 4.5,
    priceFormatted: '$4.50',
    buttonLabel: 'Add Latte - $4.50',
    description:
      'Smooth steamed milk poured over a double shot of our signature roast.',
    image: '/images/latte.jpg',
    imageAlt: 'Rosetta latte art in ceramic cup on saucer',
    imageDescription:
      'A wide ceramic cup with intricate Rosetta latte art in the foam, sitting on a saucer.',
    notes: ['Velvet Microfoam', 'Toasted Hazelnut', 'Caramelized Sugar'],
    roastLevel: 'Medium-Dark',
    origin: 'Yirgacheffe, Ethiopia',
    caffeine: '140mg',
  },
  {
    id: 'americano',
    title: 'Americano',
    price: 3.5,
    priceFormatted: '$3.50',
    buttonLabel: 'Add Americano - $3.50',
    description:
      'Pure, bold, and unadulterated. Espresso diluted with hot water for a robust kick.',
    image: '/images/americano.jpg',
    imageAlt: 'Americano in glass cup with golden crema',
    imageDescription:
      'A clear glass cup showing the deep black liquid with a thin layer of golden crema, ice cubes optional.',
    notes: ['Shimmering Crema', 'Smoked Oak', 'Dark Cherry Crisp'],
    roastLevel: 'Medium',
    origin: 'Antigua, Guatemala',
    caffeine: '160mg',
  },
  {
    id: 'espresso',
    title: 'Espresso',
    price: 3.0,
    priceFormatted: '$3.00',
    buttonLabel: 'Add Espresso - $3.00',
    description:
      'The pure essence of the bean. Intense, aromatic, and perfectly extracted.',
    image: '/images/espresso.jpg',
    imageAlt: 'Espresso demitasse cup with thick golden crema and coffee beans',
    imageDescription:
      'A small, white demitasse cup on a saucer, filled with a thick, honey-colored crema, with coffee beans scattered on the table.',
    notes: ['Honey-Colored Crema', 'Bergamot Zest', 'Bittersweet Molasses'],
    roastLevel: 'Golden Reserve',
    origin: 'Sidamo, Ethiopia (91 PTS)',
    caffeine: '75mg (Single Shot)',
  },
];

interface ProductGridProps {
  onAddToCart: (product: ProductItem) => void;
  onCheckOut?: (product: ProductItem) => void;
  onOpenCustomizer: (product: ProductItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onAddToCart,
  onCheckOut,
  onOpenCustomizer,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'milk' | 'pure'>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredProducts = CORE_PRODUCTS.filter((prod) => {
    if (filter === 'milk') return prod.id === 'mocha' || prod.id === 'latte';
    if (filter === 'pure') return prod.id === 'americano' || prod.id === 'espresso';
    return true;
  });

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Ambient background glow behind the grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-tr from-[#C68E56]/10 via-[#E6B980]/8 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6B980]/30 bg-[#2B1D14]/70 backdrop-blur-md mb-4 text-[#E6B980] text-xs font-serif tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Core Collection</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FFF8F0] tracking-tight leading-tight mb-6">
          Liquid Gold &amp; <span className="liquid-gold-text">Deep Roast</span>
        </h2>

        <p className="text-[#F5E6D3]/80 text-base sm:text-lg font-light leading-relaxed">
          Each cup is an unhurried communion of temperature, atmospheric pressure, and the world’s most coveted high-altitude micro-lots.
        </p>

        {/* Sensory Category Filter Pill */}
        <div className="mt-8 inline-flex p-1 rounded-2xl bg-[#2B1D14]/80 backdrop-blur-md border border-[#E6B980]/20 shadow-inner">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#C68E56] text-[#FFF8F0] shadow-md'
                : 'text-[#F5E6D3]/60 hover:text-[#FFF8F0]'
            }`}
          >
            All Rituals (4)
          </button>
          <button
            onClick={() => setFilter('milk')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              filter === 'milk'
                ? 'bg-[#C68E56] text-[#FFF8F0] shadow-md'
                : 'text-[#F5E6D3]/60 hover:text-[#FFF8F0]'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            Velvet &amp; Milk
          </button>
          <button
            onClick={() => setFilter('pure')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              filter === 'pure'
                ? 'bg-[#C68E56] text-[#FFF8F0] shadow-md'
                : 'text-[#F5E6D3]/60 hover:text-[#FFF8F0]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Pure Extraction
          </button>
        </div>
      </div>

      {/* The 2x2 Glassmorphism Product Grid with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProducts.map((product, idx) => (
          <div
            key={product.id}
            className={`transition-all duration-700 transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-16'
            }`}
            style={{
              transitionDelay: `${idx * 160 + 200}ms`,
            }}
          >
            <ProductCard
              product={product}
              index={idx}
              onAddToCart={onAddToCart}
              onCheckOut={onCheckOut}
              onOpenCustomizer={onOpenCustomizer}
            />
          </div>
        ))}
      </div>

      {/* Bottom Guarantee Banner */}
      <div
        className={`mt-16 p-6 rounded-2xl glass-card border border-[#E6B980]/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C68E56]/20 border border-[#E6B980]/40 flex items-center justify-center shrink-0">
            <Coffee className="w-6 h-6 text-[#E6B980]" />
          </div>
          <div>
            <h4 className="font-serif text-[#FFF8F0] font-semibold text-base">
              Sensory Guarantee &amp; Precision Extraction
            </h4>
            <p className="text-xs text-[#F5E6D3]/70 font-light mt-0.5">
              Every shot is pulled within 14 days of roasting, ground on titanium flat burrs.
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <span className="text-xs font-mono text-[#E6B980] tracking-wider uppercase block">
            House Extraction Standard
          </span>
          <span className="font-serif text-sm text-[#FFF8F0]">
            93.5°C • 9.2 Bar • 1:2.05 Ratio
          </span>
        </div>
      </div>
    </section>
  );
};
