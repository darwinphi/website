import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from '../locales/en/translation.json';
import jaTranslation from '../locales/ja/translation.json';
import koTranslation from '../locales/ko/translation.json';
import zhTranslation from '../locales/zh/translation.json';
import esTranslation from '../locales/es/translation.json';
import idTranslation from '../locales/id/translation.json';
import deTranslation from '../locales/de/translation.json';
import ruTranslation from '../locales/ru/translation.json';
import frTranslation from '../locales/fr/translation.json';
import ptTranslation from '../locales/pt/translation.json';

const resources = {
  en: { translation: enTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  zh: { translation: zhTranslation },
  es: { translation: esTranslation },
  id: { translation: idTranslation },
  de: { translation: deTranslation },
  ru: { translation: ruTranslation },
  fr: { translation: frTranslation },
  pt: { translation: ptTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',

    // Normalize 'en-US' → 'en', etc.
    supportedLngs: ['en', 'ja', 'ko', 'zh', 'es', 'id', 'de', 'ru', 'fr', 'pt'],
    nonExplicitSupportedLngs: true,

    // Language detector options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React is safe from XSS
    },

    ns: ['translation'],
    defaultNS: 'translation',
  });

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default i18n;
