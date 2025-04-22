import type { LoaderFunction } from 'react-router-dom';

/**
 * Loader cho campuses route
 */
export const loadCampusesData: LoaderFunction = async () => {
  return { data: { campuses: [] } };
};
