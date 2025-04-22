import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { initializeTheme } from './lib/theme-script';

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
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
