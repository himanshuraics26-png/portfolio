import { useState } from 'react';
import { Compass, Layers, Sparkles } from 'lucide-react';
import { ABOUT_PILLARS, PROFILE } from '../data/portfolioData';

const PILLAR_ICONS = {
  architecture: Layers,
  engineering: Compass,
  spatial: Sparkles,
} as const;

export function AboutSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
          01. About Me
        </p>
        <h2
          className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ textWrap: 'balance' }}
        >
          Bridging visual intuition and precision frontend engineering.
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Creative Portrait Column */}
        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-white/12 bg-[#0c0d19] shadow-[0_0_50px_-16px_rgba(139,92,246,0.35)]">
            {!imgFailed ? (
              <img
                src={PROFILE.portraitUrl}
                alt={`Studio portrait of ${PROFILE.name}, Creative UI/UX Designer and Frontend Developer`}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center bg-gradient-to-br from-[#1a1b27] via-[#0b0e23] to-[#070814] p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 font-display text-2xl font-bold text-[#d0bcff]">
                  HR
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-white">
                  {PROFILE.name}
                </p>
                <p className="mt-1 text-sm text-[#958ea0]">{PROFILE.role}</p>
              </div>
            )}

            {/* Subtle edge vignette + measured bottom contrast scrim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15"
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, transparent 52%, rgba(7, 8, 20, 0.42) 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070814]/95 via-[#070814]/60 to-transparent p-6 pt-20">
              <p className="font-display text-lg font-semibold text-white">
                {PROFILE.name}
              </p>
              <p className="mt-0.5 text-sm text-[#cbc3d7]">
                {PROFILE.location} · {PROFILE.availability}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Introduction + Glassmorphism Pillars */}
        <div className="flex flex-col justify-between gap-8 lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white">
              Crafting digital spaces people want to linger in.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#cbc3d7]">
              I am a Computer Science undergraduate and multidisciplinary designer-developer obsessed
              with how typography, spatial depth, and micro-interactions shape human perception
              online. Rather than treating design and engineering as separate handoff stages, I
              prototype directly in Figma and React to preserve every nuance of rhythm, contrast,
              and motion.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#cbc3d7]">
              Outside client work and product sprints, I explore real-time WebGL shaders, dark-mode
              accessibility architecture, spatial audio interfaces, and minimalist industrial
              design.
            </p>
          </div>

          {/* 3 Glassmorphism Discipline Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ABOUT_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] || Layers;
              return (
                <article
                  key={pillar.id}
                  className="glass-panel glass-panel-interactive flex flex-col justify-between rounded-2xl p-5"
                >
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[#4cd7f6]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h4 className="mt-4 font-display text-base font-semibold text-white">
                      {pillar.title}
                    </h4>
                    <p className="mt-1.5 text-xs font-medium text-[#d0bcff]">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#cbc3d7]">
                      {pillar.description}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-white/10 pt-3 font-mono-tabular text-xs text-[#958ea0]">
                    {pillar.metric}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
