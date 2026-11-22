import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070814]/80">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-[#958ea0] sm:flex-row sm:px-8">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE.name}. Crafted with React, TypeScript &amp;
          Three.js.
        </p>

        <div className="flex items-center gap-6">
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#projects" className="transition-colors hover:text-white">
            Projects
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#e2e1f3] transition-colors hover:border-cyan-400/60 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
