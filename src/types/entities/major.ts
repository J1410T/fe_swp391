/**
 * Thông tin ngành học
 */
export interface Major {
  /** ID của ngành học */
  id: string;
  /** Tên ngành học */
  name: string;
  /** Mã ngành */
  code: string;
  /** Mô tả ngành học */
  description: string;
  /** ID của cơ sở */
  campusId: string;
  /** Trạng thái kích hoạt */
  isActive: boolean;
  /** Thời gian tạo */
  createdAt: string;
  /** Thời gian cập nhật */
  updatedAt: string;
}

/**
 * Dữ liệu tạo mới ngành học
 */
export interface MajorCreateData {
  /** Tên ngành học */
  name: string;
  /** Mã ngành */
  code: string;
  /** Mô tả ngành học */
  description: string;
  /** ID của cơ sở */
  campusId: string;
}

/**
 * Dữ liệu cập nhật ngành học
 */
export type MajorUpdateData = Partial<MajorCreateData>;
