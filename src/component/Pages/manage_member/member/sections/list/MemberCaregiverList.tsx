import React, { Fragment, useEffect, useState, useRef } from "react";
import { Card, Text, Badge, Button, ActionIcon, Tooltip, Group, Table, Menu } from "@mantine/core";
import { IconCalendar, IconClock, IconMapPin, IconActivity, IconEye, IconDots } from "@tabler/icons-react";
import moment from "moment";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { MemberActivityLog } from "../detail/member_all_records/MemberActivityLog";
import { MemberCaregiverDetail } from "../detail/member_all_records/MemberCaregiverDetail";
import { updateCalendarDateData } from "../../../../../../redux/slices/pageTopBarAndFilterSlice";
import { convertVisitDataToCalendarData, filterVisitDataByDate } from "../../../../../../utility/calendarUtils";

interface Visit {
    id: string;
    bookingId: string;
    physicianName: string;
    hospitalName: string;
    appointmentTimeSlot: string;
    visitDate: string;
    department: string;
    status: "completed" | "accepted" | "cancel";
    type: "caregiver";
}

const sampleCaregiverData: Visit[] = [
    {
        id: "7",
        bookingId: "CARE123456",
        physicianName: "Sarah Johnson, RN",
        hospitalName: "Premium Care Services",
        appointmentTimeSlot: "10:00 - 12:00",
        visitDate: "02/05/2023",
        department: "Home Nursing",
        status: "completed",
        type: "caregiver",
    },
    {
        id: "8",
        bookingId: "CARE789012",
        physicianName: "Michael Davis, CNA",
        hospitalName: "Elite Home Care",
        appointmentTimeSlot: "14:00 - 18:00",
        visitDate: "02/05/2023",
        department: "Personal Care",
        status: "accepted",
        type: "caregiver",
    },
    {
        id: "9",
        bookingId: "CARE345678",
        physicianName: "Emily Wilson, RN",
        hospitalName: "Comfort Care Services",
        appointmentTimeSlot: "09:00 - 11:00",
        visitDate: "05/08/2025",
        department: "Medical Care",
        status: "completed",
        type: "caregiver",
    },
    {
        id: "10",
        bookingId: "CARE901234",
        physicianName: "Robert Brown, CNA",
        hospitalName: "Quality Home Care",
        appointmentTimeSlot: "16:00 - 20:00",
        visitDate: "10/08/2025",
        department: "Personal Care",
        status: "accepted",
        type: "caregiver",
    },
    {
        id: "11",
        bookingId: "CARE567890",
        physicianName: "Lisa Martinez, RN",
        hospitalName: "Excellence Care",
        appointmentTimeSlot: "08:00 - 12:00",
        visitDate: "15/08/2025",
        department: "Home Nursing",
        status: "completed",
        type: "caregiver",
    },
    {
        id: "12",
        bookingId: "CARE246810",
        physicianName: "James Anderson, CNA",
        hospitalName: "Premier Care Solutions",
        appointmentTimeSlot: "13:00 - 17:00",
        visitDate: "20/08/2025",
        department: "Medical Care",
        status: "accepted",
        type: "caregiver",
    },
    {
        id: "13",
        bookingId: "CARE135792",
        physicianName: "Maria Garcia, RN",
        hospitalName: "Superior Home Care",
        appointmentTimeSlot: "11:00 - 15:00",
        visitDate: "25/08/2025",
        department: "Personal Care",
        status: "completed",
        type: "caregiver",
    },
    {
        id: "14",
        bookingId: "CARE468024",
        physicianName: "David Thompson, CNA",
        hospitalName: "Elite Medical Care",
        appointmentTimeSlot: "07:00 - 11:00",
        visitDate: "28/08/2025",
        department: "Home Nursing",
        status: "accepted",
        type: "caregiver",
    },
    {
        id: "15",
        bookingId: "CARE792468",
        physicianName: "Jennifer Lee, RN",
        hospitalName: "Advanced Care Services",
        appointmentTimeSlot: "15:00 - 19:00",
        visitDate: "30/08/2025",
        department: "Medical Care",
        status: "completed",
        type: "caregiver",
    },
];

export const MemberCaregiverList = () => {
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
                    <MemberActivityLog dataPass={{ detailData: data.data }} />
                )
            } else if (data.type == "caregiver") {
                setPassComponentByMatch(
                    <MemberCaregiverDetail dataPass={{ detailData: data.data }} />
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
        setApiData(sampleCaregiverData);
        setFilteredData(sampleCaregiverData);
        const calendarData = convertVisitDataToCalendarData(sampleCaregiverData);
        dispatch(updateCalendarDateData({ tabType: 'userCaregiver', dateData: calendarData }));
    }, [dispatch]);
    
    // Update calendar data when this tab becomes active
    useEffect(() => {
        if (topBarAndFilter.calendar.activeTab === 'userCaregiver') {
            const calendarData = convertVisitDataToCalendarData(apiData);
            dispatch(updateCalendarDateData({ tabType: 'userCaregiver', dateData: calendarData }));
        }
    }, [topBarAndFilter.calendar.activeTab, apiData, dispatch]);
    
    useEffect(() => {
        if (topBarAndFilter.filter.selectedDate && topBarAndFilter.calendar.activeTab === "userCaregiver") {
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
                                        👩‍⚕️
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
                                                onClick={() => handleDrawer({ data: visit, type: "caregiver" })}
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
                            emptyMessage="No caregiver services found"
                            loadingMessage="Loading caregiver services..."
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
                                                    👩‍⚕️
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
                                                color={getStatusBadgeColor(visit.status)}
                                                variant="filled"
                                            >
                                                {visit.status}
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
                                                        onClick={() => handleDrawer({ data: visit, type: "caregiver" })}
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
                        title: "No Caregiver Services Found",
                        description:
                            "There are currently no caregiver services to display. This could be because:",
                        reasons: [
                            "• No caregiver services have been scheduled yet",
                            "• All services may have been completed",
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
                        size: "md",
                        padding: "xl",
                        className: "overflow-y-auto",
                    },
                    component: passComponentByMatch,
                    title: (
                        <Group gap="sm">
                            <IconActivity size={20} />
                            <div>
                                <Text fw={600} size="lg">
                                    Caregiver Service Details
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
