import { Fragment, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CatUnderlineLink from './CatUnderlineLink';
import useCatLinkClearance from '../hooks/useCatLinkClearance';

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
  useCatLinkClearance(heroRef, text);

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
          (routeTo === '/articles' || routeTo === '/projects') ? (
            <CatUnderlineLink
              key={`link-${routeTo}-${match.index}`}
              to={routeTo}
              cat={routeTo === '/projects' ? 'shorthair' : 'tabby'}
              className={linkClassName}
            >
              {label}
            </CatUnderlineLink>
          ) : <Link
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
    <motion.div
      ref={heroRef}
      className={`hero-copy ${className}`.trim()}
      lang={lang}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {(typeof text === 'string' ? text.split(/\n\s*\n/) : [text]).map(
        (paragraph, index) => <p key={index}>{renderHeroContent(paragraph)}</p>,
      )}
    </motion.div>
  );
}
