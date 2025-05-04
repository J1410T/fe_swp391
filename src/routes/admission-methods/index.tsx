import { RouteObject } from 'react-router-dom';
import AdmissionMethods from '@/pages/AdmissionMethods';
import { loadAdmissionMethodsData } from './loader';

export const ADMISSION_METHODS_ROUTE = '/admission-methods' as const;

export const admissionMethodsRoute: RouteObject = {
  path: 'admission-methods',
  element: <AdmissionMethods />,
  loader: loadAdmissionMethodsData,
  handle: {
    breadcrumb: "Phương thức tuyển sinh"
  }
};
