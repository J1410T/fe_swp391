/**
 * Thông tin học bổng
 */
export interface Scholarship {
  /** ID của học bổng */
  id: string;
  /** Tên học bổng */
  name: string;
  /** Mã học bổng */
  code: string;
  /** Mô tả học bổng */
  description: string;
  /** Giá trị học bổng */
  value: number;
  /** Đơn vị tiền tệ */
  currency: string;
  /** ID của ngành học */
  majorId: string;
  /** ID của cơ sở */
  campusId: string;
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
 * Dữ liệu tạo mới học bổng
 */
export interface ScholarshipCreateData {
  /** Tên học bổng */
  name: string;
  /** Mã học bổng */
  code: string;
  /** Mô tả học bổng */
  description: string;
  /** Giá trị học bổng */
  value: number;
  /** Đơn vị tiền tệ */
  currency: string;
  /** ID của ngành học */
  majorId: string;
  /** ID của cơ sở */
  campusId: string;
  /** Năm học áp dụng */
  academicYear: string;
}

/**
 * Dữ liệu cập nhật học bổng
 */
export type ScholarshipUpdateData = Partial<ScholarshipCreateData>;
