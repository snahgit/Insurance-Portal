import { useRef, useState } from "react";
import { Box, Button, Card, Grid, Group, Text, Paper, ActionIcon, FileInput, Divider, Badge } from "@mantine/core";
import { IconBrandBooking, IconBrandDoctrine, IconFile, IconSearch, IconUser, IconMedicalCross, IconTrash, IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { PageModal } from "../../../../../common/PageModal";
import { AppointmentNdcForm } from "./AppointmentNdcForm";
import { getAppointmentPrescriptionSchema, type AppointmentPrescriptionFormType } from "../../../../../../services/zod_schema/appointment/zodAppointmentPrescriptionSchema";
import { PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";

export const AppointmentPrescriptionForm = () => {
  const modalApiRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const [patientList, setPatientList] = useState<{ id: number; name: string }[]>([]);
  const [receivedNdcList, setReceivedNdcList] = useState<any>([]);
  const topBarAndFilter = {
    type: "appointment",
    heading: "Add Paper Prescription",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: false,
      isBackNeeded: true,
    },
  };
  const appointmentPrescriptionObject = getAppointmentPrescriptionSchema();
  const [isLoading, __setIsLoading] = useState(false);
  const form = useFormHelper<AppointmentPrescriptionFormType>({
    initialValues: {
      pharmacyZip: '',
      pharmacy: '',
      ncpdp: '',
      prescriptionType: '',
      physicianDea: '',
      file: '',
      prescriptionNotes: '',
      additionalNotes: '',
      bloodPressureHigh: '',
      bloodPressureLow: '',
      oxygen: '',
      ecg: '',
      healthInformation: '',
      treatment: '',
      otherCare: '',
    },
    validationSchema: appointmentPrescriptionObject,
    mode: 'controlled',
  });
  // const { mutate: createStaffUserMember, status } = useStaffMemberUser(() => {
  //   // setIsLoading(status === 'pending' ? true : false);
  //   notifications.show({
  //     title: 'Success!',
  //     message: 'Staff member created successfully',
  //     color: 'green',
  //   });
  //   form.reset();
  // });

  const onSubmitCall = (__formData: AppointmentPrescriptionFormType) => {
    // const validatedData = appointmentPrescriptionObject.parse(formData);
    // createStaffUserMember(validatedData);
  };

  const handleSearch = () => {
    setPatientList([{
      id: 1,
      name: 'Rahul Biswas',
    }]);
  };

  const handleModal = () => {
    setTimeout(() => modalApiRef.current?.open?.(), 0);
  };

  const handleNdcCallback = (ndcData: any) => {
    setReceivedNdcList(ndcData);
    setTimeout(() => modalApiRef.current?.close?.(), 0);
  };

  const handleDeleteNdc = (index: number) => {
    setReceivedNdcList((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "xl",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto bg-white dark:bg-gray-800",
            centered: true,
          },
          component: <AppointmentNdcForm dataPass={{ handleNdcCallback, receivedNdcList }} />,
          title: "Select NDC to add",
        }} />
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Add Paper Prescription",
            items: [
              { title: "Manage Appointment", href: "#" },
              { title: "Appointment List", href: "/manage-appointment/appointment", },
              { title: "Add Paper Prescription", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-3">
            <Grid>
              <Grid.Col span={{ base: 12 }}>
                <Grid>
                  <Grid.Col span={{ base: 12 }}>
                    <Paper shadow="sm" radius="sm" className="bg-emerald-50 dark:bg-emerald-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full" >
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600/30 dark:to-emerald-700/30 p-4">
                        <Group gap="sm">
                          <IconBrandBooking size={24} className="text-white" />
                          <Text size="lg" className="text-white font-bold">BOOKING INFO</Text>
                        </Group>
                      </div>
                      <div className="p-6 bg-white dark:bg-gray-800">
                        <Grid>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Booking SNAH ID</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">SNMF212565</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Schedule Date</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">12/04/2023</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Schedule Time</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">13:35 - 13:50</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Schedule Type</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">In-Person</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Consultation Purpose</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">Ss</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Medical Issue</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">Bsn</Text>
                            </div>
                          </Grid.Col>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 6, lg: 6, md: 6, sm: 12 }}>
                    <Paper shadow="sm" radius="sm" className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full" >
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600/30 dark:to-blue-700/30 p-4">
                        <Group gap="sm">
                          <IconUser size={24} className="text-white" />
                          <Text size="lg" className="text-white font-bold">
                            USER INFO
                          </Text>
                        </Group>
                      </div>
                      <div className="p-6 bg-white dark:bg-gray-800">
                        <Grid>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Booking SNAH ID</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">SNMF212565</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Name</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">Rahul Biswas</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Phone</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">8436191135</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Email</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">biswas.rahul399@gmail.com</Text>
                            </div>
                          </Grid.Col>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 6, lg: 6, md: 6, sm: 12 }}>
                    <Paper shadow="sm" radius="sm" className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full" >
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600/30 dark:to-blue-700/30 p-4">
                        <Group gap="sm">
                          <IconBrandDoctrine size={24} className="text-white" />
                          <Text size="lg" className="text-white font-bold">
                            PCP INFO
                          </Text>
                        </Group>
                      </div>
                      <div className="p-6 bg-white dark:bg-gray-800">
                        <Grid>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Booking SNAH ID</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">SNMF212565</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Name</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">John Doe</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">NPI Number</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">ASD33</Text>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 6, lg: 6, sm: 12 }}>
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Provider Number</Text>
                              <Text fw={500} className="text-sm text-gray-900 dark:text-white">1234</Text>
                            </div>
                          </Grid.Col>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Divider my="md" size="xs" variant="dashed" color="blue" labelPosition="center" className="w-full dark:border-blue-700" />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }} className="pb-5">
                <FormWrapper
                  form={form}
                  onSubmit={onSubmitCall}
                  submitButtonText="Create prescription"
                  submitButtonIcon={<IconFile size={16} />}
                  isLoading={isLoading}>
                  <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 rounded-t-md">
                      <Group justify="space-between">
                        <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Fill out Info to create prescription</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-3 bg-white dark:bg-gray-800">
                      <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }}>
                          <FormField label="Pharmacy zip code" required >
                            <PageTextInput
                              placeholder="Search by zip"
                              size="sm"
                              {...form.getInputProps("pharmacyZip")}
                              leftSection={<IconBrandBooking size={16} />}
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
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                            <FormField label="Select Pharmacy" required >
                              <PageSelect
                                placeholder="Select Pharmacy"
                                data={["Global Pharmacy", "Golden Pharmacy"]}
                                size="sm"
                                leftSection={<IconBrandBooking size={16} />}
                                {...form.getInputProps("pharmacy")}
                              />
                            </FormField>
                          </Grid.Col>
                        )}
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }}>
                          <FormField label="Pharmacy NCPDP" required >
                            <PageTextInput
                              disabled
                              placeholder="Pharmacy NCPDP"
                              size="sm"
                              leftSection={<IconFile size={16} />}
                              {...form.getInputProps("ncpdp")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }}>
                          <FormField label="Prescription Type" required >
                            <PageSelect
                              placeholder="Prescription Type"
                              data={["Pickup", "Delivery"]}
                              size="sm"
                              leftSection={<IconBrandDoctrine size={16} />}
                              {...form.getInputProps("prescriptionType")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="Physician DEA" required >
                            <PageTextInput
                              placeholder="Physician DEA"
                              size="sm"
                              leftSection={<IconUser size={16} />} // Physician icon
                              {...form.getInputProps("physicianDea")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="Upload Prescription" required >
                            <FileInput
                              placeholder="Upload File"
                              size="sm"
                              {...form.getInputProps("file")}
                              leftSection={<IconFile size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                    <Card.Section className="px-4 py-3">
                      <Divider my="md" size="xs" variant="dashed" color="blue" label="Fill out the patient health information" labelPosition="center" className="w-full dark:border-blue-700" />
                      <Card withBorder className="border-indigo-200 dark:border-indigo-700 mb-4 bg-white dark:bg-gray-800">
                        <Card.Section className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-3">
                          <Group justify="space-between">
                            <Text fw={600} size="md" className="text-indigo-800 dark:text-indigo-200">NDC you added ({receivedNdcList.length})</Text>
                            <Button onClick={handleModal} leftSection={<IconPlus size={16} />}>Add NDC</Button>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-3 py-3 bg-white dark:bg-gray-800">
                          {receivedNdcList.length > 0 ? (
                            <Grid gutter="md">
                              {receivedNdcList.map((ndc: any, index: number) => (
                                <Grid.Col key={ndc._id} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                                  <Paper className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                    <Group justify="space-between" align="center" className="mb-3">
                                      <Badge color="cyan" variant="light" size="sm" className="font-semibold" >NDC #{index + 1}</Badge>
                                      <ActionIcon
                                        variant="light"
                                        color="red"
                                        size="sm"
                                        className="hover:bg-red-100 transition-all duration-300"
                                        onClick={() => handleDeleteNdc(index)}
                                      >
                                        <IconTrash size={12} />
                                      </ActionIcon>
                                    </Group>
                                    <div className="space-y-3">
                                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <Group gap="xs" className="mb-2">
                                          <IconMedicalCross size={16} className="text-blue-600" />
                                          <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">{ndc.name}</Text>
                                        </Group>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">NDC:</Text>
                                            <Badge variant="outline" color="blue" size="xs">{ndc.ndc}</Badge>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Generic:</Text>
                                            <Text size="xs" className="text-gray-700 dark:text-gray-300 flex-1">{ndc.nonProprietaryName}</Text>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Form:</Text>
                                            <Badge variant="filled" color="green" size="xs">{ndc.dosageForm}</Badge>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Route:</Text>
                                            <Badge variant="light" color="orange" size="xs">{ndc.route}</Badge>
                                          </div>
                                          {ndc.pharmClass && (
                                            <div className="flex items-start gap-2">
                                              <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Class:</Text>
                                              <Text size="xs" className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed">
                                                {ndc.pharmClass.split(',').slice(0, 2).join(', ')}
                                                {ndc.pharmClass.split(',').length > 2 && '...'}
                                              </Text>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Paper>
                                </Grid.Col>
                              ))}
                            </Grid>
                          ) : (
                            <Paper className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                              <IconMedicalCross size={48} className="text-gray-400 mx-auto mb-4" />
                              <Text size="lg" fw={500} className="text-gray-600 dark:text-gray-400 mb-2">No NDC Added Yet</Text>
                              <Text size="sm" className="text-gray-500 dark:text-gray-500">Click "Add NDC" button above to start adding NDCs to your prescription.</Text>
                            </Paper>
                          )}
                        </Card.Section>
                      </Card>
                    </Card.Section>
                    <Card.Section className="px-4 py-3">
                      <Divider my="md" size="xs" variant="dashed" color="blue" label="Fill out the patient health information" labelPosition="center" className="w-full dark:border-blue-700" />
                      <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <FormField label="Prescription Notes" required >
                            <PageTextarea placeholder="Prescription Notes"
                              size="sm"
                              rows={5}
                              resize="vertical"
                              {...form.getInputProps("prescriptionNotes")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <FormField label="Additional Notes" required >
                            <PageTextarea placeholder="Additional Notes"
                              size="sm"
                              rows={5}
                              resize="vertical"
                              {...form.getInputProps("additionalNotes")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="Blood Pressure High" required >
                            <PageTextInput placeholder="Blood Pressure High"
                              size="sm"
                              leftSection={<IconBrandBooking size={16} />}
                              {...form.getInputProps("bloodPressureHigh")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="Blood Pressure Low" required >
                            <PageTextInput placeholder="Blood Pressure Low"
                              size="sm"
                              leftSection={<IconBrandBooking size={16} />}
                              {...form.getInputProps("bloodPressureLow")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="Oxygen" required >
                            <PageTextInput placeholder="Oxygen"
                              size="sm"
                              leftSection={<IconBrandDoctrine size={16} />}
                              {...form.getInputProps("oxygen")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="ECG" required >
                            <PageTextInput placeholder="ECG"
                              size="sm"
                              leftSection={<IconBrandDoctrine size={16} />}
                              {...form.getInputProps("ecg")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="Health Information" required >
                            <PageTextInput placeholder="Health Information"
                              size="sm"
                              leftSection={<IconUser size={16} />}
                              {...form.getInputProps("healthInformation")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                          <FormField label="Treatment" required >
                            <PageTextInput placeholder="Treatment"
                              size="sm"
                              leftSection={<IconBrandDoctrine size={16} />}
                              {...form.getInputProps("treatment")}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <FormField label="Other Care" required >
                            <PageTextarea placeholder="Other Care"
                              size="sm"
                              rows={4}
                              resize="vertical"
                              {...form.getInputProps("otherCare")}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </FormWrapper>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </Box >
    </Box >
  )
}