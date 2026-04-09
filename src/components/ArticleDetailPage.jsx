import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import { SectionRenderer } from './ArticleRenderers';
import PageLayout from './PageLayout';

function ArticleDetailPage({ articleId, onBack }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';
  const article = articles.find((a) => a.id === articleId);
  const backToArticlesLabel = t('buttons.backToArticles');
  const translatedSections = t(`articleContent.${articleId}.sections`, {
    returnObjects: true,
    defaultValue: {},
  });

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          {t('articleDetail.notFound')}
        </p>
      </div>
    );
  }

  const heading = (
    <div className="flex flex-col gap-4">
      <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
        {t(`articleContent.${article.id}.title`, {
          defaultValue: article.title,
        })}
      </h1>
      <p className="text-body opacity-50 dark:text-text-secondary-dark">
        {article.date}
      </p>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-body opacity-60 border border-current rounded-full px-3 py-0.5 dark:text-text-secondary-dark"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Table of Contents */}
      {article.toc && article.toc.length > 0 && (
        <nav className="flex flex-col gap-0.5 mt-2 pt-4 border-t border-current opacity-80">
          <p
            className="font-medium mb-2 dark:text-text-primary-dark"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
            }}
          >
            {t('pages.articles.tableOfContents')}
          </p>
          {article.toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block leading-snug py-0.5 hover:opacity-60 transition-opacity dark:text-text-secondary-dark ${
                item.isGroup
                  ? 'font-medium mt-2 dark:text-text-primary-dark'
                  : 'opacity-60 pl-3'
              }`}
              style={{
                fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
              }}
            >
              {t(`articleContent.${article.id}.toc.${item.id}`, {
                defaultValue: item.label,
              })}
            </a>
          ))}
        </nav>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      <PageLayout
        heading={heading}
        onBack={onBack}
        backButtonLabel={backToArticlesLabel}
      >
        <div className="flex flex-col gap-6">
          {article.sections.map((section, index) => (
            <SectionRenderer
              key={index}
              section={section}
              index={index}
              article={article}
              translatedSections={translatedSections}
            />
          ))}

          {/* Back to top */}
          <div className="flex justify-end pt-4 pb-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
            >
              {t('buttons.backToTop')}
              <i className="ri-arrow-up-line transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1" />
            </button>
          </div>
        </div>
      </PageLayout>

      {/* Bottom back button aligned with the left column */}
      <div className="py-4">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          <button
            onClick={onBack}
            className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark w-fit"
          >
            <i
              className={`transition-transform duration-200 ${
                isRtl
                  ? 'ri-arrow-right-line group-hover:translate-x-1 group-active:translate-x-1'
                  : 'ri-arrow-left-line group-hover:-translate-x-1 group-active:-translate-x-1'
              }`}
            />
            {backToArticlesLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailPage;
