import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getLanguageDirection } from './i18n/config';

function App() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const activeLanguage = i18n.resolvedLanguage || i18n.language || 'en';
    const direction = getLanguageDirection(activeLanguage);
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [i18n, i18n.language, i18n.resolvedLanguage]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle backspace/delete key for back navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only respond to backspace or delete keys
      if (event.key !== 'Backspace' && event.key !== 'Delete') {
        return;
      }

      // Don't interfere with text inputs
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.contentEditable === 'true')
      ) {
        return;
      }

      // Prevent default browser behavior (go back page)
      event.preventDefault();

      navigate(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Close drawer on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col px-8 max-w-7xl mx-auto w-full">
      <Navbar
        handleNavigation={handleNavigation}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <MainContent
        handleNavigation={handleNavigation}
      />

      <Footer />
    </div>
  );
}

export default App;
