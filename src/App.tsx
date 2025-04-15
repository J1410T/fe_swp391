import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { router } from './routes';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
