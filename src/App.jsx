import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';
import ArticlesPage from './components/ArticlesPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import AnimatedHeroText from './components/AnimatedHeroText';
import DarkModeToggle from './components/DarkModeToggle';
import LanguageSelector from './components/LanguageSelector';
import NotFoundPage from './components/NotFoundPage';

function ProjectDetailRoute({ onBack }) {
  const { projectId } = useParams();
  return <ProjectDetailPage projectId={projectId} onBack={onBack} />;
}

function ArticleDetailRoute({ onBack }) {
  const { articleId } = useParams();
  return <ArticleDetailPage articleId={articleId} onBack={onBack} />;
}

const springTransition = { type: 'spring', stiffness: 400, damping: 30 };

// Drawer nav stagger animation
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.12,
      staggerDirection: -1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define nav and social links with translation keys
  const navLinks = [
    { key: 'nav.projects', href: '#' },
    { key: 'nav.articles', href: '' },
    { key: 'nav.about', href: '#' },
  ];

  const socialLinks = [
    { key: 'social.github', href: 'https://github.com/darwinphi' },
    {
      key: 'social.linkedin',
      href: 'https://www.linkedin.com/in/darwinmanalo/',
    },
    { key: 'social.email', href: 'mailto:darwinmanalophi@gmail.com' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(-1);
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

      navigate(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

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
    <div className="min-h-screen flex flex-col px-8 max-w-[1280px] mx-auto w-full">
      {/* Navbar */}
      <motion.header
        className="sticky top-0 z-50 py-6 flex items-center justify-between bg-primary-bg dark:bg-primary-bg-dark dark:text-text-primary-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <button
          onClick={() => handleNavigation('/')}
          className="text-body font-medium hover:opacity-60 transition-opacity cursor-pointer inline-flex items-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={i18n.language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {t('nav.darwinManalo')}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Center: Dark Mode Toggle (absolute center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <DarkModeToggle />
        </div>

        {/* Right: Nav Links (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-6">
          <motion.nav
            className="hidden md:flex items-center gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map(({ key }) => {
              const label = t(key);
              const isProjects = key === 'nav.projects';
              const isAbout = key === 'nav.about';
              const isArticles = key === 'nav.articles';
              const handleClick = isProjects
                ? () => handleNavigation('/projects')
                : isAbout
                  ? () => handleNavigation('/about')
                  : isArticles
                    ? () => handleNavigation('/articles')
                    : undefined;

              const linkVariants = {
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              };

              return (
                <motion.button
                  key={key}
                  onClick={handleClick}
                  className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group cursor-pointer leading-none"
                  variants={linkVariants}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={i18n.language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  </AnimatePresence>
                  <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
                </motion.button>
              );
            })}
          </motion.nav>

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
        </div>
      </motion.header>

      {/* Content + Drawer container — overflow-hidden clips the drawer to this region */}
      <div className="relative flex-1 overflow-hidden lg:overflow-visible flex flex-col">
        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute inset-0 z-40 flex flex-col px-8 py-6 bg-primary-bg dark:bg-primary-bg-dark dark:text-text-primary-dark"
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
                {navLinks.map(({ key }) => {
                  const label = t(key);
                  const isProjects = key === 'nav.projects';
                  const isAbout = key === 'nav.about';
                  const isArticles = key === 'nav.articles';
                  const handleClick = isProjects
                    ? () => handleNavigation('/projects')
                    : isAbout
                      ? () => handleNavigation('/about')
                      : isArticles
                        ? () => handleNavigation('/articles')
                        : () => setIsMenuOpen(false);

                  return (
                    <motion.button
                      key={key}
                      onClick={handleClick}
                      className="text-heading hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer leading-none"
                      variants={navItemVariants}
                    >
                      {label}
                      <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
                    </motion.button>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content - route-based rendering */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${location.pathname}-${i18n.language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex-1 flex flex-col"
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <div className="flex-1 flex items-center justify-center">
                      <AnimatedHeroText
                        text={t('pages.home.heroText')}
                        className="text-heading leading-tight font-normal max-w-225 dark:text-text-primary-dark"
                      />
                    </div>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProjectsPage
                      onSelectProject={(projectId) =>
                        handleNavigation(`/projects/${projectId}`)
                      }
                      onBack={handleBack}
                    />
                  }
                />
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetailRoute onBack={handleBack} />}
                />
                <Route
                  path="/about"
                  element={<AboutPage onBack={handleBack} />}
                />
                <Route
                  path="/articles"
                  element={
                    <ArticlesPage
                      onSelectArticle={(articleId) =>
                        handleNavigation(`/articles/${articleId}`)
                      }
                      onBack={handleBack}
                    />
                  }
                />
                <Route
                  path="/articles/:articleId"
                  element={<ArticleDetailRoute onBack={handleBack} />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          className="py-6 grid grid-cols-3 items-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.span
            className="text-body dark:text-text-secondary-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            © 2026{' '}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={i18n.language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {t('footer.allRightsReserved')}
              </motion.span>
            </AnimatePresence>
          </motion.span>

          <div className="flex justify-center">
            <LanguageSelector />
          </div>

          <motion.div
            className="flex flex-col items-end gap-1"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.4,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map(({ key, href }) => (
              <motion.a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group dark:text-text-primary-dark"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i18n.language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {t(key)}
                  </motion.span>
                </AnimatePresence>
                <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45" />
              </motion.a>
            ))}
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
