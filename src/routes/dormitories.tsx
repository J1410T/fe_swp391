import { RouteObject } from 'react-router-dom';
import Dormitories from '@/pages/Dormitories';

/**
 * Dormitories management route configuration
 */
export const dormitoriesRoute: RouteObject = {
  path: 'dormitories',
  element: <Dormitories />,
};
