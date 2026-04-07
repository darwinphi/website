import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';

const springTransition = { type: 'spring', stiffness: 400, damping: 30 };

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

const navLinks = [
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.articles', path: '/articles' },
  { key: 'nav.about', path: '/about' },
];

function Navbar({ handleNavigation, isMenuOpen, setIsMenuOpen }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 py-6 flex items-center justify-between gap-6 bg-primary-bg dark:bg-primary-bg-dark dark:text-text-primary-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <button
          onClick={() => handleNavigation('/')}
          className="text-body font-medium hover:opacity-60 transition-opacity cursor-pointer inline-flex items-center shrink-0"
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

        {/* Center: Nav Links (desktop) */}
        <motion.nav
          className="hidden md:flex items-center gap-6 flex-1 justify-center"
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
          {navLinks.map(({ key, path }) => {
            const label = t(key);
            const linkVariants = {
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <motion.button
                key={key}
                onClick={() => handleNavigation(path)}
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

        {/* Right: Dark Mode Toggle + Language Selector + Hamburger */}
        <div className="flex items-center gap-2 shrink-0 md:gap-3">
          <DarkModeToggle />
          <LanguageSelector />

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

      {/* Mobile Drawer — sibling of header so it doesn't cover it */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col px-8 py-6 bg-primary-bg dark:bg-primary-bg-dark dark:text-text-primary-dark"
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
            <motion.nav
              className="flex flex-col items-end justify-start gap-4 mt-16"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map(({ key, path }) => {
                const label = t(key);

                return (
                  <motion.button
                    key={key}
                    onClick={() => {
                      handleNavigation(path);
                      setIsMenuOpen(false);
                    }}
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
    </>
  );
}

export default Navbar;
