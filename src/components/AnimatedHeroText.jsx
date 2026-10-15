import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WavingFlag from './WavingFlag';

const inlineLinkPattern = /\[([^\]]+)\]\((route:(\/[^)]+)|href:([^)]+))\)/g;

export default function AnimatedHeroText({
  text,
  location,
  highlight,
  highlightClassName = '',
  highlightTo,
  highlightHref,
  linkClassName = '',
  className = '',
  lang = 'en',
}) {
  const [locationHovered, setLocationHovered] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

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
        <span
          className="hero-location"
          tabIndex={0}
          onMouseEnter={() => setLocationHovered(true)}
          onMouseLeave={() => setLocationHovered(false)}
          onFocus={() => setLocationFocused(true)}
          onBlur={() => setLocationFocused(false)}
        >
          {location}
          <span className="hero-location__flag" aria-hidden="true">
            <WavingFlag active={locationHovered || locationFocused} />
          </span>
        </span>
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
