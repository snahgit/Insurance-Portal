import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { DateInput } from "@mantine/dates";
import { IconCheck, IconStethoscope, IconUser, IconCalendar, IconClipboardText } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import { getOutPatientFormSchema, type CreateOutPatientFormValues } from "../../../../../../services/zod_schema/appointment/zodOutpatientSchema";
import { PageSelect, PageTextInput } from "../../../../../common/PageInput";

export const AppointmentOutPatientForm = () => {
  const outPatientSchema = getOutPatientFormSchema();
  const form = useFormHelper<CreateOutPatientFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      dateAdmitted: "",
      reasonForAppointment: "",
      diagnosis: "",
      treatmentTaken: "",
      timeOfTreatment: "",
      wasTreatmentRequestedByPhysician: "",
      treatmentNotes: "",
      isFutureTreatmentNeeded: "",
      futureTreatmentDate: "",
      futureTreatmentNote: "",
      patientPrescribedMedication: "",
      attendingMedicalProvider: "",
    },
    validationSchema: outPatientSchema,
    mode: "controlled",
  });

  // const { status } = useAddCat(() => {

  // });

  const isLoading = false;

  const onSubmitCall = () => {
    try {
      notifications.show({
        title: "Success!",
        message: "Outpatient form submitted successfully",
        color: "green",
      });
      console.log("Form Data:", form.values);
      form.reset();
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: "Please check all required fields",
        color: "red",
      });
    }
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
                    <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Please provide out patient information</Text>
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
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                        <FormField label="First Name" required>
                          <PageTextInput placeholder="Enter First Name"
                            size="sm"
                            {...form.getInputProps("firstName")}
                            leftSection={<IconUser size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                        <FormField label="Last Name" required >
                          <PageTextInput placeholder="Enter Last Name"
                            size="sm"
                            {...form.getInputProps("lastName")}
                            leftSection={<IconUser size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                        <FormField label="Date Admitted" required >
                          <DateInput placeholder="Date Admitted"
                            size="sm"
                            {...form.getInputProps("dateAdmitted")}
                            leftSection={<IconCalendar size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Reason for Appointment" required >
                          <PageTextInput placeholder="Reason for Appointment"
                            size="sm"
                            {...form.getInputProps("reasonForAppointment")}
                            leftSection={<IconClipboardText size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 6, md: 6, sm: 6, xs: 12 }}>
                        <FormField label="Diagnosis" required >
                          <PageTextInput placeholder="Diagnosis"
                            size="sm"
                            {...form.getInputProps("diagnosis")}
                            leftSection={<IconStethoscope size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 6, md: 6, sm: 6, xs: 12 }}>
                        <FormField label="Treatment taken" required >
                          <PageTextInput placeholder="Treatment taken"
                            size="sm"
                            {...form.getInputProps("treatmentTaken")}
                            leftSection={<IconStethoscope size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <FormField label="Time of treatment" required >
                          <DateInput placeholder="Time of treatment"
                            size="sm"
                            {...form.getInputProps("timeOfTreatment")}
                            leftSection={<IconCalendar size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 8, md: 8, sm: 6, xs: 12 }}>
                        <FormField label="Was treatment requested by physician?" required >
                          <PageSelect placeholder="Was treatment requested by physician?"
                            data={["Yes", "No"]}
                            size="sm"
                            {...form.getInputProps("wasTreatmentRequestedByPhysician")}
                            leftSection={<IconCheck size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <FormField label="Treatment Notes" required >
                          <PageTextInput placeholder="Enter Treatment Notes"
                            size="sm"
                            {...form.getInputProps("treatmentNotes")}
                            leftSection={<IconClipboardText size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <FormField label="Is future treatment needed?" required >
                          <PageSelect placeholder="Is future treatment needed?"
                            data={["Yes", "No"]}
                            size="sm"
                            {...form.getInputProps("isFutureTreatmentNeeded")}
                            leftSection={<IconCheck size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      {form.values.isFutureTreatmentNeeded === "Yes" && (
                        <Fragment>
                          <Grid.Col span={{ base: 12 }}>
                            <Card withBorder className="border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                              <Card.Section className="p-3">
                                <Group>
                                  <IconCalendar size={20} className="text-amber-600 dark:text-amber-400" />
                                  <Text size="sm" fw={500} className="text-amber-800 dark:text-amber-200">
                                    Future Treatment Planning
                                  </Text>
                                </Group>
                                <Text size="xs" className="text-amber-700 dark:text-amber-300 mt-2">
                                  Please provide detailed information about the recommended future treatment.
                                  This information will be used for scheduling follow-up appointments and
                                  ensuring continuity of care.
                                </Text>
                              </Card.Section>
                            </Card>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                            <FormField label="Future treatment date" required >
                              <DateInput placeholder="Future treatment date"
                                size="sm"
                                {...form.getInputProps("futureTreatmentDate")}
                                leftSection={<IconCalendar size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 8, md: 8, sm: 6, xs: 12 }}>
                            <FormField label="Future treatment note" required >
                              <PageTextInput placeholder="Describe the recommended future treatment plan"
                                size="sm"
                                {...form.getInputProps("futureTreatmentNote")}
                                leftSection={<IconClipboardText size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                        </Fragment>
                      )}
                      <Grid.Col span={{ base: 12, lg: 6, md: 6, sm: 6, xs: 12 }}>
                        <FormField label="Was patient prescribed medication?" required>
                          <PageSelect
                            placeholder="Was patient prescribed medication?"
                            data={["Yes", "No"]}
                            size="sm"
                            {...form.getInputProps("patientPrescribedMedication")}
                            leftSection={<IconCheck size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, lg: 6, md: 6, sm: 6, xs: 12 }}>
                        <FormField label="Attending Medical Provider Name" required>
                          <PageTextInput placeholder="Enter Attending Medical Provider"
                            size="sm"
                            {...form.getInputProps("attendingMedicalProvider")}
                            leftSection={<IconUser size={16} />}
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