import { useEffect, useRef } from 'react';

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

        const maxDistance = 200;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const proximity = 1 - normalizedDistance;

        const weight = 400 - proximity * 200;
        const width = 100 + proximity * 25;
        const slant = proximity * -15;

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
