import React from 'react';
import { useTranslation } from 'react-i18next';

function AboutPage({ onBack }) {
  const { t } = useTranslation();
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const imgRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Back button - aligned to about section */}
      <div className="py-4 flex justify-center">
        <div
          className="w-full"
          style={{ maxWidth: 'var(--max-width-reading)' }}
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

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div
          className="w-full"
          style={{ maxWidth: 'var(--max-width-reading)' }}
        >
          {/* Heading */}
          <h1 className="text-heading leading-tight font-normal text-center mb-12 dark:text-text-primary-dark">
            {t('pages.about.title')}
          </h1>

          {/* Profile Picture */}
          <div
            className="flex justify-center mb-12 cursor-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-48 sm:w-56 md:w-64 relative"
              style={{ overflow: 'hidden', borderRadius: '0.5rem' }}
            >
              {/* Grayscale base image */}
              <img
                src="/img/profile-picture.jpg"
                alt="Profile picture"
                className="w-full rounded-lg"
                style={{
                  filter: 'grayscale(100%) opacity(0.85)',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                }}
              />

              {/* Color reveal on hover */}
              {isHovering && (
                <img
                  ref={imgRef}
                  src="/img/profile-picture.jpg"
                  alt="Profile picture color"
                  className="w-full rounded-lg absolute inset-0"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    clipPath: `circle(60px at ${cursorPos.x}px ${cursorPos.y}px)`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              {t('pages.about.bio1')}
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              {t('pages.about.bio2')}
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              {t('pages.about.bio3')}
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              {t('pages.about.bio4')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
