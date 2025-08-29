import { Box, Card, Text, Avatar, Badge, Grid, Group, Divider, Paper, Timeline, Button } from "@mantine/core";
import { IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconSchool, IconBriefcase, IconBuilding, IconClock, IconGradienter, IconChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { format } from "@react-input/mask";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { useRef, useState } from "react";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PharmacistEduDetail } from "./PharmacistEduDetail";
import { PharmacistExpDetail } from "./PharmacistExpDetail";

export const PharmacistDetail = () => {
  // const { state: { id } } = useLocation()
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

  const educationalData = {
    institutionName: "Stanford University School of Medicine",
    departmentName: "Department of Internal Medicine",
    degree: "Doctor of Medicine (MD)",
    courseDuration: {
      startDate: "2018-09-01",
      endDate: "2022-06-15"
    },
    achievements: ["Magna Cum Laude", "Dean's List (2019-2022)", "Research Excellence Award"],
    gpa: "3.85/4.0"
  };

  const workExperienceData = {
    organizationName: "Johns Hopkins Hospital",
    position: "Senior Resident Physician",
    department: "Internal Medicine",
    workDuration: {
      startDate: "2022-07-01",
      endDate: "2024-06-30"
    },
    responsibilities: [
      "Managed patient care in high-volume emergency department",
      "Supervised junior residents and medical students",
      "Participated in multidisciplinary treatment planning",
      "Conducted clinical research on cardiovascular diseases"
    ],
    achievements: ["Employee of the Month (3 times)", "Published 5 peer-reviewed papers"]
  };
  const topBarAndFilter = {
    heading: "Pharmacist details you can find below",
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
            pageTitle: "Pharmacist Detail",
            items: [
              { title: "Manage Staff", href: "#" },
              { title: "Pharmacist List", href: "/manage-staff/pharmacist" },
              { title: "Pharmacist Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6" >
                  <div className="flex flex-col items-center text-center self-center rounded-md">
                    <Avatar src="https://i.pravatar.cc/150?img=64" size={120} radius="md" className="mb-4 shadow-lg mt-5" />
                    <Text size="xl" fw={600} className="text-gray-800">John Doe</Text>
                    <Badge color="green" variant="light" size="sm" className="mt-2" >Active</Badge>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconPhone size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Phone</Text>
                          <Text fw={500}>{format(patientData.mpPhone, options)}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMail size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Email</Text>
                          <Text fw={500}>{patientData.mpEmail}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconUser size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Gender</Text>
                          <Text fw={500}>{patientData.mpGender}</Text>
                        </div>
                      </Group>
                    </div>
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Date of birth</Text>
                          <Text fw={500}>{moment(patientData.mpBirthday).format("DD-MM-YYYY")}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Joining Date</Text>
                          <Text fw={500}>{moment(patientData.mpBirthday).format("DD-MM-YYYY")}</Text>
                        </div>
                      </Group>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconMapPin size={18} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Address</Text>
                          <Text fw={500}>{patientData.mpAddress}</Text>
                        </div>
                      </Group>
                    </div>
                  </div>
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
                <Divider my="md" size="xs" variant="dashed" color="blue" label="Last Educational Qualification" labelPosition="center" className="w-full" />
                <Grid.Col span={12}>
                  <Paper className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <div className="space-y-4">
                          <Group gap="xs" className="items-start">
                            <IconSchool size={20} className="text-orange-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Institution</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {educationalData.institutionName}
                              </Text>
                            </div>
                          </Group>

                          <Group gap="xs" className="items-start">
                            <IconGradienter size={20} className="text-orange-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Degree</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {educationalData.degree}
                              </Text>
                            </div>
                          </Group>

                          <Group gap="xs" className="items-start">
                            <IconBuilding size={20} className="text-orange-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Department</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {educationalData.departmentName}
                              </Text>
                            </div>
                          </Group>
                        </div>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <div className="space-y-4">
                          <Group gap="xs" className="items-start">
                            <IconCalendar size={20} className="text-orange-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Course Duration</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {moment(educationalData.courseDuration.startDate).format("MMM YYYY")} - {moment(educationalData.courseDuration.endDate).format("MMM YYYY")}
                              </Text>
                              <Text size="xs" className="text-gray-500">
                                ({moment(educationalData.courseDuration.endDate).diff(moment(educationalData.courseDuration.startDate), 'years')} years)
                              </Text>
                            </div>
                          </Group>

                          {/* <Group gap="xs" className="items-start">
                            <IconAward size={20} className="text-orange-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">GPA</Text>
                              <Badge color="orange" variant="light" size="lg">
                                {educationalData.gpa}
                              </Badge>
                            </div>
                          </Group> */}

                          <div>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-2">Achievements</Text>
                            <div className="flex flex-wrap gap-2">
                              {educationalData.achievements.map((achievement, index) => (
                                <Badge key={index} color="orange" variant="outline" size="sm">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                </Grid.Col>

                <Divider my="md" size="xs" variant="dashed" color="blue" label="Last Work Experience" labelPosition="center" className="w-full" />
                <Grid.Col span={12}>
                  <Paper className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <div className="space-y-4">
                          <Group gap="xs" className="items-start">
                            <IconBuilding size={20} className="text-green-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Organization</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {workExperienceData.organizationName}
                              </Text>
                            </div>
                          </Group>

                          <Group gap="xs" className="items-start">
                            <IconBriefcase size={20} className="text-green-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Position</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {workExperienceData.position}
                              </Text>
                              <Text size="sm" className="text-gray-500">
                                {workExperienceData.department}
                              </Text>
                            </div>
                          </Group>

                          <Group gap="xs" className="items-start">
                            <IconClock size={20} className="text-green-600 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400">Duration</Text>
                              <Text fw={600} size="md" className="text-gray-800 dark:text-gray-100">
                                {moment(workExperienceData.workDuration.startDate).format("MMM YYYY")} - {moment(workExperienceData.workDuration.endDate).format("MMM YYYY")}
                              </Text>
                              <Text size="xs" className="text-gray-500">
                                ({moment(workExperienceData.workDuration.endDate).diff(moment(workExperienceData.workDuration.startDate), 'years')} years)
                              </Text>
                            </div>
                          </Group>
                        </div>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <div className="space-y-4">
                          <div>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-3">Key Responsibilities</Text>
                            <Timeline color="green" lineWidth={2} bulletSize={20}>
                              {workExperienceData.responsibilities.map((responsibility, index) => (
                                <Timeline.Item key={index} bullet={<IconBriefcase size={12} />}>
                                  <Text size="sm" className="text-gray-700 dark:text-gray-300">
                                    {responsibility}
                                  </Text>
                                </Timeline.Item>
                              ))}
                            </Timeline>
                          </div>

                          <div>
                            <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-2">Achievements</Text>
                            <div className="flex flex-wrap gap-2">
                              {workExperienceData.achievements.map((achievement, index) => (
                                <Badge key={index} color="green" variant="light" size="sm">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                </Grid.Col>
                <Divider my="md" size="xs" variant="dashed" color="blue" label="Know about me" labelPosition="center" className="w-full" />
                <Grid.Col>
                  <Group>
                    <Text size="sm" fw={500}>
                      ChildLorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged.
                    </Text>
                  </Group>
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
              <PharmacistEduDetail />
            ) : (
              <PharmacistExpDetail />
            ),
          title: drawerType == 1 ? "Educational Details" : "Experience Details",
        }}
      />
    </Box>
  );
};