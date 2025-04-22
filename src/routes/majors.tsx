import { RouteObject } from 'react-router-dom';
import Majors from '@/pages/Majors';

/**
 * Majors management route configuration
 */
export const majorsRoute: RouteObject = {
  path: 'majors',
  element: <Majors />,
};
