import { Box, Card, Button, Text, Avatar, Badge, Grid, Group, Divider } from "@mantine/core";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconStethoscope, IconChevronRight, IconStatusChange } from "@tabler/icons-react";
import moment from "moment";
import { format } from '@react-input/mask';
import { PatientInsuranceDetails } from "./patient_more_detail/PatientInsuranceDetails";
import { PatientOtherInfoDetails } from "./patient_more_detail/PatientOtherInfoDetails";
import { useState, useRef } from "react";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { useLocation } from "react-router";
import { PatientTabsList } from "./patient_all_records/PatientTabsList";

export const PatientDetail = () => {
  const { state: { id } } = useLocation()
  const [drawerType, setDrawerType] = useState<number | null>(1);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const patientData = {
    id: 1,
    name: id.name,
    email: id.email,
    phone: id.phone,
    avatar: id.avatar,
    age: 35,
    gender: id.gender,
    bloodGroup: "A+",
    address: "123 Main St, New York, NY 10001",
    lastVisit: id.lastVisit,
    nextAppointment: "2025-01-20",
    status: "Active",
    medicalHistory: [
      "Hypertension (2020)",
      "Diabetes Type 2 (2019)",
      "Broken arm (2018)"
    ],
    currentMedications: [
      "Lisinopril 10mg daily",
      "Metformin 500mg twice daily",
      "Aspirin 81mg daily"
    ],
    allergies: ["Penicillin", "Peanuts"],
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 234 567 8901"
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001"
    }
  };
  const topBarAndFilter = {
    heading: "Patient details you can find below",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    }
  };
  const options = {
    mask: '(___) ___-__-__',
    replacement: { _: /\d/ },
  };
  const handleDrawer = (type: number) => {
    setDrawerType(type);
    setTimeout(() => drawerApiRef.current?.open?.(), 0);
  };
  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Box>
        <Breadcrumb dataPass={{
          pageTitle: "Patient Details",
          items: [
            { title: "Manage Patients", href: "#" },
            { title: "Patients", href: "#" },
            { title: "Patients List", href: "/manage-patient/patient" },
            { title: 'Patients Details', href: "#", isActive: true }
          ]
        }} />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6 bg-white dark:bg-gray-800">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6">
                  <div className="flex flex-col items-center text-center self-center rounded-md">
                    <Avatar
                      src={patientData.avatar}
                      size={120}
                      radius="md"
                      className="mb-4 shadow-lg mt-5"
                    />
                    <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">
                      {patientData.name}
                    </Text>
                    <Badge
                      color={patientData.status === 'Active' ? 'green' : 'red'}
                      variant="light"
                      size="sm"
                      className="mt-2"
                    >
                      SNAH123456
                    </Badge>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconUser size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Gender</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{patientData.gender}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Date of birth</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{moment(patientData.lastVisit).format('DD-MM-YYYY')}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconPhone size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Phone</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{format(patientData.phone, options)}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMail size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Email</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{patientData.email}</Text>
                        </div>
                      </Group>
                    </div>
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconStethoscope size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Blood Group</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{patientData.bloodGroup}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconStatusChange size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Marital Status</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">Single</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Last Visit</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{patientData.lastVisit}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMapPin size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Address</Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">{patientData.address}</Text>
                        </div>
                      </Group>
                    </div>
                  </div>
                  <Divider my="xl" size="xs" variant="dashed" color="blue" label="Below action view more" labelPosition="center" className="w-full text-gray-900 dark:text-white" />
                  <div className="flex justify-center">
                    <Group justify="center">
                      <Button
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'indigo' }}
                        size="md"
                        rightSection={<IconChevronRight size={18} />}
                        onClick={() => handleDrawer(1)}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                      >
                        Show More Details
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'indigo' }}
                        size="md"
                        rightSection={<IconChevronRight size={18} />}
                        onClick={() => handleDrawer(2)}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                      >
                        Insurance Information
                      </Button>
                    </Group>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Card.Section>
          <Card.Section className="rounded-t-lg">
            <PatientTabsList />
          </Card.Section>
        </Card>
      </Box>
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
            className: "overflow-y-auto",
          },
          component:
            drawerType == 1 ? (
              <PatientOtherInfoDetails dataPass={{ patientData }} />
            ) : (
              <PatientInsuranceDetails dataPass={{ patientData }} />
            ),
          title: (
            <Group gap="sm">
              <Avatar src={patientData.avatar} size={40} radius="xl" />
              <div>
                <Text fw={600} size="lg">
                  {patientData.name}
                </Text>
                <Text size="sm" className="text-gray-600">
                  Detailed Information
                </Text>
              </div>
            </Group>
          ),
        }}
      />
    </Box>
  )
}