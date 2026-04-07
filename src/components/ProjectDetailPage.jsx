import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';

function ProjectDetailPage({ projectId, onBack }) {
  const { t } = useTranslation();
  const project = projects.find((p) => p.id === projectId);
  const tKey = project?.translationKey;

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          {t('projectDetail.notFound')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Back link */}
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          {t('buttons.backToProjects')}
        </button>
      </div>

      {/* Main content: two-column layout */}
      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: Project name */}
          <div className="flex flex-col gap-10 lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6">
              <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
                {t(`projects.${tKey}.name`)}
              </h1>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-fit inline-flex items-center justify-center md:justify-start gap-2 px-4 py-4 md:py-3 rounded border border-current text-base md:text-body hover:opacity-60 transition-opacity bg-primary-bg/50 dark:bg-border-dark/50 dark:text-text-primary-dark"
                >
                  {t('buttons.visitProject')}
                  <i className="ri-external-link-line text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Right column: Case study content */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div
              style={{ maxWidth: 'var(--max-width-reading)' }}
              className="flex flex-col gap-8"
            >
              {/* About the Client */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  {t('projectDetail.aboutClient')}
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {t(`projects.${tKey}.aboutClient`)}
                </p>
              </section>

              {/* Problem */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  {t('projectDetail.problem')}
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {t(`projects.${tKey}.problem`)}
                </p>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  {t('projectDetail.solution')}
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {t(`projects.${tKey}.solution`)}
                </p>
              </section>

              {/* Key Contributions */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  {t('projectDetail.keyContributions')}
                </h2>
                <ul className="text-body list-disc list-inside space-y-1 dark:text-text-secondary-dark">
                  {(
                    t(`projects.${tKey}.keyContributions`, {
                      returnObjects: true,
                    }) || []
                  ).map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </section>

              {/* Impact */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  {t('projectDetail.impact')}
                </h2>
                <ul className="text-body list-disc list-inside space-y-1 dark:text-text-secondary-dark">
                  {(
                    t(`projects.${tKey}.impact`, { returnObjects: true }) || []
                  ).map((impactItem, index) => (
                    <li key={index}>{impactItem}</li>
                  ))}
                </ul>
              </section>

              {/* Back to top — mobile only */}
              <div className="flex justify-end pt-4 pb-8 lg:hidden">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
                >
                  {t('buttons.backToTop')}
                  <i className="ri-arrow-up-line transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
