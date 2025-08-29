import requests from "../httpService";
import { API_ENDPOINTS } from "../apiEndpointService";
import type { DepartmentAddEditFormType } from "../zod_schema/medical_provider/department/zodDepartmentAddEditSchema";

export const departmentStoreService = {
  create: async (body: DepartmentAddEditFormType) => {
    return requests.post(API_ENDPOINTS.category.create, body);
  },
  update: async (id: string, body: DepartmentAddEditFormType) => {
    return requests.put(API_ENDPOINTS.category.update(id), body);
  },
  changeStatus: async (id: string) => {
    return requests.get(API_ENDPOINTS.category.update(id));
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
