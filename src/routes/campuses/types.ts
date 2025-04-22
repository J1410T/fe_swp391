/**
 * Campus entity data structure
 */
export interface Campus {
  id: string;
  name: string;
  code: string;
  address: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Campuses data model
 */
export interface CampusesData {
  campuses: Campus[];
}

/**
 * Campuses loader response type
 */
export interface CampusesLoaderResponse {
  data: CampusesData;
  error?: string;
}

/**
 * Campus creation request data
 */
export interface CampusCreateData {
  name: string;
  code: string;
  address: string;
  description: string;
}
