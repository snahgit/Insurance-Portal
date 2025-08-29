import { Box, Card, Button, Text, Avatar, Badge, Grid, Group, Divider } from "@mantine/core";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconStethoscope, IconChevronRight, IconStatusChange } from "@tabler/icons-react";
import moment from "moment";
import { format } from '@react-input/mask';
import { useState, useRef } from "react";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { useLocation } from "react-router";
import { MemberTabsList } from "./member_all_records/MemberTabsList";
import { MemberOtherInfoDetails } from "./member_more_detail/MemberOtherInfoDetails";
import { MemberInsuranceDetails } from "./member_more_detail/MemberInsuranceDetails";

export const MemberDetail = () => {
  const { state: { id } } = useLocation()
  const [drawerType, setDrawerType] = useState<number | null>(1);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const memberData = {
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
    heading: "Member details you can find below",
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
    <Box>
      <Box>
        <Breadcrumb dataPass={{
          pageTitle: "Member Details",
          items: [
            { title: "Members", href: "#" },
            { title: "Members List", href: "/manage-member/member" },
            { title: 'Members Details', href: "#", isActive: true }
          ]
        }} />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6 bg-white dark:bg-gray-800">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6">
                  <div className="flex flex-col items-center text-center self-center rounded-md">
                    <Avatar
                      src={memberData.avatar}
                      size={120}
                      radius="md"
                      className="mb-4 shadow-lg mt-5"
                    />
                    <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">
                      {memberData.name}
                    </Text>
                    <Badge
                      color={memberData.status === 'Active' ? 'green' : 'red'}
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
                          <Text fw={500} className="text-gray-900 dark:text-white">{memberData.gender}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Date of birth</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{moment(memberData.lastVisit).format('DD-MM-YYYY')}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconPhone size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Phone</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{format(memberData.phone, options)}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMail size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Email</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{memberData.email}</Text>
                        </div>
                      </Group>
                    </div>
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconStethoscope size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Blood Group</Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{memberData.bloodGroup}</Text>
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
                          <Text fw={500} className="text-gray-900 dark:text-white">{memberData.lastVisit}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMapPin size={15} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">Address</Text>
                          <Text fw={500} className="text-sm text-gray-900 dark:text-white">{memberData.address}</Text>
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
            <Box className="mt-2">
              <MemberTabsList />
            </Box>
          </Card.Section>
        </Card>
      </Box>
      <PageDrawer
        onOpenReady={(api: any) => {
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
              <MemberOtherInfoDetails dataPass={{ memberData }} />
            ) : (
              <MemberInsuranceDetails dataPass={{ memberData }} />
            ),
          title: (
            <Group gap="sm">
              <Avatar src={memberData.avatar} size={40} radius="xl" />
              <div>
                <Text fw={600} size="lg" className="text-gray-900 dark:text-white">
                  {memberData.name}
                </Text>
                <Text size="sm" className="text-gray-600 dark:text-gray-400">
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