import { Fragment } from "react";
import { Box, Card, Text, Avatar, Badge, Grid, Group, Divider, Paper } from "@mantine/core";
import { IconClipboardList, IconMedicalCross, IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconListDetails, IconMathFunction, IconPaperclip } from "@tabler/icons-react";
import moment from "moment";
import { format } from "@react-input/mask";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";

export const FacilityClaimDetail = () => {
  const topBarAndFilter = {
    heading: "Claim detail you can find below",
    viewMode: "grid",
    whatNeeded: { isBackNeeded: true },
  };

  const claim = {
    claimId: "CLM-2025-00123",
    claimType: "Medicare",
    status: "Submitted",
    appointmentDate: "2025-08-01",
    submissionDate: "2025-08-02",
    patientAccountNo: "PA-880031",
    priorAuthNumber: "AUTH-99112",
    resubmissionCode: "",
    resubmissionOriginalRef: "",
    totalCharge: 1250.0,
    amountPaid: 400.0,
    acceptAssignment: "Yes",
  };

  const patient = {
    name: "John Doe",
    gender: "Male",
    dob: "1986-03-11",
    phone: "(313) 666-2544",
    email: "john.doe@example.com",
    address: "Austin, TX 78701, USA",
  };

  const provider = {
    name: "Test MP MF",
    specialty: "Family Doctor",
    phone: "(313) 777-1022",
    email: "provider@snah.org",
    address: "CA, California, 70275, USA",
  };

  const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  const balance = Math.max(0, claim.totalCharge - claim.amountPaid);
  const phoneMaskOptions = { mask: "(___) ___-__-__", replacement: { _: /\d/ } };

  return (
    <Fragment>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Facility Claim Detail",
            items: [
              { title: "Manage Claims", href: "#" },
              { title: "Facility Claim List", href: "/manage-claim/facility-claim" },
              { title: "Facility Claim Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Card withBorder shadow="sm" className="rounded-xl dark:bg-gray-800 dark:border-gray-600">
        <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
        <Card.Section className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6">
                <div className="flex flex-col items-center text-center self-center rounded-md">
                  <Avatar radius="md" size={120} className="mb-4 shadow-lg mt-5">
                    <IconClipboardList size={64} />
                  </Avatar>
                  <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">
                    {claim.claimId}
                  </Text>
                  <Group gap="xs" mt="xs">
                    <Badge color="blue" variant="light">
                      {claim.claimType}
                    </Badge>
                    <Badge
                      color={
                        claim.status === "Paid"
                          ? "green"
                          : claim.status === "Denied"
                            ? "red"
                            : claim.status === "In Review"
                              ? "yellow"
                              : "blue"
                      }
                      variant="filled"
                      size="sm"
                    >
                      {claim.status}
                    </Badge>
                  </Group>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Group gap="xs" className="items-start">
                      <IconCalendar size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Appointment Date
                        </Text>
                        <Text fw={500} className="dark:text-gray-200">
                          {moment(claim.appointmentDate).format("DD-MM-YYYY")}
                        </Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconCalendar size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Submission Date
                        </Text>
                        <Text fw={500} className="dark:text-gray-200">{moment(claim.submissionDate).format("DD-MM-YYYY")}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Patient Account #</Text>
                        <Text fw={500} className="dark:text-gray-200">{claim.patientAccountNo}</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Prior Auth #</Text>
                        <Text fw={500} className="dark:text-gray-200">{claim.priorAuthNumber || "-"}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Accept Assignment</Text>
                        <Text fw={500} className="dark:text-gray-200">{claim.acceptAssignment}</Text>
                      </div>
                    </Group>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Paper className="p-3 rounded-md border border-indigo-200 dark:border-indigo-700 bg-white/60 dark:bg-gray-800/60">
                    <Group gap="xs" className="items-start">
                      <IconMathFunction size={18} className="text-indigo-600 dark:text-indigo-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Total Charge
                        </Text>
                        <Text fw={700} className="dark:text-gray-200">{currency(claim.totalCharge)}</Text>
                      </div>
                    </Group>
                  </Paper>
                  <Paper className="p-3 rounded-md border border-green-200 dark:border-green-700 bg-white/60 dark:bg-gray-800/60">
                    <Group gap="xs" className="items-start">
                      <IconMathFunction size={18} className="text-green-600 dark:text-green-400mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Amount Paid</Text>
                        <Text fw={700} className="dark:text-gray-200">{currency(claim.amountPaid)}</Text>
                      </div>
                    </Group>
                  </Paper>
                  <Paper className="p-3 rounded-md border border-indigo-200 dark:border-indigo-700 bg-white/60 dark:bg-gray-800/60">
                    <Group gap="xs" className="items-start">
                      <IconMathFunction size={18} className="text-amber-600 dark:text-amber-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Balance</Text>
                        <Text fw={700} className="dark:text-gray-200">{currency(balance)}</Text>
                      </div>
                    </Group>
                  </Paper>
                </div>
              </Grid.Col>
              <Divider
                my="md"
                size="xs"
                variant="dashed"
                color="blue"
                label="Parties"
                labelPosition="center"
                className="w-full"
              />
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper className="bg-gradient-to-r from-emerald-50 to-green-50 dark:to-green-900/20 dark:from-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <Group gap="xs" className="mb-3">
                    <IconUser size={18} className="text-emerald-700 dark:text-emerald-400" />
                    <Text fw={600} className="dark:text-gray-200">Patient</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={600} className="dark:text-gray-200">{patient.name}</Text>
                    <Badge size="sm" variant="light">{patient.gender}</Badge>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconCalendar size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="dark:text-gray-300">{moment(patient.dob).format("DD-MM-YYYY")}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="dark:text-gray-300">{format(patient.phone, { mask: "(___) ___-__-__", replacement: { _: /\d/ } })}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="dark:text-gray-300">{patient.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="dark:text-gray-300">{patient.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-sky-200 dark:border-sky-700">
                  <Group gap="xs" className="mb-3">
                    <IconMedicalCross size={18} className="text-sky-700 dark:text-sky-400" />
                    <Text fw={600} className="dark:text-gray-200">Provider</Text>
                  </Group>
                  <Text fw={600} className="dark:text-gray-200">{provider.name}</Text>
                  <Text size="sm" c="dimmed" className="dark:text-gray-400">{provider.specialty}</Text>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="dark:text-gray-300">{format(provider.phone, phoneMaskOptions)}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="dark:text-gray-300">{provider.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="dark:text-gray-300">{provider.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Divider
                my="md"
                size="xs"
                variant="dashed"
                color="indigo"
                label="Comprehensive Facility Claim Details"
                labelPosition="center"
                className="w-full"
              />
              <Grid.Col span={{ base: 12 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 dark:bg-gray-800">
                    <Card.Section className="bg-blue-100 dark:bg-blue-900/40 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconClipboardList size={16} className="text-blue-700 dark:text-blue-400" />
                        <Text fw={600} size="md" className="text-blue-800 dark:text-blue-300">Appointment Information</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">SNAH ID</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">SNAH-001</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Appointment Date</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">2025-08-14</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Time</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">09:30 AM</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Department</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Cardiology</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Consultancy Purpose</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Follow-up</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medical Issue</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Chest discomfort</Text>
                          </div>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Description</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Routine follow-up with ECG review</Text>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>

                  {/* PCP Information */}
                  <Card withBorder radius="md" className="border-teal-200 dark:border-teal-700">
                    <Card.Section className="bg-teal-100 dark:bg-teal-900/40 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconMedicalCross size={16} className="text-teal-700" />
                        <Text fw={600} size="md" className="text-teal-800 dark:text-teal-300">Primary Care Physician Information</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Name</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Dr. Alice Rivera</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">SNAH ID</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">PHY-1001</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Email</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">alice.rivera@example.com</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Provider Number</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">PR-77701</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Specialty</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Cardiology</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NPI Number</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">1234567890</Text>
                          </div>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">License Number</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">LIC-CA-99231</Text>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-green-200 dark:border-green-700">
                  <Card.Section className="bg-green-100 dark:bg-green-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconUser size={16} className="text-green-700" />
                      <Text fw={600} size="md" className="text-green-800 dark:text-green-300">Patient Insurance & Health Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Selected Insurance</Text>
                        <Badge variant="light" color="green" className="mt-1">Insurance A</Badge>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Health Member ID</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">HM-20331</Text>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Group Number</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">GRP-5582</Text>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Plan</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Standard</Text>
                      </div>
                      <div className="md:col-span-2 lg:col-span-4">
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Patient Relationship To Insured</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Self</Text>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-purple-200 dark:border-purple-700">
                  <Card.Section className="bg-purple-100 dark:bg-purple-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMedicalCross size={16} className="text-purple-700" />
                      <Text fw={600} size="md" className="text-purple-800 dark:text-purple-300">Medical Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="space-y-6">
                      {/* Dates and Qualifiers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Current Illness Date</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">2025-07-15</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Qualifier</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">431 - Onset of current illness</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Other Date</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">2025-07-10</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Other Qualifier</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">454 - Initial treatment</Text>
                        </div>
                      </div>

                      {/* Date Ranges */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Unable to Work Period</Text>
                          <Paper className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 mt-1">
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">From: 2025-07-20 - To: 2025-08-05</Text>
                          </Paper>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Hospitalization Period</Text>
                          <Paper className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 mt-1">
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">From: 2025-07-25 - To: 2025-07-30</Text>
                          </Paper>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Referring Provider</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Dr. Michael Johnson</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Outside Lab</Text>
                          <Badge variant="light" color="blue">Yes</Badge>
                          <Text size="xs" className="text-gray-500 mt-1">Charges: $125.00</Text>
                        </div>
                      </div>

                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 mb-2">Additional Claim Information</Text>
                        <Paper className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Patient requires specialized cardiac monitoring due to recent episode of chest discomfort. 
                            ECG and stress test recommended for comprehensive evaluation.
                          </Text>
                        </Paper>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-orange-200 dark:border-orange-700">
                  <Card.Section className="bg-orange-100 dark:bg-orange-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconListDetails size={16} className="text-orange-700" />
                      <Text fw={600} size="md" className="text-orange-800 dark:text-orange-300">Diagnosis & Procedure Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Primary Diagnosis (ICD)</Text>
                          <Badge variant="light" color="orange" className="mt-1">I25.10 - Atherosclerotic heart disease</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Secondary Diagnosis</Text>
                          <Badge variant="light" color="orange" className="mt-1">Z87.891 - Personal history of nicotine dependence</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Tertiary Diagnosis</Text>
                          <Badge variant="light" color="orange" className="mt-1">E78.5 - Hyperlipidemia</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">ICD used for CPT mapping</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">I25.10 (Primary diagnosis selected)</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Selected CPT Procedures</Text>
                          <Group gap="xs" className="mt-1">
                            <Badge variant="light" color="blue" size="sm">99213 - Office Visit</Badge>
                            <Badge variant="light" color="blue" size="sm">93000 - ECG</Badge>
                          </Group>
                        </div>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-cyan-200 dark:border-cyan-700">
                  <Card.Section className="bg-cyan-100 dark:bg-cyan-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconClipboardList size={16} className="text-cyan-700" />
                      <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-300">Service Lines Details</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          dateOfService: "2025-08-14 - 2025-08-14",
                          placeOfService: "Office",
                          cptHcpcs: "99213",
                          charges: 150.00,
                          daysOrUnits: 1,
                          diagnosisPointer: "A",
                          modifier: "25",
                          emg: "N",
                          epsdtFamilyPlan: "Y",
                          idQual: "1G",
                          referringProviderId: "1234567890"
                        },
                        {
                          id: 2,
                          dateOfService: "2025-08-14 - 2025-08-14",
                          placeOfService: "Office", 
                          cptHcpcs: "93000",
                          charges: 75.00,
                          daysOrUnits: 1,
                          diagnosisPointer: "A",
                          modifier: "",
                          emg: "N",
                          epsdtFamilyPlan: "N",
                          idQual: "1G",
                          referringProviderId: "1234567890"
                        }
                      ].map((service) => (
                        <Paper key={service.id} className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg border border-cyan-200 dark:border-cyan-700">
                          <Badge color="cyan" variant="light" size="sm" className="mb-3">Service #{service.id}</Badge>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Date of Service:</Text>
                              <Text size="xs">{service.dateOfService}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Place of Service:</Text>
                              <Text size="xs">{service.placeOfService}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">CPT/HCPCS:</Text>
                              <Text size="xs">{service.cptHcpcs}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Charges:</Text>
                              <Text size="xs" fw={600} className="text-cyan-600">${service.charges.toFixed(2)}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Days/Units:</Text>
                              <Text size="xs">{service.daysOrUnits}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Diagnosis Pointer:</Text>
                              <Text size="xs">{service.diagnosisPointer}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Modifier:</Text>
                              <Text size="xs">{service.modifier || "N/A"}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Emergency:</Text>
                              <Text size="xs">{service.emg}</Text>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-green-200 dark:border-green-700">
                  <Card.Section className="bg-green-100 dark:bg-green-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconPaperclip size={16} className="text-green-700" />
                      <Text fw={600} size="md" className="text-green-800 dark:text-green-300">Supporting Documents</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: 1, typeOfFile: "Medical Records", document: "Patient_Chart_John_Carter_08142025.pdf" },
                        { id: 2, typeOfFile: "Lab Results", document: "ECG_Report_John_Carter_08142025.pdf" },
                        { id: 3, typeOfFile: "Insurance Card", document: "Insurance_Card_Copy_Front_Back.pdf" }
                      ].map((doc) => (
                        <Paper key={doc.id} className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                          <Badge color="green" variant="light" size="sm" className="mb-3">Document #{doc.id}</Badge>
                          <div className="space-y-2">
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">File Type:</Text>
                              <Text size="sm" className="text-gray-700 dark:text-gray-300">{doc.typeOfFile}</Text>
                            </div>
                            <div>
                              <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Document:</Text>
                              <Text size="sm" className="text-gray-700 break-words">{doc.document}</Text>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-indigo-200 dark:border-indigo-700">
                  <Card.Section className="bg-indigo-100 dark:bg-indigo-900/40 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMathFunction size={16} className="text-indigo-700" />
                      <Text fw={600} size="md" className="text-indigo-800 dark:text-indigo-300">Financial & Administrative Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Federal Tax ID Number</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">75-1234567</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">SSN</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">***-**-5678</Text>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">EIN</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">12-3456789</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Patient's Account No</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">{claim.patientAccountNo}</Text>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Accept Assignment</Text>
                          <Badge variant="light" color={claim.acceptAssignment === "Yes" ? "green" : "red"}>
                            {claim.acceptAssignment}
                          </Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NUCC Reserved</Text>
                          <Badge variant="light" color="gray">No</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Total Charge</Text>
                          <Text size="lg" fw={700} className="text-indigo-600 dark:text-indigo-400">{currency(claim.totalCharge)}</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Amount Paid</Text>
                          <Text size="lg" fw={700} className="text-green-600 dark:text-green-400">{currency(claim.amountPaid)}</Text>
                        </div>
                      </div>
                    </div>
                    
                    <Divider my="md" />
                    
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">Claim Summary</Text>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Paper className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                          <Text size="xs" className="text-gray-600 dark:text-gray-400">Outstanding Balance</Text>
                          <Text size="lg" fw={700} className="text-red-600">{currency(balance)}</Text>
                        </Paper>
                        <Paper className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                          <Text size="xs" className="text-gray-600 dark:text-gray-400">Processing Status</Text>
                          <Badge color="blue" variant="filled">{claim.status}</Badge>
                        </Paper>
                        <Paper className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                          <Text size="xs" className="text-gray-600 dark:text-gray-400">Days Since Submission</Text>
                          <Text size="lg" fw={700} className="text-indigo-600 dark:text-indigo-400">
                            {moment().diff(moment(claim.submissionDate), 'days')} days
                          </Text>
                        </Paper>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
            </Grid>
          </div>
        </Card.Section>
      </Card>
    </Fragment>
  );
};