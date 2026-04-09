import { useLocation, useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './ErrorBoundary';
import AnimatedHeroText from './AnimatedHeroText';
import ProjectsPage from './ProjectsPage';
import ProjectDetailPage from './ProjectDetailPage';
import AboutPage from './AboutPage';
import ArticlesPage from './ArticlesPage';
import ArticleDetailPage from './ArticleDetailPage';
import NotFoundPage from './NotFoundPage';

function ProjectDetailRoute({ onBack }) {
  const { projectId } = useParams();
  return <ProjectDetailPage projectId={projectId} onBack={onBack} />;
}

function ArticleDetailRoute({ onBack }) {
  const { articleId } = useParams();
  return <ArticleDetailPage articleId={articleId} onBack={onBack} />;
}

function MainContent({ handleNavigation }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  return (
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
          <ErrorBoundary>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <div className="flex-1 flex items-center justify-center">
                    <AnimatedHeroText
                      text={t('pages.home.heroText')}
                      lang={i18n.resolvedLanguage || i18n.language}
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
                    onBack={() => handleNavigation('/')}
                  />
                }
              />
              <Route
                path="/projects/:projectId"
                element={
                  <ProjectDetailRoute onBack={() => handleNavigation('/projects')} />
                }
              />
              <Route
                path="/about"
                element={<AboutPage onBack={() => handleNavigation('/')} />}
              />
              <Route
                path="/articles"
                element={
                  <ArticlesPage
                    onSelectArticle={(articleId) =>
                      handleNavigation(`/articles/${articleId}`)
                    }
                    onBack={() => handleNavigation('/')}
                  />
                }
              />
              <Route
                path="/articles/:articleId"
                element={
                  <ArticleDetailRoute onBack={() => handleNavigation('/articles')} />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>{' '}
          </ErrorBoundary>{' '}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default MainContent;
