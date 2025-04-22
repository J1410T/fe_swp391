import { loadDormitoriesData } from './loader';

/**
 * Cấu hình route cho dormitories
 */
export const dormitoriesRoute = {
  path: 'dormitories',
  loader: loadDormitoriesData,
};
