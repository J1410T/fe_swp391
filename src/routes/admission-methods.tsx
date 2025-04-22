import { RouteObject } from 'react-router-dom';
import AdmissionMethods from '@/pages/AdmissionMethods';

/**
 * Admission Methods route configuration
 */
export const admissionMethodsRoute: RouteObject = {
  path: 'admission-methods',
  element: <AdmissionMethods />,
};
