import { useTranslation } from 'react-i18next';

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

  const translatedBlockIndex =
    section.blocks
      .slice(0, blockIndex + 1)
      .filter((entry) => entry.type !== 'code').length - 1;

  const translatedValue =
    block.type === 'code'
      ? block.value
      : translatedBlocks[translatedBlockIndex] || block.value;

  switch (block.type) {
    case 'code':
      return (
        <pre
          key={blockIndex}
          className="bg-black/5 dark:bg-white/10 rounded-md p-4 overflow-x-auto"
        >
          <code
            className="font-mono dark:text-text-primary-dark"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
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
          {translatedValue}
        </p>
      );

    default:
      return (
        <p key={blockIndex} className="text-body dark:text-text-secondary-dark">
          {translatedValue}
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
