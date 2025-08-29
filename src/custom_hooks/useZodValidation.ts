import { useState } from "react";
import type { ZodType } from "zod";
import { z } from "zod";
import type { UserLoginProps } from "../types/UserInterface";
import type { UserDetailsInterface } from "../types/UserInterface";

export function useFieldValidation<T>(schema: ZodType<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    fieldName: keyof UserDetailsInterface | keyof UserLoginProps,
    value: unknown
  ) => {
    const shape = (schema as any).shape as Record<string, ZodType<any>>;
    const fieldSchema = shape?.[fieldName];

    if (!fieldSchema) return;

    try {
      fieldSchema.parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError && error.issues.length > 0) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error.issues[0].message,
        }));
      }
    }
  };

  const validateAll = (data: T): data is T => {
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0];
      if (typeof key === "string") newErrors[key] = issue.message;
      else newErrors.form = issue.message;
    });
    setErrors(newErrors);
    return false;
  };

  return { errors, validateField, validateAll, setErrors };
}
