import { Fragment } from "react";
import { Box, Card, Text, Avatar, Badge, Grid, Group, Divider, Paper } from "@mantine/core";
import { IconClipboardList, IconMedicalCross, IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconListDetails, IconMathFunction, IconFileReport } from "@tabler/icons-react";
import moment from "moment";
import { format } from "@react-input/mask";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";

export const PharmacyClaimDetail = () => {
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
            pageTitle: "Pharmacy Claim Detail",
            items: [
              { title: "Manage Claims", href: "#" },
              { title: "Pharmacy Claim List", href: "/manage-claim/pharmacy-claim" },
              { title: "Pharmacy Claim Detail", href: "#", isActive: true },
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
                        <Text fw={500} className="text-gray-800 dark:text-gray-200">
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
                        <Text fw={500} className="text-gray-800 dark:text-gray-200">{moment(claim.submissionDate).format("DD-MM-YYYY")}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Patient Account #</Text>
                        <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.patientAccountNo}</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Prior Auth #</Text>
                        <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.priorAuthNumber || "-"}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconListDetails size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Accept Assignment</Text>
                        <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.acceptAssignment}</Text>
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
                        <Text fw={700} className="text-gray-800 dark:text-gray-200">{currency(claim.totalCharge)}</Text>
                      </div>
                    </Group>
                  </Paper>
                  <Paper className="p-3 rounded-md border border-green-200 dark:border-green-700 bg-white/60 dark:bg-gray-800/60">
                    <Group gap="xs" className="items-start">
                      <IconMathFunction size={18} className="text-green-600 dark:text-green-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Amount Paid</Text>
                        <Text fw={700} className="text-gray-800 dark:text-gray-200">{currency(claim.amountPaid)}</Text>
                      </div>
                    </Group>
                  </Paper>
                  <Paper className="p-3 rounded-md border border-indigo-200 dark:border-indigo-700 bg-white/60 dark:bg-gray-800/60">
                    <Group gap="xs" className="items-start">
                      <IconMathFunction size={18} className="text-amber-600 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Balance</Text>
                        <Text fw={700} className="text-gray-800 dark:text-gray-200">{currency(balance)}</Text>
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
                <Paper className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <Group gap="xs" className="mb-3">
                    <IconUser size={18} className="text-emerald-700 dark:text-emerald-400" />
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">Patient</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">{patient.name}</Text>
                    <Badge size="sm" variant="light">{patient.gender}</Badge>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconCalendar size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{moment(patient.dob).format("DD-MM-YYYY")}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{format(patient.phone, { mask: "(___) ___-__-__", replacement: { _: /\d/ } })}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{patient.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{patient.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-sky-200 dark:border-sky-700">
                  <Group gap="xs" className="mb-3">
                    <IconMedicalCross size={18} className="text-sky-700 dark:text-sky-400" />
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">Provider</Text>
                  </Group>
                  <Text fw={600} className="text-gray-800 dark:text-gray-200">{provider.name}</Text>
                  <Text size="sm" c="dimmed" className="text-gray-600 dark:text-gray-400">{provider.specialty}</Text>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{format(provider.phone, phoneMaskOptions)}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{provider.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{provider.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Divider
                my="md"
                size="xs"
                variant="dashed"
                color="indigo"
                label="Comprehensive Pharmacy Claim Details"
                labelPosition="center"
                className="w-full"
              />
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 dark:bg-gray-800 mb-4">
                  <Card.Section className="bg-blue-100 dark:bg-blue-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconFileReport size={16} className="text-blue-700 dark:text-blue-400" />
                      <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Uploaded Prescription Documents</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map((docNum) => (
                        <Card key={docNum} withBorder radius="sm" className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm">
                          <Card.Section className="p-4">
                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-3">Prescription Document #{docNum}</Text>
                            <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200 dark:border-blue-700">
                              <IconFileReport size={48} className="text-blue-400 dark:text-blue-500" />
                            </div>
                          </Card.Section>
                        </Card>
                      ))}
                    </div>
                    
                    <Divider my="xl" size="xs" variant="dashed" color="blue" label="Prescription Information" labelPosition="center" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Booking SNAH ID</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">SNMF595536</Text>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Prescription SNAH ID</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">MFPRE334542</Text>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Physician DEA</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">AAWW</Text>
                      </div>
                      <div>
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medical Issue</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Rash</Text>
                      </div>
                      <div className="md:col-span-2">
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Prescription Notes</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Patient is required to take medication</Text>
                      </div>
                      <div className="md:col-span-2">
                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Description</Text>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Do not take more than prescribed</Text>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card withBorder radius="md" className="border-emerald-200 dark:border-emerald-700 dark:bg-gray-800">
                    <Card.Section className="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconUser size={16} className="text-emerald-700 dark:text-emerald-400" />
                        <Text fw={600} size="md" className="text-emerald-800 dark:text-emerald-200">Patient Insurance & Member Details</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                      <div className="space-y-4">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Selected Insurance</Text>
                          <Badge variant="light" color="emerald" className="mt-1">Insurance A</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Selected Members</Text>
                          <Group gap="xs" className="mt-1">
                            {['Self', 'Son', 'Daughter'].map((member) => (
                              <Badge key={member} variant="light" color="blue" size="sm">{member}</Badge>
                            ))}
                          </Group>
                        </div>
                        <Divider size="xs" />
                        <div className="space-y-3">
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Member Information</Text>
                          {[
                            { relationship: 'Self', name: 'John Doe', dob: '1985-03-22', phone: '+1 408 555 0101' },
                            { relationship: 'Son', name: 'James Doe', dob: '2010-07-15', phone: '+1 408 555 0102' },
                            { relationship: 'Daughter', name: 'Jane Doe', dob: '2012-09-10', phone: '+1 408 555 0103' }
                          ].map((member, index) => (
                            <Paper key={index} className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-700">
                              <Badge color="emerald" variant="light" size="sm" className="mb-2">{member.relationship}</Badge>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Name:</Text>
                                  <Text size="xs" className="text-gray-800 dark:text-gray-200">{member.name}</Text>
                                </div>
                                <div>
                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">DOB:</Text>
                                  <Text size="xs" className="text-gray-800 dark:text-gray-200">{moment(member.dob).format("DD-MM-YYYY")}</Text>
                                </div>
                                <div>
                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Phone:</Text>
                                  <Text size="xs" className="text-gray-800 dark:text-gray-200">{member.phone}</Text>
                                </div>
                              </div>
                            </Paper>
                          ))}
                        </div>
                      </div>
                    </Card.Section>
                  </Card>

                  {/* Pharmacy Information */}
                  <Card withBorder radius="md" className="border-cyan-200 dark:border-cyan-700 dark:bg-gray-800">
                    <Card.Section className="bg-cyan-100 dark:bg-cyan-900/30 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconMedicalCross size={16} className="text-cyan-700 dark:text-cyan-400" />
                        <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Pharmacy Information</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Name</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Global Pharmacy</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Email</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">testemail@gmail.com</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Phone</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">9198511299</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NCPDP</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">NCPDP12345</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NPI</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">NPI3698</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Taxonomy</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">1259500X</Text>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NAICS</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">NAICS12345</Text>
                          </div>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Address</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">123 Main St, Anytown, USA</Text>
                        </div>
                        <Divider size="xs" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">On-site Nursing Home Pharmacy</Text>
                            <Badge variant="light" color="green">No</Badge>
                          </div>
                          <div>
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Pharmacist Signature</Text>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Dr. Sarah Wilson</Text>
                          </div>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-orange-200 dark:border-orange-700 dark:bg-gray-800">
                  <Card.Section className="bg-orange-100 dark:bg-orange-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconClipboardList size={16} className="text-orange-700 dark:text-orange-400" />
                      <Text fw={600} size="md" className="text-orange-800 dark:text-orange-200">Claim Filing Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Filing Reason</Text>
                          <Badge variant="light" color="orange">Allergy/Allergen Clinic</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medication Outside US</Text>
                          <Badge variant="light" color="red">No</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">On-the-job Injury Medicine</Text>
                          <Badge variant="light" color="yellow">No</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Other Insurance Coverage</Text>
                          <Badge variant="light" color="blue">Yes - Primary</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Insurance Company</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">United Healthcare</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Insurance ID</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">UHC-123456789</Text>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Member Signature</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">John Doe</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Signature Date</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claim.submissionDate).format("DD-MM-YYYY")}</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Additional Comments</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Patient requires allergy medication for seasonal allergies</Text>
                        </div>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-red-200 dark:border-red-700 dark:bg-gray-800">
                  <Card.Section className="bg-red-100 dark:bg-red-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMedicalCross size={16} className="text-red-700 dark:text-red-400" />
                      <Text fw={600} size="md" className="text-red-800 dark:text-red-200">Allergy Treatment Details</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: 1,
                          dateOfAllergy: "2025-08-01",
                          numberOfVialsAllergy: "2",
                          numberOfTreatmentsAllergy: "5",
                          daysSupplyAllergy: "30",
                          vialContainsAllergy: "Tree Pollen Extract",
                          administeredByAllergy: "Dr. Alice Rivera",
                          directionsAllergy: "Subcutaneous injection",
                          ingredientsAllergy: "Mixed tree allergens",
                          chargePerTreatmentAllergy: "125.00",
                          chargeForPreparationAllergy: "50.00",
                          totalChargeAllergy: "675.00"
                        },
                        {
                          id: 2,
                          dateOfAllergy: "2025-08-15",
                          numberOfVialsAllergy: "1",
                          numberOfTreatmentsAllergy: "3",
                          daysSupplyAllergy: "21",
                          vialContainsAllergy: "Grass Pollen Extract",
                          administeredByAllergy: "Dr. Alice Rivera",
                          directionsAllergy: "Subcutaneous injection",
                          ingredientsAllergy: "Mixed grass allergens",
                          chargePerTreatmentAllergy: "100.00",
                          chargeForPreparationAllergy: "40.00",
                          totalChargeAllergy: "340.00"
                        }
                      ].map((allergy) => (
                        <Paper key={allergy.id} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                          <Badge color="red" variant="light" size="sm" className="mb-3">Allergy #{allergy.id}</Badge>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Date of Purchase:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{moment(allergy.dateOfAllergy).format("DD-MM-YYYY")}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Number of Vials:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.numberOfVialsAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Number of Treatments:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.numberOfTreatmentsAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Days Supply:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.daysSupplyAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Vial Contains:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.vialContainsAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Administered By:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.administeredByAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Directions:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.directionsAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Ingredients:</Text>
                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.ingredientsAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Charge Per Treatment:</Text>
                                <Text size="xs" fw={600} className="text-green-600 dark:text-green-400">${allergy.chargePerTreatmentAllergy}</Text>
                              </div>
                              <div>
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Preparation Charge:</Text>
                                <Text size="xs" fw={600} className="text-blue-600 dark:text-blue-400">${allergy.chargeForPreparationAllergy}</Text>
                              </div>
                              <div className="col-span-2">
                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Total Charge:</Text>
                                <Text size="sm" fw={700} className="text-red-600 dark:text-red-400">${allergy.totalChargeAllergy}</Text>
                              </div>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-purple-200 dark:border-purple-700 dark:bg-gray-800">
                  <Card.Section className="bg-purple-100 dark:bg-purple-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMedicalCross size={16} className="text-purple-700 dark:text-purple-400" />
                      <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">NDC Medication Details</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="space-y-6">
                      {[
                        {
                          ndcNumber: "0002-1407",
                          pharmClass: "Antiarrhythmic [EPC] Cytochrome P450 2D6 Inhibitor [EPC]",
                          route: "INTRAVENOUS",
                          dosageForm: "SOLUTION",
                          nonProprietaryName: "Quinidine Gluconate",
                          name: "Quinidine Gluconate",
                          medicineType: "tablet",
                          frequency: "twice a day",
                          foodRequirementType: "not_specified",
                          durationType: "days",
                          durationNumber: 30,
                          startDate: "08/05/2025",
                          dosage: "7MG",
                          alarmTimes: ["11:00 AM", "10:00 AM"],
                          instructions: "Please follow doctor's",
                          notes: "See notes",
                          price: 2.30,
                          quantity: 60,
                          tax: 7,
                          total: 147.66
                        },
                        {
                          ndcNumber: "0003-2408",
                          pharmClass: "Analgesic [EPC] Pain Relief Medication [MoA]",
                          route: "ORAL",
                          dosageForm: "TABLET",
                          nonProprietaryName: "Acetaminophen",
                          name: "Acetaminophen",
                          medicineType: "tablet",
                          frequency: "three times a day",
                          foodRequirementType: "after_meal",
                          durationType: "days",
                          durationNumber: 14,
                          startDate: "08/10/2025",
                          dosage: "500MG",
                          alarmTimes: ["8:00 AM", "2:00 PM", "8:00 PM"],
                          instructions: "Take with plenty of water",
                          notes: "Do not exceed daily dose",
                          price: 1.50,
                          quantity: 42,
                          tax: 5,
                          total: 68.00
                        }
                      ].map((ndc, index) => (
                        <Card key={index} withBorder radius="md" className="border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
                          <Card.Section className="bg-purple-100 dark:bg-purple-900/30 px-4 py-3 rounded-t-md">
                            <Group justify="space-between" align="center">
                              <Group align="center">
                                <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                                <Text fw={700} size="md" className="text-purple-800 dark:text-purple-200">NDC Number: {ndc.ndcNumber}</Text>
                              </Group>
                            </Group>
                          </Card.Section>
                          <Card.Section className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Pharm Class</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400 line-clamp-2">{ndc.pharmClass}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Route</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.route}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Dosage Form</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.dosageForm}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Medicine Name</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.name}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Frequency</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.frequency}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Food Requirement</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.foodRequirementType.replace('_', ' ')}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Duration</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.durationNumber} {ndc.durationType}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Start Date</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.startDate}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Dosage</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.dosage}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Quantity</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.quantity}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Price</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">${ndc.price.toFixed(2)}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Total</Text>
                                <Text size="sm" fw={600} className="text-purple-600 dark:text-purple-400">${ndc.total.toFixed(2)}</Text>
                              </div>
                            </div>
                            
                            <Divider my="md" />
                            
                            <div className="mb-4">
                              <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Medication Alarm Times</Text>
                              <Group gap="xs">
                                {ndc.alarmTimes.map((time, timeIndex) => (
                                  <Badge key={timeIndex} color="blue" variant="light">{time}</Badge>
                                ))}
                              </Group>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Instructions</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.instructions}</Text>
                              </div>
                              <div>
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Notes</Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">{ndc.notes}</Text>
                              </div>
                            </div>
                          </Card.Section>
                        </Card>
                      ))}
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-teal-200 dark:border-teal-700 dark:bg-gray-800">
                  <Card.Section className="bg-teal-100 dark:bg-teal-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMedicalCross size={16} className="text-teal-700 dark:text-teal-400" />
                      <Text fw={600} size="md" className="text-teal-800 dark:text-teal-200">Prescribing Physician Information</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Number of Prescriptions</Text>
                          <Badge variant="light" color="teal" size="lg">3</Badge>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Physician Name</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Dr. Alice Rivera</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NPI Number</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">1234567890</Text>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Phone Number</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">(313) 777-1022</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Address</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">123 Medical Plaza, Suite 200</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">City, State, Zip</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">San Jose, CA 95112</Text>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Additional Comments</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Specialist in cardiology and allergy treatment</Text>
                        </div>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-indigo-200 dark:border-indigo-700 dark:bg-gray-800">
                  <Card.Section className="bg-indigo-100 dark:bg-indigo-900/30 px-4 py-3 rounded-t-md">
                    <Group justify="start">
                      <IconMathFunction size={16} className="text-indigo-700 dark:text-indigo-400" />
                      <Text fw={600} size="md" className="text-indigo-800 dark:text-indigo-200">Final Claim Summary</Text>
                    </Group>
                  </Card.Section>
                  <Card.Section className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Invoice Date</Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claim.submissionDate).format("DD-MM-YYYY")}</Text>
                        </div>
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Grand Total</Text>
                          <Text size="lg" fw={700} className="text-indigo-600 dark:text-indigo-400">{currency(claim.totalCharge)}</Text>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div>
                          <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Other Information</Text>
                          <Paper className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            <Text size="sm" className="text-gray-600 dark:text-gray-400">
                              This pharmacy claim includes allergy treatment medications and standard prescriptions. 
                              Patient has been advised to follow all medication schedules and report any adverse reactions. 
                              All prescriptions are covered under the primary insurance plan with appropriate documentation provided.
                            </Text>
                          </Paper>
                        </div>
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