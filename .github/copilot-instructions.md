# Darwin Manalo Portfolio - Project Instructions

## Project Overview

This is a personal portfolio website for [Darwin Manalo](https://github.com/darwinmanalo), showcasing projects, articles, and professional information. Built with modern web technologies for performance and developer experience.

**Tech Stack:**

- **Framework**: React 19 with Vite (build tool)
- **Styling**: Tailwind CSS 4 + Vite plugin
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: RemixIcon for scalable vector icons
- **Linting**: ESLint with React-specific rules
- **Deployment**: Static hosting (Vite build → dist/)

## Project Structure

```
src/
├── App.jsx              # Main application component (navbar, layout, routing)
├── main.jsx             # Entry point
├── index.css            # Global styles (Tailwind directives)
└── components/
    └── TextPressure.jsx # Custom component for animated text effects
public/
├── CNAME                # Custom domain configuration
└── img/                 # Static assets (images)
```

## Key Conventions

### React Components

- **Functional components only** — Use hooks for state management
- **Component structure**: Imports → Constants (navLinks, socialLinks) → Component function → JSX
- **Styling**: Use Tailwind utility classes; avoid inline styles
- **Accessibility**: Include proper semantic HTML, ARIA labels where needed, use icon combinations with text for links

**Example pattern:**

```jsx
const navLinks = [{ label: 'Projects', href: '#' }];

function App() {
  return (
    <nav className="flex items-center gap-6">
      {navLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className="hover:opacity-60 transition-opacity"
        >
          {label}
          <i className="ri-arrow-right-up-line" />
        </a>
      ))}
    </nav>
  );
}
```

### Styling Rules

- **Tailwind classes**: `min-h-screen`, `flex`, `gap-6`, `px-8`, `py-6`, etc.
- **Responsive design**: Mobile-first approach; use `sm:`, `md:`, `lg:` prefixes
- **Transitions**: Prefer Tailwind's `transition-opacity` over custom CSS or Framer Motion for simple effects
- **Dark mode**: Not currently implemented; consider adding via `dark:` utilities if needed

### Animations

- **Framer Motion**: Reserved for complex animations and interactions (via TextPressure.jsx)
- **Tailwind transitions**: For simple hover states, fades, and timing
- **Performance**: Keep animations GPU-accelerated (use `transform`, `opacity`); test on low-end devices

### Icons

- **RemixIcon**: Use class format: `<i className="ri-icon-name-line" />` or `<i className="ri-icon-name-fill" />`
- **Sizing**: Control with Tailwind size utilities or inline font-size; default is often too small
- **Pairing**: Combine with text for accessibility: always have adjacent `<span>` or direct text

## Development Workflow

### Setup

```bash
npm install
npm run dev        # Start dev server (localhost:5173 default)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code quality with ESLint
```

### Code Quality

- **ESLint**: Enforced by project; run `npm run lint` before committing
- **React hooks**: Follow `eslint-plugin-react-hooks` rules (dependency arrays, call order)
- **No unused variables**: ESLint will catch and flag these

### Git & Deployment

- **CNAME file**: Maintains custom domain across builds; do not delete
- **dist/ folder**: Auto-generated on build; do not commit (in .gitignore)
- **Workflow**: Commit changes → Push → CI/CD builds and deploys dist/ automatically

## Common Tasks

### Add a new navigation link

1. Update `navLinks` array in [src/App.jsx](src/App.jsx)
2. Ensure `href` is correct (internal `#section` or external URL)
3. Icon is auto-added; customize via RemixIcon class name if needed

### Create a new component

1. Create file in `src/components/ComponentName.jsx`
2. Follow React functional component pattern
3. Use Tailwind for styling; import and export as named export
4. Import and use in [src/App.jsx](src/App.jsx) or parent component

### Deploy changes

1. Push to main branch
2. GitHub Actions workflow builds and deploys to `/dist`
3. Changes live on custom domain (CNAME)

## Linting & Formatting

- **ESLint rules**: Configured in [eslint.config.js](eslint.config.js); includes React validation
- **Run linter**: `npm run lint` (may auto-fix some issues with `--fix` flag)
- **Pre-commit**: Consider adding husky for lint checks before commit

## SonarQube Best Practices

All code must comply with SonarQube quality standards. Follow these rules when writing or modifying code:

### Reliability

- **No bugs**: Avoid null/undefined dereferences; guard access to optional values
- **No unreachable code**: Remove dead branches, unused returns, and impossible conditions
- **Proper error handling**: Never swallow errors silently; always handle Promise rejections

### Security

- **No hardcoded secrets**: Never commit API keys, tokens, or passwords; use environment variables
- **Sanitize inputs**: Validate and sanitize all user-controlled data before use
- **Avoid `dangerouslySetInnerHTML`**: Use safe alternatives; if unavoidable, sanitize first with a trusted library

### Maintainability

- **Cognitive complexity**: Keep functions simple; extract logic when complexity grows
- **No duplicated code**: Extract shared logic into reusable utilities or components
- **Function length**: Keep functions focused and short; split when doing more than one thing
- **Naming**: Use descriptive, intention-revealing names for variables, functions, and components

### Code Smells to Avoid

- Unused variables, imports, or parameters (ESLint also flags these)
- Magic numbers/strings — use named constants instead
- Deeply nested conditionals — flatten with early returns or guard clauses
- Functions with too many parameters — use an options object instead
- Commented-out code — delete it; use version control to recover old code

## Performance Considerations

- **Code splitting**: Vite auto-handles route-based splitting
- **Image optimization**: Use modern formats (WebP) in `public/img/`; lazy load below fold
- **CSS**: Tailwind tree-shakes unused styles during build
- **Animations**: Test on mobile; prioritize 60fps with GPU-accelerated properties

## Future Enhancements

- [ ] Dark mode toggle (Tailwind `dark:` utilities)
- [ ] Project filtering/search
- [ ] Blog integration for articles section
- [ ] Contact form with validation
- [ ] Analytics tracking

---

**Last Updated**: April 2026
**Maintainer**: Darwin Manalo
