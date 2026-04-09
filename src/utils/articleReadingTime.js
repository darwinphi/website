const DEFAULT_WORDS_PER_MINUTE = 200;

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim();
}

function countWords(text) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return 0;
  }

  return normalized.split(' ').length;
}

function getArticleBlocksText(article) {
  if (!Array.isArray(article?.sections)) {
    return '';
  }

  return article.sections
    .flatMap((section) => (Array.isArray(section?.blocks) ? section.blocks : []))
    .map((block) => normalizeText(block?.value))
    .filter(Boolean)
    .join(' ');
}

export function getArticleReadingTimeMinutes(
  article,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
) {
  const safeWordsPerMinute =
    Number.isFinite(wordsPerMinute) && wordsPerMinute > 0
      ? wordsPerMinute
      : DEFAULT_WORDS_PER_MINUTE;
  const articleText = getArticleBlocksText(article);
  const words = countWords(articleText);

  return Math.max(1, Math.ceil(words / safeWordsPerMinute));
}

export function formatArticleReadingTime(t, minutes, languageCode = '') {
  const baseLanguage = languageCode.toLowerCase().split('-')[0];

  if (baseLanguage === 'ar') {
    return t('articleMeta.readingTime', {
      count: minutes,
      minutes,
      defaultValue: `مدة القراءة: ${minutes} دقيقة`,
    });
  }

  return t('articleMeta.readingTime', {
    minutes,
    defaultValue: '{{minutes}} min read',
  });
}
