/**
 * Thông tin cơ hội nghề nghiệp
 */
export interface Career {
  /** ID của cơ hội nghề nghiệp */
  id: number;
  /** Tên cơ hội nghề nghiệp */
  name: string;
  /** Mô tả về cơ hội nghề nghiệp */
  description: string;
  /** Phạm vi lương (định dạng: "min-max") */
  salary_range: string;
  /** Danh mục nghề nghiệp */
  category: string;
  /** Đường dẫn đến thông tin chi tiết */
  info_url: string;
  /** ID của ngành học liên quan */
  major_id: number;
}

/**
 * Thông tin ngành học
 */
export interface Major {
  /** ID của ngành học */
  id: number;
  /** Tên ngành học */
  name: string;
  /** Mã ngành */
  code: string;
  /** Mô tả ngành học */
  description: string;
  /** Danh sách cơ hội nghề nghiệp */
  careers: Career[];
}

/**
 * Dữ liệu tạo mới cơ hội nghề nghiệp
 */
export interface CareerCreateData {
  /** Tên cơ hội nghề nghiệp */
  name: string;
  /** Mô tả về cơ hội nghề nghiệp */
  description: string;
  /** Phạm vi lương (định dạng: "min-max") */
  salary_range: string;
  /** Danh mục nghề nghiệp */
  category: string;
  /** Đường dẫn đến thông tin chi tiết */
  info_url?: string;
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
  /** Danh sách cơ hội nghề nghiệp (tùy chọn) */
  careers?: CareerCreateData[];
}

/**
 * Dữ liệu cập nhật ngành học
 */
export interface MajorUpdateData {
  /** Tên ngành học */
  name?: string;
  /** Mã ngành */
  code?: string;
  /** Mô tả ngành học */
  description?: string;
  /** Danh sách cơ hội nghề nghiệp cần thêm mới */
  careersToAdd?: CareerCreateData[];
  /** Danh sách ID cơ hội nghề nghiệp cần xóa */
  careerIdsToRemove?: number[];
}
