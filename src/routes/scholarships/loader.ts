import type { LoaderFunction } from 'react-router-dom';

/**
 * Loader cho scholarships route
 */
export const loadScholarshipsData: LoaderFunction = async () => {
  return { data: { scholarships: [] } };
};
