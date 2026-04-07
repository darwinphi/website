import { projects } from '../data/projects';

function ProjectDetailPage({ projectId, onBack }) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body dark:text-text-primary-dark">
          Project not found
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
          Back to Projects
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
                {project.name}
              </h1>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded border border-current text-body hover:opacity-60 transition-opacity dark:text-text-primary-dark w-fit"
                >
                  Visit Project
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
                  About the Client
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {project.aboutClient}
                </p>
              </section>

              {/* Problem */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  Problem
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {project.problem}
                </p>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  Solution
                </h2>
                <p className="text-body dark:text-text-secondary-dark">
                  {project.solution}
                </p>
              </section>

              {/* Key Contributions */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  Key Contributions
                </h2>
                <ul className="text-body list-disc list-inside space-y-1 dark:text-text-secondary-dark">
                  {project.keyContributions.map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </section>

              {/* Impact */}
              <section>
                <h2 className="text-body font-bold mb-2 dark:text-text-primary-dark">
                  Impact
                </h2>
                <ul className="text-body list-disc list-inside space-y-1 dark:text-text-secondary-dark">
                  {project.impact.map((impactItem, index) => (
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
                  Back to top
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
