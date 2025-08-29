import React, { Fragment, useEffect, useState, useRef } from "react";
import { Card, Text, Badge, Button, ActionIcon, Tooltip, Group, Table, Menu } from "@mantine/core";
import { IconCalendar, IconClock, IconMapPin, IconActivity, IconEye, IconDots } from "@tabler/icons-react";
import moment from "moment";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { PatientActivityLog } from "../detail/patient_all_records/PatientActivityLog";
import { PatientFacilityDetail } from "../detail/patient_all_records/PatientFacilityDetail";
import { convertVisitDataToCalendarData, filterVisitDataByDate } from "../../../../../../utility/calendarUtils";
import { updateCalendarDateData } from "../../../../../../redux/slices/pageTopBarAndFilterSlice";

interface Visit {
    id: string;
    bookingId: string;
    physicianName: string;
    hospitalName: string;
    appointmentTimeSlot: string;
    visitDate: string;
    department: string;
    claimStatus: "completed" | "accepted" | "cancel";
    type: "private";
}

const samplePrivateData: Visit[] = [
    {
        id: "1",
        bookingId: "SNMF212565",
        physicianName: "John MH (MF)",
        hospitalName: "UC Davis Medical Facility",
        appointmentTimeSlot: "15:50 - 16:05",
        visitDate: "05/08/2025",
        department: "Heart",
        claimStatus: "completed",
        type: "private",
    },
    {
        id: "2",
        bookingId: "SNMF267570",
        physicianName: "John MH (MF)",
        hospitalName: "UC Davis Medical Facility",
        appointmentTimeSlot: "11:20 - 11:35",
        visitDate: "05/08/2025",
        department: "Heart",
        claimStatus: "completed",
        type: "private",
    },
    {
        id: "3",
        bookingId: "SNMF345789",
        physicianName: "Dr. Sarah Wilson",
        hospitalName: "Metro Private Clinic",
        appointmentTimeSlot: "09:00 - 09:30",
        visitDate: "08/08/2025",
        department: "Cardiology",
        claimStatus: "completed",
        type: "private",
    },
    {
        id: "4",
        bookingId: "SNMF456890",
        physicianName: "Dr. Michael Brown",
        hospitalName: "Elite Medical Center",
        appointmentTimeSlot: "14:00 - 14:45",
        visitDate: "12/08/2025",
        department: "Neurology",
        claimStatus: "accepted",
        type: "private",
    },
    {
        id: "5",
        bookingId: "SNMF567901",
        physicianName: "Dr. Emily Davis",
        hospitalName: "Premium Health Clinic",
        appointmentTimeSlot: "10:30 - 11:15",
        visitDate: "18/08/2025",
        department: "Dermatology",
        claimStatus: "completed",
        type: "private",
    },
    {
        id: "6",
        bookingId: "SNMF678012",
        physicianName: "Dr. Robert Johnson",
        hospitalName: "Advanced Medical Practice",
        appointmentTimeSlot: "16:00 - 16:30",
        visitDate: "22/08/2025",
        department: "Orthopedics",
        claimStatus: "accepted",
        type: "private",
    },
    {
        id: "7",
        bookingId: "SNMF789123",
        physicianName: "Dr. Lisa Martinez",
        hospitalName: "Specialized Care Center",
        appointmentTimeSlot: "13:15 - 14:00",
        visitDate: "26/08/2025",
        department: "Endocrinology",
        claimStatus: "completed",
        type: "private",
    },
    {
        id: "8",
        bookingId: "SNMF890234",
        physicianName: "Dr. Kevin Thompson",
        hospitalName: "Premier Medical Group",
        appointmentTimeSlot: "08:30 - 09:00",
        visitDate: "05/08/2025",
        department: "Cardiology",
        claimStatus: "accepted",
        type: "private",
    },
    {
        id: "9",
        bookingId: "SNMF901345",
        physicianName: "Dr. Amanda White",
        hospitalName: "Elite Health Center",
        appointmentTimeSlot: "17:00 - 17:30",
        visitDate: "12/08/2025",
        department: "Pediatrics",
        claimStatus: "completed",
        type: "private",
    },
];

export const PatientPrivateList = () => {
    const [apiData, setApiData] = useState<Visit[]>([]);
    const [filteredData, setFilteredData] = useState<Visit[]>([]);
    const [passComponentByMatch, setPassComponentByMatch] = useState<React.ReactNode>();
    const drawerApiRef = useRef<{ open: () => void } | null>(null);

    const dispatch = useDispatch();
    const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);

    const { requireSecurityCheck } = useSecurityCheck();

    const handleDrawer = (data: { type: string; data: any }) => {
        const originalAddAction = () => {
            if (data.type == "activityLog") {
                setPassComponentByMatch(
                    <PatientActivityLog dataPass={{ detailData: data.data }} />
                )
            } else if (data.type == "private") {
                setPassComponentByMatch(
                    <PatientFacilityDetail dataPass={{ detailData: data.data }} />
                )
            }
            setTimeout(() => drawerApiRef.current?.open?.(), 0);
        };
        requireSecurityCheck(originalAddAction, "Add");
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "completed":
                return "green";
            case "accepted":
                return "blue";
            case "cancel":
                return "red";
            default:
                return "gray";
        }
    };

    useEffect(() => {
        setApiData(samplePrivateData);
        setFilteredData(samplePrivateData);
        const calendarData = convertVisitDataToCalendarData(samplePrivateData);
        dispatch(updateCalendarDateData({ tabType: 'userPrivate', dateData: calendarData }));
    }, [dispatch]);

    // Update calendar data when this tab becomes active
    useEffect(() => {
        if (topBarAndFilter.calendar.activeTab === 'userPrivate') {
            const calendarData = convertVisitDataToCalendarData(apiData);
            dispatch(updateCalendarDateData({ tabType: 'userPrivate', dateData: calendarData }));
        }
    }, [topBarAndFilter.calendar.activeTab, apiData, dispatch]);

    useEffect(() => {
        if (topBarAndFilter.filter.selectedDate && topBarAndFilter.calendar.activeTab === "userPrivate") {
            const filtered = filterVisitDataByDate(apiData, topBarAndFilter.filter.selectedDate);
            setFilteredData(filtered);
        } else {
            setFilteredData(apiData);
        }
    }, [topBarAndFilter.filter.selectedDate, topBarAndFilter.calendar.activeTab, apiData]);

    return (
        <Fragment>
            {filteredData.length > 0 ? (
                topBarAndFilter.viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-0 py-4">
                        {filteredData.map((visit: Visit, key: number) => (
                            <Card
                                key={key}
                                withBorder
                                shadow="md"
                                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                            >
                                <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                                    <div className="flex justify-between items-start mb-2">
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            className="bg-white px-2 py-1 rounded-full"
                                        >
                                            {visit.bookingId}
                                        </Text>
                                        <Badge
                                            color={getStatusBadgeColor(visit.claimStatus)}
                                            variant="filled"
                                            size="sm"
                                        >
                                            {visit.claimStatus}
                                        </Badge>
                                    </div>
                                    <div className="text-3xl mb-2">
                                        👨‍⚕️
                                    </div>
                                    <Text fw={600} size="lg" mb="xs">
                                        {visit.physicianName}
                                    </Text>
                                    <Text size="sm" c="dimmed" mb="xs">
                                        {visit.hospitalName}
                                    </Text>
                                </Card.Section>

                                <div className="p-4 space-y-3">
                                    <Group gap="xs" className="text-gray-600">
                                        <IconCalendar size={16} />
                                        <Text size="sm">
                                            {moment(visit.visitDate, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                        </Text>
                                    </Group>
                                    <Group gap="xs" className="text-gray-600">
                                        <IconClock size={16} />
                                        <Text size="sm">{visit.appointmentTimeSlot}</Text>
                                    </Group>
                                    <Group gap="xs" className="text-gray-600">
                                        <IconMapPin size={16} />
                                        <Text size="sm">{visit.department}</Text>
                                    </Group>

                                    <div className="flex space-x-2 pt-2">
                                        <Tooltip label="View Details">
                                            <Button
                                                variant="light"
                                                size="sm"
                                                leftSection={<IconEye size={16} />}
                                                onClick={() => handleDrawer({ data: visit, type: "private" })}
                                                className="flex-1"
                                            >
                                                Details
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label="Activity Log">
                                            <ActionIcon
                                                variant="filled"
                                                color="blue"
                                                size="lg"
                                                onClick={() => handleDrawer({ data: visit, type: 'activityLog' })}
                                            >
                                                <IconActivity size={16} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto p-4">
                        <PageTableWrapper
                            isLoading={false}
                            error={null}
                            isEmpty={false}
                            emptyMessage="No private practice visits found"
                            loadingMessage="Loading private practice visits..."
                            onRetry={() => { }}
                        >
                            <Table.Thead className="">
                                <Table.Tr>
                                    <Table.Th className="text-center min-w-40 p-4">Booking ID</Table.Th>
                                    <Table.Th className="text-center min-w-40 p-4">Physician Name</Table.Th>
                                    <Table.Th className="text-center min-w-52 p-4">Hospital Name</Table.Th>
                                    <Table.Th className="text-center min-w-44 p-4">Appointment Time</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Visit Date</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Department</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Claim Status</Table.Th>
                                    <Table.Th className="text-center p-4">Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {filteredData.map((visit: Visit, key: number) => (
                                    <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Table.Td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl">
                                                    👨‍⚕️
                                                </span>
                                                <Text fw={600} size="sm">
                                                    {visit.bookingId}
                                                </Text>
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm" fw={500}>
                                                {visit.physicianName}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{visit.hospitalName}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{visit.appointmentTimeSlot}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">
                                                {moment(visit.visitDate, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{visit.department}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Badge
                                                color={getStatusBadgeColor(visit.claimStatus)}
                                                variant="filled"
                                            >
                                                {visit.claimStatus}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Menu
                                                shadow="md"
                                                width={200}
                                                trigger="hover"
                                                openDelay={100}
                                                closeDelay={400}
                                            >
                                                <Menu.Target>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="blue"
                                                        size="md"
                                                        className="hover:bg-blue-100 transition-all duration-300"
                                                    >
                                                        <IconDots size={16} />
                                                    </ActionIcon>
                                                </Menu.Target>
                                                <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                                    <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                                        Visit Actions
                                                    </Menu.Label>
                                                    <Menu.Item
                                                        leftSection={<IconEye size={16} />}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                                        onClick={() => handleDrawer({ data: visit, type: "private" })}
                                                    >
                                                        <Text size="sm" fw={500}>View Details</Text>
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        leftSection={<IconActivity size={16} />}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                                        onClick={() => handleDrawer({ data: visit, type: 'activityLog' })}
                                                    >
                                                        <Text size="sm" fw={500}>Activity Log</Text>
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </PageTableWrapper>
                    </div>
                )
            ) : (
                <PageNoDataFound
                    dataPass={{
                        title: "No Private Practice Visits Found",
                        description:
                            "There are currently no private practice visits to display. This could be because:",
                        reasons: [
                            "• No private practice visits have been created yet",
                            "• All visits may have been archived",
                            "• There might be a connectivity issue",
                        ],
                    }}
                />
            )}
            <PageDrawer
                onOpenReady={(api: any) => {
                    drawerApiRef.current = api;
                }}
                dataPass={{
                    drawerConfig: {
                        offset: 8,
                        radius: "md",
                        position: "right",
                        size: "xxl",
                        padding: "xl",
                        className: "overflow-y-auto",
                    },
                    component: passComponentByMatch,
                    title: (
                        <Group gap="sm">
                            <IconActivity size={20} />
                            <div>
                                <Text fw={600} size="lg">
                                    Private Practice Visit Details
                                </Text>
                                <Text size="sm" className="text-gray-600">
                                    Detailed Information
                                </Text>
                            </div>
                        </Group>
                    ),
                }}
            />
        </Fragment>
    );
};
