import { loadScholarshipsData } from './loader';

/**
 * Cấu hình route cho scholarships
 */
export const scholarshipsRoute = {
  path: 'scholarships',
  loader: loadScholarshipsData,
};
