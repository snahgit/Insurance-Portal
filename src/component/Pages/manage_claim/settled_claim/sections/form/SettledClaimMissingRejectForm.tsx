import { Alert, Box, Card, Grid, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { PageTextarea } from "../../../../../common/PageInput";
import { settledClaimMissingRejectSchema, type SettledClaimMissingRejectFormType } from "../../../../../../services/zod_schema/manage_claim/settled_claim/zodSettledClaimMissingRejectSchema";

export const SettledClaimMissingRejectForm = (props:{dataPass: any}) => {
  const { type } = props.dataPass;

  const settledClaimMissingRejectObject = settledClaimMissingRejectSchema();
  const form = useFormHelper<SettledClaimMissingRejectFormType>({
    initialValues: {
      reason: '',
    },
    validationSchema: settledClaimMissingRejectObject,
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
  const onSubmitCall = (__formData: SettledClaimMissingRejectFormType) => {
    // const validatedData = cancelRejectObject.parse(formData);
    // createDepartment(validatedData);
  };
  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200">
                <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                  <Group justify="space-between">
                    <Text fw={600} size="md" className="text-cyan-800">Please provide a reason for {type == 'Reject' ? "rejecting" : "missing"}</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-4 py-3">
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
                          className="mb-4"
                        >
                          Please provide a detailed and clear reason for {type === 'Reject' ? 'rejecting' : 'missing'} this appointment. 
                          This information will be recorded and may be shared with the patient for transparency.
                        </Alert>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label={`Reason for ${type == 'Reject' ? "rejecting" : "missing"}`} required >
                          <PageTextarea
                            placeholder={`Enter the reason for ${type == 'Reject' ? "rejecting" : "missing"}...`}
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