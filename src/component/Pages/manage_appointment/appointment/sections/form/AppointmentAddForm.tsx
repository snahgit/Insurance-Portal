import { useState } from "react";
import { Box, Card, Grid, Group, Text, ActionIcon, TextInput, Button, Badge, Paper, Divider } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconSearch, IconUser, IconStethoscope, IconCalendarEvent, IconCalendar, IconHeartbeat, IconClipboardText, IconClock, IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { getAppointmentAddSchema, type AppointmentAddFormType } from "../../../../../../services/zod_schema/appointment/zodAppointmentAddSchema";
import { PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";


export const AppointmentAddForm = () => {
  const outPatientSchema = getAppointmentAddSchema();
  const [patientList, setPatientList] = useState<{ id: number; name: string }[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const form = useFormHelper<AppointmentAddFormType>({
    initialValues: {
      searchPatient: "",
      patient: "",
      physician: "",
      appointmentType: "",
      appointmentDate: "",
      medicalIssue: "",
      appointmentReason: "",
      symptoms: "",
    },
    validationSchema: outPatientSchema,
    mode: "controlled",
  });

  // const { status } = useAddCat(() => {
  //   // Success callback placeholder
  // });

  const isLoading = false;
  const mode = "create";

  const onSubmitCall = () => {
    try {
      notifications.show({
        title: "Success!",
        message: "Appointment created successfully",
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

  const handleSearch = () => {
    setPatientList([{
      id: 1,
      name: 'Rahul Biswas',
    }]);
  };

  const timeSlots = {
    morning: [
      { id: 1, time: "10:00-11:00", available: true },
      { id: 2, time: "11:00-12:00", available: true },
    ],
    afternoon: [
      { id: 3, time: "12:00-13:00", available: true },
      { id: 4, time: "13:00-14:00", available: true },
      { id: 5, time: "14:00-15:00", available: true },
      { id: 6, time: "15:00-16:00", available: true },
    ],
    evening: [
      { id: 7, time: "17:00-18:00", available: true },
      { id: 8, time: "18:00-19:00", available: true },
      { id: 9, time: "19:00-20:00", available: false },
      { id: 10, time: "20:00-21:00", available: true },
      { id: 11, time: "21:00-22:00", available: true },
      { id: 12, time: "22:00-23:00", available: true },
    ],
  };

  const isTimeSlotVisible = form.values.physician && form.values.appointmentType && form.values.appointmentDate;

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const topBarAndFilter = {
    type: "schedule",
    heading: "New Appointment",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Appointments",
            items: [
              { title: "Manage Appointments", href: "#" },
              { title: "Appointment List", href: "/manage-appointment/appointment", },
              { title: "Create Appointment", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-3">
            <FormWrapper
              form={form}
              onSubmit={onSubmitCall}
              submitButtonIcon={<IconPlus size={16} />}
              submitButtonText={mode === "create" ? "Submit Appointment Form" : "Update Appointment Form"}
              isLoading={isLoading}>
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 rounded-t-md">
                      <Group justify="space-between">
                        <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Put all information in below</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
                      <Grid>
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Search Patient" >
                            <TextInput
                              placeholder="Search patient by name..."
                              size="sm"
                              {...form.getInputProps("searchPatient")}
                              onKeyDown={(event) => { if (event.key === "Enter") { handleSearch(); } }}
                              leftSection={<IconSearch size={16} />}
                              rightSection={
                                <ActionIcon
                                  variant="filled"
                                  onClick={handleSearch}
                                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer transition-all duration-200 hover:scale-105"
                                  size="lg"
                                  radius="xs"
                                >
                                  <IconSearch size={16} />
                                </ActionIcon>
                              }
                            />
                          </FormField>
                        </Grid.Col>
                        {patientList.length > 0 && (
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                            <FormField label="Select Patient" required >
                              <PageSelect
                                placeholder="Patient"
                                data={["John Doe", "Michael Johnson", "Jane Smith"]}
                                size="sm"
                                {...form.getInputProps("patient")}
                                leftSection={<IconUser size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                        )}
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Physician" required >
                            <PageSelect
                              placeholder="Physician"
                              data={["Test MP MF", "Argentia", "Test MP", "John Doe",]}
                              size="sm"
                              {...form.getInputProps("physician")}
                              leftSection={<IconStethoscope size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Appointment Type" required >
                            <PageSelect
                              placeholder="Appointment Type"
                              data={["In Person", "Home visit", "Virtual"]}
                              size="sm"
                              {...form.getInputProps("appointmentType")}
                              leftSection={<IconCalendarEvent size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Appointment Date" required >
                            <DateInput
                              placeholder="Appointment Date"
                              size="sm"
                              {...form.getInputProps("appointmentDate")}
                              leftSection={<IconCalendar size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        {isTimeSlotVisible && (
                          <Grid.Col span={{ base: 12 }}>
                            <Divider my="md" size="xs" variant="dashed" color="blue" label="You need to select a time slot" labelPosition="center" className="w-full text-gray-900 dark:text-white" />
                            <Grid.Col span={12}>
                              <Paper className="bg-gradient-to-r from-yellow-50 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                                <Grid>
                                  <Grid.Col span={{ base: 12 }}>
                                    <Group justify="space-between" align="center">
                                      <Group gap="xs">
                                        <IconClock size={20} className="text-green-700 dark:text-green-400" />
                                        <Text fw={600} size="md" className="text-green-800 dark:text-green-300">Select Time Slot</Text>
                                      </Group>
                                      {selectedTimeSlot && (
                                        <Badge variant="filled" size="sm" className="bg-cyan-500 dark:bg-cyan-600">Selected: {selectedTimeSlot}</Badge>
                                      )}
                                    </Group>
                                  </Grid.Col>
                                  <Grid.Col span={{ base: 12 }}>
                                    <Grid>
                                      <Grid.Col span={{ base: 12, md: 4 }}>
                                        <Paper className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700 h-full">
                                          <Text fw={600} size="sm" className="mb-3 text-orange-800 dark:text-orange-300 text-center">🌅 Morning Slot</Text>
                                          <div className="flex flex-wrap gap-2 justify-center">
                                            {timeSlots.morning.map((slot) => (
                                              <Button
                                                key={slot.id}
                                                variant={selectedTimeSlot === slot.time ? "filled" : "outline"}
                                                color={selectedTimeSlot === slot.time ? "cyan" : "blue"}
                                                size="xs"
                                                className={`
                                                      ${selectedTimeSlot === slot.time
                                                    ? "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white hover:text-white"
                                                    : "bg-cyan-500 hover:bg-cyan-600 border-cyan-500 text-white hover:text-white"
                                                  }
                                                      transition-all duration-200 hover:scale-105 min-w-[90px]
                                                    `}
                                                onClick={() => handleTimeSlotSelect(slot.time)}
                                                disabled={!slot.available}
                                              >
                                                {slot.time}
                                              </Button>
                                            ))}
                                          </div>
                                        </Paper>
                                      </Grid.Col>
                                      <Grid.Col span={{ base: 12, md: 4 }}>
                                        <Paper className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700 h-full">
                                          <Text fw={600} size="sm" className="mb-3 text-blue-800 dark:text-blue-300 text-center">☀️ Afternoon Slot</Text>
                                          <div className="flex flex-wrap gap-2 justify-center">
                                            {timeSlots.afternoon.map((slot) => (
                                              <Button
                                                key={slot.id}
                                                variant={selectedTimeSlot === slot.time ? "filled" : "outline"}
                                                color={selectedTimeSlot === slot.time ? "cyan" : "blue"}
                                                size="xs"
                                                className={`
                                                      ${selectedTimeSlot === slot.time
                                                    ? "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white hover:text-white"
                                                    : "bg-cyan-500 hover:bg-cyan-600 border-cyan-500 text-white hover:text-white"
                                                  }
                                                      transition-all duration-200 hover:scale-105 min-w-[90px]
                                                    `}
                                                onClick={() => handleTimeSlotSelect(slot.time)}
                                                disabled={!slot.available}
                                              >
                                                {slot.time}
                                              </Button>
                                            ))}
                                          </div>
                                        </Paper>
                                      </Grid.Col>
                                      <Grid.Col span={{ base: 12, md: 4 }}>
                                        <Paper className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700 h-full">
                                          <Text fw={600} size="sm" className="mb-3 text-purple-800 dark:text-purple-300 text-center">🌙 Evening Slot</Text>
                                          <div className="flex flex-wrap gap-2 justify-center">
                                            {timeSlots.evening.map((slot) => (
                                              <Button
                                                key={slot.id}
                                                variant={selectedTimeSlot === slot.time ? "filled" : "outline"}
                                                color={selectedTimeSlot === slot.time ? "cyan" : "blue"}
                                                size="xs"
                                                className={`
                                                      ${selectedTimeSlot === slot.time
                                                    ? "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white hover:text-white"
                                                    : slot.available
                                                      ? "bg-cyan-500 hover:bg-cyan-600 border-cyan-500 text-white hover:text-white"
                                                      : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                                                  }
                                                      transition-all duration-200 hover:scale-105 min-w-[90px]
                                                    `}
                                                onClick={() => handleTimeSlotSelect(slot.time)}
                                                disabled={!slot.available}
                                              >
                                                {slot.time}
                                              </Button>
                                            ))}
                                          </div>
                                        </Paper>
                                      </Grid.Col>
                                    </Grid>
                                  </Grid.Col>
                                </Grid>
                              </Paper>
                            </Grid.Col>
                          </Grid.Col>
                        )}
                        <Grid.Col span={{ base: 12 }}>
                          <Divider my="md" size="xs" variant="dashed" color="blue" label="Put your reason here" labelPosition="center" className="w-full text-gray-900 dark:text-white" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Medical Issue" required >
                            <PageTextInput
                              placeholder="Medical Issue"
                              size="sm"
                              {...form.getInputProps("medicalIssue")}
                              leftSection={<IconHeartbeat size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 6, xs: 12 }}>
                          <FormField label="Appointment Reason" required >
                            <PageTextInput
                              placeholder="Appointment Reason"
                              size="sm"
                              {...form.getInputProps("appointmentReason")}
                              leftSection={<IconClipboardText size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 12, sm: 12 }}>
                          <FormField label="Symptoms" required >
                            <PageTextarea
                              rows={6}
                              resize="vertical"
                              placeholder="Symptoms"
                              size="sm"
                              {...form.getInputProps("symptoms")}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              </Grid>
            </FormWrapper>
          </Card.Section>
        </Card>
      </Box>
    </Box>
  )
}
