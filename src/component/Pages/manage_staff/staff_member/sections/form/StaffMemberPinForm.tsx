import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Card, Text, Group, Alert, Avatar, Box, Grid } from "@mantine/core";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { IconDevicesPc, IconUser, IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { useUpdateSecurityPin } from "../../../../../../hooks/query_hooks/staffMemberHooks";
import { staffMemberPinSchema, type StaffMemberPinFormType } from "../../../../../../services/zod_schema/manage_staff/staff_member/zodStaffMemberPinSchema";
import { PageTextInput } from "../../../../../common/PageInput";

export const StaffMemberPinForm = (props: { dataPass: any }) => {
  const { id, snahId, name } = props.dataPass;
  const securityPinObject = staffMemberPinSchema();

  const form = useFormHelper<StaffMemberPinFormType>({
    initialValues: {
      newPin: '',
      confirmNewPin: '',
    },
    validationSchema: securityPinObject,
    mode: 'controlled',
  });

  const { mutate: updateSecurityPin, status } = useUpdateSecurityPin(() => {
    notifications.show({
      title: 'Success!',
      message: 'Security PIN updated successfully',
      color: 'green',
    });
    form.reset();
  });

  const isLoading = status === "pending";

  const onSubmitCall = (formData: StaffMemberPinFormType) => {
    const validatedData = securityPinObject.parse(formData);
    updateSecurityPin({ id: id, body: validatedData });
  };

  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200">
                <Card.Section className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <Group>
                    <Avatar size="md" className="bg-emerald-500">
                      <IconUser size={20} />
                    </Avatar>
                    <div>
                      <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">
                        {name}
                      </Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">
                        Staff ID: {snahId}
                      </Text>
                    </div>
                  </Group>
                </Card.Section>
                <Card.Section className="p-4">
                  <Alert
                    icon={<IconAlertCircle size={16} />}
                    color="red"
                    variant="light"
                    className="mb-0"
                  >
                    <Text size="sm">
                      Once you set your PIN, make sure to remember it. Contact your administrator if you forget your PIN.
                    </Text>
                  </Alert>
                </Card.Section>
                <Card.Section className="p-4">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Update your PIN"
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="New Pin" required >
                          <PageTextInput
                            placeholder="Enter new PIN"
                            size="sm"
                            {...form.getInputProps('newPin')}
                            leftSection={<IconDevicesPc size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Confirm New Pin" required >
                          <PageTextInput
                            placeholder="Confirm new PIN"
                            size="sm"
                            {...form.getInputProps('confirmNewPin')}
                            leftSection={<IconDevicesPc size={16} />} />
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