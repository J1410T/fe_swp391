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
 * Thông tin học bổng theo năm học và cơ sở
 */
export interface ScholarshipAvailability {
  id: number;
  scholarship_id: number;
  academic_year_id: number;
  campus_id: number | null;
  major_id: number | null;
  major: {
    code: string;
    name: string;
  } | null;
  campus: {
    code: string;
    name: string;
  } | null;
  academicYear: {
    year: number;
  };
}

/**
 * Response từ API cho học bổng
 */
export interface ScholarshipResponse {
  id: number;
  name: string;
  description: string;
  condition: string;
  amount: number;
  major_id?: number | null;
  campus_id?: number | null;
  application_url: string;
  major?: {
    id: number;
    code: string;
    name: string;
    description: string;
  } | null;
  campus?: {
    id: number;
    name: string;
    code: string;
  } | null;
  availabilities: ScholarshipAvailability[];
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
