import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n/config';
import { AnimatePresence, motion } from 'framer-motion';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';

  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === i18n.language) ??
    supportedLanguages.find((lang) =>
      i18n.language.toLowerCase().startsWith(lang.code),
    ) ??
    supportedLanguages[0];
  const activeLanguageCode = currentLanguage.code;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      // Get the selector container
      const selector = document.querySelector('[data-lang-selector]');
      // Check if click was outside the selector
      if (selector && !selector.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // Use 'click' instead of 'mousedown' for better UX
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" data-lang-selector>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 px-2 py-1 text-sm border border-current rounded hover:opacity-60 transition-opacity dark:text-text-primary-dark ${
          isRtl ? 'flex-row-reverse' : ''
        }`}
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage.flag}</span>
        <span className="text-xs">{currentLanguage.code.toUpperCase()}</span>
        <i className="ri-arrow-down-s-line text-xs" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-primary-bg dark:bg-primary-bg-dark rounded shadow-lg border border-current dark:border-border-dark z-50 min-w-45"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`inline-flex w-full items-center justify-start gap-2 text-start px-4 py-2 text-sm hover:opacity-60 transition-opacity dark:text-text-primary-dark ${
                  lang.code === activeLanguageCode
                    ? 'font-medium opacity-100 dark:bg-border-dark/50'
                    : 'opacity-80'
                }`}
                aria-label={`Switch to ${lang.name}`}
                aria-current={lang.code === activeLanguageCode ? 'page' : undefined}
              >
                <span aria-hidden="true">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
