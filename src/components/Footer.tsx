import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, Check, Coffee } from 'lucide-react';
import { RippleButton } from './RippleButton';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="visit" className="relative bg-[#140C07] border-t border-[#E6B980]/20 text-[#FFF8F0] pt-20 pb-12 overflow-hidden select-none">
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-[#C68E56]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Column Luxury Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-[#E6B980]/15">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C68E56]/30 border border-[#E6B980]/40 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#E6B980]" />
              </div>
              <span className="font-serif font-black text-2xl tracking-tight text-[#FFF8F0]">
                ROAST <span className="text-[#E6B980]">&amp;</span> RITUAL
              </span>
            </div>

            <p className="text-[#F5E6D3]/75 text-sm font-light leading-relaxed max-w-sm mb-6">
              A sensory sanctuary dedicated to the pursuit of coffee extraction perfection. Built on the tenets of radical transparency, micro-lot reverence, and precision liquid alchemy.
            </p>

            {/* Social Links with min 44x44px touch targets */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#visit"
                aria-label="Instagram"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#2B1D14]/60 hover:bg-[#C68E56]/20 border border-[#E6B980]/20 hover:border-[#E6B980] text-[#E6B980] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Spotify */}
              <a
                href="#visit"
                aria-label="Spotify Soundscape"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#2B1D14]/60 hover:bg-[#C68E56]/20 border border-[#E6B980]/20 hover:border-[#E6B980] text-[#E6B980] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.487 17.31c-.216.353-.675.467-1.028.25-2.825-1.726-6.38-2.116-10.57-1.16-.402.093-.807-.16-.899-.563-.092-.403.16-.807.562-.9 4.587-1.047 8.528-.601 11.685 1.345.353.216.467.675.25 1.028zm1.464-3.253c-.272.443-.852.585-1.295.313-3.235-1.988-8.167-2.564-11.993-1.402-.497.151-1.024-.134-1.175-.63-.151-.497.134-1.025.63-1.176 4.373-1.328 9.81-.684 13.52 1.6 443.272.585.852.313 1.295zm.125-3.385c-3.878-2.302-10.28-2.514-13.99-1.388-.595.18-1.226-.16-1.406-.755-.18-.595.16-1.226.755-1.406 4.263-1.294 11.332-1.048 15.807 1.609.535.318.71 1.012.392 1.547-.318.536-1.011.711-1.558.393z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#visit"
                aria-label="YouTube"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#2B1D14]/60 hover:bg-[#C68E56]/20 border border-[#E6B980]/20 hover:border-[#E6B980] text-[#E6B980] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#visit"
                aria-label="X Twitter"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#2B1D14]/60 hover:bg-[#C68E56]/20 border border-[#E6B980]/20 hover:border-[#E6B980] text-[#E6B980] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sanctuary Location & Map Pin */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#E6B980] mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E6B980]" />
              <span>The Sanctuary</span>
            </h4>

            <div className="text-sm text-[#F5E6D3]/80 space-y-2 font-light">
              <p className="font-medium text-[#FFF8F0]">742 Ritual Blvd, Soho District</p>
              <p>New York, NY 10012</p>
              <p className="text-xs text-[#E6B980] font-mono pt-1">
                Subway: Prince St / Spring St
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E6B980]/10 text-xs text-[#F5E6D3]/70 space-y-1.5 font-light">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E6B980]" />
                <span>Mon – Fri: 06:30 – 19:30</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span>Sat – Sun: 07:30 – 20:30</span>
              </div>
            </div>
          </div>

          {/* Sensory Journal Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#E6B980] mb-3">
              The Sensory Dispatch
            </h4>
            <p className="text-xs text-[#F5E6D3]/70 font-light leading-relaxed mb-4">
              Receive private invitations to seasonal single-origin releases, cupping sessions, and extraction journals.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Welcome to the Ritual Circle. Your first cupping guide is dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full min-h-[44px] bg-[#180F0A] border border-[#E6B980]/30 rounded-xl px-4 py-3 text-xs text-[#FFF8F0] placeholder-[#F5E6D3]/30 focus:outline-none focus:border-[#E6B980] transition-colors"
                  />
                </div>
                <RippleButton
                  variant="gold"
                  className="w-full min-h-[44px] py-3 text-xs tracking-wider flex items-center justify-center gap-1.5 font-bold"
                >
                  <span>Subscribe to Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </RippleButton>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Minimalist Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5E6D3]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} Roast &amp; Ritual Inc. All sensory rights reserved.</p>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <a href="#" className="hover:text-[#E6B980] transition-colors py-1 min-h-[32px] flex items-center">
              Privacy Protocol
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#E6B980] transition-colors py-1 min-h-[32px] flex items-center">
              Terms of Extraction
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#E6B980] transition-colors py-1 min-h-[32px] flex items-center">
              Ethical Sourcing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
