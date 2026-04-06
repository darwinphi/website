import { projects } from '../data/projects';

function ProjectsPage({ onSelectProject, onBack }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Back link */}
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-start py-8">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto"
          style={{ maxWidth: 'calc(var(--max-width-reading) * 1.5)' }}
        >
          {/* Left column: Heading */}
          <div className="flex items-start lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-heading leading-tight font-normal">
              Projects & Case Studies
            </h1>
          </div>

          {/* Right column: Project list */}
          <div className="flex flex-col lg:col-span-2">
            <div style={{ maxWidth: 'var(--max-width-reading)' }}>
              {projects.map((project, index) => (
                <div key={project.id}>
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="w-full text-left py-6 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-body font-medium mb-2 group-hover:opacity-60 transition-opacity">
                          {project.name}
                        </h2>
                        <p className="text-body opacity-60">
                          {project.description}
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
