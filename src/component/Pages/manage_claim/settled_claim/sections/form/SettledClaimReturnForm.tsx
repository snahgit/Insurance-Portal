import { Alert, Box, Card, Grid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { IconCheck, IconInfoCircle, IconSelect } from "@tabler/icons-react";
import { PageSelect } from "../../../../../common/PageInput";
import { settledClaimReturnSchema, type SettledClaimReturnFormType } from "../../../../../../services/zod_schema/manage_claim/settled_claim/zodSettledClaimReturnSchema";

export const SettledClaimReturnForm = (__props: { dataPass: any }) => {

  const settledClaimReturnObject = settledClaimReturnSchema();
  const form = useFormHelper<SettledClaimReturnFormType>({
    initialValues: {
      reason: '',
    },
    validationSchema: settledClaimReturnObject,
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
  const onSubmitCall = (__formData: SettledClaimReturnFormType) => {
    // const validatedData = settledClaimReturnObject.parse(formData);
    // createDepartment(validatedData);
  };
  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200">
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
                        >The reason for returning the claim is required.</Alert>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Select reason" required >
                          <PageSelect
                            placeholder="Select reason"
                            size="sm"
                            data={['Missing billing code', 'Incorrect patient name', 'DOB not matching', 'Other']}
                            {...form.getInputProps('reason')}
                            leftSection={<IconSelect size={16} />} />
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