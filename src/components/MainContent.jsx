import { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './ErrorBoundary';
import AnimatedHeroText from './AnimatedHeroText';
import PageSurface from './PageSurface';

const ProjectsPage = lazy(() => import('./ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./ProjectDetailPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const ArticlesPage = lazy(() => import('./ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./ArticleDetailPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const heroRoleByLanguage = {
  ar: 'مطور فل ستاك',
  de: 'Full-Stack-Entwickler',
  en: 'Full-Stack Developer',
  es: 'desarrollador Full-Stack',
  fr: 'développeur Full-Stack',
  id: 'pengembang Full-Stack',
  ja: 'フルスタック開発者',
  ko: '풀스택 개발자',
  pt: 'desenvolvedor Full-Stack',
  ru: 'full-stack разработчик',
  zh: '全栈开发者',
};

function RouteLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center py-16">
      <p className="text-body opacity-60 dark:text-text-secondary-dark">
        Loading...
      </p>
    </div>
  );
}

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
  const resolvedLanguage = i18n.resolvedLanguage || i18n.language;
  const baseLanguage = resolvedLanguage.split('-')[0];
  const heroRole = heroRoleByLanguage[baseLanguage];

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
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <PageSurface
                      variant="hero"
                      fade="center"
                      className="flex-1 flex items-center justify-center overflow-hidden"
                      contentClassName="home-hero-copy flex w-full justify-center"
                    >
                      <div className="flex w-full justify-center">
                        <AnimatedHeroText
                          text={t('pages.home.heroText')}
                          highlight={heroRole}
                          highlightClassName="font-bold"
                          highlightTo="/about"
                          linkClassName="hero-inline-link font-bold"
                          lang={resolvedLanguage}
                          className="text-heading leading-tight font-normal max-w-225 dark:text-text-primary-dark"
                        />
                      </div>
                    </PageSurface>
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
                    <ProjectDetailRoute
                      onBack={() => handleNavigation('/projects')}
                    />
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
                    <ArticleDetailRoute
                      onBack={() => handleNavigation('/articles')}
                    />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default MainContent;
