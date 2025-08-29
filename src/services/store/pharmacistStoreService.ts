import requests from "../httpService";
import { API_ENDPOINTS } from "../apiEndpointService";
import type { PharmacistAddEditFormType } from "../zod_schema/manage_staff/pharmacist/zodPharmacistAddEditSchema";

export const pharmacistStoreService = {
  create: async (body: PharmacistAddEditFormType) => {
    return requests.post(API_ENDPOINTS.category.create, body);
  },
  update: async (id: string, body: PharmacistAddEditFormType) => {
    return requests.put(API_ENDPOINTS.category.update(id), body);
  },
  getAll: async (
    page: number = 0,
    limit: number = 10,
    searchQuery: string = ""
  ) => {
    if (page) {
      return requests.get(
        `${API_ENDPOINTS.category.get}?page=${page}&limit=${limit}&searchQuery=${searchQuery}`
      );
    } else {
      return requests.get(API_ENDPOINTS.category.get);
    }
  },
};
