import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes.config';

/**
 * Main router instance for the application
 */
export const router = createBrowserRouter(routes);

// Re-export route paths for use in navigation
export { HOME_ROUTE } from './home';
export { NOT_FOUND_ROUTE } from './not-found'; 