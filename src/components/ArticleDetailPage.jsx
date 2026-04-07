import { articles } from '../data/articles';

function ArticleDetailPage({ articleId, onBack }) {
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          Article not found
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          Back to Articles
        </button>
      </div>

      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: title, date, tags, TOC */}
          <div className="flex flex-col gap-4 lg:col-span-1 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
              {article.title}
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
                  Contents
                </p>
                {article.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block leading-snug py-0.5 hover:opacity-60 transition-opacity dark:text-text-secondary-dark ${
                      item.isGroup
                        ? 'font-medium mt-2 dark:text-text-primary-dark'
                        : 'opacity-60 pl-3'
                    }`}
                    style={{
                      fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Right column: article sections */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div
              style={{ maxWidth: 'var(--max-width-reading)' }}
              className="flex flex-col gap-6"
            >
              {article.sections.map((section, index) => (
                <section key={index} id={section.id} className="scroll-mt-24">
                  {section.heading && (
                    <h2
                      className={`text-body mb-3 dark:text-text-primary-dark ${
                        section.isGroupLabel
                          ? 'font-bold opacity-50'
                          : 'font-bold'
                      }`}
                    >
                      {section.heading}
                    </h2>
                  )}
                  {section.blocks && (
                    <div className="flex flex-col gap-3">
                      {section.blocks.map((block, blockIndex) => {
                        if (block.type === 'code') {
                          return (
                            <pre
                              key={blockIndex}
                              className="bg-black/5 dark:bg-white/10 rounded-md p-4 overflow-x-auto"
                            >
                              <code
                                className="font-mono dark:text-text-primary-dark"
                                style={{
                                  fontSize:
                                    'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
                                }}
                              >
                                {block.value}
                              </code>
                            </pre>
                          );
                        }
                        if (block.type === 'subheading') {
                          return (
                            <p
                              key={blockIndex}
                              className="text-body font-semibold mt-2 dark:text-text-primary-dark"
                            >
                              {block.value}
                            </p>
                          );
                        }
                        return (
                          <p
                            key={blockIndex}
                            className="text-body dark:text-text-secondary-dark"
                          >
                            {block.value}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </section>
              ))}

              {/* Back to top */}
              <div className="flex justify-end pt-4 pb-8">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
                >
                  Back to top
                  <i className="ri-arrow-up-line transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailPage;
