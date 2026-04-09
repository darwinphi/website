import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import PageLayout from './PageLayout';

function ProjectsPage({ onSelectProject, onBack }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.resolvedLanguage || i18n.language) === 'rtl';

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
            className={`w-full text-start ${index === 0 ? '' : 'pt-6'} pb-6 group cursor-pointer`}
            aria-label={`${t('buttons.visitProject')}: ${t(`projects.${project.translationKey}.name`)}`}
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
              <i
                className={`text-body shrink-0 transition-transform duration-200 ${
                  isRtl
                    ? 'ri-arrow-left-line group-hover:-translate-x-1 group-active:-translate-x-1'
                    : 'ri-arrow-right-line group-hover:translate-x-1 group-active:translate-x-1'
                }`}
              />
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
