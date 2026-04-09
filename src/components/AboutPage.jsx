import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGE_ZOOM } from '../constants/ui';

function AboutPage({ onBack }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartTime = useRef(null);

  useEffect(() => {
    // Small delay to ensure animation registers
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTapped) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsTapped(false);
      }
    };

    // Use 'click' event for better UX (only fires on complete click)
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isTapped]);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    // Clamp cursor position to prevent circle from extending beyond image edges
    const x = Math.max(
      IMAGE_ZOOM.CIRCLE_RADIUS + IMAGE_ZOOM.ZOOM_BUFFER,
      Math.min(
        e.clientX - rect.left,
        rect.width - IMAGE_ZOOM.CIRCLE_RADIUS - IMAGE_ZOOM.ZOOM_BUFFER,
      ),
    );
    const y = Math.max(
      IMAGE_ZOOM.CIRCLE_RADIUS + IMAGE_ZOOM.ZOOM_BUFFER,
      Math.min(
        e.clientY - rect.top,
        rect.height - IMAGE_ZOOM.CIRCLE_RADIUS - IMAGE_ZOOM.ZOOM_BUFFER,
      ),
    );

    setCursorPos({
      x,
      y,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleTouchMove = (e) => {
    if (!imgRef.current || e.touches.length === 0) return;
    const rect = imgRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    const x = Math.max(
      IMAGE_ZOOM.CIRCLE_RADIUS + IMAGE_ZOOM.ZOOM_BUFFER,
      Math.min(
        touch.clientX - rect.left,
        rect.width - IMAGE_ZOOM.CIRCLE_RADIUS - IMAGE_ZOOM.ZOOM_BUFFER,
      ),
    );
    const y = Math.max(
      IMAGE_ZOOM.CIRCLE_RADIUS + IMAGE_ZOOM.ZOOM_BUFFER,
      Math.min(
        touch.clientY - rect.top,
        rect.height - IMAGE_ZOOM.CIRCLE_RADIUS - IMAGE_ZOOM.ZOOM_BUFFER,
      ),
    );

    setIsTouching(true);
    setCursorPos({ x, y });
  };

  const handleTouchStart = (e) => {
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    const touchDuration = Date.now() - touchStartTime.current;
    // If touch duration is less than 300ms, consider it a tap
    if (touchDuration < 300) {
      setIsTapped(!isTapped);
    }
    setIsTouching(false);
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
            <i
              className={`transition-transform duration-200 ${
                isRtl
                  ? 'ri-arrow-right-line group-hover:translate-x-1 group-active:translate-x-1'
                  : 'ri-arrow-left-line group-hover:-translate-x-1 group-active:-translate-x-1'
              }`}
            />
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
          <div className={`flex justify-center mb-12`}>
            <div
              ref={containerRef}
              className={`w-48 sm:w-56 md:w-64 relative ${isHovering || isTouching ? 'cursor-none' : ''}`}
              style={{
                overflow: 'hidden',
                borderRadius: '0.5rem',
                boxShadow:
                  isHovering || isTouching || isTapped
                    ? '0 10px 30px rgba(0, 0, 0, 0.15)'
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.2s ease-out',
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Grayscale base image */}
              <img
                src="/img/profile-picture-v3.jpg"
                alt="Profile picture"
                className={`w-full rounded-lg select-none`}
                draggable="false"
                loading="lazy"
                decoding="async"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  filter: 'grayscale(100%) opacity(0.85)',
                  transform: isHovering
                    ? `scale(${IMAGE_ZOOM.ZOOM_SCALE})`
                    : isLoaded
                      ? 'scale(1)'
                      : 'scale(1.2)',
                  opacity: isLoaded ? 1 : 0,
                  transition:
                    isHovering || isTouching
                      ? 'transform 0.2s ease-out, opacity 1.2s ease-out'
                      : !isLoaded
                        ? 'transform 1.0s ease-out, opacity 1.2s ease-out'
                        : 'transform 0.3s ease-out, opacity 1.2s ease-out',
                  transformOrigin:
                    isLoaded && (isHovering || isTouching)
                      ? `${cursorPos.x}px ${cursorPos.y}px`
                      : 'center',
                }}
              />

              {/* Color reveal on hover or touch */}
              {(isHovering || isTouching || isTapped) && (
                <img
                  ref={imgRef}
                  src="/img/profile-picture-v3.jpg"
                  alt="Profile picture color"
                  className="w-full rounded-lg absolute inset-0 select-none"
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    clipPath: `circle(${IMAGE_ZOOM.CIRCLE_RADIUS}px at ${cursorPos.x}px ${cursorPos.y}px)`,
                    transform:
                      isHovering || isTouching
                        ? `scale(${IMAGE_ZOOM.ZOOM_SCALE})`
                        : 'scale(1)',
                    opacity: isLoaded ? 1 : 0,
                    transition: isLoaded
                      ? 'opacity 1.2s ease-out, transform 0.2s ease-out'
                      : 'none',
                    transformOrigin: `${cursorPos.x}px ${cursorPos.y}px`,
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
