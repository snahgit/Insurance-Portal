import { Box, Card, Text, Badge, Grid, Group, Divider, Paper, Image, Title, SimpleGrid, ActionIcon, Tooltip, Avatar, Tabs } from "@mantine/core";
import { IconUser, IconMail, IconFileText, IconPill, IconCut, IconStethoscope, IconTestPipe, IconHeartbeat, IconBandage, IconReceipt, IconEye, IconDownload, IconMapPin, IconCalendar, IconStatusChange, IconPhone, IconCalendarEvent, IconSend } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { PageModal } from "../../../../../common/PageModal";
import moment from "moment";
import { format } from '@react-input/mask';
import { ReportViewComponent } from "./ReportViewComponent";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { PatientSendReportForm } from "../../../../manage_patient/patient/sections/form/PatientSendReportForm";

export const ReportDetail = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null)
  const [targetFile, setTargetFile] = useState('');
  const [modalType, setModalType] = useState('');
  const { requireSecurityCheck } = useSecurityCheck()

  // Debug modal type changes
  useEffect(() => {
    console.log('Modal type changed to:', modalType);
  }, [modalType]);

  const reportDetailData = {
    "id": 1,
    "name": "Ella Jones",
    "email": "ella.jones37@example.com",
    "phone": "8956785139",
    "avatar": "https://i.pravatar.cc/150?img=29",
    "lastVisit": "2025-06-09",
    "status": "Active",
    "gender": "female",
    "address": "123 Main St, Anytown, USA",
    "reports": [
      {
        "appointmentId": "SNAH123456",
        "planName": "Test name",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        "file": {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      },
      {
        "appointmentId": "SNAH123456",
        "planName": "Test name",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        "file": {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      },
    ]
  };
  const topBarAndFilter = {
    heading: "Find report details bellow",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };
  const getReportIcon = (type: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      report: <IconFileText size={20} className="text-blue-600 dark:text-blue-400" />,
      prescription: <IconPill size={20} className="text-green-600 dark:text-green-400" />,
      surgery: <IconCut size={20} className="text-red-600 dark:text-red-400" />,
      consultant: <IconStethoscope size={20} className="text-purple-600 dark:text-purple-400" />,
      testResult: <IconTestPipe size={20} className="text-orange-600 dark:text-orange-400" />,
      therapy: <IconHeartbeat size={20} className="text-pink-600 dark:text-pink-400" />,
      treatment: <IconBandage size={20} className="text-indigo-600 dark:text-indigo-400" />,
      invoice: <IconReceipt size={20} className="text-emerald-600 dark:text-emerald-400" />
    };
    return iconMap[type] || <IconFileText size={20} className="text-gray-600 dark:text-gray-400" />;
  };
  const getReportColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      report: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700",
      prescription: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700",
      surgery: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700",
      consultant: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700",
      testResult: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700",
      therapy: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-700",
      treatment: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700",
      invoice: "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700"
    };
    return colorMap[type] || "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700";
  };
  const handleImageClick = (imagePath: string) => {
    const originalAddAction = () => {
      console.log('Setting modal type to view');
      setModalType('view')
      setSelectedImage(imagePath);
      setTimeout(() => modalApiRef.current?.open?.(), 100)
    }
    requireSecurityCheck(originalAddAction, "View Report")
  };
  const handleSendReport = (data: any) => {
    const originalAddAction = () => {
      console.log('Setting modal type to send');
      setModalType('send')
      setTargetFile(data)
      setTimeout(() => modalApiRef.current?.open?.(), 100)
    }
    requireSecurityCheck(originalAddAction, "Send Report")
  };

  // Helper function to calculate total counts across all report groups
  // const getTotalCounts = () => {
  //   const totals: { [key: string]: number } = {};

  //   reportDetailData.reports.forEach(reportGroup => {
  //     Object.entries(reportGroup.file).forEach(([type, items]) => {
  //       totals[type] = (totals[type] || 0) + (items as any[]).length;
  //     });
  //   });

  //   return totals;
  // };

  const renderReportSection = (type: string, items: any[], visitIndex?: number) => {
    if (!items || items.length === 0) return null;
    return (
      <Card key={`${type}-${visitIndex}`} withBorder className={`bg-gradient-to-r ${getReportColor(type)} transition-all duration-300 hover:shadow-md`}>
        <Card.Section className="p-4">
          <Group justify="space-between" align="center" className="mb-4">
            <Group gap="sm">
              {getReportIcon(type)}
              <Title order={5} className="capitalize text-gray-800 dark:text-gray-200">
                {type.replace(/([A-Z])/g, ' $1').trim()}
                {visitIndex !== undefined && (
                  <Text component="span" size="sm" c="dimmed" className="ml-2">
                    (Visit {visitIndex + 1})
                  </Text>
                )}
              </Title>
              <Badge variant="light" size="sm" className="text-xs">
                {items.length} file{items.length > 1 ? 's' : ''}
              </Badge>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
            {items.map((item, index) => (
              <Paper
                key={`${type}-${visitIndex}-${index}`}
                className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                onClick={() => handleImageClick(item.path)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={item.path}
                    alt={`${type} ${index + 1} - Visit ${(visitIndex ?? 0) + 1}`}
                    className="w-full h-full object-cover"
                    fallbackSrc="https://via.placeholder.com/300x300?text=No+Image"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Group gap="xs" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Tooltip label="View Image">
                        <ActionIcon
                          variant="filled"
                          color="blue"
                          size="lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(item.path);
                          }}
                        >
                          <IconEye size={18} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Download">
                        <ActionIcon
                          variant="filled"
                          color="blue"
                          size="lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.path, '_blank');
                          }}
                        >
                          <IconDownload size={18} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Send">
                        <ActionIcon
                          variant="filled"
                          color="blue"
                          size="lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendReport(item.path);
                          }}
                        >
                          <IconSend size={18} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800">
                  <Text size="xs" className="text-gray-600 dark:text-gray-400 truncate text-center">
                    {item.relativePath}
                  </Text>
                </div>
              </Paper>
            ))}
          </SimpleGrid>
        </Card.Section>
      </Card>
    );
  };

  const options = {
    mask: '(___) ___-__-__',
    replacement: { _: /\d/ },
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Report Detail",
            items: [
              { title: "Manage Report", href: "#" },
              { title: "Report List", href: "/manage-report/report" },
              { title: "Report Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-700">
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6">
                  <div className="flex flex-col items-center text-center self-center rounded-md">
                    <Avatar
                      src={reportDetailData.avatar}
                      size={120}
                      radius="md"
                      className="mb-4 shadow-lg mt-5"
                    />
                    <Text size="xl" fw={600} className="text-gray-800">
                      {reportDetailData.name}
                    </Text>
                    <Badge
                      color={reportDetailData.status === 'Active' ? 'green' : 'red'}
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
                        <IconUser size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Gender</Text>
                          <Text fw={500}>{reportDetailData.gender}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Date of birth</Text>
                          <Text fw={500}>{moment(reportDetailData.lastVisit).format('DD-MM-YYYY')}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconPhone size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Phone</Text>
                          <Text fw={500}>{format(reportDetailData.phone, options)}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMail size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Email</Text>
                          <Text fw={500}>{reportDetailData.email}</Text>
                        </div>
                      </Group>
                    </div>
                    <div className="space-y-3">
                      <Group gap="xs" className="items-start">
                        <IconStatusChange size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Marital Status</Text>
                          <Text fw={500}>Single</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconCalendar size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Last Visit</Text>
                          <Text fw={500}>{reportDetailData.lastVisit}</Text>
                        </div>
                      </Group>
                      <Group gap="xs" className="items-start">
                        <IconMapPin size={15} className="text-blue-600 mt-1" />
                        <div>
                          <Text size="sm" className="text-gray-600">Address</Text>
                          <Text fw={500} className="text-sm">{reportDetailData.address}</Text>
                        </div>
                      </Group>
                    </div>
                  </div>
                </Grid.Col>
              </Grid>
            </div>

            <Divider
              my="xl"
              size="md"
              variant="dashed"
              color="blue"
              label={
                <Group gap="xs">
                  <IconFileText size={18} />
                  <Text fw={500}>Medical Reports & Documents ({reportDetailData.reports.length} Visit{reportDetailData.reports.length > 1 ? 's' : ''})</Text>
                </Group>
              }
              labelPosition="center"
              className="w-full"
            />
            <Tabs defaultValue="0" className="w-full">
              <Tabs.List className="mb-6 pb-3 flex flex-wrap gap-2">
                {reportDetailData.reports.map((_, groupIndex) => (
                  <Tabs.Tab
                    key={groupIndex}
                    value={groupIndex.toString()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                    leftSection={<IconCalendarEvent size={16} />}
                  >
                    <div className="flex flex-col items-center">
                      <Text size="sm" fw={500}>Visit {groupIndex + 1}</Text>
                      <Text size="xs" c="dimmed">
                        {Object.values(reportDetailData.reports[groupIndex].file).reduce((total, items) => total + (items as any[]).length, 0)} files
                      </Text>
                    </div>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {reportDetailData.reports.map((reportGroup, groupIndex) => (
                <Tabs.Panel key={groupIndex} value={groupIndex.toString()}>
                  <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 mb-6">
                    <Card.Section className="p-4">
                      <Title order={4} className="text-gray-800 dark:text-gray-200 mb-4">
                        Visit {groupIndex + 1} - Appointment Details
                      </Title>
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                          <Group gap="xs" className="items-start">
                            <IconMail size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400 font-medium">Appointment ID</Text>
                              <Text fw={600} className="text-gray-800 dark:text-gray-200">{reportGroup.appointmentId}</Text>
                            </div>
                          </Group>
                          <Group gap="xs" className="items-start mt-4">
                            <IconUser size={18} className="text-blue-600 dark:text-blue-400 mt-1" />
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400 font-medium">Plan Name</Text>
                              <Text fw={600} className="text-gray-800 dark:text-gray-200">{reportGroup.planName}</Text>
                            </div>
                          </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                          <Group gap="xs" className="items-start">
                            <div>
                              <Text size="sm" className="text-gray-600 dark:text-gray-400 font-medium">Description</Text>
                              <Text className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                {reportGroup.description}
                              </Text>
                            </div>
                          </Group>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                    <Card.Section className="p-4">
                      <Divider
                        my="md"
                        size="xs"
                        variant="dashed"
                        color="blue"
                        label="Summary of All Visits"
                        labelPosition="center" />
                    </Card.Section>
                    <Card.Section className="p-4">
                      <Group justify="space-between" align="center" className="mb-4">
                        <Title order={4} className="text-gray-800 dark:text-gray-200">
                          Report Categories
                        </Title>
                        <Badge variant="light" size="lg">
                          {Object.values(reportGroup.file).reduce((total, items) => total + (items as any[]).length, 0)} Total Files
                        </Badge>
                      </Group>

                      <SimpleGrid cols={{ base: 2, sm: 4, md: 8 }} spacing="md" className="mb-6">
                        {Object.entries(reportGroup.file).map(([type, items]) => (
                          <Paper key={type} className="text-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex flex-col items-center gap-2">
                              {getReportIcon(type)}
                              <Text size="xs" className="text-gray-600 dark:text-gray-400 capitalize font-medium">
                                {type.replace(/([A-Z])/g, ' $1').trim()}
                              </Text>
                              <Text fw={700} className="text-sm text-gray-800 dark:text-gray-200">
                                {(items as any[]).length}
                              </Text>
                            </div>
                          </Paper>
                        ))}
                      </SimpleGrid>
                    </Card.Section>
                  </Card>
                  <div className="space-y-4">
                    {Object.entries(reportGroup.file).map(([type, items]) =>
                      renderReportSection(type, items as any[], groupIndex)
                    )}
                  </div>
                </Tabs.Panel>
              ))}
            </Tabs>
          </Card.Section>
        </Card>
      </Box>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        title={modalType === 'send' ? "Send Report" : "Document Preview"}
        modalConfig={{
          size: modalType === 'send' ? 'xl' : 'lg',
          centered: true,
          closeOnClickOutside: true,
          closeOnEscape: true,
          zIndex: 300
        }}
      >
        {modalType === 'send' && (
          <PatientSendReportForm dataPass={{ targetFile }} />
        )}
        {modalType === 'view' && (
          <ReportViewComponent dataPass={{ selectedImage }} />
        )}
      </PageModal>
    </Box>
  );
};