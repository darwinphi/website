import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getLanguageDirection } from './i18n/config';

function App() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAtmospherePage =
    location.pathname === '/' || location.pathname === '/about';

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
    <div
      className={[
        'app-shell min-h-screen flex flex-col px-8 max-w-7xl mx-auto w-full',
        isAtmospherePage ? 'app-shell--home' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isAtmospherePage && <div aria-hidden="true" className="home-backdrop" />}
      <div className="app-shell__content flex min-h-screen flex-col">
        <Navbar
          handleNavigation={handleNavigation}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isHomePage={isAtmospherePage}
        />

        <MainContent
          handleNavigation={handleNavigation}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
