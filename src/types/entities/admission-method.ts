/**
 * Thông tin phương thức tuyển sinh
 */
export interface AdmissionMethod {
  /** ID của phương thức tuyển sinh */
  id: string;
  /** Tên phương thức tuyển sinh */
  name: string;
  /** Mã phương thức tuyển sinh */
  code: string;
  /** Mô tả phương thức tuyển sinh */
  description: string;
  /** Năm học áp dụng */
  academicYear: string;
  /** Trạng thái kích hoạt */
  isActive: boolean;
  /** Thời gian tạo */
  createdAt: string;
  /** Thời gian cập nhật */
  updatedAt: string;
}

/**
 * Dữ liệu tạo mới phương thức tuyển sinh
 */
export interface AdmissionMethodCreateData {
  /** Tên phương thức tuyển sinh */
  name: string;
  /** Mã phương thức tuyển sinh */
  code: string;
  /** Mô tả phương thức tuyển sinh */
  description: string;
  /** Năm học áp dụng */
  academicYear: string;
}

/**
 * Dữ liệu cập nhật phương thức tuyển sinh
 */
export type AdmissionMethodUpdateData = Partial<AdmissionMethodCreateData>;
