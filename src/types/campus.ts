/**
 * Thông tin cơ sở đào tạo
 */
export interface Campus {
  /** ID của cơ sở */
  id: number;
  /** Tên cơ sở */
  name: string;
  /** Mã cơ sở */
  code: string;
  /** Địa chỉ cơ sở */
  address: string;
  /** Thông tin liên hệ */
  contact: {
    /** Email liên hệ */
    email: string;
    /** Số điện thoại liên hệ */
    phone: string;
  };
}

/**
 * Thông tin ký túc xá
 */
export interface Dormitory {
  /** ID của ký túc xá */
  id: number;
  /** ID của cơ sở */
  campus_id: number;
  /** Tên ký túc xá */
  name: string;
  /** Mô tả ký túc xá */
  description: string;
  /** Sức chứa */
  capacity: number;
  /** Thông tin cơ sở */
  campus?: {
    id: number;
    name: string;
    address: string;
  };
}
