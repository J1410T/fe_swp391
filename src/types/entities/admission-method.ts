/**
 * Thông tin phương thức tuyển sinh
 */
export interface AdmissionMethod {
  /** ID của phương thức tuyển sinh */
  id: number;
  /** Tên phương thức tuyển sinh */
  name: string;
  /** Mô tả phương thức tuyển sinh */
  description: string;
  /** URL đăng ký */
  application_url: string;
  /** Mã phương thức tuyển sinh (tùy chọn) */
  code?: string;
  /** Năm học áp dụng (tùy chọn) */
  academicYear?: string;
  /** Trạng thái kích hoạt (tùy chọn) */
  isActive?: boolean;
  /** Thời gian tạo (tùy chọn) */
  createdAt?: string;
  /** Thời gian cập nhật (tùy chọn) */
  updatedAt?: string;
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
