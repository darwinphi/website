import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize: check for stored preference first, then system preference
    const storedPreference = localStorage.getItem('darkMode');
    let shouldBeDark;

    if (storedPreference !== null) {
      shouldBeDark = storedPreference === 'true';
    } else {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDark(shouldBeDark);

    // Apply initial theme
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    const newIsDark = !isDark;

    // Update state
    setIsDark(newIsDark);

    // Store the user's preference
    localStorage.setItem('darkMode', String(newIsDark));

    // Immediately update DOM
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="text-body hover:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <motion.i
          key="sun"
          initial={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="ri-sun-line absolute text-lg"
          style={{ pointerEvents: 'none' }}
        />
        <motion.i
          key="moon"
          initial={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ duration: 0.3 }}
          className="ri-moon-line absolute text-lg"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </motion.button>
  );
}
