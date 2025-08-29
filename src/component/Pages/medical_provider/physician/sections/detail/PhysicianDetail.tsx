import { Box, Card, Button, Text, Avatar, Badge, Grid, Group, Divider } from "@mantine/core";
import { IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconCalendarMonth, IconChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { format } from "@react-input/mask";
import { useState, useRef } from "react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PhysicianExpDetail } from "./PhysicianExpDetail";
import { PhysicianEduDetail } from "./PhysicianEduDetail";

export const PhysicianDetail = () => {
  const [drawerType, setDrawerType] = useState<number | null>(1);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const patientData = {
    id: 1,
    physicianName: "Test MP MF",
    physicianType: "Family Doctor",
    physicianId: "LIC1234",
    mpPhone: "(313) 666-2544",
    mpEmail: "testmpmf@snah.org",
    mpBirthday: "02/01/2024",
    mpAddress: "CA, California, 70275, USA",
    mpGender: "male",
  };
  const topBarAndFilter = {
    heading: "Medical Proivders details you can find below",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };
  const options = {
    mask: "(___) ___-__-__",
    replacement: { _: /\d/ },
  };
  const handleDrawer = (type: number) => {
    setDrawerType(type);
    setTimeout(() => drawerApiRef.current?.open?.(), 0);
  };
  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Physician Detail",
            items: [
              { title: "Medical Providers", href: "#" },
              { title: "Physician List", href: "/medical-providers/physician" },
              { title: "Physician Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 mb-6">
              <Grid>
                <Grid.Col
                  span={{ base: 12, md: 4 }}
                  className="flex justify-center mb-6"
                >
                  <div className="flex flex-col items-center text-center self-center rounded-md">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=64"
                      size={120}
                      radius="md"
                      className="mb-4 shadow-lg mt-5"
                    />
                    <Text size="xl" fw={600} className="text-gray-800 dark:text-white">
                      {patientData.physicianName}
                    </Text>
                    <Text size="md" fw={400} className="text-gray-800 dark:text-gray-300">
                      {patientData.physicianType}
                    </Text>
                    <Badge
                      color="green"
                      variant="light"
                      size="sm"
                      className="mt-2"
                    >
                      {patientData.physicianId}
                    </Badge>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Group gap="xs" className="items-start">
                      <IconPhone size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Phone
                        </Text>
                        <Text fw={500} className="text-gray-900 dark:text-white">
                          {format(patientData.mpPhone, options)}
                        </Text>
                      </div>
                    </Group>
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconMail size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400">
                            Email
                          </Text>
                          <Text fw={500} className="text-gray-900 dark:text-white">{patientData.mpEmail}</Text>
                        </div>
                      </Group>
                    </div>
                    <Group gap="xs" className="items-start">
                      <IconUser size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Gender
                        </Text>
                        <Text fw={500} className="text-gray-900 dark:text-white">{patientData.mpGender}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconCalendar size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Date of birth
                        </Text>
                        <Text fw={500} className="text-gray-900 dark:text-white">
                          {moment(patientData.mpBirthday).format("DD-MM-YYYY")}
                        </Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconMapPin size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Address
                        </Text>
                        <Text fw={500} className="text-gray-900 dark:text-white">{patientData.mpAddress}</Text>
                      </div>
                    </Group>
                    <Group gap="xs" className="items-start">
                      <IconCalendarMonth
                        size={18}
                        className="text-blue-600 dark:text-blue-400 mt-1"
                      />
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                          Department Details
                        </Text>
                        <Text fw={500} className="text-gray-900 dark:text-white">Child</Text>
                      </div>
                    </Group>
                  </div>
                  <Group gap="xs mt-4">
                    {/* <IconCalendarMonth size={18} className="text-blue-600" /> */}
                    <div className="mt-4">
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">
                        Bio
                      </Text>
                      <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                        ChildLorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </Text>
                    </div>
                  </Group>
                  <Divider
                    my="xl"
                    size="xs"
                    variant="dashed"
                    color="blue"
                    label="Below action view more"
                    labelPosition="center"
                    className="w-full"
                  />
                  <div className="flex justify-center">
                    <Group justify="center">
                      <Button
                        variant="gradient"
                        gradient={{ from: "blue", to: "indigo" }}
                        size="md"
                        rightSection={<IconChevronRight size={18} />}
                        onClick={() => handleDrawer(1)}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                      >
                        Education Details
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "blue", to: "indigo" }}
                        size="md"
                        rightSection={<IconChevronRight size={18} />}
                        onClick={() => handleDrawer(2)}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                      >
                        Experience Details
                      </Button>
                    </Group>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Card.Section>
          <Card.Section className="p-6">
            <Box className="mt-2">{/* <PatientAllRecords /> */}</Box>
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
            size: "md",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component:
            drawerType == 1 ? (
              <PhysicianEduDetail />
            ) : (
              <PhysicianExpDetail />
            ),
          title: drawerType == 1 ? "Educational Details" : "Experience Details",
        }}
      />
    </Box>
  );
};