import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1 py-16">
      {/* Illustration with blended gray glow */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute rounded-full bg-black/8 dark:bg-white/8 blur-3xl"
          style={{ width: '70%', height: '70%' }}
        />
        <img
          src="/img/404.svg"
          alt="404 – Page not found"
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 dark:invert"
          style={{ opacity: 0.85 }}
        />
      </div>

      {/* Back to home button below illustration */}
      <button
        onClick={() => navigate('/')}
        className="text-body hover:opacity-60 transition-opacity inline-flex items-center gap-1 group cursor-pointer dark:text-text-primary-dark"
      >
        <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
        {t('buttons.backToHome')}
      </button>
    </div>
  );
}

export default NotFoundPage;
