import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import PageSurface from './PageSurface';

/**
 * PageLayout Component
 * Shared layout structure for list pages (Projects, Articles)
 * - Back button in sticky header
 * - Two-column grid: heading (left) + content (right)
 * - Responsive: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 */

export default function PageLayout({
  heading,
  onBack,
  children,
  backButtonLabel,
  surfaceVariant = 'edge-grid',
  surfaceFade = 'soft',
}) {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';

  return (
    <PageSurface
      variant={surfaceVariant}
      fade={surfaceFade}
      className="flex-1 flex flex-col"
      contentClassName="flex flex-1 flex-col"
    >
      {/* Back button - aligned to left column */}
      <div className="py-4">
        <div
          className="page-layout-grid w-full mx-auto"
          style={{ maxWidth: 'var(--max-width-page-layout)' }}
        >
          <button
            onClick={onBack}
            className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark w-fit"
          >
            <Icon
              name={isRtl ? 'arrow-right' : 'arrow-left'}
              className={`transition-transform duration-200 ${
                isRtl
                  ? 'group-hover:translate-x-1 group-active:translate-x-1'
                  : 'group-hover:-translate-x-1 group-active:-translate-x-1'
              }`}
            />
            {backButtonLabel}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-start py-8">
        <div
          className="page-layout-grid w-full mx-auto"
          style={{ maxWidth: 'var(--max-width-page-layout)' }}
        >
          {/* Left column: Heading (sticky on desktop) */}
          <div className="flex flex-col gap-4 items-start md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-2">
            {heading}
          </div>

          {/* Right column: Content */}
          <div className="flex flex-col">
            <div style={{ maxWidth: 'var(--max-width-page-content)' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </PageSurface>
  );
}
