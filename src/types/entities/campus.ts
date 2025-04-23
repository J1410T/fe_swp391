/**
 * Thông tin cơ sở đào tạo
 */
export interface Campus {
  /** ID của cơ sở */
  id: string;
  /** Tên cơ sở */
  name: string;
  /** Mã cơ sở */
  code: string;
  /** Địa chỉ cơ sở */
  address: string;
  /** Mô tả cơ sở */
  description: string;
  /** Trạng thái kích hoạt */
  isActive: boolean;
  /** Thời gian tạo */
  createdAt: string;
  /** Thời gian cập nhật */
  updatedAt: string;
}

/**
 * Dữ liệu tạo mới cơ sở
 */
export interface CampusCreateData {
  /** Tên cơ sở */
  name: string;
  /** Mã cơ sở */
  code: string;
  /** Địa chỉ cơ sở */
  address: string;
  /** Mô tả cơ sở */
  description: string;
}

/**
 * Dữ liệu cập nhật cơ sở
 */
export type CampusUpdateData = Partial<CampusCreateData>;
