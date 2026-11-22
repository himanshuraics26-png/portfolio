/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AboutSection } from './components/AboutSection';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TimelineSection } from './components/TimelineSection';

const RIBBON_ITEMS = [
  'selected works',
  'ui/ux architecture',
  'design systems',
  'react engineering',
  'interactive 3d',
  'motion craft',
];

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070814] text-[#e2e1f3]">
      <AmbientBackdrop />

      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />

          {/* Subtle Editorial Marquee Divider */}
          <div
            aria-hidden="true"
            className="border-y border-white/8 bg-[#0b0e23]/45 py-3.5 overflow-hidden select-none"
          >
            <div className="flex w-max animate-marquee gap-8 text-xs font-medium tracking-[0.12em] text-[#958ea0]">
              {[...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS].map(
                (label, index) => (
                  <span key={`${label}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
                    <span>{label}</span>
                    <span className="h-1 w-1 rounded-full bg-[#4cd7f6]/60" />
                  </span>
                ),
              )}
            </div>
          </div>

          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TimelineSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
