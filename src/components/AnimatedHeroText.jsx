import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const inlineLinkPattern = /\[([^\]]+)\]\((route:(\/[^)]+)|href:([^)]+))\)/g;

export default function AnimatedHeroText({
  text,
  highlight,
  highlightClassName = '',
  highlightTo,
  highlightHref,
  linkClassName = '',
  className = '',
  lang = 'en',
}) {
  function renderHighlightedText(value, keyPrefix) {
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

    return parts;
  }

  return (
    <motion.p
      className={`hero-copy ${className}`.trim()}
      lang={lang}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {renderHeroContent(text)}
    </motion.p>
  );
}
