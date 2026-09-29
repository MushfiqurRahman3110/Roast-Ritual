import React, { useState } from 'react';
import { ProductItem, CustomizationOptions } from '../types/coffee';
import { X, Check, Sparkles, Coffee } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface CustomizationModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onConfirm: (product: ProductItem, options: CustomizationOptions, finalPrice: number) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  product,
  onClose,
  onConfirm,
}) => {
  const [milk, setMilk] = useState<CustomizationOptions['milk']>('Whole Milk');
  const [temperature, setTemperature] = useState<CustomizationOptions['temperature']>('Steaming Hot (68°C)');
  const [sweetness, setSweetness] = useState<CustomizationOptions['sweetness']>('Unsweetened (0%)');
  const [extraShot, setExtraShot] = useState<boolean>(false);

  if (!product) return null;

  // Calculate price adjustments
  let calculatedPrice = product.price;
  if (milk.includes('+ $0.75')) calculatedPrice += 0.75;
  if (milk.includes('+ $1.00')) calculatedPrice += 1.0;
  if (extraShot) calculatedPrice += 1.0;

  const handleConfirm = () => {
    onConfirm(
      product,
      {
        milk,
        temperature,
        sweetness,
        extraShot,
      },
      calculatedPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl glass-card border border-[#E6B980]/40 p-5 sm:p-8 shadow-2xl overflow-hidden text-[#FFF8F0] max-h-[92vh] flex flex-col justify-between">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E6B980] to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6B980]/20 mb-4 sm:mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C68E56]/20 border border-[#E6B980]/30 flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5 text-[#E6B980]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF8F0]">
                Customize {product.title}
              </h3>
              <p className="text-xs text-[#E6B980] font-mono">
                Artisanal Barista Specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 text-[#F5E6D3]/70 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Stack */}
        <div className="space-y-5 overflow-y-auto pr-1 flex-1">
          {/* Temperature */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#E6B980] mb-2">
              Temperature Ritual
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {(
                ['Steaming Hot (68°C)', 'Iced Crema (Over Crystal Ice)'] as const
              ).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setTemperature(temp)}
                  className={`min-h-[44px] p-3 rounded-xl text-xs font-medium border text-left transition-all active:scale-98 ${
                    temperature === temp
                      ? 'bg-[#C68E56] text-[#FFF8F0] border-[#E6B980] shadow-md'
                      : 'bg-[#2B1D14]/60 border-[#E6B980]/20 text-[#F5E6D3]/70 hover:border-[#E6B980]/50'
                  }`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Selection */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#E6B980] mb-2">
              Microfoam &amp; Milk Base
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  'Whole Milk',
                  'Oat Milk (+ $0.75)',
                  'Almond Milk (+ $0.75)',
                  'Macadamia Milk (+ $1.00)',
                  'None',
                ] as const
              ).map((m) => (
                <button
                  key={m}
                  onClick={() => setMilk(m)}
                  className={`min-h-[44px] p-2.5 sm:p-3 rounded-xl text-xs border text-left transition-all flex items-center justify-between active:scale-98 ${
                    milk === m
                      ? 'bg-[#C68E56]/40 border-[#E6B980] text-[#FFF8F0] font-semibold'
                      : 'bg-[#2B1D14]/50 border-[#E6B980]/15 text-[#F5E6D3]/70 hover:border-[#E6B980]/40'
                  }`}
                >
                  <span>{m}</span>
                  {milk === m && <Check className="w-4 h-4 text-[#E6B980]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#E6B980] mb-2">
              Sweetness Balance
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  'Unsweetened (0%)',
                  'Subtle Golden Crema (25%)',
                  'Caramel Silk (50%)',
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setSweetness(s)}
                  className={`min-h-[44px] p-2 rounded-xl text-[11px] border text-center transition-all flex flex-col justify-center items-center active:scale-98 ${
                    sweetness === s
                      ? 'bg-[#C68E56] text-[#FFF8F0] border-[#E6B980] font-semibold'
                      : 'bg-[#2B1D14]/50 border-[#E6B980]/20 text-[#F5E6D3]/70 hover:border-[#E6B980]/40'
                  }`}
                >
                  <span>{s.split(' ')[0]}</span>
                  <span className="block text-[10px] opacity-75">{s.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Espresso Shot */}
          <div className="pt-1">
            <button
              onClick={() => setExtraShot(!extraShot)}
              className={`w-full min-h-[48px] p-3 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all active:scale-98 ${
                extraShot
                  ? 'bg-[#C68E56]/30 border-[#E6B980] text-[#FFF8F0]'
                  : 'bg-[#2B1D14]/40 border-[#E6B980]/20 text-[#F5E6D3]/70 hover:border-[#E6B980]/40'
              }`}
            >
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-4 h-4 text-[#E6B980]" />
                <span className="text-xs sm:text-sm font-serif font-medium">
                  Extra Golden Espresso Shot (+ $1.00)
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  extraShot ? 'bg-[#E6B980] border-[#E6B980]' : 'border-[#E6B980]/40'
                }`}
              >
                {extraShot && <Check className="w-3.5 h-3.5 text-[#180F0A] stroke-[3]" />}
              </div>
            </button>
          </div>
        </div>

        {/* Bottom CTA with Updated Price and min 48px touch target */}
        <div className="mt-5 pt-4 border-t border-[#E6B980]/20 flex items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[11px] font-mono text-[#F5E6D3]/60 uppercase block">
              Adjusted Total
            </span>
            <span className="text-2xl font-serif font-bold text-[#E6B980]">
              ${calculatedPrice.toFixed(2)}
            </span>
          </div>

          <RippleButton
            onClick={handleConfirm}
            variant="gold"
            className="min-h-[48px] py-3 px-6 shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confirm &amp; Add</span>
          </RippleButton>
        </div>
      </div>
    </div>
  );
};
