import { useEffect, StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { initializeTheme } from './lib/theme-script';
import { AuthProvider } from './contexts/AuthContext';

/**
 * Main App component
 * Initializes theme and renders the router
 */
function App(): React.ReactElement {
  useEffect(() => {
    // Initialize theme on component mount
    initializeTheme();
  }, []);

  return (
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
