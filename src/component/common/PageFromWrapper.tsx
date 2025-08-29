import React, { Fragment } from 'react';
import { Stack, Group, Alert, Button, Text } from "@mantine/core";
import { IconAlertCircle, IconCancel, IconLoader, IconPlus } from "@tabler/icons-react";
import type { UseFormReturnType } from "@mantine/form";

interface FormFieldProps {
  icon?: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  icon,
  label,
  required = false,
  children,
  error,
  description
}) => (
  <div>
    <Text fw={500} size="sm" mb={5} className="text-stone-950 dark:text-stone-400 font-bold flex items-center gap-1">
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {label} 
      {required && <span className="text-red-500">*</span>}
    </Text>
    {description && (
      <Text size="xs" c="dimmed" mb={5}>
        {description}
      </Text>
    )}
    {children}
    {error && (
      <Text size="xs" color="red" mt={2}>
        {error}
      </Text>
    )}
  </div>
);

interface FormWrapperProps<T extends Record<string, any>> {
  form: UseFormReturnType<T>;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  submitButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
  columns?: 1 | 2;
  formProps?: any;
  actionButtonAlignment?: string;
  submitButtonIcon: React.ReactNode;
}

export const FormWrapper = <T extends Record<string, any>>({
  form,
  onSubmit,
  children,
  isLoading = false,
  error,
  actionButtonAlignment = "end",
  submitButtonText = "Submit",
  showCancelButton = false,
  onCancel,
  columns = 1,
  formProps,
  submitButtonIcon = <IconPlus size={16} />
}: FormWrapperProps<T>) => {
  return (
    <Fragment>
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="filled" radius="md" >{error}</Alert>
      )}
      <form onSubmit={form.onSubmit(onSubmit)} {...formProps}>
        <Stack gap="md">
          <div style={{ display: 'grid', gridTemplateColumns: columns === 2 ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr', gap: '1rem' }} >{children}</div>
          <Group justify={actionButtonAlignment} mt="xl">
            {showCancelButton && onCancel && (
              <Button
                variant="light"
                color="red"
                onClick={onCancel}
                disabled={isLoading}
                size="sm"
                leftSection={<IconCancel size={16} />}
                >Cancel</Button>
            )}
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              size="sm"
              className='bg-blue-500 hover:bg-blue-700 transition-colors duration-200'
              leftSection={isLoading ? <IconLoader size={16} /> : submitButtonIcon} >{submitButtonText}</Button>
          </Group>
        </Stack>
      </form>
    </Fragment>
  );
};