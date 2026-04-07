import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';

function ArticlesPage({ onSelectArticle, onBack }) {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex flex-col">
      {/* Back button - aligned to left column */}
      <div className="py-4">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          <button
            onClick={onBack}
            className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark w-fit"
          >
            <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
            {t('buttons.backToHome')}
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: Heading */}
          <div className="flex flex-col gap-4 md:col-span-1 md:sticky md:top-24 md:self-start lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
              {t('pages.articles.title')}
            </h1>
          </div>

          {/* Right column: Article list */}
          <div className="flex flex-col md:col-span-1 lg:col-span-2">
            <div style={{ maxWidth: 'var(--max-width-reading)' }}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;
