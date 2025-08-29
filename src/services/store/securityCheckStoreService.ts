import requests from "../httpService";
import { API_ENDPOINTS } from "../apiEndpointService";
import type { SecurityCheckSchemaFormType } from "../zod_schema/zodSecurityCheckSchema";

export const securityCheckStoreService = {
  update: async (id: string, body: SecurityCheckSchemaFormType) => {
    return requests.put(API_ENDPOINTS.category.update(id), body);
  },
};
