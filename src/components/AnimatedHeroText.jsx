import { Fragment, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const inlineLinkPattern = /\[([^\]]+)\]\((route:(\/[^)]+)|href:([^)]+))\)/g;

export default function AnimatedHeroText({
  text,
  location,
  linkPhrasePrefix = '',
  linkPhraseSuffix = '',
  highlight,
  highlightClassName = '',
  highlightTo,
  highlightHref,
  linkClassName = '',
  className = '',
  lang = 'en',
}) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const hero = heroRef.current;
    const cleanups = [];
    let startDelay = 0;

    hero.querySelectorAll('p').forEach((paragraph, paragraphIndex) => {
      const bounds = paragraph.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      const lines = [];
      for (const rect of range.getClientRects()) {
        if (!rect.width || !rect.height) continue;
        const top = rect.top - bounds.top;
        const bottom = rect.bottom - bounds.top;
        const line = lines.find((item) => Math.abs(item.top - top) < 2);
        if (line) line.bottom = Math.max(line.bottom, bottom);
        else lines.push({ top, bottom });
      }
      lines.sort((a, b) => a.top - b.top);
      if (!lines.length) return;

      if (paragraphIndex > 0) {
        const animation = paragraph.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 1500, delay: startDelay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' },
        );
        const restore = () => animation.cancel();
        animation.onfinish = restore;
        cleanups.push(restore);
        startDelay += 1500;
        return;
      }

      const wipe = paragraphIndex === 0;
      const duration = wipe ? 900 : 1100;
      const stagger = wipe ? 100 : 140;
      const total = startDelay + duration + (lines.length - 1) * stagger;
      const direction = getComputedStyle(paragraph).direction === 'rtl' ? 'right' : 'left';
      paragraph.style.maskImage = lines.map(() => wipe
        ? 'linear-gradient(#000, #000)'
        : 'radial-gradient(ellipse closest-side, #000 99%, transparent 100%)').join(', ');
      paragraph.style.maskRepeat = 'no-repeat';
      const keyframes = Array.from({ length: 61 }, (_, frame) => {
        const time = total * frame / 60;
        return {
          maskSize: lines.map((line, index) => {
            const progress = Math.max(0, Math.min(1, (time - startDelay - index * stagger) / duration));
            const eased = 1 - (1 - progress) ** 3;
            const height = line.bottom - line.top + 4;
            return wipe ? `${eased * 100}% ${height}px` : `${eased * 150}% ${height * eased * 1.5}px`;
          }).join(', '),
          maskPosition: lines.map((line, index) => {
            const progress = Math.max(0, Math.min(1, (time - startDelay - index * stagger) / duration));
            const eased = 1 - (1 - progress) ** 3;
            const height = line.bottom - line.top + 4;
            return wipe
              ? `${direction} ${line.top - 2}px`
              : `center ${line.top - 2 + height / 2 - height * eased * 0.75}px`;
          }).join(', '),
        };
      });
      const animation = paragraph.animate(keyframes, { duration: total, fill: 'both' });
      const clearMask = () => {
        paragraph.style.removeProperty('mask-image');
        paragraph.style.removeProperty('mask-repeat');
        paragraph.style.removeProperty('mask-position');
        animation.cancel();
      };
      animation.onfinish = clearMask;
      cleanups.push(clearMask);
      startDelay = total;
    });

    const showText = () => cleanups.forEach((cleanup) => cleanup());
    window.addEventListener('resize', showText, { once: true });
    hero.addEventListener('focusin', showText, { once: true });
    return () => {
      window.removeEventListener('resize', showText);
      hero.removeEventListener('focusin', showText);
      showText();
    };
  }, [text, lang]);

  function renderRoleText(value, keyPrefix) {
    const highlightIndex = highlight ? value.indexOf(highlight) : -1;

    if (highlightIndex < 0) {
      return value;
    }

    return (
      <Fragment key={keyPrefix}>
        {value.slice(0, highlightIndex)}
        {highlightTo ? (
          <Link
            to={highlightTo}
            className={`${linkClassName} ${highlightClassName}`.trim()}
          >
            {highlight}
          </Link>
        ) : highlightHref ? (
          <a
            href={highlightHref}
            className={`${linkClassName} ${highlightClassName}`.trim()}
          >
            {highlight}
          </a>
        ) : (
          <span className={highlightClassName}>{highlight}</span>
        )}
        {value.slice(highlightIndex + highlight.length)}
      </Fragment>
    );
  }

  function renderHighlightedText(value, keyPrefix) {
    const locationIndex = location ? value.indexOf(location) : -1;

    if (locationIndex < 0) {
      return renderRoleText(value, keyPrefix);
    }

    return (
      <Fragment key={keyPrefix}>
        {renderRoleText(value.slice(0, locationIndex), `${keyPrefix}-before`)}
        <span className="hero-location">{location}</span>
        {renderRoleText(value.slice(locationIndex + location.length), `${keyPrefix}-after`)}
      </Fragment>
    );
  }

  function renderHeroContent(value) {
    if (typeof value !== 'string') {
      return value;
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = inlineLinkPattern.exec(value)) !== null) {
      const [fullMatch, label, routeDescriptor, routeTo, href] = match;

      if (match.index > lastIndex) {
        parts.push(
          renderHighlightedText(
            value.slice(lastIndex, match.index),
            `text-${match.index}`,
          ),
        );
      }

      if (routeDescriptor.startsWith('route:')) {
        parts.push(
          <Link
            key={`link-${routeTo}-${match.index}`}
            to={routeTo}
            className={linkClassName}
          >
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`link-${href}-${match.index}`}
            href={href}
            className={linkClassName}
          >
            {label}
          </a>,
        );
      }

      lastIndex = match.index + fullMatch.length;
    }

    if (parts.length === 0) {
      return renderHighlightedText(value, 'full-text');
    }

    if (lastIndex < value.length) {
      parts.push(
        renderHighlightedText(value.slice(lastIndex), `text-${lastIndex}`),
      );
    }

    // Preserve the translated phrase while letting it wrap at the same size
    // as the surrounding copy. Individual link labels remain unbroken.
    const projectIndex = parts.findIndex((part) => part?.props?.to === '/projects');
    const articleIndex = parts.findIndex((part) => part?.props?.to === '/articles');
    if (projectIndex >= 0 && articleIndex > projectIndex) {
      const pairParts = parts.slice(projectIndex, articleIndex + 1);
      const linkedPhrase = [];
      const before = parts[projectIndex - 1];
      const after = parts[articleIndex + 1];
      if (linkPhrasePrefix && typeof before === 'string' && before.endsWith(linkPhrasePrefix)) {
        parts[projectIndex - 1] = before.slice(0, -linkPhrasePrefix.length);
        linkedPhrase.unshift(linkPhrasePrefix);
      }
      if (linkPhraseSuffix && typeof after === 'string' && after.startsWith(linkPhraseSuffix)) {
        parts[articleIndex + 1] = after.slice(linkPhraseSuffix.length);
        pairParts.push(linkPhraseSuffix);
      }
      linkedPhrase.push(
        <span className="hero-cat-links__pair" key="project-article-pair">{pairParts}</span>,
      );
      parts.splice(
        projectIndex,
        articleIndex - projectIndex + 1,
        <span className="hero-cat-links" key="project-article-links">{linkedPhrase}</span>,
      );
    }

    return parts;
  }

  return (
    <div
      ref={heroRef}
      className={`hero-copy ${className}`.trim()}
      lang={lang}
    >
      {(typeof text === 'string' ? text.split(/\n\s*\n/) : [text]).map(
        (paragraph, index) => <p key={index}>{renderHeroContent(paragraph)}</p>,
      )}
    </div>
  );
}
