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
 * Trạng thái của loader
 */
export type LoaderStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Admission methods loader response type
 */
export interface AdmissionMethodsLoaderResponse {
  /** Danh sách phương thức tuyển sinh */
  admissionMethods: AdmissionMethod[];
  /** Trạng thái của request */
  status: LoaderStatus;
  /** Thông báo lỗi nếu có */
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
