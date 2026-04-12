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
    >
      {articles.map((article, index) => (
        <div key={article.id}>
          <div className={`${index === 0 ? '' : 'pt-6'} pb-6`}>
            <p className="text-body opacity-50 mb-1 dark:text-text-secondary-dark">
              {article.date} ·{' '}
              {formatArticleReadingTime(
                t,
                article.readingTimeMinutes,
                i18n.resolvedLanguage || i18n.language,
              )}
            </p>
            <h2 className="text-body font-medium mb-3 dark:text-text-primary-dark">
              {t(`articleContent.${article.id}.title`, {
                defaultValue: article.title,
              })}
            </h2>
            <p className="text-body opacity-60 mb-4 dark:text-text-secondary-dark">
              {t(`articleContent.${article.id}.preview`, {
                defaultValue: article.preview,
              })}
            </p>
            <button
              onClick={() => onSelectArticle(article.id)}
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group cursor-pointer dark:text-text-primary-dark"
              aria-label={`${t('buttons.continueReading')}: ${t(`articleContent.${article.id}.title`, { defaultValue: article.title })}`}
            >
              {t('buttons.continueReading')}
              <Icon
                name={isRtl ? 'arrow-left' : 'arrow-right'}
                className={`transition-transform duration-200 ${
                  isRtl
                    ? 'group-hover:-translate-x-1 group-active:-translate-x-1'
                    : 'group-hover:translate-x-1 group-active:translate-x-1'
                }`}
              />
            </button>
          </div>
          {index < articles.length - 1 && (
            <div className="h-px bg-current opacity-20" />
          )}
        </div>
      ))}
    </PageLayout>
  );
}

export default ArticlesPage;
