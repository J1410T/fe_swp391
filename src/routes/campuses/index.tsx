import { loadCampusesData } from './loader';

/**
 * Cấu hình route cho campuses
 */
export const campusesRoute = {
  path: 'campuses',
  loader: loadCampusesData,
};
