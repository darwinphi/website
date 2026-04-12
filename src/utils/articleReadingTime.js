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
