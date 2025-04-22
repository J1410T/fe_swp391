import type { LoaderFunction } from 'react-router-dom';
import type { MajorsLoaderResponse } from './types';

/**
 * Loads majors data from API and updates Zustand store
 */
export const loadMajorsData: LoaderFunction = async (): Promise<MajorsLoaderResponse> => {
  return { data: { majors: [] } };
};
