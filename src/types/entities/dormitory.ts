/**
 * Thông tin ký túc xá
 */
export interface Dormitory {
  /** ID của ký túc xá */
  id: string;
  /** Tên ký túc xá */
  name: string;
  /** Mã ký túc xá */
  code: string;
  /** Địa chỉ ký túc xá */
  address: string;
  /** Mô tả ký túc xá */
  description: string;
  /** Số lượng phòng */
  roomCount: number;
  /** Giá phòng */
  price: number;
  /** Đơn vị tiền tệ */
  currency: string;
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
 * Dữ liệu tạo mới ký túc xá
 */
export interface DormitoryCreateData {
  /** Tên ký túc xá */
  name: string;
  /** Mã ký túc xá */
  code: string;
  /** Địa chỉ ký túc xá */
  address: string;
  /** Mô tả ký túc xá */
  description: string;
  /** Số lượng phòng */
  roomCount: number;
  /** Giá phòng */
  price: number;
  /** Đơn vị tiền tệ */
  currency: string;
  /** ID của cơ sở */
  campusId: string;
}

/**
 * Dữ liệu cập nhật ký túc xá
 */
export type DormitoryUpdateData = Partial<DormitoryCreateData>;
