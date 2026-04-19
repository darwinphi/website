import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
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
      surfaceVariant="plain"
    >
      {projects.map((project, index) => (
        <div key={project.id}>
          <button
            onClick={() => onSelectProject(project.id)}
            className={`w-full text-start ${index === 0 ? '' : 'pt-6 sm:pt-7'} pb-6 sm:pb-7 group cursor-pointer transition-opacity duration-200 hover:opacity-90 focus-visible:opacity-90`}
            aria-label={`${t('buttons.visitProject')}: ${t(`projects.${project.translationKey}.name`)}`}
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex-1">
                <h2 className="text-[1.02rem] leading-snug font-medium mb-1 text-current transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80 dark:text-text-primary-dark md:text-[1.08rem]">
                  {t(`projects.${project.translationKey}.name`)}
                </h2>
                <p className="text-[0.79em] tracking-[0.02em] opacity-40 mb-2.5 dark:text-text-secondary-dark">
                  {t(`projects.${project.translationKey}.role`, {
                    defaultValue: project.role,
                  })}
                </p>
                <p className="text-body opacity-60 max-w-[60ch] dark:text-text-secondary-dark">
                  {t(`projects.${project.translationKey}.description`)}
                </p>
              </div>
              <Icon
                name={isRtl ? 'arrow-left' : 'arrow-right'}
                className={`text-body mt-0.5 transition-transform duration-200 ${
                  isRtl
                    ? 'group-hover:-translate-x-1 group-active:-translate-x-1 group-focus-visible:-translate-x-1'
                    : 'group-hover:translate-x-1 group-active:translate-x-1 group-focus-visible:translate-x-1'
                }`}
              />
            </div>
          </button>
          {index < projects.length - 1 && (
            <div className="border-t border-dotted border-current opacity-12" />
          )}
        </div>
      ))}
    </PageLayout>
  );
}

export default ProjectsPage;
