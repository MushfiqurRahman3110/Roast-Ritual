import React, { useEffect, useRef } from 'react';

interface SteamEffectProps {
  intensity?: number;
  className?: string;
}

export const SteamEffect: React.FC<SteamEffectProps> = ({
  intensity = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    // Resize listener
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface SteamParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
      turbulencePhase: number;
      swaySpeed: number;
    }

    const particles: SteamParticle[] = [];
    const maxParticles = Math.floor(35 * intensity);

    const createParticle = (): SteamParticle => {
      // Spawn near the bottom center (where the coffee cup opening is)
      const centerX = width * 0.5 + (Math.random() - 0.5) * (width * 0.28);
      const startY = height * 0.72 + (Math.random() - 0.5) * 15;
      const maxLife = 90 + Math.random() * 80;

      return {
        x: centerX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.7 + Math.random() * 0.9),
        radius: 8 + Math.random() * 8,
        maxRadius: 38 + Math.random() * 25,
        alpha: 0,
        maxAlpha: 0.16 + Math.random() * 0.14,
        life: 0,
        maxLife,
        turbulencePhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.025 + Math.random() * 0.025,
      };
    };

    // Prepopulate
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      p.y -= (p.life / p.maxLife) * (height * 0.6);
      p.radius += (p.life / p.maxLife) * 20;
      particles.push(p);
    }

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Add new particles if needed
      while (particles.length < maxParticles) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.turbulencePhase += p.swaySpeed;

        // Fluid motion: drift up, sway horizontally with sine wave
        p.y += p.vy;
        p.x += Math.sin(p.turbulencePhase) * 0.5 + p.vx;

        // Radius grows as it expands in the air
        const progress = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;

        // Alpha envelope: fade in quickly, fade out gracefully
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        // Draw soft misty steam puff
        if (p.alpha > 0.005) {
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            currentRadius
          );
          grad.addColorStop(0, `rgba(245, 230, 211, ${p.alpha})`);
          grad.addColorStop(0.4, `rgba(230, 185, 128, ${p.alpha * 0.45})`);
          grad.addColorStop(0.8, `rgba(210, 180, 150, ${p.alpha * 0.15})`);
          grad.addColorStop(1, 'rgba(198, 142, 86, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Remove dead particles
        if (p.life >= p.maxLife || p.y < 0) {
          particles.splice(i, 1);
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none mix-blend-screen z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
