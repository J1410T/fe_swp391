/**
 * Scholarship entity data structure
 */
export interface Scholarship {
  id: string;
  name: string;
  code: string;
  description: string;
  value: number;
  campusId: string;
  majorId: string;
  academicYear: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Scholarships data model
 */
export interface ScholarshipsData {
  scholarships: Scholarship[];
}

/**
 * Scholarships loader response type
 */
export interface ScholarshipsLoaderResponse {
  data: ScholarshipsData;
  error?: string;
}

/**
 * Scholarship creation request data
 */
export interface ScholarshipCreateData {
  name: string;
  code: string;
  description: string;
  value: number;
  campusId: string;
  majorId: string;
  academicYear: string;
}
