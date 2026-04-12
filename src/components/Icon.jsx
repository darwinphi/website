function SvgIcon({ children, className = '', viewBox = '0 0 24 24' }) {
  return (
    <svg
      viewBox={viewBox}
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="none"
      className={`inline-block shrink-0 align-middle ${className}`.trim()}
    >
      {children}
    </svg>
  );
}

export default function Icon({ name, className = '' }) {
  switch (name) {
    case 'arrow-left':
      return (
        <SvgIcon className={className}>
          <path
            d="M19 12H5M11 18L5 12L11 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'arrow-right':
      return (
        <SvgIcon className={className}>
          <path
            d="M5 12H19M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'arrow-up':
      return (
        <SvgIcon className={className}>
          <path
            d="M12 19V5M6 11L12 5L18 11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'arrow-down':
      return (
        <SvgIcon className={className}>
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'arrow-up-right':
      return (
        <SvgIcon className={className}>
          <path
            d="M7 17L17 7M9 7H17V15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'arrow-up-left':
      return (
        <SvgIcon className={className}>
          <path
            d="M17 17L7 7M15 7H7V15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'external-link':
      return (
        <SvgIcon className={className}>
          <path
            d="M14 5H19V10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14L19 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 14V17C19 18.1 18.1 19 17 19H7C5.9 19 5 18.1 5 17V7C5 5.9 5.9 5 7 5H10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    case 'sun':
      return (
        <SvgIcon className={className}>
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </SvgIcon>
      );

    case 'moon':
      return (
        <SvgIcon className={className}>
          <path
            d="M15.2 3.45C13.24 4 11.56 5.25 10.45 7C9.34 8.75 8.88 10.84 9.17 12.89C9.46 14.95 10.47 16.83 12.02 18.18C13.58 19.52 15.57 20.24 17.63 20.2C15.91 21.07 13.95 21.37 12.05 21.06C10.16 20.75 8.39 19.86 7 18.52C5.61 17.18 4.66 15.47 4.27 13.6C3.88 11.73 4.07 9.79 4.82 8.03C5.58 6.28 6.88 4.82 8.54 3.87C10.19 2.91 12.1 2.49 14 2.67C14.41 2.71 14.81 2.78 15.2 2.89V3.45Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );

    default:
      return null;
  }
}
