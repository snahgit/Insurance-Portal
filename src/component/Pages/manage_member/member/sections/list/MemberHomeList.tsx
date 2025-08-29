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
import { MemberFacilityDetail } from "../detail/member_all_records/MemberFacilityDetail";
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
    claimStatus: "completed" | "accepted" | "cancel";
    type: "home";
}

const sampleHomeData: Visit[] = [
    {
        id: "3",
        bookingId: "HOME123456",
        physicianName: "Dr. Jane Smith",
        hospitalName: "Home Healthcare Services",
        appointmentTimeSlot: "10:00 - 10:30",
        visitDate: "18/04/2023",
        department: "General Care",
        claimStatus: "completed",
        type: "home",
    },
    {
        id: "4",
        bookingId: "HOME789012",
        physicianName: "Nurse John Doe",
        hospitalName: "Home Nursing Care",
        appointmentTimeSlot: "16:00 - 16:30",
        visitDate: "22/04/2023",
        department: "Wound Care",
        claimStatus: "accepted",
        type: "home",
    },
    {
        id: "5",
        bookingId: "HOME345678",
        physicianName: "Dr. Maria Rodriguez",
        hospitalName: "Elite Home Healthcare",
        appointmentTimeSlot: "09:00 - 10:00",
        visitDate: "03/08/2025",
        department: "Physical Therapy",
        claimStatus: "completed",
        type: "home",
    },
    {
        id: "6",
        bookingId: "HOME901234",
        physicianName: "Nurse Patricia Wilson",
        hospitalName: "Comfort Home Care",
        appointmentTimeSlot: "14:00 - 15:30",
        visitDate: "07/08/2025",
        department: "Medication Management",
        claimStatus: "accepted",
        type: "home",
    },
    {
        id: "7",
        bookingId: "HOME567890",
        physicianName: "Dr. Kevin Brown",
        hospitalName: "Premier Home Services",
        appointmentTimeSlot: "11:00 - 12:30",
        visitDate: "14/08/2025",
        department: "Diabetes Care",
        claimStatus: "completed",
        type: "home",
    },
    {
        id: "8",
        bookingId: "HOME246810",
        physicianName: "Nurse Amanda Garcia",
        hospitalName: "Quality Home Health",
        appointmentTimeSlot: "15:00 - 16:00",
        visitDate: "19/08/2025",
        department: "Blood Pressure Monitoring",
        claimStatus: "accepted",
        type: "home",
    },
    {
        id: "9",
        bookingId: "HOME135792",
        physicianName: "Dr. Thomas Anderson",
        hospitalName: "Advanced Home Care",
        appointmentTimeSlot: "08:00 - 09:30",
        visitDate: "24/08/2025",
        department: "Post-Surgery Care",
        claimStatus: "completed",
        type: "home",
    },
    {
        id: "10",
        bookingId: "HOME468024",
        physicianName: "Nurse Jennifer Lee",
        hospitalName: "Specialized Home Healthcare",
        appointmentTimeSlot: "13:00 - 14:30",
        visitDate: "29/08/2025",
        department: "Elderly Care",
        claimStatus: "accepted",
        type: "home",
    },
];

export const MemberHomeList = () => {
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
            } else if (data.type == "home") {
                setPassComponentByMatch(
                    <MemberFacilityDetail dataPass={{ detailData: data.data }} />
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
        setApiData(sampleHomeData);
        setFilteredData(sampleHomeData);
        const calendarData = convertVisitDataToCalendarData(sampleHomeData);
        dispatch(updateCalendarDateData({ tabType: 'userHome', dateData: calendarData }));
    }, [dispatch]);
    
    // Update calendar data when this tab becomes active
    useEffect(() => {
        if (topBarAndFilter.calendar.activeTab === 'userHome') {
            const calendarData = convertVisitDataToCalendarData(apiData);
            dispatch(updateCalendarDateData({ tabType: 'userHome', dateData: calendarData }));
        }
    }, [topBarAndFilter.calendar.activeTab, apiData, dispatch]);
    
    useEffect(() => {
        if (topBarAndFilter.filter.selectedDate && topBarAndFilter.calendar.activeTab === "userHome") {
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
                                        🏠
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
                                                onClick={() => handleDrawer({ data: visit, type: "home" })}
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
                            emptyMessage="No home healthcare visits found"
                            loadingMessage="Loading home healthcare visits..."
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
                                                    🏠
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
                                                        onClick={() => handleDrawer({ data: visit, type: "home" })}
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
                        title: "No Home Healthcare Visits Found",
                        description:
                            "There are currently no home healthcare visits to display. This could be because:",
                        reasons: [
                            "• No home healthcare visits have been created yet",
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
                                    Home Healthcare Visit Details
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
