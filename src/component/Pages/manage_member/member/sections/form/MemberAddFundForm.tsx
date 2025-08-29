import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Card, Box, Grid } from "@mantine/core";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { IconCalendar, IconCurrencyDollar, IconDevicesPc, IconMoneybag, IconPlus } from "@tabler/icons-react";
import { useUpdateSecurityPin } from "../../../../../../hooks/query_hooks/staffMemberHooks";
import { PageDateTimeInput, PageSelect, PageTextInput } from "../../../../../common/PageInput";
import { memberAddFundSchema, type MemberAddFundFormType } from "../../../../../../services/zod_schema/manage_member/member/zodMemberAddFundSchema";
import moment from "moment";

export const MemberAddFundForm = (props: { dataPass: any }) => {
  const {id } = props.dataPass;
  console.log(id);
  const memberAddFundObject = memberAddFundSchema();

  const form = useFormHelper<MemberAddFundFormType>({
    initialValues: {
      firstName: 'John',
      lastName: 'Wick',
      personName: 'UC Davice Medical Facility',
      authorizedBy: '',
      dateTime: moment().format('MM/DD/YYYY h:mm A'),
      amount: '',
      bankAccount: '',
    },
    validationSchema: memberAddFundObject,
    mode: 'controlled',
  });

  const { mutate: __updateSecurityPin, status } = useUpdateSecurityPin(() => {
    notifications.show({
      title: 'Success!',
      message: 'Security PIN updated successfully',
      color: 'green',
    });
    form.reset();
  });

  const isLoading = status === "pending";

  const onSubmitCall = (__formData: MemberAddFundFormType) => {
    // const validatedData = memberAddFundObject.parse(formData);
    // updateSecurityPin({ id: id, body: validatedData });
  };
  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                <Card.Section className="p-4 bg-white dark:bg-gray-800">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Add fund"
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="First Name" required>
                          <PageTextInput
                            className="text-gray-600 dark:text-gray-400"
                            placeholder="Enter first name"
                            size="sm"
                            {...form.getInputProps('firstName')}
                            readonly
                            leftSection={<IconDevicesPc size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="Last Name" required >
                          <PageTextInput
                            className="text-gray-600 dark:text-gray-400"
                            placeholder="Enter last name"
                            size="sm"
                            {...form.getInputProps('lastName')}
                            readonly
                            leftSection={<IconDevicesPc size={16} />} />
                        </FormField>
                      </Grid.Col>
                      {/* <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="The person entering the amount" required >
                          <PageTextInput
                            placeholder="Person name"
                            size="sm"
                            disabled
                            {...form.getInputProps('personName')}
                            leftSection={<IconDevicesPc size={16} />} />
                        </FormField>
                      </Grid.Col> */}
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="Authorized By" required >
                          <PageSelect
                            placeholder="Authorized name"
                            size="sm"
                            data={['John Doe', 'Jane Smith']}
                            {...form.getInputProps('authorizedBy')}
                            leftSection={<IconPlus size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="Select date & time" required >
                          <PageDateTimeInput
                            placeholder="MM/DD/YYYY h:mm AM/PM"
                            valueFormat="MMM DD YYYY hh:mm A"
                            size="sm"
                            readonly
                            value={new Date()}
                            onChange={(date) => {
                              form.setFieldValue('dateTime', date ? moment(date).format('MMM DD YYYY hh:mm A') : moment().format('MMM DD YYYY hh:mm A'));
                            }}
                            timePickerProps={{
                              withDropdown: true,
                              popoverProps: { withinPortal: false },
                              format: '12',
                            }}
                            leftSection={<IconCalendar size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="Amount" required >
                          <PageTextInput
                            placeholder="Enter amount"
                            size="sm"
                            {...form.getInputProps('amount')}
                            leftSection={<IconCurrencyDollar size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                        <FormField label="Select bank account" required >
                          <PageSelect
                            placeholder="Select bank account"
                            size="sm"
                            data={['Bank A', 'Bank B', 'Bank C']}
                            {...form.getInputProps('bankAccount')}
                            leftSection={<IconMoneybag size={16} />} />
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
  );
};