import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
