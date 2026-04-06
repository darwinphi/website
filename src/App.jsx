const navLinks = [
  { label: 'Projects', href: '#' },
  { label: 'Articles', href: '#' },
  { label: 'About', href: '#' },
];

const socialLinks = [
  { label: 'Github', href: 'https://github.com/darwinmanalo' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/darwinmanalo' },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col px-8 py-6">
      {/* Navbar */}
      <header className="flex items-center justify-between">
        <span className="text-body font-medium">Darwin Manalo</span>
        <nav className="flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5"
            >
              {label}
              <i className="ri-arrow-right-up-line" />
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center">
        <p className="text-heading leading-tight font-normal max-w-225">
          Based in the Pearl of the Orient Seas (Manila, Philippines). I&rsquo;m
          a Full-Stack developer building modern web experiences. Got an idea
          and just want to connect? Let&rsquo;s collaborate.
        </p>
      </main>

      {/* Footer */}
      <footer className="flex items-end justify-between">
        <span className="text-body">© 2026 All rights reserved</span>
        <div className="flex flex-col items-end gap-1">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-0.5"
            >
              {label}
              <i className="ri-arrow-right-up-line" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
