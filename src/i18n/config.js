import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationLoaders = import.meta.glob('../locales/*/translation.json');

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
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const supportedLanguageCodes = new Set(
  supportedLanguages.map((language) => language.code),
);
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'i18nextLng';
const RTL_LANGUAGES = new Set(['ar']);

function getBaseLanguage(languageCode) {
  return (languageCode || '').toLowerCase().split('-')[0];
}

function normalizeLanguage(languageCode) {
  const baseLanguage = getBaseLanguage(languageCode);
  return supportedLanguageCodes.has(baseLanguage)
    ? baseLanguage
    : DEFAULT_LANGUAGE;
}

function detectInitialLanguage() {
  if (typeof window !== 'undefined') {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) {
      return normalizeLanguage(storedLanguage);
    }
  }

  if (typeof navigator !== 'undefined') {
    const preferredLanguages = [
      ...(navigator.languages || []),
      navigator.language,
    ].filter(Boolean);

    const matchedLanguage = preferredLanguages.find((languageCode) =>
      supportedLanguageCodes.has(getBaseLanguage(languageCode)),
    );

    if (matchedLanguage) {
      return normalizeLanguage(matchedLanguage);
    }
  }

  if (typeof document !== 'undefined') {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage) {
      return normalizeLanguage(htmlLanguage);
    }
  }

  return DEFAULT_LANGUAGE;
}

async function importLanguageBundle(languageCode) {
  const normalizedLanguage = normalizeLanguage(languageCode);
  const loader =
    translationLoaders[`../locales/${normalizedLanguage}/translation.json`];

  if (!loader) {
    throw new Error(`Missing translation bundle for "${normalizedLanguage}"`);
  }

  const module = await loader();
  return {
    normalizedLanguage,
    translation: module.default ?? module,
  };
}

export async function ensureLanguageLoaded(languageCode) {
  const normalizedLanguage = normalizeLanguage(languageCode);

  if (i18n.hasResourceBundle(normalizedLanguage, 'translation')) {
    return normalizedLanguage;
  }

  const { translation } = await importLanguageBundle(normalizedLanguage);

  i18n.addResourceBundle(
    normalizedLanguage,
    'translation',
    translation,
    true,
    true,
  );

  return normalizedLanguage;
}

const initialLanguage = detectInitialLanguage();

export const i18nReady = (async () => {
  const initialBundles = await Promise.all(
    [...new Set([DEFAULT_LANGUAGE, initialLanguage])].map(importLanguageBundle),
  );

  const resources = Object.fromEntries(
    initialBundles.map(({ normalizedLanguage, translation }) => [
      normalizedLanguage,
      { translation },
    ]),
  );

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,

    // Normalize 'en-US' -> 'en', etc.
    supportedLngs: [...supportedLanguageCodes],
    nonExplicitSupportedLngs: true,

    interpolation: {
      escapeValue: false, // React is safe from XSS
    },

    ns: ['translation'],
    defaultNS: 'translation',
  });

  return i18n;
})();

export function getLanguageDirection(languageCode) {
  const baseLanguage = getBaseLanguage(languageCode);
  return RTL_LANGUAGES.has(baseLanguage) ? 'rtl' : 'ltr';
}

export default i18n;
