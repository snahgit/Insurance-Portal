import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SecurityCheckSchemaFormType } from "../../services/zod_schema/zodSecurityCheckSchema";
import { securityCheckStoreService } from "../../services/store/securityCheckStoreService";


export const useUpdateSecurityCheck = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; body: SecurityCheckSchemaFormType }) =>
      securityCheckStoreService.update(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securityCheck"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
