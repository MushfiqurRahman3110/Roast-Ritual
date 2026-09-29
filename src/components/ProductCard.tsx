import React, { useState, useRef } from 'react';
import { ProductItem } from '../types/coffee';
import { SteamEffect } from './SteamEffect';
import { RippleButton } from './RippleButton';
import { Sparkles, SlidersHorizontal, Info, Check, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  index: number;
  onAddToCart: (product: ProductItem) => void;
  onCheckOut?: (product: ProductItem) => void;
  onOpenCustomizer: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onAddToCart,
  onCheckOut,
  onOpenCustomizer,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [showImageDesc, setShowImageDesc] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // 3D Tilt calculation (smooth mouse parallax for desktop; subtle and safe on mobile)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply heavy tilt on hover capable devices
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 7.5;
    const rotateY = ((x - centerX) / centerX) * 7.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  const handleDirectCheckOut = () => {
    if (onCheckOut) {
      onCheckOut(product);
    } else {
      handleAdd();
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transitionDelay: `${index * 60}ms`,
      }}
      className="group relative rounded-3xl glass-card overflow-hidden transition-all duration-500 will-change-transform flex flex-col justify-between border border-[#E6B980]/20 hover:border-[#E6B980]/60 shadow-xl"
    >
      {/* Liquid Gold Ambient Sheen on Top Edge */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6B980]/60 to-transparent group-hover:via-[#FFF8F0] transition-colors duration-500 z-20 pointer-events-none" />

      {/* Top Media Area with 10% Zoom & Steam Effect */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#180F0A]">
        {/* The Product Realistic Image (zooms in by 10% on hover) */}
        <img
          src={product.image}
          alt={product.imageAlt}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform select-none"
          loading="lazy"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D14] via-transparent to-black/40 pointer-events-none" />

        {/* Subtle Animated Steam Rising from the Cup */}
        <SteamEffect
          intensity={isHovered ? 1.3 : 0.85}
          className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Roast Tag & Specs */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
          <span className="backdrop-blur-md bg-black/70 border border-[#E6B980]/30 text-[#E6B980] px-3 py-1 rounded-full text-xs font-serif tracking-widest uppercase shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6B980] animate-pulse"></span>
            {product.roastLevel}
          </span>
        </div>

        {/* Visual Inspection / Image Description Toggle with minimum 44px touch target */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={() => setShowImageDesc(!showImageDesc)}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full backdrop-blur-md bg-black/60 hover:bg-[#C68E56] text-[#FFF8F0] border border-[#E6B980]/40 flex items-center justify-center transition-all shadow-md group/btn"
            title="Image details & photography notes"
            aria-label="View photographic composition details"
          >
            <Info className="w-4 h-4 text-[#E6B980] group-hover/btn:text-[#180F0A] transition-colors" />
          </button>
        </div>

        {/* Image Description Modal Tooltip */}
        {showImageDesc && (
          <div className="absolute inset-0 z-30 backdrop-blur-md bg-black/90 p-5 sm:p-6 flex flex-col justify-center text-xs text-[#FFF8F0]/90 transition-all animate-fadeIn">
            <p className="font-serif text-[#E6B980] font-semibold text-sm mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Photographic Composition:
            </p>
            <p className="italic leading-relaxed text-[#F5E6D3] text-xs sm:text-sm">
              "{product.imageDescription}"
            </p>
            <p className="mt-3 text-[11px] text-[#E6B980]/80 font-mono">
              Origin: {product.origin} • Caffeine: {product.caffeine}
            </p>
            <button
              onClick={() => setShowImageDesc(false)}
              className="mt-4 self-end text-xs text-[#E6B980] underline hover:text-white min-h-[32px] flex items-center"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Crema Gold Glimmer line at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#2B1D14] to-transparent pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between gap-4 sm:gap-5 relative z-10">
        <div>
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FFF8F0] tracking-wide group-hover:text-[#E6B980] transition-colors duration-300">
              {product.title}
            </h3>
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#E6B980] whitespace-nowrap drop-shadow-sm">
              {product.priceFormatted}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#F5E6D3]/85 text-sm sm:text-base leading-relaxed mb-3.5 font-light">
            {product.description}
          </p>

          {/* Tasting Notes Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.notes.map((note, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#3E2723]/60 border border-[#E6B980]/15 text-[#E6B980]/90 font-mono"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-[#E6B980]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Main "Add / Check Out" Button with Gold-to-White Ripple */}
          <div className="flex-1">
            <RippleButton
              onClick={handleAdd}
              variant="gold"
              className="w-full min-h-[48px] py-3.5 px-4 shadow-lg flex items-center justify-center gap-2"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800 animate-bounce" />
                  <span className="text-emerald-950 font-bold">Added to Ritual!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{product.buttonLabel}</span>
                </>
              )}
            </RippleButton>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Quick Check Out Button */}
            <button
              onClick={handleDirectCheckOut}
              className="flex-1 sm:flex-initial min-h-[48px] px-4 rounded-xl bg-[#2B1D14]/80 hover:bg-[#C68E56]/30 border border-[#E6B980]/30 text-[#FFF8F0] text-xs font-serif uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:border-[#E6B980] active:scale-95"
              title={`Quick Check Out for ${product.title}`}
            >
              <span>Check Out</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6B980]" />
            </button>

            {/* Customizer trigger (adjust milk, sweetness, temp) */}
            <button
              onClick={() => onOpenCustomizer(product)}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl backdrop-blur-md bg-[#3E2723]/70 hover:bg-[#C68E56]/40 border border-[#E6B980]/30 text-[#E6B980] hover:text-[#FFF8F0] transition-all flex items-center justify-center group/opt active:scale-95"
              title="Customize milk, temperature & roast"
              aria-label={`Customize options for ${product.title}`}
            >
              <SlidersHorizontal className="w-5 h-5 group-hover/opt:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
