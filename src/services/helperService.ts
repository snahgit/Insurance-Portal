import { useForm } from '@mantine/form';
import { z } from 'zod';

export const useFormHelper = <T extends Record<string, any>>({
  initialValues,
  validationSchema,
  mode = 'controlled',
}: {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  mode?: 'controlled' | 'uncontrolled';
}) => {
  return useForm<T>({
    mode,
    initialValues,
    validate: (values: T) => {
      try {
        validationSchema.parse(values);
        return {};
      } catch (error: any) {
        const errors: Record<string, string> = {};
        if (error && error.issues) {
          error.issues.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              errors[err.path[0]] = err.message;
            }
          });
        }
        return errors;
      }
    },
  });
};
