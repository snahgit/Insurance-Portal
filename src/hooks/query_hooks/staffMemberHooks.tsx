import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { staffMemberStoreService } from "../../services/store/staffMemberStoreService";
import type { StaffMemberAddEditFormType } from "../../services/zod_schema/manage_staff/staff_member/zodStaffMemberAddEditSchema";
import type { StaffMemberPinFormType } from "../../services/zod_schema/manage_staff/staff_member/zodStaffMemberPinSchema";

export const getCategory = (
  page?: number,
  limit?: number,
  searchQuery?: string
) => {
  return useQuery({
    queryKey: ["storeStaffMember", page, limit, searchQuery],
    queryFn: () => staffMemberStoreService.getAll(page, limit, searchQuery),
  });
};
export const useStaffMemberCreate = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: StaffMemberAddEditFormType) => staffMemberStoreService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeStaffMember"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
export const useUpdateStaffMember = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; body: StaffMemberAddEditFormType }) =>
      staffMemberStoreService.update(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeStaffMember"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
export const useUpdateSecurityPin = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; body: StaffMemberPinFormType }) =>
      staffMemberStoreService.updatePin(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeStaffMember"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
