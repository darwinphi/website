import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const STRIPS = 60;
const FADE_MS = 250;
const STRIP_INDICES = Array.from({ length: STRIPS }, (_, index) => index);

function starPoints(x, y, angle) {
  return Array.from({ length: 10 }, (_, point) => {
    const radius = point % 2 === 0 ? 6 : 2.5;
    const direction = angle + point * Math.PI / 5;
    return `${x + Math.cos(direction) * radius},${y + Math.sin(direction) * radius}`;
  }).join(' ');
}

// Deform only the cloth. The outer text mask never moves with these strips.
function drawFlag(group, bounds, time, reducedMotion) {
  const wind = 0.8 + Math.sin(time * 0.6) * 0.12;
  const wave = (u) => reducedMotion ? 0 : Math.pow(u, 1.25) * wind * (
    Math.sin(u * 8 - time * 3.2) * 5
    + Math.sin(u * 13 - time * 4.7 + 0.8) * 1.3
  );
  let x = 0;
  for (const [index, strip] of [...group.children].entries()) {
    const u = index / STRIPS;
    const nextU = (index + 1) / STRIPS;
    const z = wave(u);
    const nextZ = wave(nextU);
    const slope = (nextZ - z) / 2;
    const width = 2 / Math.sqrt(1 + slope * slope);
    const top = z + u * u * 1.5;
    const nextTop = nextZ + nextU * nextU * 1.5;
    const flutter = reducedMotion ? 0 : Math.sin(u * 8 - time * 3.2 + 0.5) * u * 0.025;
    strip.setAttribute('transform', `matrix(1 ${(nextTop - top) / width} 0 ${1 + flutter} ${x} ${top})`);
    strip.firstElementChild.setAttribute('width', width + 0.3);
    const shade = strip.lastElementChild;
    shade.setAttribute('width', width + 0.3);
    shade.setAttribute('fill', slope > 0 ? '#000' : '#fff');
    shade.setAttribute('opacity', Math.min(0.23, Math.abs(slope) * 0.25) * (slope > 0 ? 1 : 0.6));
    x += width;
  }
  // Overscan covers the letter edges at every wave phase. Normalize the
  // foreshortened width so the free edge can never uncover the final letter.
  const padX = bounds.width * 0.04;
  const padY = bounds.height * 0.25;
  group.setAttribute('transform', `translate(${bounds.x - padX} ${bounds.y - padY}) scale(${(bounds.width + padX * 2) / x} ${(bounds.height + padY * 2) / 60})`);
}

export default function WavingFlag({ active = false, text, lang }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rootRef = useRef(null);
  const sourceRef = useRef(null);
  const baselineRef = useRef(null);
  const svgRef = useRef(null);
  const maskTextRef = useRef(null);
  const clothRef = useRef(null);
  const boundsRef = useRef(null);
  const elapsedRef = useRef(0);
  const touchRef = useRef(false);
  const inView = useInView(rootRef);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const enabled = active || hovered || focused;
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    let disposed = false;
    const root = rootRef.current;
    function measure() {
      if (disposed) return;
      try {
        const box = root.getBoundingClientRect();
        const width = sourceRef.current.getBoundingClientRect().width;
        if (width <= 0 || box.height <= 0) {
          setReady(false);
          return;
        }
        const baseline = baselineRef.current.getBoundingClientRect().top - box.top;
        const rtl = getComputedStyle(root).direction === 'rtl';
        const maskText = maskTextRef.current;
        svgRef.current.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
        maskText.setAttribute('x', rtl ? width : 0);
        maskText.setAttribute('y', baseline);
        maskText.setAttribute('direction', rtl ? 'rtl' : 'ltr');
        maskText.setAttribute('textLength', width);
        const bounds = maskText.getBBox();
        if (bounds.width <= 0 || bounds.height <= 0) {
          setReady(false);
          return;
        }
        boundsRef.current = bounds;
        drawFlag(clothRef.current, bounds, elapsedRef.current, reducedMotion);
        setReady(true);
      } catch {
        setReady(false);
      }
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts.ready.then(measure);
    document.fonts.addEventListener('loadingdone', measure);
    return () => {
      disposed = true;
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', measure);
    };
  }, [text, lang, reducedMotion]);

  useEffect(() => {
    if (!ready || !inView || !tabVisible) return;
    let frame;
    let previous;
    const started = performance.now();
    function animate(now) {
      if (previous !== undefined) elapsedRef.current += Math.min(now - previous, 40) / 1000;
      previous = now;
      try {
        drawFlag(clothRef.current, boundsRef.current, elapsedRef.current, reducedMotion);
      } catch {
        setReady(false);
        return;
      }
      // Continue through the exit fade, then leave the hidden SVG still.
      if (!reducedMotion && (enabled || now - started < FADE_MS)) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [enabled, ready, inView, tabVisible, reducedMotion]);

  return (
    <span
      ref={rootRef}
      className="hero-location__anchor"
      lang={lang}
      tabIndex={0}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(event) => {
        touchRef.current = event.pointerType === 'touch';
        if (touchRef.current) {
          setHovered(false);
          setFocused(false);
        }
      }}
      onFocus={(event) => setFocused(!touchRef.current && event.currentTarget.matches(':focus-visible'))}
      onKeyDown={() => {
        touchRef.current = false;
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      data-flag-active={Boolean(enabled && ready)}
      data-flag-ready={ready}
      data-flag-running={Boolean(enabled && ready && inView && tabVisible && !reducedMotion)}
    >
      <span ref={sourceRef} className="hero-location__country">{text}</span>
      <span ref={baselineRef} className="hero-location__baseline" aria-hidden="true" />
      <svg ref={svgRef} className="hero-location__flag-fill" aria-hidden="true" focusable="false">
        <defs>
          <g id={`${id}-art`}>
            <path fill="#0038a8" d="M0 0h240v60H0z" />
            <path fill="#ce1126" d="M0 60h240v60H0z" />
            <path fill="#fff" d="M0 0 104 60 0 120Z" />
            <g fill="#fcd116">
              <circle cx="35" cy="60" r="9" />
              {Array.from({ length: 8 }, (_, ray) => (
                <path key={ray} d="M42 58 52 59 54 60 52 61 42 62Z" transform={`rotate(${ray * 45} 35 60)`} />
              ))}
              {[[12, 16, -Math.PI / 2], [12, 104, Math.PI / 2], [83, 60, 0]].map(([x, y, angle]) => (
                <polygon key={y} points={starPoints(x, y, angle)} />
              ))}
            </g>
          </g>
          <mask id={`${id}-letters`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="120%" height="140%" style={{ maskType: 'alpha' }}>
            <text ref={maskTextRef} fill="#fff" textAnchor="start" lengthAdjust="spacingAndGlyphs" className="hero-location__mask-text">{text}</text>
          </mask>
        </defs>
        <g mask={`url(#${id}-letters)`}>
          <g ref={clothRef}>
            {STRIP_INDICES.map((index) => (
              <g key={index}>
                <svg viewBox={`${index * 4} 0 4 120`} width="2.3" height="60" preserveAspectRatio="none">
                  <use href={`#${id}-art`} />
                </svg>
                <rect width="2.3" height="60" opacity="0" />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </span>
  );
}
