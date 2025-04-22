import { LoaderFunction } from 'react-router-dom';
import { AdmissionMethodsLoaderResponse } from './types';

/**
 * Loads admission methods data from API
 * @returns Promise containing the admission methods page data
 */
export const loadAdmissionMethodsData: LoaderFunction = async (): Promise<AdmissionMethodsLoaderResponse> => {
  
  return { data: { admissionMethods: [] } };
};
