import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Projects', href: '#' },
  { label: 'Articles', href: '#' },
  { label: 'About', href: '#' },
];

const socialLinks = [
  { label: 'Github', href: 'https://github.com/darwinphi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/darwinmanalo/' },
  { label: 'Email', href: 'mailto:darwinmanalophi@gmail.com' },
];

const springTransition = { type: 'spring', stiffness: 400, damping: 30 };

// 4 dots (closed) → 2 crossing lines (open)
// Each entry: dot position when closed, line endpoint pair when open
const dotLineVariants = [
  {
    id: 'tl',
    closed: { x1: 7, y1: 7, x2: 7, y2: 7, strokeWidth: 4 },
    open: { x1: 5, y1: 5, x2: 19, y2: 19, strokeWidth: 2 },
  },
  {
    id: 'tr',
    closed: { x1: 17, y1: 7, x2: 17, y2: 7, strokeWidth: 4 },
    open: { x1: 19, y1: 5, x2: 5, y2: 19, strokeWidth: 2 },
  },
  {
    id: 'bl',
    closed: { x1: 7, y1: 17, x2: 7, y2: 17, strokeWidth: 4 },
    open: { x1: 19, y1: 5, x2: 5, y2: 19, strokeWidth: 2 },
  },
  {
    id: 'br',
    closed: { x1: 17, y1: 17, x2: 17, y2: 17, strokeWidth: 4 },
    open: { x1: 5, y1: 5, x2: 19, y2: 19, strokeWidth: 2 },
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col px-8">
      {/* Navbar */}
      <header className="relative z-10 py-6 flex items-center justify-between">
        <a href="/" className="text-body font-medium">
          Darwin Manalo
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group"
            >
              {label}
              <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
            </a>
          ))}
        </nav>
        <button
          className="md:hidden text-body leading-none cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-haspopup="dialog"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {dotLineVariants.map((v) => (
              <motion.line
                key={v.id}
                stroke="currentColor"
                strokeLinecap="round"
                x1={v.closed.x1}
                y1={v.closed.y1}
                x2={v.closed.x2}
                y2={v.closed.y2}
                animate={isMenuOpen ? v.open : v.closed}
                transition={springTransition}
              />
            ))}
          </svg>
        </button>
      </header>

      {/* Content + Drawer container — overflow-hidden clips the drawer to this region */}
      <div className="relative flex-1 overflow-hidden flex flex-col">
        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute inset-0 z-5 flex flex-col px-8 py-6 bg-primary-bg"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Drawer nav links */}
              <nav className="flex-1 flex flex-col items-start justify-center gap-4">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-heading hover:opacity-60 transition-opacity inline-flex items-center gap-1 group"
                  >
                    {label}
                    <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero */}
        <main className="flex-1 flex items-center justify-center">
          <p className="text-heading leading-tight font-normal max-w-225">
            Based in the Pearl of the Orient Seas (Manila, Philippines).
            I&rsquo;m a Full-Stack developer building modern web experiences.
            Got an idea and just want to connect? Let&rsquo;s collaborate.
          </p>
        </main>

        {/* Footer */}
        <footer className="py-6 flex items-end justify-between">
          <span className="text-body">© 2026 All rights reserved</span>
          <div className="flex flex-col items-end gap-1">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group"
              >
                {label}
                <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
