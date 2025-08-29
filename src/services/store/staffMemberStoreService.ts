import requests from "../httpService";
import { API_ENDPOINTS } from "../apiEndpointService";
import type { StaffMemberAddEditFormType } from "../zod_schema/manage_staff/staff_member/zodStaffMemberAddEditSchema";
import type { StaffMemberPinFormType } from "../zod_schema/manage_staff/staff_member/zodStaffMemberPinSchema";

export const staffMemberStoreService = {
  create: async (body: StaffMemberAddEditFormType) => {
    return requests.post(API_ENDPOINTS.category.create, body);
  },
  update: async (id: string, body: StaffMemberAddEditFormType) => {
    return requests.put(API_ENDPOINTS.category.update(id), body);
  },
  updatePin: async (id: string, body: StaffMemberPinFormType) => {
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
