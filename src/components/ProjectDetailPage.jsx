import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import PageLayout from './PageLayout';

function ProjectDetailPage({ projectId, onBack }) {
  const { t } = useTranslation();
  const project = projects.find((p) => p.id === projectId);
  const tKey = project?.translationKey;
  const projectRole = t(`projects.${tKey}.role`, {
    defaultValue: project?.role,
  });

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          {t('projectDetail.notFound')}
        </p>
      </div>
    );
  }

  const heading = (
    <div className="flex flex-col gap-4 sm:gap-5">
      <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
        {t(`projects.${tKey}.name`)}
      </h1>
      <p className="text-[0.84em] tracking-[0.02em] opacity-45 dark:text-text-secondary-dark">
        {projectRole}
      </p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 border-b border-current/25 pb-1 text-body transition-opacity hover:opacity-65 dark:border-white/15 dark:text-text-primary-dark"
        >
          {t('buttons.visitProject')}
          <Icon name="external-link" className="text-[0.9em]" />
        </a>
      )}
    </div>
  );

  const sectionTitleClass =
    'mb-3 text-[0.9em] font-medium tracking-[0.02em] opacity-85 dark:text-text-primary-dark';
  const sectionBodyClass = 'text-body dark:text-text-secondary-dark';
  const listItemClass =
    'relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-current before:opacity-35';

  return (
    <PageLayout
      heading={heading}
      onBack={onBack}
      backButtonLabel={t('buttons.backToProjects')}
      surfaceVariant="plain"
    >
      <div className="flex flex-col">
        {/* About the Client */}
        <section className="pb-7">
          <h2 className={sectionTitleClass}>
            {t('projectDetail.aboutClient')}
          </h2>
          <p className={sectionBodyClass}>
            {t(`projects.${tKey}.aboutClient`)}
          </p>
        </section>

        {/* Problem */}
        <section className="border-t border-dotted border-current/20 py-7 dark:border-white/10">
          <h2 className={sectionTitleClass}>
            {t('projectDetail.problem')}
          </h2>
          <p className={sectionBodyClass}>
            {t(`projects.${tKey}.problem`)}
          </p>
        </section>

        {/* Solution */}
        <section className="border-t border-dotted border-current/20 py-7 dark:border-white/10">
          <h2 className={sectionTitleClass}>
            {t('projectDetail.solution')}
          </h2>
          <p className={sectionBodyClass}>
            {t(`projects.${tKey}.solution`)}
          </p>
        </section>

        {/* Key Contributions */}
        <section className="border-t border-dotted border-current/20 py-7 dark:border-white/10">
          <h2 className={sectionTitleClass}>
            {t('projectDetail.keyContributions')}
          </h2>
          <ul className={`${sectionBodyClass} space-y-2`}>
            {(
              t(`projects.${tKey}.keyContributions`, {
                returnObjects: true,
              }) || []
            ).map((contribution, index) => (
              <li key={index} className={listItemClass}>
                {contribution}
              </li>
            ))}
          </ul>
        </section>

        {/* Impact */}
        <section className="border-t border-dotted border-current/20 py-7 dark:border-white/10">
          <h2 className={sectionTitleClass}>
            {t('projectDetail.impact')}
          </h2>
          <ul className={`${sectionBodyClass} space-y-2`}>
            {(t(`projects.${tKey}.impact`, { returnObjects: true }) || []).map(
              (impactItem, index) => (
                <li key={index} className={listItemClass}>
                  {impactItem}
                </li>
              ),
            )}
          </ul>
        </section>

        {/* Back to top — mobile only */}
        <div className="flex justify-end border-t border-dotted border-current/20 pt-6 pb-8 dark:border-white/10 lg:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
          >
            {t('buttons.backToTop')}
            <Icon
              name="arrow-up"
              className="transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProjectDetailPage;
