import React, { Fragment } from "react";
import { useEffect, useRef, useState } from "react";
import { Card, Tabs, Badge, ActionIcon, Group, Menu, Table, Text } from "@mantine/core";
import { IconHome, IconCalendar, IconClock, IconInfoCircle, IconVideoPlus, IconUsers, IconStethoscope, IconStatusChange, IconPlus } from "@tabler/icons-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageModal } from "../../../../../common/PageModal";
import { AppointmentServiceForm } from "../form/AppointmentServiceForm";
import { AppointmentCancelRejectForm } from "../form/AppointmentCancelRejectForm";
import { AppointmentOutPatientForm } from "../form/AppointmentOutPatientForm";
import AppointmentsQuickview from "../detail/AppointmentsQuickview";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { useNavigate } from "react-router";

const tabsConfig = [
  {
    value: "allAppointment",
    label: "All Appointments",
    icon: IconCalendar,
    color: "blue",
  },
  {
    value: "virtualAppointment",
    label: "Virtual Appointments",
    icon: IconVideoPlus,
    color: "blue",
  },
  {
    value: "inPersonAppointment",
    label: "In-Person Appointments",
    icon: IconUsers,
    color: "blue",
  },
  {
    value: "houseCallAppointment",
    label: "House Call Appointments",
    icon: IconHome,
    color: "blue",
  },
];

interface Visit {
  id: string;
  snahId: string;

  patientName: string;
  physicianName: string;
  departmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "pending" | "confirm" | "complete" | "cancel";
  type:
  | "allAppointment"
  | "virtualAppointment"
  | "inPersonAppointment"
  | "houseCallAppointment"
  | "pharmacy"
  | "caregiver"
  | "treatment";
}

interface HandleChangeTab {
  (type: string): void;
}

const sampleVisitsData: Record<string, Visit[]> = {
  allAppointment: [
    {
      id: "1",
      snahId: "SNMF212565",
      patientName: "Rohit Yadav",
      physicianName: "Dr. John Doe",
      departmentName: "Cardiology",
      appointmentDate: "12/01/2023",
      appointmentTime: "10:00 - 10:15",
      type: "allAppointment",
      status: "confirm",
    },
    {
      id: "2",
      snahId: "SNMF267570",
      patientName: "Rohit Yadav",
      physicianName: "Dr. Smith",
      departmentName: "Neurology",
      appointmentDate: "12/04/2023",
      appointmentTime: "11:20 - 11:35",
      type: "allAppointment",
      status: "confirm",
    },
  ],
  virtualAppointment: [
    {
      id: "1",
      snahId: "SNMF212565",
      patientName: "Rohit Yadav",
      physicianName: "Dr. John Doe",
      departmentName: "Cardiology",
      appointmentDate: "12/01/2023",
      appointmentTime: "10:00 - 10:15",
      type: "virtualAppointment",
      status: "confirm",
    },
    {
      id: "2",
      snahId: "SNMF267570",
      patientName: "John Doe",
      physicianName: "Dr. Smith",
      departmentName: "Neurology",
      appointmentDate: "12/04/2023",
      appointmentTime: "11:20 - 11:35",
      type: "virtualAppointment",
      status: "cancel",
    },
    {
      id: "3",
      snahId: "SNMF212566",
      patientName: "Carolos Johnson",
      physicianName: "Dr. Jane Smith",
      departmentName: "Dermatology",
      appointmentDate: "12/02/2023",
      appointmentTime: "14:00 - 14:15",
      type: "virtualAppointment",
      status: "pending",
    },
    {
      id: "4",
      snahId: "SNMF21s66",
      patientName: "Denial Brown",
      physicianName: "Dr. Jane Smith",
      departmentName: "Dermatology",
      appointmentDate: "12/02/2023",
      appointmentTime: "14:00 - 14:15",
      type: "virtualAppointment",
      status: "complete",
    },
  ],
  inPersonAppointment: [
    {
      id: "5",
      snahId: "SNMF212567",
      patientName: "Alice Johnson",
      physicianName: "Dr. Emily White",
      departmentName: "Orthopedics",
      appointmentDate: "12/03/2023",
      appointmentTime: "09:00 - 09:30",
      type: "inPersonAppointment",
      status: "complete",
    },
    {
      id: "6",
      snahId: "SNMF212568",
      patientName: "Bob Smith",
      physicianName: "Dr. Michael Brown",
      departmentName: "Pediatrics",
      appointmentDate: "12/05/2023",
      appointmentTime: "13:00 - 13:30",
      type: "inPersonAppointment",
      status: "pending",
    },
    {
      id: "7",
      snahId: "SNMF212569",
      patientName: "Charlie Davis",
      physicianName: "Dr. Sarah Green",
      departmentName: "Gynecology",
      appointmentDate: "12/06/2023",
      appointmentTime: "14:00 - 14:30",
      type: "inPersonAppointment",
      status: "cancel",
    },
    {
      id: "8",
      snahId: "SNMF212570",
      patientName: "David Wilson",
      physicianName: "Dr. James Black",
      departmentName: "Ophthalmology",
      appointmentDate: "12/07/2023",
      appointmentTime: "15:00 - 15:30",
      type: "inPersonAppointment",
      status: "confirm",
    },
  ],
  houseCallAppointment: [
    {
      id: "9",
      snahId: "PHAR123456",
      patientName: "Emma Watson",
      physicianName: "Dr. Olivia Brown",
      departmentName: "Pharmacy",
      appointmentDate: "12/08/2023",
      appointmentTime: "10:30 - 11:00",
      type: "houseCallAppointment",
      status: "complete",
    },
    {
      id: "10",
      snahId: "PHAR789012",
      patientName: "Liam Johnson",
      physicianName: "Dr. Noah Smith",
      departmentName: "Pharmacy",
      appointmentDate: "12/09/2023",
      appointmentTime: "11:30 - 12:00",
      type: "houseCallAppointment",
      status: "confirm",
    },
    {
      id: "11",
      snahId: "PHAR345678",
      patientName: "Sophia Brown",
      physicianName: "Dr. Ava Davis",
      departmentName: "Pharmacy",
      appointmentDate: "12/10/2023",
      appointmentTime: "12:30 - 13:00",
      type: "houseCallAppointment",
      status: "cancel",
    },
    {
      id: "12",
      snahId: "PHAR901234",
      patientName: "Mia Wilson",
      physicianName: "Dr. Isabella Garcia",
      departmentName: "Pharmacy",
      appointmentDate: "12/11/2023",
      appointmentTime: "13:30 - 14:00",
      type: "houseCallAppointment",
      status: "pending",
    },
  ],
};

export const AppointmentList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("allAppointment");
  const [apiData, setApiData] = useState<Visit[]>([]);
  const [pageModalType, setPageModalType] = useState<string>('');
  const [modalSize, setModalSize] = useState<string>('sm');
  const [detailData, setDetailData] = useState<string | undefined>();
  const [passComponentByMatch, setPassComponentByMatch] = useState<React.ReactNode>();
  const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, apiData.length);
  const currentData = apiData.slice(startIndex, endIndex);

  const { requireSecurityCheck } = useSecurityCheck();

  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const [passComponentToModalByMatch, setPassComponentToModalByMatch] = useState<React.ReactNode>();

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "complete":
        return "green";
      case "confirm":
        return "blue";
      case "cancel":
        return "red";
      default:
        return "gray";
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "allAppointment":
        return "👨‍⚕️";
      case "virtualAppointment":
        return "👨‍⚕️";
      case "inPersonAppointment":
        return "👨‍⚕️";
      case "houseCallAppointment":
        return "👨‍⚕️";
      case "caregiver":
        return "👩‍⚕️";
      case "treatment":
        return "📋";
      default:
        return "📋";
    }
  };
  const handleDrawer = (data: string) => {
    const originalAddAction = () => {
      setDetailData(data);
      if (activeTab == "virtualAppointment" || activeTab == "allAppointment") {
        setPassComponentByMatch(
          <AppointmentsQuickview dataPass={{ detailData }} />
        );
      }
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Info");
  }
  const handleChangeTab: HandleChangeTab = (type: string) => {
    if (type == "virtualAppointment") {
      setApiData(sampleVisitsData[type]);
    } else if (type == "inPersonAppointment") {
      setApiData(sampleVisitsData[type]);
    } else if (type == "houseCallAppointment") {
      setApiData(sampleVisitsData[type]);
    } else if (type == "allAppointment") {
      setApiData(sampleVisitsData[type]);
    } else if (type == "caregiver") {
      setApiData(sampleVisitsData[type]);
    } else if (type == "treatment") {
      setApiData(sampleVisitsData[type]);
    }
    setActiveTab(type);
  };
  const handleModal = (type: string, data: any) => {
    const originalAddAction = () => {
      if (type === "cancel" || type === "reject") {
        setPageModalType(`${type === "cancel" ? "Cancel" : "Reject"} the appointment`);
        setModalSize('xl')
        setPassComponentToModalByMatch(<AppointmentCancelRejectForm dataPass={{ type }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else if (type === "accept") {
        setPageModalType('Accept the appointment');
        setModalSize('xl')
        setPassComponentToModalByMatch(<AppointmentServiceForm dataPass={{ detailData }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else if (type === "complete") {
        navigate("create-prescription", { state: { id: data } })
      } else {
        setPageModalType('Fill the out patient form');
        setModalSize('xl')
        setPassComponentToModalByMatch(<AppointmentOutPatientForm />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      }
    };
    requireSecurityCheck(originalAddAction, "Status");
  };

  useEffect(() => {
    setApiData(sampleVisitsData[activeTab]);
    dispatch(
      setPagination({
        totalItems: sampleVisitsData[activeTab].length,
        itemsPerPage: 10,
        currentPage: pagination.currentPage || 1,
      })
    );
  }, [sampleVisitsData, dispatch]);

  return (
    <Fragment>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: modalSize,
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: passComponentToModalByMatch,
          title: pageModalType
        }} />
      <Card.Section className="px-4 pt-4">
        <Tabs
          value={activeTab}
          onChange={(value) => handleChangeTab(value || "private")}
          variant="pills"
        >
          <Tabs.List className="flex flex-wrap gap-2 mb-4">
            {tabsConfig.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  leftSection={<IconComponent size={16} />}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg border-solid border-2 border-sky-200 dark:border-sky-700 font-medium transition-all duration-200 ${activeTab === tab.value
                    ? `bg-${tab.color}-500 text-white shadow-md`
                    : `bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-${tab.color}-50 hover:text-${tab.color}-600`
                    }`}
                >
                  {tab.label}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
          {tabsConfig.map((tab) => (
            <Tabs.Panel key={tab.value} value={tab.value}>
              {topBarAndFilter.viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-0 py-4">
                  {currentData.length > 0 ? (
                    currentData.map((visit: Visit, key: number) => (
                      <Card key={key} withBorder shadow="md" className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
                        <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                          <div className="flex justify-between items-start mb-2">
                            <Text size="xs" c="dimmed" className="px-2 py-1 rounded-full text-gray-800 dark:text-gray-100" >
                              {visit.snahId}
                            </Text>
                            <Badge color={getStatusBadgeColor(visit.status)} variant="filled" size="sm" >{visit.status}</Badge>
                          </div>
                          <div className="text-4xl mb-2">{getTypeIcon(visit.type)}</div>
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">{visit.patientName}</Text>
                        </Card.Section>
                        <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                          <div className="flex items-center space-x-2">
                            <IconStethoscope size={16} className="text-purple-500" />
                            <Text size="sm" className="font-semibold flex items-center space-x-1">{visit.physicianName}
                              <Text className="ps-1">({visit.departmentName})</Text>
                            </Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IconCalendar size={16} className="text-blue-500" />
                            <Text size="sm" className="font-semibold" >{moment(visit.appointmentDate, "DD/MM/YYYY").format("MMM DD, YYYY")}</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IconClock size={16} className="text-green-500" />
                            <Text size="sm" className="font-semibold" >{visit.appointmentTime}</Text>
                          </div>
                        </Card.Section>
                        <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                          <Group justify="center" gap="xs">
                            {visit.status == "pending" && (
                              <Fragment>
                                <ActionIcon
                                  size="md"
                                  variant="medium"
                                  color="blue"
                                  className="hover:bg-blue-400 ease-in-out duration-300"
                                  onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                  <IconInfoCircle size={14} />
                                </ActionIcon>
                                <Menu>
                                  <Menu.Target>
                                    <ActionIcon
                                      size="md"
                                      variant="medium"
                                      color="blue"
                                      className="hover:bg-blue-400 ease-in-out duration-300">
                                      <IconStatusChange size={14} />
                                    </ActionIcon>
                                  </Menu.Target>
                                  <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                    <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                    <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal("reject", visit); }}>Reject</Menu.Item>
                                    <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal("accept", visit); }}>Accept</Menu.Item>
                                  </Menu.Dropdown>
                                </Menu>
                              </Fragment>
                            )}
                            {visit.status == "confirm" && (
                              <Fragment>
                                <ActionIcon
                                  size="md"
                                  variant="medium"
                                  color="blue"
                                  className="hover:bg-blue-400 ease-in-out duration-300"
                                  onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                  <IconInfoCircle size={14} />
                                </ActionIcon>
                                <Menu>
                                  <Menu.Target>
                                    <ActionIcon
                                      size="md"
                                      variant="medium"
                                      color="blue"
                                      className="hover:bg-blue-400 ease-in-out duration-300">
                                      <IconStatusChange size={14} />
                                    </ActionIcon>
                                  </Menu.Target>
                                  <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                    <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                    <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => handleModal("cancel", visit)}>Cancel</Menu.Item>
                                    <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => handleModal("complete", visit)}>Complete</Menu.Item>
                                  </Menu.Dropdown>
                                </Menu>
                              </Fragment>
                            )}
                            {visit.status == "cancel" && (
                              <Fragment>
                                <ActionIcon
                                  size="md"
                                  variant="medium"
                                  color="blue"
                                  className="hover:bg-blue-400 ease-in-out duration-300"
                                  onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                  <IconInfoCircle size={14} />
                                </ActionIcon>
                              </Fragment>
                            )}
                            {visit.status == "complete" && (
                              <Fragment>
                                <ActionIcon
                                  size="md"
                                  variant="medium"
                                  color="blue"
                                  className="hover:bg-blue-400 ease-in-out duration-300"
                                  onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                  <IconInfoCircle size={14} />
                                </ActionIcon>
                                <ActionIcon
                                  size="md"
                                  variant="medium"
                                  color="blue"
                                  className="hover:bg-blue-400 ease-in-out duration-300"
                                  onClick={() => { handleModal("outPatient", visit); }}>
                                  <IconPlus size={14} />
                                </ActionIcon>
                              </Fragment>
                            )}
                          </Group>
                        </Card.Section>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <Text size="lg" c="dimmed">
                        No {tab.label.toLowerCase()} records found
                      </Text>
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto p-4">
                  <Table striped highlightOnHover withTableBorder className="min-w-full" >
                    <Table.Thead className="">
                      <Table.Tr>
                        <Table.Th className="text-center p-4">Appointment ID</Table.Th>
                        <Table.Th className="text-center p-4">Patient Name</Table.Th>
                        <Table.Th className="text-center p-4">Physician Name</Table.Th>
                        <Table.Th className="text-center p-4">Department</Table.Th>
                        <Table.Th className="text-center p-4">Appointment Date</Table.Th>
                        <Table.Th className="text-center p-4">Appointment Time</Table.Th>
                        <Table.Th className="text-center p-4">Status</Table.Th>
                        <Table.Th className="text-center p-4">Action</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.length > 0 ? (
                        currentData.map((visit: Visit, key: number) => (
                          <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Table.Td className="p-4">
                              <Text size="sm" fw={500}>{visit.snahId}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm">{visit.patientName}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm">{visit.physicianName}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm">{visit.departmentName}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm">{moment(visit.appointmentDate, "DD/MM/YYYY").format("MMM DD, YYYY")}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm">{visit.appointmentTime}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Badge color={getStatusBadgeColor(visit.status)} variant="filled" size="sm" >{visit.status}</Badge>
                            </Table.Td>
                            <Table.Td className="p-4">
                              {visit.status == "pending" && (
                                <Fragment>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300 mr-2"
                                    onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                    <IconInfoCircle size={14} />
                                  </ActionIcon>
                                  <Menu>
                                    <Menu.Target>
                                      <ActionIcon
                                        variant="light"
                                        color="indigo"
                                        size="md"
                                        className="hover:bg-blue-100 transition-all duration-300">
                                        <IconStatusChange size={14} />
                                      </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                      <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                      <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal("reject", visit); }}>Reject</Menu.Item>
                                      <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal("accept", visit); }}>Accept</Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                                </Fragment>
                              )}
                              {visit.status == "confirm" && (
                                <Fragment>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300 mr-2"
                                    onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                    <IconInfoCircle size={14} />
                                  </ActionIcon>
                                  <Menu>
                                    <Menu.Target>
                                      <ActionIcon
                                        variant="light"
                                        color="indigo"
                                        size="md"
                                        className="hover:bg-blue-100 transition-all duration-300">
                                        <IconStatusChange size={14} />
                                      </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                      <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                      <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => handleModal("cancel", visit)}>Cancel</Menu.Item>
                                      <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => handleModal("complete", visit)}>Complete</Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                                </Fragment>
                              )}
                              {visit.status == "cancel" && (
                                <Fragment>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300"
                                    onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                    <IconInfoCircle size={14} />
                                  </ActionIcon>
                                </Fragment>
                              )}
                              {visit.status == "complete" && (
                                <Fragment>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300 mr-2"
                                    onClick={() => handleDrawer("Under score id of: " + activeTab)}>
                                    <IconInfoCircle size={14} />
                                  </ActionIcon>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300"
                                    onClick={() => { handleModal("outPatient", visit); }}>
                                    <IconPlus size={14} />
                                  </ActionIcon>
                                </Fragment>
                              )}
                            </Table.Td>
                          </Table.Tr>
                        ))
                      ) : (
                        <Table.Tr>
                          <Table.Td colSpan={8} className="text-center py-8">
                            <Text size="lg" c="dimmed">No {tab.label.toLowerCase()} records found</Text>
                          </Table.Td>
                        </Table.Tr>
                      )}
                    </Table.Tbody>
                  </Table>
                </div>
              )}
            </Tabs.Panel>
          ))}
        </Tabs>
      </Card.Section>
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "lg",
            position: "right",
            size: "xxl",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: passComponentByMatch,
          title: "Detail",
        }}
      />
    </Fragment>
  );
};
