import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentStoreService } from "../../services/store/departmentStoreService";
import type { DepartmentAddEditFormType } from "../../services/zod_schema/medical_provider/department/zodDepartmentAddEditSchema";

export const getCategory = (
  page?: number,
  limit?: number,
  searchQuery?: string
) => {
  return useQuery({
    queryKey: ["storeCats", page, limit, searchQuery],
    queryFn: () => departmentStoreService.getAll(page, limit, searchQuery),
  });
};
export const useChangeStatusDepartment = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; }) => departmentStoreService.changeStatus(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCats"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
export const useCreateDepartment = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: DepartmentAddEditFormType) => departmentStoreService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCats"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
export const useUpdateDepartment = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; body: DepartmentAddEditFormType }) =>
      departmentStoreService.update(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCats"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
