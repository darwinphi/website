import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import PageLayout from './PageLayout';

function ProjectsPage({ onSelectProject, onBack }) {
  const { t } = useTranslation();

  const heading = (
    <h1 className="text-heading leading-tight font-normal dark:text-text-primary-dark">
      {t('pages.projects.title')}
    </h1>
  );

  return (
    <PageLayout
      heading={heading}
      onBack={onBack}
      backButtonLabel={t('buttons.backToHome')}
    >
      {projects.map((project, index) => (
        <div key={project.id}>
          <button
            onClick={() => onSelectProject(project.id)}
            className={`w-full text-left ${index === 0 ? '' : 'pt-6'} pb-6 group cursor-pointer`}
            aria-label={`View project: ${t(`projects.${project.translationKey}.name`)}`}
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
      ))}
    </PageLayout>
  );
}

export default ProjectsPage;
