/**
 * Dữ liệu mẫu cho ứng dụng
 */

import type { Major } from '@/routes/majors/types';
import type { AdmissionMethod } from '@/routes/admission-methods/types';

/**
 * Dữ liệu mẫu cho ngành học
 */
export const sampleMajors: Major[] = [
  {
    id: '1',
    name: 'Kỹ thuật phần mềm',
    code: 'SE',
    description: 'Chương trình đào tạo kỹ sư phần mềm chất lượng cao',
    campusId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Trí tuệ nhân tạo',
    code: 'AI',
    description: 'Chương trình đào tạo về trí tuệ nhân tạo và khoa học dữ liệu',
    campusId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'An toàn thông tin',
    code: 'IS',
    description: 'Chương trình đào tạo về an toàn thông tin và bảo mật',
    campusId: '2',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Quản trị kinh doanh',
    code: 'BA',
    description: 'Chương trình đào tạo về quản trị kinh doanh',
    campusId: '3',
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Thiết kế đồ họa',
    code: 'GD',
    description: 'Chương trình đào tạo về thiết kế đồ họa và UI/UX',
    campusId: '2',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Dữ liệu mẫu cho phương thức tuyển sinh
 */
export const sampleAdmissionMethods: AdmissionMethod[] = [
  {
    id: '1',
    name: 'Xét tuyển học bạ',
    code: 'XT-HB',
    description: 'Xét tuyển dựa trên kết quả học bạ THPT',
    academicYear: '2025-2026',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Xét tuyển điểm thi THPT',
    code: 'XT-THPT',
    description: 'Xét tuyển dựa trên kết quả kỳ thi THPT Quốc gia',
    academicYear: '2025-2026',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Xét tuyển thẳng',
    code: 'XT-THANG',
    description: 'Xét tuyển thẳng dành cho học sinh đạt giải cấp quốc gia, quốc tế',
    academicYear: '2025-2026',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Xét tuyển SAT',
    code: 'XT-SAT',
    description: 'Xét tuyển dựa trên điểm thi SAT',
    academicYear: '2025-2026',
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Xét tuyển IELTS',
    code: 'XT-IELTS',
    description: 'Xét tuyển dựa trên điểm IELTS',
    academicYear: '2025-2026',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
