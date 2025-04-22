import type { RouteObject } from 'react-router-dom';
import { Majors } from '@/pages/Majors';
import { loadMajorsData } from './loader';

export const MAJORS_ROUTE = '/majors' as const;

export const majorsRoute: RouteObject = {
  path: 'majors',
  element: <Majors />,
  loader: loadMajorsData,
};
