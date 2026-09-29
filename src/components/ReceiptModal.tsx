import React from 'react';
import { CartItem } from '../types/coffee';
import { CheckCircle, X } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface ReceiptModalProps {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  orderNumber,
  items,
  subtotal,
  tax,
  total,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#22160E] border border-[#E6B980]/40 p-6 sm:p-8 shadow-2xl text-[#FFF8F0] overflow-hidden">
        {/* Golden top decorative bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C68E56] via-[#E6B980] to-[#C68E56]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-[#F5E6D3]/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center pt-2 pb-6 border-b border-[#E6B980]/20">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E6B980]/20 border border-[#E6B980] flex items-center justify-center text-[#E6B980] shadow-[0_0_20px_rgba(230,185,128,0.4)]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E6B980]">
            Ritual Order Confirmed
          </span>
          <h3 className="font-serif text-2xl font-bold mt-1 text-[#FFF8F0]">
            Extraction In Progress
          </h3>
          <p className="text-xs text-[#F5E6D3]/70 mt-1 font-mono">
            Order Reference: #{orderNumber}
          </p>
        </div>

        {/* Pickup Details */}
        <div className="my-5 p-3.5 rounded-2xl bg-[#180F0A]/60 border border-[#E6B980]/20 flex items-center justify-between text-xs">
          <div>
            <span className="text-[#F5E6D3]/60 block font-mono">Estimated Ready:</span>
            <span className="font-serif text-[#E6B980] font-semibold text-sm">
              In 6 – 8 Minutes
            </span>
          </div>
          <div className="text-right">
            <span className="text-[#F5E6D3]/60 block font-mono">Pickup Counter:</span>
            <span className="font-serif text-[#FFF8F0] font-semibold text-sm">
              SoHo Ritual Bar #1
            </span>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="space-y-3 max-h-48 overflow-y-auto pr-1 text-xs">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="flex justify-between items-start py-2 border-b border-[#E6B980]/10"
            >
              <div>
                <span className="font-serif font-medium text-[#FFF8F0] text-sm">
                  {item.quantity}x {item.product.title}
                </span>
                <p className="text-[11px] text-[#F5E6D3]/60 mt-0.5">
                  {item.customization.temperature.split(' ')[0]} • {item.customization.milk.split(' (')[0]}
                  {item.customization.extraShot && ' • +1 Shot'}
                </p>
              </div>
              <span className="font-mono text-[#E6B980] font-semibold">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 pt-3 border-t border-[#E6B980]/20 space-y-1.5 text-xs">
          <div className="flex justify-between text-[#F5E6D3]/70 font-mono">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#F5E6D3]/70 font-mono">
            <span>Sensory Sourcing Tax (8.875%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-serif font-bold text-base text-[#E6B980] pt-2 border-t border-[#E6B980]/15">
            <span>Total Paid</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Barcode & Download Footer */}
        <div className="mt-6 pt-4 border-t border-[#E6B980]/20 flex flex-col items-center gap-3">
          <div className="font-mono tracking-[0.4em] text-xs text-[#E6B980]/60">
            ||||| | |||| || |||||| | |||||
          </div>
          <RippleButton
            onClick={onClose}
            variant="gold"
            className="w-full py-3 text-xs tracking-wider font-semibold"
          >
            Return to Sanctuary
          </RippleButton>
        </div>
      </div>
    </div>
  );
};
