import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n/config';
import { AnimatePresence, motion } from 'framer-motion';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === i18n.language) ??
    supportedLanguages.find((lang) =>
      i18n.language.toLowerCase().startsWith(lang.code),
    ) ??
    supportedLanguages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('[data-lang-selector]')) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className="relative" data-lang-selector>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm border border-current rounded hover:opacity-60 transition-opacity dark:text-text-primary-dark"
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage.flag}</span>
        <span className="text-xs">{currentLanguage.code.toUpperCase()}</span>
        <i className="ri-arrow-up-s-line text-xs" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-primary-bg dark:bg-primary-bg-dark rounded shadow-lg border border-current dark:border-border-dark z-50 min-w-[180px]"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm hover:opacity-60 transition-opacity dark:text-text-primary-dark ${
                  lang.code === i18n.language
                    ? 'font-medium opacity-100 dark:bg-border-dark/50'
                    : 'opacity-80'
                }`}
                aria-label={`Switch to ${lang.name}`}
              >
                <span className="mr-2">{lang.flag}</span>
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
