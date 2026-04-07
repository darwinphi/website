import { articles } from '../data/articles';

function ArticlesPage({ onSelectArticle, onBack }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: Heading */}
          <div className="flex items-start lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
              Articles, Tutorials & Resources
            </h1>
          </div>

          {/* Right column: Article list */}
          <div className="flex flex-col lg:col-span-2">
            <div style={{ maxWidth: 'var(--max-width-reading)' }}>
              {articles.map((article, index) => (
                <div key={article.id}>
                  <div className="py-6">
                    <p className="text-body opacity-50 mb-1 dark:text-text-secondary-dark">
                      {article.date}
                    </p>
                    <h2 className="text-body font-medium mb-3 dark:text-text-primary-dark">
                      {article.title}
                    </h2>
                    <p className="text-body opacity-60 mb-4 dark:text-text-secondary-dark">
                      {article.preview}
                    </p>
                    <button
                      onClick={() => onSelectArticle(article.id)}
                      className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5 group cursor-pointer dark:text-text-primary-dark"
                    >
                      Continue reading
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
