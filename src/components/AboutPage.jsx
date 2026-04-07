import React from 'react';

function AboutPage({ onBack }) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const imgRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Back link */}
      <div className="py-4">
        <button
          onClick={onBack}
          className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
        >
          <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div
          className="w-full"
          style={{ maxWidth: 'var(--max-width-reading)' }}
        >
          {/* Heading */}
          <h1 className="text-heading leading-tight font-normal text-center mb-12 dark:text-text-primary-dark">
            About Me
          </h1>

          {/* Profile Picture */}
          <div
            className="flex justify-center mb-12 cursor-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-48 sm:w-56 md:w-64 relative"
              style={{ overflow: 'hidden', borderRadius: '0.5rem' }}
            >
              {/* Grayscale base image */}
              <img
                src="/img/profile-picture.jpg"
                alt="Profile picture"
                className="w-full rounded-lg"
                style={{
                  filter: 'grayscale(100%) opacity(0.85)',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                }}
              />

              {/* Color reveal on hover */}
              {isHovering && (
                <img
                  ref={imgRef}
                  src="/img/profile-picture.jpg"
                  alt="Profile picture color"
                  className="w-full rounded-lg absolute inset-0"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    clipPath: `circle(60px at ${cursorPos.x}px ${cursorPos.y}px)`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              I graduated with a degree on Bachelor of Science in Information
              Technology at Adamson University. I originally started my career
              as a Front-end Developer at Shore Suite, but things took an
              unexpected turn when someone in the team resigned—so I stepped in,
              picked up back-end work, and that's pretty much how I became a
              Full-Stack developer.
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              Over the past 8+ years, every challenge has been a chance to learn
              something new (sometimes the hard way, but it works!). Through
              this, I've consistently showcased my versatility by building and
              maintaining scalable web applications from front-end to back-end.
              I've also cultivated a strong problem-solving mindset and the
              ability to stay effective even when things get a bit messy.
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              I'm currently collaborating on external projects with NCS
              Philippines, where I thrive to solve real-world problems and adapt
              to evolving requirements.
            </p>

            <p className="text-body leading-relaxed opacity-80 dark:text-text-secondary-dark">
              Outside of work, I make sure to spend quality time with my loved
              ones. I also enjoy playing mobile games, watching sports
              (especially football!), and occasionally playing pickleball and
              badminton (then eating out afterwards!) to stay active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
