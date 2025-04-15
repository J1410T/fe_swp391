import { LoaderFunction } from 'react-router-dom';
import { HomeLoaderData } from './home.types';

/**
 * Loader function for the home route
 * @returns Promise containing the home page data
 */
export const homeLoader: LoaderFunction = async (): Promise<{ data: HomeLoaderData }> => {
  try {
    // Simulate API call
    const data = await new Promise<HomeLoaderData>(resolve => 
      setTimeout(() => resolve({ message: 'Data loaded successfully!' }), 1000)
    );

    return { data };
  } catch (error) {
    throw new Error('Failed to load home page data');
  }
}; 