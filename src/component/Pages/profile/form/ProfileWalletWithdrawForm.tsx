import { Alert, Box, Card, Grid, Group, NumberFormatter, Space, Text } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageNumberInput, PageSelect } from "../../../common/PageInput"
import { IconAlertCircle, IconMoneybagEdit, IconNumber, IconPlus } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { notifications } from "@mantine/notifications"
import { profileWalletWithdrawSchema, type ProfileWalletWithdrawFormType } from "../../../../services/zod_schema/profile/zodProfileWalletWithdrawSchema"

export const ProfileWalletWithdrawForm = (_props: { dataPass: any }) => {
  // const { id } = props.dataPass;
  const bakList = [
    {
      name: 'Bank of America',
      accNumber: '**** **** **** 1234',
      accHolder: 'John Doe'
    },
    {
      name: 'SBI',
      accNumber: '**** **** **** 6985',
      accHolder: 'Will Smith'
    },
    {
      name: 'Wells Fargo',
      accNumber: '**** **** **** 1754',
      accHolder: 'Ella Fitzgerald'
    }
  ]
  const profileWalletWithdrawObject = profileWalletWithdrawSchema();
  const form = useFormHelper<ProfileWalletWithdrawFormType>({
    initialValues: {
      bank: '',
      amount: 100,
    },
    validationSchema: profileWalletWithdrawObject,
    mode: 'controlled',
  });
  // const { mutate: createDepartment, status } = useCreateDepartment(() => {
  //   notifications.show({
  //     title: 'Success!',
  //     message: 'Department created successfully',
  //     color: 'green',
  //   });
  //   form.reset();
  // });

  const isLoading = false;
  const onSubmitCall = (__formData: ProfileWalletWithdrawFormType) => {
    try {
      // const validatedData = profileWalletWithdrawObject.parse(form);
      // createDepartment(validatedData);
      notifications.show({
        title: 'Success!',
        message: 'Certification form submitted successfully',
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
                    submitButtonText="Withdraw"
                    submitButtonIcon={<IconMoneybagEdit size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Select bank" required >
                          <PageSelect
                            placeholder="Select bank"
                            size="sm"
                            data={bakList.map((item) => ({
                              value: item.accNumber,
                              label: item.name
                            }))}
                            leftSection={<IconNumber size={16} />}
                            {...form.getInputProps('bank')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        {form.values.bank ? (
                          // Show selected bank details
                          (() => {
                            const selectedBank = bakList.find(bank => bank.accNumber === form.values.bank);
                            return selectedBank ? (
                              <Card withBorder radius="md" className="border-green-200 bg-green-50 dark:bg-green-900/20">
                                <Card.Section className="px-4 py-3">
                                  <Text size="sm" c="dimmed" mb={4}>Selected Bank Details</Text>
                                  <Text fw={600} size="md" mb={2}>Bank Name</Text>
                                  <Text size="sm" mb={8}>{selectedBank.name}</Text>
                                  <Text fw={600} size="md" mb={2}>Account Holder Name</Text>
                                  <Text size="sm" mb={8}>{selectedBank.accHolder}</Text>
                                  <Text fw={600} size="md" mb={2}>Account No.</Text>
                                  <Text size="sm" c="red">{selectedBank.accNumber}</Text>
                                </Card.Section>
                              </Card>
                            ) : null;
                          })()
                        ) : (
                          // Show "Add New Bank" option when no bank is selected
                          <Card
                            withBorder
                            radius="md"
                            className="border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                            onClick={() => {
                              notifications.show({
                                title: 'Add New Bank',
                                message: 'Add new bank functionality will be implemented',
                                color: 'blue',
                              });
                            }}
                          >
                            <Card.Section className="px-4 py-6 text-center">
                              <Group justify="center" gap="sm">
                                <IconPlus size={20} className="text-gray-500" />
                                <Text size="md" c="dimmed">Add New Bank</Text>
                              </Group>
                            </Card.Section>
                          </Card>
                        )}
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Enter amount" required >
                          <PageNumberInput
                            placeholder="Enter amount"
                            size="sm"
                            leftSection={<IconNumber size={16} />}
                            {...form.getInputProps('amount')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <Alert variant="light" color="pink" title="Alert title" icon={<IconAlertCircle size={16} />} >
                          <Text size="sm"><b>Note:</b> SNAH will take service charge of 8% on each withdrawal transaction.</Text>
                          <Space h="md" />
                          <Text size="sm">So after the service charge, you will receive <b><NumberFormatter value={(form.values.amount - (form.values.amount * 8) / 100)} prefix="$ " /></b>.</Text>
                        </Alert>
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