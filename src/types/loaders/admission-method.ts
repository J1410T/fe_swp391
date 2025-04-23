import type { BaseLoaderResponse } from '../common';
import type { AdmissionMethod } from '../entities/admission-method';

/**
 * Response từ loader cho admission methods
 */
export interface AdmissionMethodsLoaderResponse extends BaseLoaderResponse<AdmissionMethod[]> {
  // Có thể thêm các trường đặc biệt nếu cần
}

/**
 * Response từ loader cho admission method detail
 */
export interface AdmissionMethodDetailLoaderResponse extends BaseLoaderResponse<AdmissionMethod> {
  // Có thể thêm các trường đặc biệt nếu cần
}
