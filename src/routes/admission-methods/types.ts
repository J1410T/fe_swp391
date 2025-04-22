/**
 * Admission method entity data structure
 */
export interface AdmissionMethod {
  id: string;
  name: string;
  code: string;
  description: string;
  academicYear: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Admission methods data model
 */
export interface AdmissionMethodsData {
  admissionMethods: AdmissionMethod[];
}

/**
 * Admission methods loader response type
 */
export interface AdmissionMethodsLoaderResponse {
  data: AdmissionMethodsData;
  error?: string;
}

/**
 * Admission method creation request data
 */
export interface AdmissionMethodCreateData {
  name: string;
  code: string;
  description: string;
  academicYear: string;
}
