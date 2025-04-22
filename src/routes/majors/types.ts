/**
 * Major entity data structure
 */
export interface Major {
  id: string;
  name: string;
  code: string;
  description: string;
  campusId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Majors data model
 */
export interface MajorsData {
  majors: Major[];
}

/**
 * Majors loader response type
 */
export interface MajorsLoaderResponse {
  data: MajorsData;
  error?: string;
}

/**
 * Major creation request data
 */
export interface MajorCreateData {
  name: string;
  code: string;
  description: string;
  campusId: string;
}

/**
 * Major update request data
 */
export interface MajorUpdateData {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  campusId?: string;
}

/**
 * Major deletion request data
 */
export interface MajorDeleteData {
  id: string;
}
