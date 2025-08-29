import { Alert, Box, Card, Grid, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { appointmentCancelRejectSchema, type AppointmentCancelRejectFormType } from "../../../../../../services/zod_schema/appointment/zodAppointmentCancelRejectSchema";
import { PageTextarea } from "../../../../../common/PageInput";

export const AppointmentCancelRejectForm = (props:{dataPass: any}) => {
  const { type } = props.dataPass;
  
  const cancelRejectObject = appointmentCancelRejectSchema();
  const form = useFormHelper<AppointmentCancelRejectFormType>({
    initialValues: {
      reason: '',
    },
    validationSchema: cancelRejectObject,
    mode: 'controlled',
  });
  const { mutate: __createDepartment, status } = useCreateDepartment(() => {
    notifications.show({
      title: 'Success!',
      message: 'Department created successfully',
      color: 'green',
    });
    form.reset();
  });
  const isLoading = status === "pending";
  const onSubmitCall = (__formData: AppointmentCancelRejectFormType) => {
    // const validatedData = cancelRejectObject.parse(formData);
    // createDepartment(validatedData);
  };
  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                <Card.Section className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 rounded-t-md">
                  <Group justify="space-between">
                    <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Please provide a reason for {type == 'cancel' ? "cancellation" : "rejection"}</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-4 py-3 bg-white dark:bg-gray-800">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Submit"
                    submitButtonIcon={<IconCheck size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <Alert 
                          icon={<IconInfoCircle size={16} />} 
                          title="Important Information" 
                          color="blue"
                          variant="light"
                          className="mb-4 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                        >
                          Please provide a detailed and clear reason for {type === 'cancel' ? 'canceling' : 'rejecting'} this appointment. 
                          This information will be recorded and may be shared with the patient for transparency.
                        </Alert>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label={`Reason for ${type == 'cancel' ? "Cancellation" : "Rejection"}`} required >
                          <PageTextarea
                            placeholder={`Enter the reason for ${type == 'cancel' ? "cancellation" : "rejection"}...`}
                            size="sm"
                            {...form.getInputProps("reason")}
                            rows={5}
                            resize="vertical"
                          />
                        </FormField>
                      </Grid.Col>
                    </Grid>
                  </FormWrapper>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </Box>
  )
}