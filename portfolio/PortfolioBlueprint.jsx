import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

/**
 * PORTFOLIO BLUEPRINT
 * Single-file portfolio page styled as an engineering / patent drawing.
 * All editable content lives in the DATA section below — the layout,
 * ruler frame, and section components render directly from it.
 */

/* ───────────────────────── DATA — EDIT ME ───────────────────────── */

const NAME = 'Christian Caramanico';
const TITLE = 'Mechatronics Engineer';

// EDIT ME — replace with your own 2–3 sentence bio.
const BIO =
  'Mechatronics engineer bridging embedded firmware, controls, and mechanical design — from ESP32-based sensor systems to SolidWorks-modeled hardware. I like building things that move, measure, and respond in the real world, drawing on C++, Python, and PyTorch to get them there.';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// EDIT ME — most recent first. Add or remove entries; the timeline renders however many are here.
const EXPERIENCE = [
  {
    company: 'COMPANY NAME',
    title: 'JOB TITLE',
    dates: 'MONTH YYYY — PRESENT',
    points: [
      'Describe a key, measurable achievement — what you built, improved, or shipped.',
      'Describe a second achievement, ideally with a number (%, hours saved, units, tolerance, etc.).',
    ],
  },
  {
    company: 'COMPANY NAME',
    title: 'JOB TITLE',
    dates: 'MONTH YYYY — MONTH YYYY',
    points: [
      'Describe a key, measurable achievement — what you built, improved, or shipped.',
      'Describe a second achievement, ideally with a number (%, hours saved, units, tolerance, etc.).',
    ],
  },
];

// EDIT ME — placeholders only. Swap in real projects; the grid and card layout need no changes.
const PROJECTS = [
  { name: 'PROJECT_NAME_01', description: 'One or two lines on the problem this project solved and your role in it.', tags: ['TAG_01', 'TAG_02', 'TAG_03'] },
  { name: 'PROJECT_NAME_02', description: 'One or two lines on the problem this project solved and your role in it.', tags: ['TAG_01', 'TAG_02'] },
  { name: 'PROJECT_NAME_03', description: 'One or two lines on the problem this project solved and your role in it.', tags: ['TAG_01', 'TAG_02', 'TAG_03'] },
];

const SKILLS = [
  { name: 'C++', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'PyTorch', category: 'Framework' },
  { name: 'SolidWorks', category: 'CAD / Design' },
  { name: 'MATLAB', category: 'Analysis' },
  { name: 'ESP32', category: 'Embedded / Hardware' },
  { name: 'Git', category: 'Tooling' },
];

// EDIT ME — LinkedIn, GitHub, and Instagram are placeholders; email defaults to your account address.
const SOCIALS = {
  linkedin: '#', // e.g. https://linkedin.com/in/yourname
  github: '#', // e.g. https://github.com/yourname
  instagram: '#', // e.g. https://instagram.com/yourname
  email: 'ccaramanico3@gmail.com',
};

/* ───────────────────────── derived constants ───────────────────────── */

const NAME_PARTS = NAME.split(' ');
const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const RULER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const RULER_NUMBERS = Array.from({ length: 12 }, (_, i) => i + 1);

/* ───────────────────────── scroll tracking hook ───────────────────────── */

function usePortfolioScroll(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [sectionIds]);

  return { activeId, progress };
}

/* ───────────────────────── decorative frame ───────────────────────── */

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-orange-700 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-stone-100"
    >
      Skip to main content
    </a>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(214, 211, 209, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(214, 211, 209, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  );
}

function RulerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Left coordinate rail */}
      <div className="fixed bottom-6 left-0 top-16 z-20 hidden w-7 flex-col justify-between border-r border-stone-800/30 bg-stone-100 py-6 sm:flex sm:bottom-7">
        {RULER_LETTERS.map((letter) => (
          <span key={letter} className="flex items-center justify-center font-mono text-[10px] text-stone-600">
            {letter}
          </span>
        ))}
      </div>

      {/* Right coordinate rail */}
      <div className="fixed bottom-6 right-0 top-16 z-20 hidden w-7 flex-col justify-between border-l border-stone-800/30 bg-stone-100 py-6 sm:flex sm:bottom-7">
        {RULER_LETTERS.map((letter) => (
          <span key={letter} className="flex items-center justify-center font-mono text-[10px] text-stone-600">
            {letter}
          </span>
        ))}
      </div>

      {/* Bottom numeric measurement line — pinned to the viewport bottom at every breakpoint */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex h-6 items-center justify-between border-t border-stone-800/30 bg-stone-100 px-4 sm:h-7 sm:px-10">
        {RULER_NUMBERS.map((n) => (
          <span key={n} className="flex flex-col items-center gap-1 font-mono text-[9px] text-stone-600 sm:text-[10px]">
            <span className="h-1.5 w-px bg-stone-400" />
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── header ───────────────────────── */

function Header({ activeId, progress }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-stone-800/70 bg-stone-100">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-base font-black uppercase tracking-tight text-stone-900 sm:text-lg">
          C. Caramanico
          <span className="ml-3 hidden font-mono text-[10px] font-normal tracking-widest text-stone-600 sm:inline">
            Dwg No. CC-2026-001
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`border-b-2 pb-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 ${
                  isActive ? 'border-orange-700 text-orange-700' : 'border-transparent text-stone-700 hover:text-stone-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-stone-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 md:hidden"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span
            aria-hidden="true"
            className={`h-px w-5 bg-stone-800 transition-transform motion-reduce:transition-none ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-px w-5 bg-stone-800 transition-opacity motion-reduce:transition-none ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-px w-5 bg-stone-800 transition-transform motion-reduce:transition-none ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={`absolute inset-x-0 top-16 z-40 flex-col border-b border-stone-800/70 bg-stone-100 font-mono text-sm uppercase tracking-widest md:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="border-t border-stone-200 px-4 py-3 text-stone-700 first:border-t-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-700"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <span className="absolute inset-x-0 bottom-0 block h-[2px] bg-stone-200">
        <span
          className="block h-full bg-orange-700 transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </span>
    </header>
  );
}

/* ───────────────────────── shared bits ───────────────────────── */

function SectionHeading({ figNo, title, id }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4 border-b-2 border-stone-800 pb-3">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-700">Fig. {figNo}</p>
        <h2 id={id} className="font-display text-4xl font-black uppercase tracking-tight text-stone-900 md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="hidden font-mono text-xs uppercase tracking-widest text-stone-600 sm:block">Scale N.T.S.</p>
    </div>
  );
}

function IsometricPlaceholder({ label = 'Isometric View (1:1)' }) {
  const crossHatch = {
    backgroundImage:
      'linear-gradient(135deg, transparent calc(50% - 1px), #d6d3d1 calc(50% - 1px), #d6d3d1 calc(50% + 1px), transparent calc(50% + 1px)), ' +
      'linear-gradient(45deg, transparent calc(50% - 1px), #d6d3d1 calc(50% - 1px), #d6d3d1 calc(50% + 1px), transparent calc(50% + 1px))',
  };

  return (
    <div className="relative m-4 flex aspect-[4/3] items-center justify-center border border-dashed border-stone-400" style={crossHatch}>
      <span aria-hidden="true" className="absolute left-1.5 top-1.5 h-3 w-3 border-l-2 border-t-2 border-orange-700" />
      <span aria-hidden="true" className="absolute right-1.5 top-1.5 h-3 w-3 border-r-2 border-t-2 border-orange-700" />
      <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-orange-700" />
      <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2 border-orange-700" />
      <span className="bg-stone-100/90 px-3 py-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-stone-600">
        {label}
      </span>
    </div>
  );
}

/* ───────────────────────── about ───────────────────────── */

function TitleRow({ label, value }) {
  return (
    <>
      <dt className="border-b border-r border-stone-800/30 bg-stone-200/40 px-3 py-2 uppercase tracking-widest text-stone-600">{label}</dt>
      <dd className="break-words border-b border-stone-800/30 px-3 py-2 font-semibold text-stone-800">{value}</dd>
    </>
  );
}

function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-dashed border-stone-300 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-700">Sheet 01 — Title Block</p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h1 id="about-heading" className="break-words font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-stone-900 sm:text-7xl md:text-8xl">
              {NAME_PARTS.map((part, i) => (
                <span key={i} className="block">
                  {part}
                </span>
              ))}
            </h1>
            <p className="mt-5 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.3em] text-stone-700">
              <span aria-hidden="true" className="h-px w-8 bg-orange-700" />
              {TITLE}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700">{BIO}</p>
          </div>

          <dl className="grid grid-cols-2 border-2 border-stone-800 font-mono text-xs">
            <TitleRow label="Dwg No." value="CC-2026-001" />
            <TitleRow label="Scale" value="1:1" />
            <TitleRow label="Sheet" value="1 of 1" />
            <TitleRow label="Projection" value="3rd Angle" />
            <TitleRow label="Drawn By" value="C. Caramanico" />
            <TitleRow label="Date" value="2026" />
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── experience ───────────────────────── */

function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-b border-dashed border-stone-300 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading figNo="02" id="experience-heading" title="Experience" />

        <ol className="mt-4">
          {EXPERIENCE.map((job, i) => (
            <li
              key={`${job.company}-${job.dates}`}
              className="grid grid-cols-[2rem_1fr] gap-x-5 pb-14 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:gap-x-8"
            >
              <div className="relative flex justify-center" aria-hidden="true">
                {i < EXPERIENCE.length - 1 && (
                  <span className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-stone-300" />
                )}
                <span className="relative top-1.5 h-3.5 w-3.5 rounded-full border-2 border-orange-700 bg-stone-100" />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone-600">{job.dates}</p>
                <h3 className="mt-1 break-words font-display text-2xl font-bold text-stone-900">{job.title}</h3>
                <p className="font-mono text-sm text-orange-700">{job.company}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-stone-700">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-stone-500">
                        {String(i + 1).padStart(2, '0')}.{j + 1}
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── projects ───────────────────────── */

function ProjectCard({ project, index, total }) {
  return (
    <article className="flex flex-col border-2 border-stone-800 bg-stone-100">
      <div className="flex items-center justify-between border-b-2 border-stone-800 bg-stone-200/50 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-stone-600">
        <span>Fig. {String(index + 1).padStart(2, '0')}</span>
        <span>
          Sheet {index + 1} / {total}
        </span>
      </div>

      <IsometricPlaceholder />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-5">
        <h3 className="break-words font-display text-xl font-bold uppercase tracking-tight text-stone-900">{project.name}</h3>
        <p className="border-l-2 border-dashed border-stone-300 pl-3 text-sm leading-relaxed text-stone-700">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-dashed border-stone-400 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-stone-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-dashed border-stone-300 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading figNo="03" id="projects-heading" title="Projects" />
        <p className="mb-10 max-w-2xl font-mono text-xs uppercase tracking-widest text-stone-600">Structural placeholders — data pending</p>

        {/* PROJECTS array is defined at the top of this file — add entries there, the grid picks them up automatically. */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name + i} project={project} index={i} total={PROJECTS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── skills ───────────────────────── */

function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading figNo="04" id="skills-heading" title="Skills" />

        <div className="overflow-x-auto border-2 border-stone-800">
          <table className="w-full min-w-[420px] border-collapse text-left font-mono text-sm">
            <caption className="sr-only">Skills and tools, listed as a specification table</caption>
            <thead>
              <tr className="border-b-2 border-stone-800 bg-stone-200/50">
                <th scope="col" className="px-4 py-3 text-xs uppercase tracking-widest text-stone-600">
                  Item No.
                </th>
                <th scope="col" className="px-4 py-3 text-xs uppercase tracking-widest text-stone-600">
                  Designation
                </th>
                <th scope="col" className="px-4 py-3 text-xs uppercase tracking-widest text-stone-600">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {SKILLS.map((skill, i) => (
                <tr key={skill.name} className="border-b border-stone-300 odd:bg-stone-200/30 last:border-b-0">
                  <td className="px-4 py-3 text-stone-600">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-3 font-semibold text-stone-900">{skill.name}</td>
                  <td className="px-4 py-3 text-stone-600">{skill.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── social icons ─────────────────────────
   lucide-react ships generic UI icons only — GitHub/LinkedIn/Instagram
   logos are deliberately excluded upstream, so these three are drawn
   by hand at the same 24x24 / round-cap stroke grammar as the rest of
   the lucide set, sized and colored exactly like a lucide icon. */

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ───────────────────────── footer ───────────────────────── */

function Footer() {
  const year = new Date().getFullYear();
  const iconLinkClasses =
    'text-stone-800 transition-colors hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700';

  return (
    <footer id="contact" className="border-t-2 border-stone-800 pb-14 pt-14 sm:pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="break-words font-display text-lg font-black uppercase tracking-tight text-stone-900">{NAME}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-stone-600">{TITLE}</p>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-5">
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLinkClasses}>
              <LinkedinIcon className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLinkClasses}>
              <GithubIcon className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconLinkClasses}>
              <InstagramIcon className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <a href={`mailto:${SOCIALS.email}`} aria-label="Email" className={iconLinkClasses}>
              <Mail className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-stone-300 pt-6 font-mono text-[11px] text-stone-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {NAME}. All rights reserved.</p>
          <p>Dwg No. CC-2026-001 · Rev. A</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function PortfolioBlueprint() {
  const { activeId, progress } = usePortfolioScroll(SECTION_IDS);

  return (
    <div id="top" className="relative min-h-screen bg-stone-100">
      <SkipLink />
      {/* z-0 — fixed graph grid, spans the full screen */}
      <BackgroundGrid />
      {/* z-20 — fixed rulers, solid bg so the grid can't bleed through the numbers */}
      <RulerFrame />
      <Header activeId={activeId} progress={progress} />

      {/* z-10 — scrollable content, transparent so the fixed grid shows through */}
      <div className="relative z-10 bg-transparent pb-6 sm:pb-7 sm:pl-7 sm:pr-7">
        <main id="main-content" tabIndex={-1}>
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
