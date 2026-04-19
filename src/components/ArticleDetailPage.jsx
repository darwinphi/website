import { useEffect, useState } from 'react';
import { articles, loadArticleContent } from '../data/articles';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import { SectionRenderer } from './ArticleRenderers';
import PageLayout from './PageLayout';
import { formatArticleReadingTime } from '../utils/articleReadingTime';

function ArticleDetailPage({ articleId, onBack }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';
  const article = articles.find((a) => a.id === articleId);
  const [articleContent, setArticleContent] = useState(null);
  const [contentError, setContentError] = useState(null);
  const backToArticlesLabel = t('buttons.backToArticles');
  const translatedSections = t(`articleContent.${articleId}.sections`, {
    returnObjects: true,
    defaultValue: {},
  });

  useEffect(() => {
    if (!article) {
      setArticleContent(null);
      setContentError(null);
      return;
    }

    let isCancelled = false;

    setArticleContent(null);
    setContentError(null);

    loadArticleContent(articleId)
      .then((content) => {
        if (isCancelled) {
          return;
        }

        if (!content) {
          setContentError(new Error(`Missing article content for "${articleId}"`));
          return;
        }

        setArticleContent(content);
      })
      .catch((error) => {
        if (!isCancelled) {
          setContentError(error);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [article, articleId]);

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          {t('articleDetail.notFound')}
        </p>
      </div>
    );
  }

  if (contentError) {
    throw contentError;
  }

  const heading = (
    <div className="flex flex-col gap-3 sm:gap-4">
      <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
        {t(`articleContent.${article.id}.title`, {
          defaultValue: article.title,
        })}
      </h1>
      <p className="text-[0.92em] opacity-45 dark:text-text-secondary-dark">
        {article.date} ·{' '}
        {formatArticleReadingTime(
          t,
          article.readingTimeMinutes,
          i18n.resolvedLanguage || i18n.language,
        )}
      </p>
      <div className="flex flex-wrap gap-2 pt-0.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-current/18 bg-black/[0.03] px-3 py-1 text-[0.78rem] opacity-70 dark:border-white/10 dark:bg-white/[0.04] dark:text-text-secondary-dark"
            style={{
              fontSize: 'clamp(0.75rem, 0.72rem + 0.16vw, 0.84rem)',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Table of Contents */}
      {article.toc && article.toc.length > 0 && (
        <nav className="mt-2 border-t border-dotted border-current/20 pt-4 dark:border-white/10">
          <p
            className="mb-2 font-medium opacity-80 dark:text-text-primary-dark"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
            }}
          >
            {t('pages.articles.tableOfContents')}
          </p>
          <div className="flex flex-col gap-1">
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
                className={`block leading-snug py-0.5 transition-opacity hover:opacity-65 dark:text-text-secondary-dark ${
                  item.isGroup
                    ? 'mt-2 font-medium opacity-80 first:mt-0 dark:text-text-primary-dark'
                    : 'pl-3 opacity-55'
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
          </div>
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
        surfaceVariant="plain"
      >
        <div className="flex flex-col gap-6">
          {articleContent ? (
            articleContent.sections.map((section, index) => (
              <SectionRenderer
                key={index}
                section={section}
                index={index}
                article={article}
                translatedSections={translatedSections}
              />
            ))
          ) : (
            <p className="text-body opacity-60 dark:text-text-secondary-dark">
              {t('articleDetail.loading')}
            </p>
          )}

          {/* Back to top */}
          <div className="flex justify-end pt-4 pb-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
            >
              {t('buttons.backToTop')}
              <Icon
                name="arrow-up"
                className="transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </PageLayout>

    </div>
  );
}

export default ArticleDetailPage;
