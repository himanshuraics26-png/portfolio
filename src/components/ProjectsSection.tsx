import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

const PROJECT_TABS: Array<{ id: ProjectCategory; label: string }> = [
  { id: 'all', label: 'All Projects' },
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'frontend', label: 'Frontend Dev' },
  { id: '3d-motion', label: '3D & Spatial' },
];

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
            03. Selected Work
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Featured projects crafted with precision and atmosphere.
          </h2>
        </div>

        {/* Category Filter Segmented Controls */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="inline-flex w-fit flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0c0d19]/90 p-1"
        >
          {PROJECT_TABS.map((tab) => {
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

      {/* 2-Column Large Preview Showcase Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {filteredProjects.map((project) => {
          const isBroken = brokenImages[project.id];
          return (
            <article
              key={project.id}
              className="group glass-panel glass-panel-interactive flex flex-col overflow-hidden rounded-3xl"
            >
              {/* Large 16:9 Preview Image */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#0c0d19]">
                {!isBroken ? (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenImages((prev) => ({
                        ...prev,
                        [project.id]: true,
                      }))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a1b27] via-[#0b0e23] to-[#070814] p-6 text-center">
                    <Layers className="h-10 w-10 text-[#d0bcff]" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-semibold text-white">
                      {project.title}
                    </p>
                  </div>
                )}

                {/* Subtle bottom gradient for clean seam */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0e23]/80 to-transparent"
                />
              </div>

              {/* Project Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-[#958ea0]">
                    <span>{project.categoryLabel}</span>
                    <span className="font-mono-tabular text-[#4cd7f6]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#cbc3d7]">
                    {project.shortDescription}
                  </p>

                  {/* Unboxed typographic technology stack (zero pill clutter) */}
                  <p className="mt-4 text-xs font-medium text-[#d0bcff]">
                    {project.technologies.join(' · ')}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs text-[#958ea0] truncate max-w-[55%]">
                    {project.outcome}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-white cta-secondary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
