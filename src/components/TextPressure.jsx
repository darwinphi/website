import { useEffect, useRef } from 'react';
import { TEXT_PRESSURE } from '../constants/ui';

export default function TextPressure({ text, className = '' }) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId = null;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!isAnimatingRef.current) return;

      charsRef.current.forEach((char) => {
        if (!char) return;

        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const deltaX = mousePos.current.x - charCenterX;
        const deltaY = mousePos.current.y - charCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const normalizedDistance = Math.min(
          distance / TEXT_PRESSURE.MAX_DISTANCE,
          1,
        );
        const proximity = 1 - normalizedDistance;

        const weight =
          TEXT_PRESSURE.BASE_WEIGHT - proximity * TEXT_PRESSURE.WEIGHT_RANGE;
        const width = 100 + proximity * TEXT_PRESSURE.WIDTH_RANGE;
        const slant = proximity * -TEXT_PRESSURE.SLANT_ANGLE;

        char.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}`;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const chars = text.split('');

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          style={{
            display: 'inline-block',
            transition: 'font-variation-settings 0.1s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  );
}
