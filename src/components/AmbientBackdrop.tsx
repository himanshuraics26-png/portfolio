import { useEffect, useRef } from 'react';

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: 'violet' | 'cyan' | 'white';
}

export function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let animId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particleCount = Math.min(72, Math.max(36, Math.floor(width / 24)));
    const hues: Array<StarParticle['hue']> = ['violet', 'cyan', 'white'];
    const particles: StarParticle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.08 - Math.random() * 0.22,
      radius: 0.7 + Math.random() * 1.4,
      alpha: 0.22 + Math.random() * 0.55,
      hue: hues[i % 3],
    }));

    const colorMap: Record<StarParticle['hue'], string> = {
      violet: '208, 188, 255',
      cyan: '76, 215, 246',
      white: '248, 250, 252',
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorMap[p.hue]}, ${p.alpha})`;
        ctx.fill();
      }
    };

    drawFrame();

    if (!prefersReducedMotion) {
      let lastTime = 0;
      const loop = (now: number) => {
        if (now - lastTime >= 32) {
          lastTime = now;
          drawFrame();
        }
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070814]"
    >
      {/* Primary deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(139, 92, 246, 0.22), transparent 70%), radial-gradient(ellipse 65% 50% at 88% 18%, rgba(6, 182, 212, 0.16), transparent 65%), radial-gradient(ellipse 70% 55% at 12% 62%, rgba(168, 85, 247, 0.14), transparent 70%), radial-gradient(ellipse 75% 50% at 82% 88%, rgba(34, 211, 238, 0.11), transparent 70%)',
        }}
      />

      {/* Subtle architectural perspective grid horizon */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 35%, black 15%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 35%, black 15%, transparent 80%)',
        }}
      />

      {/* Floating ambient starlight dust */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-85" />
    </div>
  );
}
