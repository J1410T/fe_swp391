import { RouteObject } from 'react-router-dom';
import Scholarships from '@/pages/Scholarships';

/**
 * Scholarships management route configuration
 */
export const scholarshipsRoute: RouteObject = {
  path: 'scholarships',
  element: <Scholarships />,
};
