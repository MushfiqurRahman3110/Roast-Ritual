import React, { useState } from 'react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { ChevronDown, Sparkles, Compass, Coffee } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [active3DPreset, setActive3DPreset] = useState<'cup' | 'beans'>('cup');

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSensory = () => {
    const sensoryElement = document.getElementById('sensory-lab');
    if (sensoryElement) {
      sensoryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPreset = (preset: 'cup' | 'beans') => {
    setActive3DPreset(preset);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none">
      {/* Background 3D Scene (Floating rotating porcelain cup + 3D Coffee Beans with cleft + volumetric steam & embers) */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas3D
          preset={active3DPreset}
          onPresetChange={setActive3DPreset}
        />
      </div>

      {/* Atmospheric vignette & radial gradient to ensure high readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#180F0A]/40 to-[#180F0A]/85 pointer-events-none z-1" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#180F0A]/90 to-transparent pointer-events-none z-1" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#180F0A] via-[#180F0A]/80 to-transparent pointer-events-none z-1" />

      {/* Foreground Hero Narrative Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 flex flex-col items-center justify-center">
        {/* Established Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E6B980]/30 bg-[#2B1D14]/70 backdrop-blur-md mb-6 shadow-xl animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#E6B980] animate-pulse"></span>
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#E6B980]">
            Artisanal Roastery &amp; Sensory Laboratory
          </span>
        </div>

        {/* Main Required Headline: "Awaken Your Senses." */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-extrabold text-[#FFF8F0] tracking-tight leading-[1.08] mb-6 drop-shadow-2xl">
          Awaken Your <br className="hidden sm:inline" />
          <span className="liquid-gold-text">Senses.</span>
        </h1>

        {/* Brand Narrative */}
        <p className="max-w-2xl text-base sm:text-xl text-[#F5E6D3]/90 font-light leading-relaxed mb-8 drop-shadow-md px-2">
          Where the alchemy of liquid gold meets dark roast devotion. Extracted at 93.5°C under 9.2 bars of pure precision to unearth notes of honey, cacao, and wild jasmine.
        </p>

        {/* 3D Scene View Switcher (Option A vs Option B) with minimum 44px touch targets */}
        <div className="mb-9 inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#2B1D14]/85 backdrop-blur-md border border-[#E6B980]/30 shadow-2xl gap-1">
          <span className="text-[11px] font-serif uppercase tracking-widest text-[#E6B980]/80 px-3 hidden sm:inline">
            3D Scene:
          </span>
          <button
            onClick={() => handleSelectPreset('cup')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-2 active:scale-95 ${
              active3DPreset === 'cup'
                ? 'bg-gradient-to-r from-[#C68E56] to-[#E6B980] text-[#180F0A] shadow-md font-bold'
                : 'text-[#F5E6D3]/70 hover:text-[#FFF8F0]'
            }`}
            aria-label="View Option A: Floating Porcelain Cup & Steam"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Option A: Floating Cup</span>
          </button>
          <button
            onClick={() => handleSelectPreset('beans')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-2 active:scale-95 ${
              active3DPreset === 'beans'
                ? 'bg-gradient-to-r from-[#C68E56] to-[#E6B980] text-[#180F0A] shadow-md font-bold'
                : 'text-[#F5E6D3]/70 hover:text-[#FFF8F0]'
            }`}
            aria-label="View Option B: 3D Coffee Bean Constellation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Option B: 3D Coffee Bean</span>
          </button>
        </div>

        {/* Call to Actions with minimum 48px touch targets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md mx-auto">
          {/* Main "View Menu" Button with Liquid-Gold Glow on Hover */}
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto min-h-[48px] relative group overflow-hidden px-9 py-4 rounded-2xl font-serif text-sm font-bold tracking-widest uppercase text-[#180F0A] bg-gradient-to-r from-[#C68E56] via-[#E6B980] to-[#C68E56] shadow-[0_0_25px_rgba(230,185,128,0.4)] hover:shadow-[0_0_40px_rgba(230,185,128,0.7),0_0_20px_rgba(198,142,86,0.9)] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-[#FFF8F0]/40 flex items-center justify-center"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full shimmer-gold opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 fill-[#180F0A]" />
              <span>View Menu</span>
            </span>
          </button>

          {/* Secondary "Sensory Lab" Button */}
          <button
            onClick={scrollToSensory}
            className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-2xl font-serif text-sm font-semibold tracking-widest uppercase text-[#F5E6D3] backdrop-blur-md bg-[#2B1D14]/70 hover:bg-[#3E2723]/80 border border-[#E6B980]/30 hover:border-[#E6B980] transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#E6B980] group-hover:rotate-45 transition-transform duration-500" />
            <span>Sensory Lab</span>
          </button>
        </div>

        {/* Key Sensory Metrics Strip */}
        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-8 max-w-xl mx-auto w-full pt-8 border-t border-[#E6B980]/15">
          <div className="text-center">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-[#E6B980]">
              2,100<span className="text-sm font-sans">m</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#F5E6D3]/60 uppercase tracking-wider">
              Cloud Elevation
            </span>
          </div>

          <div className="text-center border-x border-[#E6B980]/15">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-[#E6B980]">
              93.5<span className="text-sm font-sans">°C</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#F5E6D3]/60 uppercase tracking-wider">
              Exact Thermal
            </span>
          </div>

          <div className="text-center">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-[#E6B980]">
              91<span className="text-sm font-sans">+</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#F5E6D3]/60 uppercase tracking-wider">
              Q-Grade Sensory
            </span>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none opacity-80">
        <span className="text-[10px] font-serif tracking-[0.2em] text-[#E6B980] uppercase">
          Explore The Ritual
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#E6B980]/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-[#E6B980] animate-bounce" />
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[#E6B980] animate-pulse" />
      </div>
    </section>
  );
};
