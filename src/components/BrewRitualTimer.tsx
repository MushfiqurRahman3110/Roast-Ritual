import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Droplets, Sparkles, CheckCircle2 } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface BrewPhase {
  timeSec: number;
  label: string;
  notes: string;
}

const ESPRESSO_PHASES: BrewPhase[] = [
  { timeSec: 5, label: 'Pre-infusion & Wetting', notes: 'Gentle 3-bar saturation of the coffee puck to eliminate channeling.' },
  { timeSec: 14, label: 'Acidic & Bright Extraction', notes: 'First golden drips emerge; high concentration of organic fruit acids and jasmine.' },
  { timeSec: 22, label: 'Sweet Body & Caramel Core', notes: 'The golden crema thickens; sugars caramelize into velvety butterscotch.' },
  { timeSec: 28, label: 'Deep Roast Balance & Cutoff', notes: 'Extraction reaches peak 20.2% yield with rich bittersweet cacao finish.' },
];

export const BrewRitualTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const totalDuration = 28; // 28s standard espresso shot

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = window.setInterval(() => {
        setSecondsElapsed((prev) => {
          if (prev >= totalDuration) {
            setIsRunning(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (!isRunning) {
      if (secondsElapsed >= totalDuration) {
        setSecondsElapsed(0);
      }
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  const progress = Math.min((secondsElapsed / totalDuration) * 100, 100);

  // Determine current active phase
  let currentPhaseIndex = 0;
  for (let i = 0; i < ESPRESSO_PHASES.length; i++) {
    if (secondsElapsed <= ESPRESSO_PHASES[i].timeSec) {
      currentPhaseIndex = i;
      break;
    }
    if (i === ESPRESSO_PHASES.length - 1) {
      currentPhaseIndex = i;
    }
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#E6B980]/30 relative overflow-hidden">
        {/* Background ambient liquid gold radial */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6B980]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Timer Visual Dial */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Circular SVG Progress Ring */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#3E2723]"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#E6B980] transition-all duration-1000 ease-linear"
                  strokeWidth="6"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Inner Center Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Dripping coffee droplet animation when running */}
                {isRunning && (
                  <div className="mb-1 animate-bounce">
                    <Droplets className="w-5 h-5 text-[#E6B980]" />
                  </div>
                )}
                <div className="font-mono text-5xl font-bold text-[#FFF8F0] tracking-tighter">
                  {secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed}
                  <span className="text-xl text-[#E6B980]">s</span>
                </div>
                <span className="text-xs font-mono text-[#F5E6D3]/60 uppercase tracking-widest mt-1">
                  / 28.0s Target
                </span>
                <span className="text-[11px] font-serif text-[#E6B980] mt-1">
                  9.2 Bar Pressure
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-4">
              <RippleButton
                onClick={toggleTimer}
                variant="gold"
                className="py-3 px-8 rounded-xl shadow-lg flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Hold Pull</span>
                  </>
                ) : secondsElapsed >= totalDuration ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Pull Again</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Initiate Pull</span>
                  </>
                )}
              </RippleButton>

              <button
                onClick={resetTimer}
                className="p-3 rounded-xl bg-[#2B1D14]/80 hover:bg-[#3E2723] text-[#F5E6D3]/70 hover:text-white border border-[#E6B980]/20 transition-all"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Extraction Stages */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E6B980]/30 bg-[#2B1D14]/60 text-[#E6B980] text-xs font-serif uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Extraction Stages</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-[#FFF8F0] mb-4">
              The 28-Second <span className="liquid-gold-text">Extraction Ritual</span>
            </h3>

            <p className="text-[#F5E6D3]/80 text-sm sm:text-base font-light mb-8 leading-relaxed">
              Every millisecond unlocks distinct aromatic volatile compounds. Experience how our baristas calibrate flow rate to isolate sweetness and velvety crema.
            </p>

            {/* Stage Cards */}
            <div className="space-y-3">
              {ESPRESSO_PHASES.map((phase, idx) => {
                const isPassed = secondsElapsed >= phase.timeSec;
                const isCurrent = currentPhaseIndex === idx && isRunning;

                return (
                  <div
                    key={phase.label}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                      isCurrent
                        ? 'bg-[#C68E56]/20 border-[#E6B980] shadow-[0_0_20px_rgba(230,185,128,0.2)]'
                        : isPassed
                        ? 'bg-[#2B1D14]/70 border-[#E6B980]/30 opacity-90'
                        : 'bg-[#180F0A]/40 border-[#E6B980]/10 opacity-50'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#E6B980]" />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-[#E6B980]/40 flex items-center justify-center text-[10px] font-mono text-[#E6B980]">
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-semibold text-sm sm:text-base text-[#FFF8F0]">
                          {phase.label}
                        </span>
                        <span className="text-xs font-mono text-[#E6B980]">
                          T+{phase.timeSec}s
                        </span>
                      </div>
                      <p className="text-xs text-[#F5E6D3]/80 font-light mt-1">
                        {phase.notes}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Result callout when finished */}
            {secondsElapsed >= totalDuration && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Extraction Complete:</strong> 36.5 grams of liquid gold harvested. Perfect crema marbling achieved.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
