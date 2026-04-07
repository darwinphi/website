import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';
import ArticlesPage from './components/ArticlesPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import AnimatedHeroText from './components/AnimatedHeroText';
import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function ProjectDetailRoute({ onBack }) {
  const { projectId } = useParams();
  return <ProjectDetailPage projectId={projectId} onBack={onBack} />;
}

function ArticleDetailRoute({ onBack }) {
  const { articleId } = useParams();
  return <ArticleDetailPage articleId={articleId} onBack={onBack} />;
}

function App() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(-1);
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

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location.pathname}-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <div className="flex-1 flex items-center justify-center">
                    <AnimatedHeroText
                      text={t('pages.home.heroText')}
                      className="text-heading leading-tight font-normal max-w-225 dark:text-text-primary-dark"
                    />
                  </div>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProjectsPage
                    onSelectProject={(projectId) =>
                      handleNavigation(`/projects/${projectId}`)
                    }
                    onBack={handleBack}
                  />
                }
              />
              <Route
                path="/projects/:projectId"
                element={<ProjectDetailRoute onBack={handleBack} />}
              />
              <Route
                path="/about"
                element={<AboutPage onBack={handleBack} />}
              />
              <Route
                path="/articles"
                element={
                  <ArticlesPage
                    onSelectArticle={(articleId) =>
                      handleNavigation(`/articles/${articleId}`)
                    }
                    onBack={handleBack}
                  />
                }
              />
              <Route
                path="/articles/:articleId"
                element={<ArticleDetailRoute onBack={handleBack} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
