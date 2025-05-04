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
 * Thông tin cơ sở và năm học cho ngành học
 */
export interface MajorCampusAdmission {
  /** Học phí */
  tuition_fee: number;
  /** Chỉ tiêu tuyển sinh */
  quota: number;
  /** Thông tin cơ sở */
  campus: {
    /** Mã cơ sở */
    code: string;
    /** Tên cơ sở */
    name: string;
  };
  /** Thông tin năm học */
  academicYear: {
    /** Năm học */
    year: number;
  };
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
  /** Danh sách cơ hội nghề nghiệp */
  careers: Career[];
  /** Danh sách thông tin tuyển sinh theo cơ sở và năm học */
  majorCampusAdmissions: MajorCampusAdmission[];
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
