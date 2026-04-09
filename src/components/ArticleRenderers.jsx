import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function renderInlineArticleLinks(text) {
  if (typeof text !== 'string') {
    return text;
  }

  const articleLinkPattern = /\[([^\]]+)\]\(article:([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = articleLinkPattern.exec(text)) !== null) {
    const [fullMatch, label, articleId] = match;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <Link
        key={`${articleId}-${match.index}`}
        to={`/articles/${articleId}`}
        className="underline underline-offset-2 hover:opacity-60 transition-opacity"
      >
        {label}
      </Link>,
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (parts.length === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function BlockRenderer({
  block,
  blockIndex,
  section,
  article,
  translatedSections,
}) {
  const { t } = useTranslation();

  const translatedBlocks = Array.isArray(
    translatedSections?.[section.id]?.blocks,
  )
    ? translatedSections[section.id].blocks
    : [];
  const translatedAllBlocks = Array.isArray(
    translatedSections?.[section.id]?.blocksAll,
  )
    ? translatedSections[section.id].blocksAll
    : null;

  const translatedBlockIndex =
    section.blocks
      .slice(0, blockIndex + 1)
      .filter((entry) => entry.type !== 'code').length - 1;

  const translatedValue =
    translatedAllBlocks?.[blockIndex] ||
    (block.type === 'code'
      ? block.value
      : translatedBlocks[translatedBlockIndex] || block.value);

  switch (block.type) {
    case 'code':
      return (
        <pre
          key={blockIndex}
          className="bg-black/5 dark:bg-white/10 rounded-md p-4 overflow-x-auto text-left"
          dir="ltr"
        >
          <code
            className="font-mono dark:text-text-primary-dark"
            dir="ltr"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
              unicodeBidi: 'isolate',
            }}
          >
            {translatedValue}
          </code>
        </pre>
      );

    case 'subheading':
      return (
        <p
          key={blockIndex}
          className="text-body font-semibold mt-2 dark:text-text-primary-dark"
        >
          {renderInlineArticleLinks(translatedValue)}
        </p>
      );

    case 'list-item':
      return (
        <p
          key={blockIndex}
          className="text-body dark:text-text-secondary-dark relative"
          style={{ paddingInlineStart: '1.25rem' }}
        >
          <span
            aria-hidden="true"
            className="absolute top-0"
            style={{ insetInlineStart: 0 }}
          >
            •
          </span>
          {renderInlineArticleLinks(translatedValue)}
        </p>
      );

    case 'blockquote':
      return (
        <blockquote
          key={blockIndex}
          className="text-body italic border-current/40 py-1 dark:text-text-secondary-dark"
          style={{
            borderInlineStartWidth: '2px',
            borderInlineStartStyle: 'solid',
            paddingInlineStart: '1rem',
          }}
        >
          {renderInlineArticleLinks(translatedValue)}
        </blockquote>
      );

    default:
      return (
        <p key={blockIndex} className="text-body dark:text-text-secondary-dark">
          {renderInlineArticleLinks(translatedValue)}
        </p>
      );
  }
}

export function SectionRenderer({
  section,
  index,
  article,
  translatedSections,
}) {
  const { t } = useTranslation();

  return (
    <section key={index} id={section.id} className="scroll-mt-24">
      {section.heading && (
        <h2
          className={`text-body mb-3 dark:text-text-primary-dark ${
            section.isGroupLabel ? 'font-bold opacity-50' : 'font-bold'
          }`}
        >
          {t(`articleContent.${article.id}.headings.${section.id}`, {
            defaultValue: section.heading,
          })}
        </h2>
      )}
      {section.blocks && (
        <div className="flex flex-col gap-3">
          {section.blocks.map((block, blockIndex) => (
            <BlockRenderer
              key={blockIndex}
              block={block}
              blockIndex={blockIndex}
              section={section}
              article={article}
              translatedSections={translatedSections}
            />
          ))}
        </div>
      )}
    </section>
  );
}
