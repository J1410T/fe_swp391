/**
 * Dormitory entity data structure
 */
export interface Dormitory {
  id: string;
  name: string;
  code: string;
  description: string;
  address: string;
  campusId: string;
  roomTypes: RoomType[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Room type data structure
 */
export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  description: string;
  dormitoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dormitories data model
 */
export interface DormitoriesData {
  dormitories: Dormitory[];
}

/**
 * Dormitories loader response type
 */
export interface DormitoriesLoaderResponse {
  data: DormitoriesData;
  error?: string;
}

/**
 * Dormitory creation request data
 */
export interface DormitoryCreateData {
  name: string;
  code: string;
  description: string;
  address: string;
  campusId: string;
}
