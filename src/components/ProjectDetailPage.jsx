import { projects } from '../data/projects';

function ProjectDetailPage({ projectId, onBack }) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body">Project not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Back link */}
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          Back to Projects
        </button>
      </div>

      {/* Main content: two-column layout */}
      <div className="flex-1 flex items-start py-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left column: Project name */}
          <div className="flex flex-col gap-10 lg:col-span-1">
            <h1 className="text-heading leading-tight font-normal">
              {project.name}
            </h1>
          </div>

          {/* Right column: Case study content */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* About the Client */}
            <section>
              <h2 className="text-body font-bold mb-2">About the Client</h2>
              <p className="text-body">{project.aboutClient}</p>
            </section>

            {/* Problem */}
            <section>
              <h2 className="text-body font-bold mb-2">Problem</h2>
              <p className="text-body">{project.problem}</p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-body font-bold mb-2">Solution</h2>
              <p className="text-body">{project.solution}</p>
            </section>

            {/* Key Contributions */}
            <section>
              <h2 className="text-body font-bold mb-2">Key Contributions</h2>
              <ul className="text-body list-disc list-inside space-y-1">
                {project.keyContributions.map((contribution, index) => (
                  <li key={index}>{contribution}</li>
                ))}
              </ul>
            </section>

            {/* Impact */}
            <section>
              <h2 className="text-body font-bold mb-2">Impact</h2>
              <ul className="text-body list-disc list-inside space-y-1">
                {project.impact.map((impactItem, index) => (
                  <li key={index}>{impactItem}</li>
                ))}
              </ul>
            </section>

            {/* Back to top — mobile only */}
            <div className="flex justify-end pt-4 pb-8 lg:hidden">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer"
              >
                Back to top
                <i className="ri-arrow-up-line transition-transform duration-200 group-hover:-translate-y-1 group-active:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
