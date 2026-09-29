import React from 'react';
import { Flame, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export const RoastCraftsmanship: React.FC = () => {
  return (
    <section id="heritage" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Image with Glass Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden glass-card border border-[#E6B980]/30 shadow-2xl group">
            {/* Liquid gold accent corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E6B980]/30 to-transparent pointer-events-none z-10" />

            <img
              src="/images/coffee-roaster.jpg"
              alt="Artisanal copper coffee roaster with glowing amber coils"
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#180F0A] via-transparent to-black/30 pointer-events-none" />

            {/* Floating Roaster Specs Badge */}
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-[#2B1D14]/85 border border-[#E6B980]/30 rounded-2xl p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C68E56]/30 border border-[#E6B980]/40 flex items-center justify-center text-[#E6B980]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#FFF8F0]">
                    Cast Iron &amp; Copper Fluid-Bed
                  </h4>
                  <span className="text-[11px] font-mono text-[#E6B980]">
                    Convective airflow • Zero contact scorch
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#F5E6D3]/60 hidden sm:inline">
                Batch: #084
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Philosophy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6B980]/30 bg-[#2B1D14]/70 backdrop-blur-md mb-6 text-[#E6B980] text-xs font-serif tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>The Roast &amp; Ritual Philosophy</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif text-[#FFF8F0] tracking-tight leading-tight mb-6">
            Where Science Yields to <span className="liquid-gold-text">Sacred Ceremony</span>
          </h2>

          <p className="text-[#F5E6D3]/85 text-base sm:text-lg font-light leading-relaxed mb-6">
            We reject mass commodification. At Roast &amp; Ritual, coffee beans are treated as fragile botanical gems. Grown under shaded volcanic canopies at elevations exceeding 2,000 meters, our harvest undergoes precise fermentation before entering our custom copper roaster.
          </p>

          <p className="text-[#F5E6D3]/75 text-sm sm:text-base font-light leading-relaxed mb-8">
            By mapping thermocouple telemetry second-by-second through the drying, Maillard, and development phases, we preserve volatile aromatics that traditional commercial roasters incinerate into charcoal.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E6B980]/15">
            <div className="p-4 rounded-xl bg-[#2B1D14]/50 border border-[#E6B980]/15">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#E6B980]" />
                <h4 className="font-serif font-bold text-sm text-[#FFF8F0]">
                  Direct Trade Micro-Lots
                </h4>
              </div>
              <p className="text-xs text-[#F5E6D3]/70 font-light leading-relaxed">
                Paying 320% above Fair Trade minimums directly to multi-generational family estates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#2B1D14]/50 border border-[#E6B980]/15">
              <div className="flex items-center gap-2.5 mb-2">
                <Sparkles className="w-4 h-4 text-[#E6B980]" />
                <h4 className="font-serif font-bold text-sm text-[#FFF8F0]">
                  Triple-Degassed Rest
                </h4>
              </div>
              <p className="text-xs text-[#F5E6D3]/70 font-light leading-relaxed">
                Rested in dark nitrogen chambers for precisely 7 days before meeting your cup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
