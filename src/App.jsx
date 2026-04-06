import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';

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

// Drawer nav stagger animation
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { type: 'tween', duration: 0.2, ease: 'easeInOut' },
  },
};

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
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleNavigation = (newView, projectId = null) => {
    setView(newView);
    setSelectedProject(projectId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle backspace/delete key for back navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only respond to backspace or delete keys
      if (event.key !== 'Backspace' && event.key !== 'Delete') {
        return;
      }

      // Don't interfere with text inputs
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.contentEditable === 'true')
      ) {
        return;
      }

      // Prevent default browser behavior (go back page)
      event.preventDefault();

      // Navigate based on current view
      if (view === 'project-detail') {
        handleNavigation('projects');
      } else if (view === 'projects') {
        handleNavigation('home');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  // Close drawer on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col px-8">
      {/* Navbar */}
      <header className="sticky top-0 z-50 py-6 flex items-center justify-between bg-primary-bg">
        <button
          onClick={() => handleNavigation('home')}
          className="text-body font-medium hover:opacity-60 transition-opacity cursor-pointer"
        >
          Darwin Manalo
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => {
            const isProjects = label === 'Projects';
            const isAbout = label === 'About';
            const handleClick = isProjects
              ? () => handleNavigation('projects')
              : isAbout
                ? () => handleNavigation('about')
                : undefined;

            return isProjects || isAbout ? (
              <button
                key={label}
                onClick={handleClick}
                className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group cursor-pointer"
              >
                {label}
                <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
              </button>
            ) : (
              <a
                key={label}
                href={href}
                className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group"
              >
                {label}
                <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
              </a>
            );
          })}
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
      <div className="relative flex-1 overflow-hidden lg:overflow-visible flex flex-col">
        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute inset-0 z-40 flex flex-col px-8 py-6 bg-primary-bg"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut',
                delay: 0.25,
              }}
            >
              {/* Drawer nav links */}
              <motion.nav
                className="flex flex-col items-end justify-start gap-4"
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map(({ label, href }) => {
                  const isProjects = label === 'Projects';
                  const isAbout = label === 'About';
                  const handleClick = isProjects
                    ? () => handleNavigation('projects')
                    : isAbout
                      ? () => handleNavigation('about')
                      : () => setIsMenuOpen(false);

                  return isProjects || isAbout ? (
                    <motion.button
                      key={label}
                      onClick={handleClick}
                      className="text-heading hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer"
                      variants={navItemVariants}
                    >
                      {label}
                      <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
                    </motion.button>
                  ) : (
                    <motion.a
                      key={label}
                      href={href}
                      onClick={handleClick}
                      className="text-heading hover:opacity-60 transition-opacity inline-flex items-center gap-1 group"
                      variants={navItemVariants}
                    >
                      {label}
                      <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
                    </motion.a>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content - conditionally rendered based on view */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex-1 flex items-center justify-center"
              >
                <p className="text-heading leading-tight font-normal max-w-225">
                  Based in the Pearl of the Orient Seas (Manila, Philippines).
                  I&rsquo;m a Full-Stack developer building modern web
                  experiences. Got an idea and just want to connect? Let&rsquo;s
                  collaborate.
                </p>
              </motion.div>
            )}
            {view === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                <ProjectsPage
                  onSelectProject={(projectId) =>
                    handleNavigation('project-detail', projectId)
                  }
                  onBack={() => handleNavigation('home')}
                />
              </motion.div>
            )}
            {view === 'project-detail' && (
              <motion.div
                key="project-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                <ProjectDetailPage
                  projectId={selectedProject}
                  onBack={() => handleNavigation('projects')}
                />
              </motion.div>
            )}
            {view === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                <AboutPage onBack={() => handleNavigation('home')} />
              </motion.div>
            )}
          </AnimatePresence>
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
