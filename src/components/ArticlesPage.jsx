import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import PageLayout from './PageLayout';
import { formatArticleReadingTime } from '../utils/articleReadingTime';

function ArticlesPage({ onSelectArticle, onBack }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';

  const heading = (
    <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
      {t('pages.articles.title')}
    </h1>
  );

  return (
    <PageLayout
      heading={heading}
      onBack={onBack}
      backButtonLabel={t('buttons.backToHome')}
      surfaceVariant="plain"
    >
      {articles.map((article, index) => (
        <div key={article.id}>
          <button
            onClick={() => onSelectArticle(article.id)}
            className={`${index === 0 ? '' : 'pt-7'} pb-7 w-full text-left group cursor-pointer transition-opacity duration-200 hover:opacity-90 focus-visible:opacity-90`}
            aria-label={`${t('buttons.continueReading')}: ${t(`articleContent.${article.id}.title`, { defaultValue: article.title })}`}
          >
            <h2 className="text-[1.02rem] leading-snug font-medium mb-1 text-current transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80 dark:text-text-primary-dark md:text-[1.08rem]">
              {t(`articleContent.${article.id}.title`, {
                defaultValue: article.title,
              })}
            </h2>
            <p className="text-[0.82em] opacity-45 mb-3 dark:text-text-secondary-dark">
              {article.date} ·{' '}
              {formatArticleReadingTime(
                t,
                article.readingTimeMinutes,
                i18n.resolvedLanguage || i18n.language,
              )}
            </p>
            <p className="text-body opacity-60 mb-5 line-clamp-3 max-w-[58ch] dark:text-text-secondary-dark">
              {t(`articleContent.${article.id}.preview`, {
                defaultValue: article.preview,
              })}
            </p>
            <div className="flex items-center pt-1">
              <span className="text-body inline-flex items-center gap-1 transition-opacity duration-200 group-hover:opacity-85 group-focus-visible:opacity-85 dark:text-text-primary-dark">
                {t('buttons.continueReading')}
                <Icon
                  name={isRtl ? 'arrow-left' : 'arrow-right'}
                  className={`transition-transform duration-200 ${
                    isRtl
                      ? 'group-hover:-translate-x-1 group-active:-translate-x-1 group-focus-visible:-translate-x-1'
                      : 'group-hover:translate-x-1 group-active:translate-x-1 group-focus-visible:translate-x-1'
                  }`}
                />
              </span>
            </div>
          </button>
          {index < articles.length - 1 && (
            <div className="border-t border-dotted border-current opacity-12" />
          )}
        </div>
      ))}
    </PageLayout>
  );
}

export default ArticlesPage;
