import React, { useState } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  variant?: 'gold' | 'glass' | 'outline';
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'gold',
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isClickedWhite, setIsClickedWhite] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);
    setIsClickedWhite(true);

    // Fade white flash back to gold
    setTimeout(() => {
      setIsClickedWhite(false);
    }, 450);

    // Remove ripple from DOM after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 750);

    if (onClick) {
      onClick(e);
    }
  };

  let baseStyles =
    'relative overflow-hidden font-serif tracking-wider uppercase text-sm font-semibold transition-all duration-300 transform active:scale-95 select-none focus:outline-none';

  let variantStyles = '';
  if (variant === 'gold') {
    variantStyles = isClickedWhite
      ? 'bg-white text-[#2B1D14] shadow-[0_0_30px_rgba(255,255,255,0.8)] border border-white'
      : 'bg-gradient-to-r from-[#C68E56] via-[#E6B980] to-[#C68E56] text-[#180F0A] hover:text-[#180F0A] liquid-gold-glow liquid-gold-glow-hover border border-[#F5E6D3]/40';
  } else if (variant === 'glass') {
    variantStyles = isClickedWhite
      ? 'bg-white text-[#2B1D14] border-white'
      : 'bg-[#3E2723]/60 hover:bg-[#3E2723]/90 text-[#FFF8F0] border border-[#E6B980]/30 hover:border-[#E6B980]';
  } else {
    variantStyles = isClickedWhite
      ? 'bg-white text-[#2B1D14] border-white'
      : 'bg-transparent text-[#E6B980] border border-[#E6B980]/60 hover:bg-[#E6B980]/10 hover:border-[#E6B980]';
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className} ripple-container rounded-xl`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>

      {/* Dynamic expanding white ripple waves */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-wave"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '24px',
            height: '24px',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      ))}
    </button>
  );
};
