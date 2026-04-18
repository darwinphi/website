export default function PageSurface({
  children,
  variant = 'plain',
  fade = 'none',
  className = '',
  contentClassName = '',
}) {
  const surfaceClassName = [
    'page-surface',
    variant !== 'plain' ? `page-surface--${variant}` : '',
    fade !== 'none' ? `page-surface--fade-${fade}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClassNames = ['page-surface__content', contentClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={surfaceClassName}>
      {variant !== 'plain' && (
        <div
          aria-hidden="true"
          className="page-surface__grid pointer-events-none absolute inset-0"
        />
      )}
      <div className={contentClassNames}>{children}</div>
    </div>
  );
}
