import React, { useState } from 'react';
import { Gauge, Sparkles, Sliders, Thermometer, Wind, Award } from 'lucide-react';

interface FlavorNote {
  name: string;
  category: string;
  intensity: number;
  color: string;
  desc: string;
}

const FLAVOR_NOTES: FlavorNote[] = [
  {
    name: 'Liquid Caramel',
    category: 'Sugar Browning',
    intensity: 94,
    color: '#E6B980',
    desc: 'Dense, buttery sweetness developed during slow first-crack roasting.',
  },
  {
    name: 'Dark Valrhona Cacao',
    category: 'Deep Roast',
    intensity: 88,
    color: '#8A5230',
    desc: 'Rich, velvety bittersweet finish that lingers across the mid-palate.',
  },
  {
    name: 'Wild Jasmine Bloom',
    category: 'Floral Aromatics',
    intensity: 78,
    color: '#F5E6D3',
    desc: 'Subtle ethereal white floral aromatics extracted at high altitudes.',
  },
  {
    name: 'Bergamot & Citrus Zest',
    category: 'Clean Acidity',
    intensity: 72,
    color: '#FFD166',
    desc: 'Crisp phosphoric brightness harmonizing the espresso crema.',
  },
  {
    name: 'Smoked Cedarwood',
    category: 'Earthy & Spice',
    intensity: 65,
    color: '#9C6635',
    desc: 'Deep balsamic resonance reminiscent of aged bourbon oak barrels.',
  },
];

export const SensoryLab: React.FC = () => {
  // Extraction parameters
  const [temp, setTemp] = useState<number>(93.5);
  const [pressure, setPressure] = useState<number>(9.2);
  const [ratio, setRatio] = useState<number>(2.0);
  const [selectedNote, setSelectedNote] = useState<FlavorNote>(FLAVOR_NOTES[0]);

  // Dynamic calculated sensory outcomes
  const tds = (1.45 + (temp - 90) * 0.08 + (pressure - 9) * 0.06).toFixed(2);
  const yieldPct = (19.2 + (temp - 92) * 0.45 + (ratio - 2) * 1.5).toFixed(1);

  const getProfileVerdict = () => {
    if (temp > 94.5) return 'Deep Dark & Intense Roast Resonance';
    if (temp < 91.5) return 'Crisp Bright Fruity Acidity';
    if (pressure > 9.8) return 'Heavy Viscous Syrupy Crema';
    return 'Optimal Golden Extraction & Balanced Sweetness';
  };

  const handleSliderChange = (setter: (v: number) => void, val: number) => {
    setter(val);
  };

  return (
    <section id="sensory-lab" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C68E56]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6B980]/30 bg-[#2B1D14]/70 backdrop-blur-md mb-4 text-[#E6B980] text-xs font-serif tracking-widest uppercase">
          <Sliders className="w-3.5 h-3.5" />
          <span>Sensory Engineering</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-serif text-[#FFF8F0] tracking-tight mb-4">
          The Ritual <span className="liquid-gold-text">Extraction Lab</span>
        </h2>

        <p className="text-[#F5E6D3]/80 text-base sm:text-lg font-light leading-relaxed">
          Coffee is organic chemistry calibrated to perfection. Explore how water temperature, hydraulic bar pressure, and extraction curves alter the sensory profile of liquid gold.
        </p>
      </div>

      {/* Interactive 2-Column Lab Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Extraction Alchemist Controls */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-[#E6B980]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6B980]/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C68E56]/20 border border-[#E6B980]/30 flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-[#E6B980]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#FFF8F0]">
                    Hydraulic &amp; Thermal Calibration
                  </h3>
                  <span className="text-xs text-[#F5E6D3]/60 font-mono">
                    Dial in real-time espresso variables
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                ACTIVE LAB
              </span>
            </div>

            {/* Slider 1: Temperature */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="font-serif text-[#FFF8F0] flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#E6B980]" />
                  Brew Water Temperature
                </span>
                <span className="font-mono text-[#E6B980] font-bold text-base">
                  {temp.toFixed(1)}°C
                </span>
              </div>
              <input
                type="range"
                min="89.0"
                max="96.5"
                step="0.1"
                value={temp}
                onChange={(e) => handleSliderChange(setTemp, parseFloat(e.target.value))}
                className="w-full accent-[#C68E56] bg-[#180F0A] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#F5E6D3]/50 mt-1">
                <span>89.0°C (Floral &amp; Acidic)</span>
                <span>93.5°C (Gold Standard)</span>
                <span>96.5°C (Heavy Roast)</span>
              </div>
            </div>

            {/* Slider 2: Pressure */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="font-serif text-[#FFF8F0] flex items-center gap-2">
                  <Wind className="w-4 h-4 text-[#E6B980]" />
                  Pump Extraction Pressure
                </span>
                <span className="font-mono text-[#E6B980] font-bold text-base">
                  {pressure.toFixed(1)} Bar
                </span>
              </div>
              <input
                type="range"
                min="6.0"
                max="11.0"
                step="0.1"
                value={pressure}
                onChange={(e) => handleSliderChange(setPressure, parseFloat(e.target.value))}
                className="w-full accent-[#C68E56] bg-[#180F0A] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#F5E6D3]/50 mt-1">
                <span>6.0 Bar (Gentle Infusion)</span>
                <span>9.2 Bar (Crema Peak)</span>
                <span>11.0 Bar (Ultra Dense)</span>
              </div>
            </div>

            {/* Slider 3: Brew Ratio */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="font-serif text-[#FFF8F0] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E6B980]" />
                  Liquid Yield Ratio
                </span>
                <span className="font-mono text-[#E6B980] font-bold text-base">
                  1 : {ratio.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="1.50"
                max="2.80"
                step="0.05"
                value={ratio}
                onChange={(e) => handleSliderChange(setRatio, parseFloat(e.target.value))}
                className="w-full accent-[#C68E56] bg-[#180F0A] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#F5E6D3]/50 mt-1">
                <span>1:1.50 (Ristretto)</span>
                <span>1:2.05 (Normale Standard)</span>
                <span>1:2.80 (Lungo)</span>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#180F0A]/80 border border-[#E6B980]/20 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-serif tracking-widest text-[#E6B980]">
                Extraction Synthesis Output
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Extraction Yield: {yieldPct}%
              </span>
            </div>

            <div className="text-lg font-serif text-[#FFF8F0] font-medium mb-3">
              {getProfileVerdict()}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E6B980]/10 text-xs">
              <div>
                <span className="text-[#F5E6D3]/60 block">Total Dissolved Solids:</span>
                <span className="font-mono text-[#E6B980] font-bold text-sm">
                  {tds}% TDS
                </span>
              </div>
              <div>
                <span className="text-[#F5E6D3]/60 block">Optimal Cup Temperature:</span>
                <span className="font-mono text-[#E6B980] font-bold text-sm">
                  65.0°C – 68.0°C
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Aroma Wheel & Flavor Exploration */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-[#E6B980]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E6B980]/15">
              <div className="w-10 h-10 rounded-xl bg-[#C68E56]/20 border border-[#E6B980]/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#E6B980]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#FFF8F0]">
                  Sensory Flavor Matrix
                </h3>
                <span className="text-xs text-[#F5E6D3]/60 font-mono">
                  Select a dominant tasting accord
                </span>
              </div>
            </div>

            {/* Note buttons */}
            <div className="flex flex-col gap-2.5 mb-6">
              {FLAVOR_NOTES.map((note) => {
                const isSelected = selectedNote.name === note.name;
                return (
                  <button
                    key={note.name}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                    className={`p-3 rounded-xl text-left transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#3E2723]/90 border-[#E6B980] shadow-md transform translate-x-1.5'
                        : 'bg-[#2B1D14]/40 border-[#E6B980]/15 hover:border-[#E6B980]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: note.color }}
                      />
                      <div>
                        <div className="font-serif text-sm font-medium text-[#FFF8F0]">
                          {note.name}
                        </div>
                        <span className="text-[10px] font-mono text-[#F5E6D3]/60">
                          {note.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#E6B980]">
                        {note.intensity}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Note Spotlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#3E2723]/80 to-[#2B1D14]/90 border border-[#E6B980]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wider text-[#E6B980] uppercase">
                Aroma Spectrum Analysis
              </span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedNote.color }}
              />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#FFF8F0] mb-2">
              {selectedNote.name}
            </h4>
            <p className="text-xs sm:text-sm text-[#F5E6D3]/80 font-light leading-relaxed">
              {selectedNote.desc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E6B980]/15 flex items-center justify-between text-xs text-[#E6B980]">
              <span className="font-mono">Sensorily verified by Q-Grader #841</span>
              <Sparkles className="w-4 h-4 text-[#E6B980]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
