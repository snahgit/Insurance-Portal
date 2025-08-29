import { z } from "zod";

export function getPINSchema() {
  const newPinFields = {
    new_pin: z.string().min(1, "Please provide New PIN"),
    confirm_new_pin: z.string().min(1, "Please provide Confirm PIN"),
  };

  const updatePINSchema = z
    .object({
      old_pin: z.string().min(1, "Please provide Old PIN"),
      ...newPinFields,
    })
    .refine((data) => data.new_pin === data.confirm_new_pin, {
      message: "PIN and Confirm PIN must match",
      path: ["confirm_new_pin"],
    });

  const resetPINSchema = z
    .object({
      otp: z.string().min(1, "Please provide OTP"),
      ...newPinFields,
    })
    .refine((data) => data.new_pin === data.confirm_new_pin, {
      message: "PIN and Confirm PIN must match",
      path: ["confirm_new_pin"],
    });

  const createPINSchema = z
    .object(newPinFields)
    .refine((data) => data.new_pin === data.confirm_new_pin, {
      message: "PIN and Confirm PIN must match",
      path: ["confirm_new_pin"],
    });

  return { updatePINSchema, resetPINSchema, createPINSchema };
}
