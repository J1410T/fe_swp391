import type { LoaderFunction } from 'react-router-dom';

/**
 * Loader cho dormitories route
 */
export const loadDormitoriesData: LoaderFunction = async () => {
  return { data: { dormitories: [] } };
};
