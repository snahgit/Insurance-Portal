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
import { PatientRideDetail } from "../detail/patient_all_records/PatientRideDetail";
import { convertVisitDataToCalendarData, filterVisitDataByDate } from "../../../../../../utility/calendarUtils";
import { updateCalendarDateData } from "../../../../../../redux/slices/pageTopBarAndFilterSlice";

interface Visit {
    id: string;
    bookingId: string;
    physicianName: string;
    hospitalName: string;
    department: string;
    type: "ride";
    pickup_address: string;
    destination: string;
    date: string;
    visitDate: string;
    time: string;
    service: string;
    status: string;
    driver: string;
}

const sampleRideData: Visit[] = [
    {
        id: "9",
        bookingId: "RIDE123456",
        physicianName: "Robert Wilson",
        hospitalName: "Medical Transport Plus",
        department: "Hospital Transfer",
        type: "ride",
        pickup_address: "123 Main St, Downtown",
        destination: "Medical Transport Plus",
        visitDate: "12/08/2025",
        date: "12/08/2025",
        time: "08:30 - 09:00",
        service: "Hospital Transfer",
        status: "Accepted",
        driver: "Robert Wilson",
    },
    {
        id: "10",
        bookingId: "RIDE789012",
        physicianName: "Robert Wilson",
        hospitalName: "Medical Transport Plus",
        department: "Hospital Transfer",
        type: "ride",
        pickup_address: "123 Main St, Downtown",
        destination: "Medical Transport Plus",
        visitDate: "18/08/2025",
        date: "18/08/2025",
        time: "08:30 - 09:00",
        service: "Hospital Transfer",
        status: "Completed",
        driver: "Robert Wilson",
    },
    {
        id: "11",
        bookingId: "RIDE345678",
        physicianName: "Jennifer Garcia",
        hospitalName: "Safe Ride Medical",
        department: "Clinic Transport",
        type: "ride",
        pickup_address: "456 Oak Ave, Uptown",
        destination: "Safe Ride Medical",
        visitDate: "23/08/2025",
        date: "23/08/2025",
        time: "16:00 - 16:30",
        service: "Clinic Transport",
        status: "Canceled",
        driver: "Jennifer Garcia",
    },
    {
        id: "12",
        bookingId: "RIDE901234",
        physicianName: "Michael Brown",
        hospitalName: "QuickCare Transport",
        department: "Emergency Transport",
        type: "ride",
        pickup_address: "789 Pine St, Midtown",
        destination: "QuickCare Transport",
        visitDate: "26/08/2025",
        date: "26/08/2025",
        time: "14:15 - 14:45",
        service: "Emergency Transport",
        status: "In Progress",
        driver: "Michael Brown",
    },
    {
        id: "13",
        bookingId: "RIDE567890",
        physicianName: "Sarah Davis",
        hospitalName: "Express Medical Transport",
        department: "Appointment Transport",
        type: "ride",
        pickup_address: "321 Elm Ave, Eastside",
        destination: "Express Medical Transport",
        visitDate: "29/08/2025",
        date: "29/08/2025",
        time: "11:00 - 11:30",
        service: "Appointment Transport",
        status: "Picking Up",
        driver: "Sarah Davis",
    },
];

export const PatientRideList = () => {
    const [apiData, setApiData] = useState<Visit[]>([]);
    const [filteredData, setFilteredData] = useState<Visit[]>([]);
    const [passComponentByMatch, setPassComponentByMatch] = useState<React.ReactNode>();
    const drawerApiRef = useRef<{ open: () => void } | null>(null);
    const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);
    const dispatch = useDispatch();
    const { requireSecurityCheck } = useSecurityCheck();

    const handleDrawer = (data: { type: string; data: any }) => {
        const originalAddAction = () => {
            if (data.type == "activityLog") {
                setPassComponentByMatch(
                    <PatientActivityLog dataPass={{ detailData: data.data }} />
                )
            } else if (data.type == "ride") {
                setPassComponentByMatch(
                    <PatientRideDetail dataPass={{ detailData: data.data }} />
                )
            }
            setTimeout(() => drawerApiRef.current?.open?.(), 0);
        };
        requireSecurityCheck(originalAddAction, "Add");
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Accepted":
                return "blue";
            case "Completed":
                return "green";
            case "Canceled":
                return "red";
            case "In Progress":
                return "orange";
            case "Picking Up":
                return "pink";
            default:
                return "gray";
        }
    };

    useEffect(() => {
        setApiData(sampleRideData);
        setFilteredData(sampleRideData);
        const calendarData = convertVisitDataToCalendarData(sampleRideData);
        dispatch(updateCalendarDateData({ tabType: 'userRide', dateData: calendarData }));
    }, [dispatch]);

    // Update calendar data when this tab becomes active
    useEffect(() => {
        if (topBarAndFilter.calendar.activeTab === 'userRide') {
            const calendarData = convertVisitDataToCalendarData(apiData);
            dispatch(updateCalendarDateData({ tabType: 'userRide', dateData: calendarData }));
        }
    }, [topBarAndFilter.calendar.activeTab, apiData, dispatch]);

    useEffect(() => {
        if (topBarAndFilter.filter.selectedDate && topBarAndFilter.calendar.activeTab === 'userRide') {
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
                                            color={getStatusBadgeColor(visit.status)}
                                            variant="filled"
                                            size="sm"
                                        >
                                            {visit.status}
                                        </Badge>
                                    </div>
                                    <div className="text-3xl mb-2">
                                        🚗
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
                                            {moment(visit.date, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                        </Text>
                                    </Group>
                                    <Group gap="xs" className="text-gray-600">
                                        <IconClock size={16} />
                                        <Text size="sm">{visit.time}</Text>
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
                                                onClick={() => handleDrawer({ data: visit, type: "ride" })}
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
                            emptyMessage="No ride services found"
                            loadingMessage="Loading ride services..."
                            onRetry={() => { }}
                        >
                            <Table.Thead className="">
                                <Table.Tr>
                                    <Table.Th className="text-center min-w-40 p-4">Booking ID</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Date</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Time</Table.Th>
                                    <Table.Th className="text-center min-w-40 p-4">Service</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Status</Table.Th>
                                    <Table.Th className="text-center min-w-40 p-4">Driver</Table.Th>
                                    <Table.Th className="text-center p-4">Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {filteredData.map((item: Visit, key: number) => (
                                    <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Table.Td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl">
                                                    🚗
                                                </span>
                                                <Text fw={600} size="sm">
                                                    {item.bookingId}
                                                </Text>
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">
                                                {moment(item.date, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{item.time}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{item.service}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Badge
                                                color={
                                                    item.status === "Completed"
                                                        ? "green"
                                                        : item.status === "In Progress"
                                                            ? "blue"
                                                            : item.status === "Cancelled"
                                                                ? "red"
                                                                : "yellow"
                                                }
                                                variant="filled"
                                            >
                                                {item.status}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{item.driver}</Text>
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
                                                        Ride Actions
                                                    </Menu.Label>
                                                    <Menu.Item
                                                        leftSection={<IconEye size={16} />}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                                        onClick={() => handleDrawer({ data: item, type: "ride" })}
                                                    >
                                                        <Text size="sm" fw={500}>View Details</Text>
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        leftSection={<IconActivity size={16} />}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                                        onClick={() => handleDrawer({ data: item, type: 'activityLog' })}
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
                        title: "No Ride Services Found",
                        description:
                            "There are currently no ride services to display. This could be because:",
                        reasons: [
                            "• No ride services have been booked yet",
                            "• All rides may have been completed",
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
                        size: "lg",
                        padding: "xl",
                        className: "overflow-y-auto",
                    },
                    component: passComponentByMatch,
                    title: (
                        <Group gap="sm">
                            <IconActivity size={20} />
                            <div>
                                <Text fw={600} size="lg">
                                    Ride Service Details
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
