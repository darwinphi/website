import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import PageLayout from './PageLayout';

function ArticlesPage({ onSelectArticle, onBack }) {
  const { t } = useTranslation();

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
              {article.date}
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
              aria-label={`Read article: ${t(`articleContent.${article.id}.title`, { defaultValue: article.title })}`}
            >
              {t('buttons.continueReading')}
              <i className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
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
