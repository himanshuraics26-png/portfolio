import { ArrowRight, Dribbble, Github, Linkedin, Twitter } from 'lucide-react';
import { HERO_METRICS, PROFILE } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Dribbble: Dribbble,
  X: Twitter,
} as const;

export function HeroSection() {
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="top"
      className="relative z-10 mx-auto max-w-[1200px] px-5 pt-10 pb-16 sm:px-8 lg:pt-16 lg:pb-24"
    >
      {/* Split-Screen Hero */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Typographic Hierarchy & CTAs */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
            {PROFILE.role}
          </p>

          <p className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#d0bcff] to-[#4cd7f6] bg-clip-text text-transparent">
              {PROFILE.name}
            </span>
          </p>

          <h1
            className="mt-3 font-display font-bold tracking-[-0.03em] text-white"
            style={{
              fontSize: 'clamp(2.35rem, 4.3vw, 3.65rem)',
              lineHeight: 1.12,
              textWrap: 'balance',
            }}
          >
            {PROFILE.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#cbc3d7] sm:text-lg">
            {PROFILE.heroIntro}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('#projects')}
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold text-white cta-primary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="inline-flex min-h-[46px] items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#f8fafc] cta-secondary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Contact Me
            </button>
          </div>

          {/* Social Media Links */}
          <div className="mt-9 flex items-center gap-3">
            <span className="mr-2 text-xs font-medium tracking-wide text-[#958ea0]">
              Connect
            </span>
            {PROFILE.socials.map((social) => {
              const Icon =
                SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS] || Github;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${PROFILE.name} on ${social.label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-[#cbc3d7] transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive 3D Abstract Visual */}
        <div className="lg:col-span-5">
          <Hero3DCanvas />
        </div>
      </div>

      {/* Full-Width 4-Column KPI Metrics Strip Below Hero Split */}
      <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl glass-panel p-5 sm:p-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
        {HERO_METRICS.map((item) => (
          <div key={item.label} className="lg:px-6 first:lg:pl-2 last:lg:pr-2">
            <div className="font-mono-tabular text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {item.value}
            </div>
            <div className="mt-1 text-sm font-medium text-[#d0bcff]">
              {item.label}
            </div>
            <div className="mt-0.5 text-xs text-[#958ea0]">{item.context}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
