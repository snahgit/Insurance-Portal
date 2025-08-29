import { Fragment } from "react";
import { Box, Card, Text, Badge, Grid, Divider, Group, Image } from "@mantine/core";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { IconCurrencyDollar, IconFileText, IconReceipt } from "@tabler/icons-react";

export const PrescriptionDetail = () => {
  const topBarAndFilter = {
    heading: "Prescription detail you can find below",
    viewMode: "grid",
    whatNeeded: { isBackNeeded: true },
  };

  const prescriptionData = {
    prescriptionId: "MFPRE578760",
    bookingId: "SNMF146377",
    patientName: "Rahul Biswal",
    appointmentDate: "10/16/2023",
    prescriptionDate: "10/16/2023",
    consultationPurpose: "FT",
    status: "Filled",
    prescriptionNotes: "dsf",
    additionalNotes: "test",
    physician: {
      name: "Dr. Smith Johnson",
      image: "/images/profile.png",
      specialty: "Internal Medicine",
      license: "MD123456"
    },
    pharmacy: {
      name: "Global Pharmacy",
      address: "123 Main St, City, State 12345",
      phone: "(555) 123-4567",
      status: "Accepted"
    },
    medications: [
      {
        id: 1,
        name: "Medication 1",
        dosage: "250mg",
        instructions: "Take twice daily",
        frequency: "2x daily",
        medicationType: "Tablet",
        duration: "7 days",
        startDate: "10/16/2023",
        notes: "Take with food",
        isRefill: false,
        price: 22.00,
        quantity: 2,
        tax: 1.50,
        total: 45.50
      },
      {
        id: 2,
        name: "Medication 2",
        dosage: "500mg",
        instructions: "Take once daily",
        frequency: "1x daily",
        medicationType: "Capsule",
        duration: "14 days",
        startDate: "10/16/2023",
        notes: "Take on empty stomach",
        isRefill: false,
        price: 55.00,
        quantity: 4,
        tax: 2.00,
        total: 222.00
      }
    ]
  };

  return (
    <Fragment>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Prescription Detail",
            items: [
              { title: "Manage Prescriptions", href: "#" },
              { title: "Prescription List", href: "/manage-prescription/prescription" },
              { title: "Prescription Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Card withBorder shadow="sm" className="rounded-xl dark:bg-gray-800 dark:border-gray-600">
        <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
        <Card.Section className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
            <Grid>
              <Grid.Col span={12}>
                <Grid>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Prescription ID:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.prescriptionId}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Booking ID:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.bookingId}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Patient Name:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.patientName}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Appointment Date:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.appointmentDate}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Prescription Date:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.prescriptionDate}</Text>
                    </Box>
                  </Grid.Col>
                  {/* <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
                <Box>
                  <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Status:</Text>
                  <Badge color="green" variant="light">{prescriptionData.status}</Badge>
                </Box>
              </Grid.Col> */}
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Consultation Purpose:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.consultationPurpose}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Prescription Notes:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.prescriptionNotes}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Additional Notes:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.additionalNotes}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Physician Name:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.physician.name}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Physician Specialty:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.physician.specialty}</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">physician License:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">{prescriptionData.physician.license}</Text>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span={12}>
                <Divider my="md" size="xs" variant="dashed" color="purple" label="Medications" labelPosition="center" className="dark:opacity-70" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  {prescriptionData.medications.map((medication) => (
                    <Card key={medication.id} withBorder radius="md" className="border-purple-300 bg-white shadow-sm dark:border-purple-600 dark:bg-gray-700">
                      <Card.Section className="bg-purple-100 dark:bg-purple-900/40 px-4 py-3 rounded-t-md">
                        <Group justify="space-between">
                          <Text fw={600} size="md" className="text-purple-800 dark:text-purple-300">Medication #{medication.id}</Text>
                          {/* <Badge color={medication.isRefill ? "blue" : "green"} variant="light" size="sm">{medication.isRefill ? "Refill" : "New"}</Badge> */}
                        </Group>
                      </Card.Section>
                      <Card.Section className="px-4 py-4">
                        <Grid>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medicine:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.name}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Dosage:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.dosage}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Instructions:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.instructions}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Frequency:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.frequency}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medicine Type:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.medicationType}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medication Duration:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.duration}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Start Date:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.startDate}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Box>
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Notes:</Text>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">{medication.notes}</Text>
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Box className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                                  <Box>
                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Price:</Text>
                                    <Text size="sm" fw={600} className="text-purple-600 dark:text-purple-400">${medication.price.toFixed(2)}</Text>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                                  <Box>
                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Quantity:</Text>
                                    <Text size="sm">{medication.quantity}</Text>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                                  <Box>
                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Tax:</Text>
                                    <Text size="sm">${medication.tax.toFixed(2)}</Text>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                                  <Box>
                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Total:</Text>
                                    <Text size="sm" fw={600} className="text-green-600 dark:text-green-400">${medication.total.toFixed(2)}</Text>
                                  </Box>
                                </Grid.Col>
                              </Grid>
                            </Box>
                          </Grid.Col>
                        </Grid>
                      </Card.Section>
                    </Card>
                  ))}
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group justify="space-between" align="center">
                  <Divider my="md" size="xs" variant="dashed" color="cyan" label="More info about prescription" labelPosition="center" className="dark:opacity-70 flex-1" />
                  {/* <Button
                    variant="light"
                    color="blue"
                    size="sm"
                    leftSection={<IconRefresh size={16} />}
                    className="ml-4"
                  >
                    Refresh
                  </Button> */}
                </Group>
                <Grid>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">User Paid:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">No</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Insurance Paid:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">No</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Status:</Text>
                      <Badge color="green" variant="light">{prescriptionData.pharmacy.status}</Badge>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Next Performed Action:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">No next action to perform</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box>
                      <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Pharmacy Description:</Text>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">asdas</Text>
                    </Box>
                  </Grid.Col>
                  {/* <div>
                    <Button
                      variant="filled"
                      color="blue"
                      size="sm"
                      leftSection={<IconMapPin size={16} />}
                    >
                      Get Info
                    </Button>
                  </div> */}
                </Grid>
                <Grid className="mt-6">
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                    <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-700">
                      <Card.Section className="p-4">
                        <Group justify="space-between" mb="md">
                          <Group>
                            <IconFileText size={20} className="text-blue-600 dark:text-blue-400" />
                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Prescriptions:</Text>
                          </Group>
                        </Group>
                        <Box className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Image
                            src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480"
                            alt="Prescription"
                            className="rounded-md"
                          />
                        </Box>
                      </Card.Section>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                    <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-700">
                      <Card.Section className="p-4">
                        <Group justify="space-between" mb="md">
                          <Group>
                            <IconReceipt size={20} className="text-green-600 dark:text-green-400" />
                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Receipts:</Text>
                          </Group>
                        </Group>
                        <Box className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Image
                            src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480"
                            alt="Receipt"
                            className="rounded-md"
                          />
                        </Box>
                      </Card.Section>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                    <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-700">
                      <Card.Section className="p-4">
                        <Group justify="space-between" mb="md">
                          <Group>
                            <IconCurrencyDollar size={20} className="text-purple-600 dark:text-purple-400" />
                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Invoice:</Text>
                          </Group>
                        </Group>
                        <Box className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Image
                            src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480"
                            alt="Invoice"
                            className="rounded-md"
                          />
                        </Box>
                      </Card.Section>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span={12}>
                <Divider my="md" size="xs" variant="dashed" color="cyan" label="info about driver" labelPosition="center" className="dark:opacity-70 flex-1" />
                <Grid>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Driver Name</Text>
                      <Text size="sm" className="dark:text-gray-300">John Doe</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Vehicle Identification number</Text>
                      <Text size="sm" className="dark:text-gray-300">VIN12345456985632</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Vehicle Make/Model</Text>
                      <Text size="sm" className="dark:text-gray-300">Dodge</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">License Number</Text>
                      <Text size="sm" className="dark:text-gray-300">FL-D123456789</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">License Plate</Text>
                      <Text size="sm" className="dark:text-gray-300">EVV0919</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Mobile Number</Text>
                      <Text size="sm" className="dark:text-gray-300">+1 (555) 123-4567</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Delivery date:</Text>
                      <Text size="sm" className="dark:text-gray-300">12/28/2026</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Pickup OTP</Text>
                      <Text size="sm" className="dark:text-gray-300">123456</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Pickup Location</Text>
                      <Text size="sm" className="dark:text-gray-300">123 Main St, Springfield, IL</Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                    <Box>
                      <Text fw={600} size="sm" className="dark:text-gray-200">Drop Location</Text>
                      <Text size="sm" className="dark:text-gray-300">456 Elm St, Springfield, IL</Text>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span={12}>
                <Divider my="sm" size="xs" variant="dashed" color="green" label="Delivery Tracking" labelPosition="center" className="dark:opacity-70" />
                <div className="mt-4">
                  {/* <PrescriptionDeliveryTrack
                    fromAddress={prescriptionData.pharmacy.address}
                    toAddress="456 Patient Street, City, State 12345"
                    deliveryStatus="in_transit"
                    estimatedTime="25 mins"
                    driverName="John Delivery"
                    driverPhone="(555) 123-4567"
                  /> */}
                  <Box mt="md">
                    <iframe
                      title="Service Location Map"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '8px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Bethuadahari,West+Bengal,India&output=embed"
                    ></iframe>
                  </Box>
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </Card.Section>
      </Card>
    </Fragment >
  );
};
