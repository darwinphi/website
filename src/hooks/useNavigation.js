import { useNavigate } from 'react-router-dom';

// Custom hook to encapsulate navigation logic and menu state
export function useNavigation() {
  const navigate = useNavigate();

  // Get menu state from window to avoid circular dependencies
  // Menu state is managed in App component
  const navigateTo = (path) => {
    navigate(path);
    // Close menu on navigation - accessed via window event
    window.dispatchEvent(new CustomEvent('navigate', { detail: { path } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    navigate(-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { navigateTo, goBack };
}
