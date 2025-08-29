import { useFormHelper } from "../../../../../../services/helperService";
import { Alert, Box, Card, Grid, Group, Image, Text } from "@mantine/core";
import { IconAlertCircle, IconDevicesPc, IconMail } from "@tabler/icons-react";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { patientSendReportSchema, type PatientSendReportFormType } from "../../../../../../services/zod_schema/manage_patient/patient/zodPatientSendReportSchema";
import { PageTextarea, PageTextInput } from "../../../../../common/PageInput";

export const PatientSendReportForm = (props: { dataPass: any }) => {
  const { targetFile } = props.dataPass;
  const securityPinObject = patientSendReportSchema();

  const form = useFormHelper<PatientSendReportFormType>({
    initialValues: {
      email: '',
      subject: '',
      content: '',
    },
    validationSchema: securityPinObject,
    mode: 'controlled',
  });

  // const { mutate: updateSecurityPin, status } = useUpdateSecurityPin(() => {
  //   notifications.show({
  //     title: 'Success!',
  //     message: 'Security PIN updated successfully',
  //     color: 'green',
  //   });
  //   form.reset();
  // });

const isLoading = false;

  const onSubmitCall = (__formData: PatientSendReportFormType) => {
    // const validatedData = securityPinObject.parse(formData);
    // updateSecurityPin({ id: id, body: validatedData });
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                <Card.Section className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <Group className="text-center">
                    <Image className="w-32 m-auto" src={targetFile} alt="Medical Report" />
                  </Group>
                </Card.Section>
                <Card.Section className="p-4 bg-white dark:bg-gray-800">
                  <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" className="mb-0 border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100" >
                    <Text size="sm" className="text-red-700 dark:text-red-300">The file will go to email with encryption.</Text>
                  </Alert>
                </Card.Section>
                <Card.Section className="p-4 bg-white dark:bg-gray-800">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Send"
                    submitButtonIcon={<IconMail size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Email" required>
                          <PageTextInput
                            placeholder="Enter email"
                            size="sm"
                            {...form.getInputProps('email')}
                            leftSection={<IconDevicesPc size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                        <FormField label="Subject" required>
                          <PageTextInput
                            placeholder="Enter email subject"
                            size="sm"
                            {...form.getInputProps('subject')}
                            leftSection={<IconDevicesPc size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Content" required >
                          <PageTextarea
                            placeholder="Enter content"
                            size="sm"
                            rows={5}
                            resize="vertical"
                            {...form.getInputProps('content')}
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
  );
};