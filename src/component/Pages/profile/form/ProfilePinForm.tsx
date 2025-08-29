import { Box, Card, Grid, Group, Text } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageTextInput } from "../../../common/PageInput"
import { IconNumber, IconPlus } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { useCreateDepartment } from "../../../../hooks/query_hooks/departmentHooks"
import { notifications } from "@mantine/notifications"
import moment from "moment"
import { profileInsuranceCoveredSchema, type ProfileInsuranceCoveredFormType } from "../../../../services/zod_schema/profile/zodProfileInsuranceCoveredSchema"

export const ProfilePinForm = (props: { dataPass: any }) => {
  const { insuranceCoveredData } = props.dataPass;
  const certificationObject = profileInsuranceCoveredSchema();

  const form = useFormHelper<ProfileInsuranceCoveredFormType>({
    initialValues: {
      selectInsurance: insuranceCoveredData?.selectInsurance || '',
      startDate: insuranceCoveredData?.startDate ? moment(insuranceCoveredData.startDate).format('YYYY-MM-DD') : '',
      providerId: insuranceCoveredData?.providerId || '',
      endYear: insuranceCoveredData?.endYear || '',
    },
    validationSchema: certificationObject,
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
  const onSubmitCall = (__formData: ProfileInsuranceCoveredFormType) => {
    try {
      // const validatedData = certificationObject.parse(formData);
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
                    submitButtonText={insuranceCoveredData == null ? "Add PIN" : "Update PIN"}
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Enter PIN" required >
                          <PageTextInput
                            placeholder="Enter PIN"
                            size="sm"
                            leftSection={<IconNumber size={16} />}
                            {...form.getInputProps('providerId')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Confirm PIN" required >
                          <PageTextInput
                            placeholder="Confirm PIN"
                            size="sm"
                            leftSection={<IconNumber size={16} />}
                            {...form.getInputProps('providerId')} />
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