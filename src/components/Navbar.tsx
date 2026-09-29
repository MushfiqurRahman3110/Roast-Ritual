import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Core', href: '#menu' },
    { label: 'Extraction Lab', href: '#sensory-lab' },
    { label: 'Craft & Roast', href: '#heritage' },
    { label: 'Visit Roastery', href: '#visit' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#180F0A]/95 backdrop-blur-md border-b border-[#E6B980]/20 py-3 shadow-2xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer select-none py-1 min-h-[44px]"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C68E56] to-[#3E2723] p-[1px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#180F0A] rounded-[11px] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#E6B980] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[#FFF8F0] block leading-none">
              ROAST <span className="text-[#E6B980]">&amp;</span> RITUAL
            </span>
            <span className="text-[9px] font-mono tracking-[0.28em] text-[#F5E6D3]/60 uppercase block">
              Liquid Gold Roastery
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs font-serif uppercase tracking-widest text-[#F5E6D3]/80 hover:text-[#E6B980] transition-colors relative group py-2 min-h-[44px] flex items-center"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#E6B980] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="min-h-[44px] px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C68E56] to-[#E6B980] text-[#180F0A] font-serif text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg liquid-gold-glow hover:shadow-[0_0_25px_rgba(230,185,128,0.6)] transition-all transform hover:-translate-y-0.5 active:scale-95"
            aria-label="View ritual shopping cart"
          >
            <ShoppingBag className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Ritual Cart</span>
            {cartCount > 0 ? (
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="bg-[#180F0A] text-[#FFF8F0] text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
                <span className="hidden lg:inline text-[11px] font-mono font-bold text-[#180F0A]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="bg-[#180F0A]/20 text-[#180F0A] text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                0
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger with 44px min touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#2B1D14]/70 border border-[#E6B980]/25 text-[#F5E6D3] flex items-center justify-center hover:border-[#E6B980] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#180F0A]/98 backdrop-blur-xl border-b border-[#E6B980]/20 px-6 py-6 animate-fadeIn shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-serif text-base uppercase tracking-wider text-[#F5E6D3] hover:text-[#E6B980] py-3.5 border-b border-[#E6B980]/10 flex items-center justify-between min-h-[48px]"
              >
                <span>{link.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#E6B980]/50" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
