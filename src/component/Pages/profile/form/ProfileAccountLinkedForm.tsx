import { Box, Card, Grid, Group, Text } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageSelect, PageTextInput } from "../../../common/PageInput"
import { IconCalendar, IconPlus } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { useCreateDepartment } from "../../../../hooks/query_hooks/departmentHooks"
import { notifications } from "@mantine/notifications"
import { profileAccountLinkedSchema, type ProfileAccountLinkedFormType } from "../../../../services/zod_schema/profile/zodProfileAccountLinkedSchema"

export const ProfileAccountLinkedForm = (props: { dataPass: any }) => {
  const { accountLinkedData } = props.dataPass;
  const accountLinkedObject = profileAccountLinkedSchema();

  const form = useFormHelper<ProfileAccountLinkedFormType>({
    initialValues: {
      accountHolderName: accountLinkedData?.accountHolderName || '',
      accountNumber: accountLinkedData?.accountNumber || '',
      bankName: accountLinkedData?.bankName || '',
      branchName: accountLinkedData?.branchName || '',
      routingNumber: accountLinkedData?.routingNumber || '',
      accountType: accountLinkedData?.accountType || '',
      accountOwnership: accountLinkedData?.accountOwnership || '',
      street: accountLinkedData?.street || '',
      city: accountLinkedData?.city || '',
      state: accountLinkedData?.state || '',
      zipCode: accountLinkedData?.zipCode || '',
    },
    validationSchema: accountLinkedObject,
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
  const onSubmitCall = (__formData: ProfileAccountLinkedFormType) => {
    try {
      // const validatedData = accountLinkedObject.parse(formData);
      // createDepartment(validatedData);
      notifications.show({
        title: 'Success!',
        message: 'Account Linked form submitted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please check your form data and try again',
        color: 'red',
      });
    }
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
                    <Text fw={600} size="md" className="text-cyan-800">Fill out Info</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-4 py-3">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText={accountLinkedData != null ? "Update Account" : "Create Account"}
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Account Holder Name" required >
                          <PageTextInput
                            placeholder="Enter account holder name"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('accountHolderName')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Account Number" required >
                          <PageTextInput
                            placeholder="Enter account number"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('accountNumber')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Bank Name" required >
                          <PageTextInput
                            placeholder="Enter bank name"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('bankName')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Branch Name" required >
                          <PageTextInput
                            placeholder="Enter branch name"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('branchName')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Routing Number" required >
                          <PageTextInput
                            placeholder="Enter routing number"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('routingNumber')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Account Type" required >
                          <PageSelect
                            placeholder="Select account type"
                            size="sm"
                            data={['Checking', 'Savings']}
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('accountType')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Account Ownership" required >
                          <PageSelect
                            placeholder="Select account ownership"
                            size="sm"
                            data={['Individual', 'Joint', 'Corporate']}
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('accountOwnership')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Street" required >
                          <PageTextInput
                            placeholder="Enter street"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('street')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 4, md: 4 }}>
                        <FormField label="City" required >
                          <PageTextInput
                            placeholder="Enter city"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('city')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 4, md: 4 }}>
                        <FormField label="State" required >
                          <PageTextInput
                            placeholder="Enter state"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('state')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 4, md: 4 }}>
                        <FormField label="Zip Code" required >
                          <PageTextInput
                            placeholder="Enter zip code"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('zipCode')} />
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