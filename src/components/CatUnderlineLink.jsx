import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CAT_VARIANTS = {
  tabby: {
    spriteUrl: '/img/orange-tabby-hanging-sprites-v2.png',
    duration: 1.28,
    viewBox: '0 -4 100 16',
    lineFrames: [2, 14, -4, 6, 0, 3, 2].map((depth) => `M 0 2 Q 50 ${depth} 100 2`),
    times: [0, 0.375, 0.56, 0.72, 0.84, 0.93, 1],
    playAnimation: 'articles-cat-play',
  },
  shorthair: {
    spriteUrl: '/img/gray-british-shorthair-hanging-sprites.png',
    duration: 1.6,
    viewBox: '0 -4 100 16',
    lineFrames: [2, 16, -6, 8, 0, 4, 2].map((depth) => `M 0 2 Q 50 ${depth} 100 2`),
    times: [0, 0.25, 0.43, 0.59, 0.73, 0.86, 1],
    playAnimation: 'projects-cat-play',
  },
};
const FLAT_LINE = 'M 0 2 Q 50 2 100 2';

export default function CatUnderlineLink({ children, to, cat = 'tabby', className = '' }) {
  const variant = CAT_VARIANTS[cat];
  const linkRef = useRef(null);
  const inView = useInView(linkRef);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [imageReady, setImageReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const running = inView && tabVisible;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setImageReady(true);
    image.onerror = () => setImageReady(false);
    image.src = variant.spriteUrl;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [variant.spriteUrl]);

  useEffect(() => {
    const updateVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  function play() {
    if (imageReady && running && !reducedMotion && !playing) setPlaying(true);
  }

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`${className} cat-underline-link cat-underline-link--${cat}${imageReady ? ' cat-underline-link--ready' : ''}`.trim()}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') play();
      }}
      onFocus={play}
    >
      <span className="cat-underline-link__label">
        {children}
        {imageReady && (
          <span
            className="cat-underline-link__decoration"
            aria-hidden="true"
            data-playing={playing && !reducedMotion}
            data-running={running}
            data-reduced-motion={reducedMotion}
          >
            <svg className="cat-underline-link__underline" viewBox={variant.viewBox} preserveAspectRatio="none">
              <motion.path
                initial={false}
                animate={{ d: playing && running && !reducedMotion ? variant.lineFrames : FLAT_LINE }}
                transition={{ duration: reducedMotion ? 0 : variant.duration, times: variant.times, ease: 'easeInOut' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="cat-underline-link__cat">
              <span
                className="cat-underline-link__sprite"
                onAnimationEnd={(event) => {
                  if (event.animationName === variant.playAnimation) setPlaying(false);
                }}
              />
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}
