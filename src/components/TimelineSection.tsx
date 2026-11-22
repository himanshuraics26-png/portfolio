import { useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

type TimelineFilter = 'all' | 'experience' | 'education';

export function TimelineSection() {
  const [filter, setFilter] = useState<TimelineFilter>('all');

  const items =
    filter === 'all'
      ? TIMELINE
      : TIMELINE.filter((item) => item.type === filter);

  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
            04. Experience &amp; Education
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Journey across design systems, frontend architecture, and computer science.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Filter timeline entries"
          className="inline-flex w-fit items-center gap-1 rounded-xl border border-white/10 bg-[#0c0d19]/90 p-1"
        >
          {(
            [
              { id: 'all', label: 'All Milestones' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
            ] as const
          ).map((tab) => {
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

      {/* Modern Vertical Timeline */}
      <div className="relative mt-14 pl-8 sm:pl-12">
        {/* Luminous Vertical Gradient Spine */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-3 w-[2px] rounded-full bg-gradient-to-b from-[#8B5CF6] via-[#4cd7f6] to-[#8B5CF6]/20 sm:left-5"
        />

        <div className="space-y-8">
          {items.map((entry) => {
            const isEducation = entry.type === 'education';
            const Icon = isEducation ? GraduationCap : Briefcase;

            return (
              <article key={entry.id} className="relative">
                {/* Node Marker (static geometric icon ring, no pulsing dot) */}
                <div
                  aria-hidden="true"
                  className="absolute -left-8 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-[#4cd7f6]/60 bg-[#0b0e23] text-[#4cd7f6] shadow-[0_0_16px_rgba(6,182,212,0.4)] sm:-left-12 sm:h-9 sm:w-9"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>

                <div className="glass-panel glass-panel-interactive rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono-tabular text-xs font-medium text-[#4cd7f6]">
                      {entry.period}
                    </span>
                    <span className="text-xs text-[#958ea0]">
                      {isEducation ? 'Education' : 'Experience'} · {entry.location}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[#d0bcff]">
                    {entry.organization}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#cbc3d7]">
                    {entry.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-[#e2e1f3]">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#8B5CF6]"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
