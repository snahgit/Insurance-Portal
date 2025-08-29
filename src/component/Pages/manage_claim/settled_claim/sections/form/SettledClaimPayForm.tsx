import { Alert, Box, Card, Grid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { IconCheck, IconCurrencyDollar, IconInfoCircle, IconMoneybag } from "@tabler/icons-react";
import { PageNumberInput, PageSelect } from "../../../../../common/PageInput";
import { settledClaimPaySchema, type SettledClaimPayFormType } from "../../../../../../services/zod_schema/manage_claim/settled_claim/zodSettledClaimPaySchema";

export const SettledClaimPayForm = (props: { dataPass: any }) => {
  const { id } = props.dataPass;

  const settledClaimPayObject = settledClaimPaySchema();
  const form = useFormHelper<SettledClaimPayFormType>({
    initialValues: {
      bankAccount: '',
      payingAmount: id.amount,
    },
    validationSchema: settledClaimPayObject,
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
  const onSubmitCall = (__formData: SettledClaimPayFormType) => {
    // const validatedData = settledClaimPayObject.parse(formData);
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
                        >
                          Claim amount will be deducted from account. You need to choose any one account from where you want to settle the claim amount.
                        </Alert>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Select Account/Wallet" required >
                          <PageSelect
                            placeholder="Select bank account"
                            size="sm"
                            data={['Bank A', 'Bank B', 'Bank C']}
                            {...form.getInputProps('bankAccount')}
                            leftSection={<IconMoneybag size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Paying amount" required>
                          <PageNumberInput
                            placeholder="Enter the paying amount"
                            size="sm"
                            readonly
                            leftSection={<IconCurrencyDollar size={16} />}
                            {...form.getInputProps("payingAmount")}
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