import { useEffect, useRef, useState } from 'react';
import { SKILLS, type SkillCategory } from '../data/portfolioData';

const FILTER_TABS: Array<{ id: SkillCategory; label: string }> = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend Engineering' },
  { id: 'design', label: 'UI/UX & Prototyping' },
];

export function SkillsSection() {
  const [filter, setFilter] = useState<SkillCategory>('all');
  const [barsActive, setBarsActive] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setBarsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibleSkills =
    filter === 'all'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === filter);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
            02. Core Capabilities
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Design craft and frontend fluency, built for production.
          </h2>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by discipline"
          className="inline-flex w-fit items-center gap-1 rounded-xl border border-white/10 bg-[#0c0d19]/90 p-1"
        >
          {FILTER_TABS.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  active
                    ? 'bg-[#8B5CF6] text-white shadow-[0_0_18px_-4px_rgba(139,92,246,0.65)]'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleSkills.map((skill, idx) => (
          <article
            key={skill.id}
            className="glass-panel glass-panel-interactive flex flex-col justify-between rounded-2xl p-6"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">
                  {skill.name}
                </h3>
                <span className="font-mono-tabular text-sm font-medium text-[#4cd7f6]">
                  {skill.proficiency}%
                </span>
              </div>

              <p className="mt-1 text-xs text-[#958ea0]">
                {skill.category === 'frontend' ? 'Frontend Engineering' : 'UI/UX & Design'} ·{' '}
                {skill.experience}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#cbc3d7]">
                {skill.summary}
              </p>
            </div>

            {/* Compositor-only progress bar via transform: scaleX */}
            <div className="mt-6">
              <div
                aria-hidden="true"
                className="relative h-2 w-full overflow-hidden rounded-full bg-white/10"
              >
                <div
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#22D3EE] transition-transform duration-700 ease-out"
                  style={{
                    transform: `scaleX(${barsActive ? skill.proficiency / 100 : 0.08})`,
                    transitionDelay: `${idx * 60}ms`,
                  }}
                />
              </div>
              <span className="sr-only">
                {skill.name} proficiency {skill.proficiency} percent
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
