import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { key: 'social.github', href: 'https://github.com/darwinphi' },
  {
    key: 'social.linkedin',
    href: 'https://www.linkedin.com/in/darwinmanalo/',
  },
  { key: 'social.email', href: 'mailto:darwinmanalophi@gmail.com' },
];

function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';

  return (
    <motion.footer
      className="py-6 grid grid-cols-2 items-end gap-4"
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
            className="hidden md:inline"
          >
            {t('footer.allRightsReserved')}
          </motion.span>
        </AnimatePresence>
      </motion.span>

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
            aria-label={t(key)}
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
            <i
              className={`transition-transform duration-200 group-hover:rotate-45 group-active:rotate-45 ${
                isRtl ? 'ri-arrow-left-up-line' : 'ri-arrow-right-up-line'
              }`}
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
