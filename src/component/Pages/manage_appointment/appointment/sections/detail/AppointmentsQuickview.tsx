import React from "react";
import { Badge, Grid, Group, Paper, Stack, Table, Text } from "@mantine/core";
import { IconBrandBooking, IconPrescription } from "@tabler/icons-react";
import { useRef } from "react";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PatientFacilityReportDetail } from "../../../../manage_patient/patient/sections/detail/patient_all_records/PatientFacilityReportDetail";

const AppointmentsQuickView = (__props: { dataPass: any }) => {
  // const { detailData } = props.dataPass;
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const handleDrawer = (_data: string) => {
    if (drawerApiRef.current) {
      drawerApiRef.current.open();
    }
  };
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Stack gap="xl" className="pb-6">
          <Grid>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper
                shadow="sm"
                radius="lg"
                className="bg-emerald-50 dark:bg-emerald-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600/30 dark:to-emerald-700/30 p-4">
                  <Group gap="sm">
                    <IconBrandBooking size={24} className="text-white" />
                    <Text size="lg" className="text-white font-bold">
                      BOOKING INFO
                    </Text>
                  </Group>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <Grid>
                    <Grid.Col span={6}>
                      <Stack gap="xs">
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Booking SNAH ID
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            SNMF212565
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Booking Type
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            virtual
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Department
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Heart
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Consultation Purpose
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Mk W
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Description
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Mk E
                          </Text>
                        </div>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack gap="xs">
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Booking Date
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            12/04/2023
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Time
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            15:50 - 16:05
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Booking Status
                          </Text>
                          <Badge color="green" variant="filled" size="sm">
                            complete
                          </Badge>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Physician Name
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            John MH (MF)
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Booking Via
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Booking from user app
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Medical Issue
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Mk Q
                          </Text>
                        </div>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </div>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper
                shadow="sm"
                radius="lg"
                className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600/30 dark:to-blue-700/30 p-4">
                  <Group gap="sm">
                    <IconPrescription size={24} className="text-white" />
                    <Text size="lg" className="text-white font-bold">
                      PRESCRIPTION INFO
                    </Text>
                  </Group>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <Grid>
                    <Grid.Col span={6}>
                      <Stack gap="md">
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            SNAH Id
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            MFPREE000947
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Status
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Pending
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            NDC Numbers
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            NDA1232
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Prescription Notes
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            SNMXASA
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Prescription File
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            File
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Prescribed By
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            John MH (MF)
                          </Text>
                        </div>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack gap="md">
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Physician
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            John MH (MF)
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            NDC Pres Reason
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Test
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Pharmacy Name
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Test
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Pharmacy DEA
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Test
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Pharmacy Note
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Test
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Additional Notes
                          </Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">
                            Test
                          </Text>
                        </div>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </div>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Paper
                shadow="sm"
                radius="lg"
                className="bg-orange-50 dark:bg-orange-900/20 border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600/30 dark:to-orange-700/30 p-4">
                  <Group gap="sm">
                    <IconPrescription size={24} className="text-white" />
                    <Text size="lg" className="text-white font-bold">
                      PATIENT ADDITIONAL INFO
                    </Text>
                  </Group>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <Grid>
                    <Grid.Col span={12}>
                      <Stack gap="md">
                        <Table
                          striped
                          highlightOnHover
                          withTableBorder
                          className="min-w-full border-gray-200 dark:border-gray-700"
                        >
                          <Table.Thead className="bg-gray-50 dark:bg-gray-700">
                            <Table.Tr>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">
                                Patient Health Information
                              </Table.Th>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">
                                Treatment
                              </Table.Th>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">
                                Other Care
                              </Table.Th>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">
                                Blood Pressure
                              </Table.Th>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">
                                Oxygen
                              </Table.Th>
                              <Table.Th className="text-left p-4 text-gray-900 dark:text-white">ECG</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {/* {currentData.length > 0
                      ? currentData.map((val: any, key: number) => {
                        return ( */}
                            <Table.Tr
                              // key={key}
                              className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  jajska
                                </Text>
                              </Table.Td>
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  naska
                                </Text>
                              </Table.Td>
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  mansda casjdjasd ajksdasda dasjdas
                                </Text>
                              </Table.Td>
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  100 - 124
                                </Text>
                              </Table.Td>
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  alsjkas
                                </Text>
                              </Table.Td>
                              <Table.Td className="p-4">
                                <Text
                                  size="sm"
                                  c="dimmed"
                                  onClick={() => handleDrawer("Surgery")}
                                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                                >
                                  kjsak
                                </Text>
                              </Table.Td>
                            </Table.Tr>
                            {/* );
                        })
                       : null} */}
                          </Table.Tbody>
                        </Table>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </div>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </div>
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "md",
            position: "right",
            size: "lg",
            padding: "xl",
            className: "overflow-y-auto bg-white dark:bg-gray-800",
          },
          component: <PatientFacilityReportDetail />,
          // drawerType == 1 ? (
          //   <PatientOtherInfoDetails dataPass={{ patientData }} />
          // ) : (
          //   <PatientInsuranceDetails dataPass={{ patientData }} />
          // ),
          title: "Patient Details",
          // title: (
          //   <Group gap="sm">
          //     <Avatar src={patientData.avatar} size={40} radius="xl" />
          //     <div>
          //       <Text fw={600} size="lg">
          //         {patientData.name}
          //       </Text>
          //       <Text size="sm" className="text-gray-600">
          //         Detailed Information
          //       </Text>
          //     </div>
          //   </Group>
          // ),
        }}
      />
    </>
  );
};

export default React.memo(AppointmentsQuickView);
