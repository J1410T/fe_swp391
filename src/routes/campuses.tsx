import { RouteObject } from 'react-router-dom';
import Campuses from '@/pages/Campuses';

/**
 * Campuses management route configuration
 */
export const campusesRoute: RouteObject = {
  path: 'campuses',
  element: <Campuses />,
};
