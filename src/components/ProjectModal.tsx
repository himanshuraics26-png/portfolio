import { useEffect } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04050d]/85 p-4 sm:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0c0d19] shadow-[0_0_70px_-15px_rgba(139,92,246,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0c0d19]/95 px-6 py-4 backdrop-blur-md">
          <div className="text-xs text-[#958ea0]">
            <span>{project.categoryLabel}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span className="font-mono-tabular text-[#4cd7f6]">{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#e2e1f3] transition-colors hover:border-cyan-400/60 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Preview Image */}
        <div className="aspect-video w-full overflow-hidden border-b border-white/10 bg-[#11121f]">
          <img
            src={project.imageUrl}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Case Study Details */}
        <div className="p-6 sm:p-8">
          <h3
            id="project-modal-title"
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#cbc3d7]">
            <span>Client: {project.client}</span>
            <span aria-hidden="true">·</span>
            <span>Role: {project.role}</span>
          </div>

          <p className="mt-4 text-xs font-medium tracking-wide text-[#d0bcff]">
            {project.technologies.join(' · ')}
          </p>

          <p className="mt-5 text-base leading-relaxed text-[#e2e1f3]">
            {project.shortDescription}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
            <div>
              <h4 className="font-display text-sm font-semibold text-[#4cd7f6]">
                The Challenge
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#cbc3d7]">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-[#d0bcff]">
                The Solution
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#cbc3d7]">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium text-[#4cd7f6]">Measured Outcome</p>
            <p className="mt-1 text-sm font-medium text-white">{project.outcome}</p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white cta-primary whitespace-nowrap shrink-0"
            >
              <span>Launch Live Preview</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[#e2e1f3] cta-secondary whitespace-nowrap shrink-0"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>Source &amp; Specs</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
