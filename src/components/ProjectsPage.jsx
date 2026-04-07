import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';

function ProjectsPage({ onSelectProject, onBack }) {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex flex-col">
      {/* Back button - aligned to left column */}
      <div className="py-4">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          <button
            onClick={onBack}
            className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark w-fit"
          >
            <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
            {t('buttons.backToHome')}
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: Heading */}
          <div className="flex flex-col gap-4 items-start md:col-span-1 lg:col-span-1 md:sticky md:top-24 lg:sticky lg:top-24 md:self-start lg:self-start">
            <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
              {t('pages.projects.title')}
            </h1>
          </div>

          {/* Right column: Project list */}
          <div className="flex flex-col md:col-span-1 lg:col-span-2">
            <div style={{ maxWidth: 'var(--max-width-reading)' }}>
              {projects.map((project, index) => (
                <div key={project.id}>
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className={`w-full text-left ${index === 0 ? '' : 'pt-6'} pb-6 group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-body font-medium mb-2 group-hover:opacity-60 transition-opacity dark:text-text-primary-dark">
                          {t(`projects.${project.translationKey}.name`)}
                        </h2>
                        <p className="text-body opacity-60 dark:text-text-secondary-dark">
                          {t(`projects.${project.translationKey}.description`)}
                        </p>
                      </div>
                      <i className="ri-arrow-right-line text-body shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                    </div>
                  </button>
                  {index < projects.length - 1 && (
                    <div className="h-px bg-current opacity-20" />
                  )}
                </div>
              ))}{' '}
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
