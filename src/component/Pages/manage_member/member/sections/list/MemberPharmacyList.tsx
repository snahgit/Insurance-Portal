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
import { MemberPharmacyDetail } from "../detail/member_all_records/MemberPharmacyDetail";
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
    type: "pharmacy";
}

const samplePharmacyData: Visit[] = [
    {
        id: "5",
        bookingId: "PHARM123456",
        physicianName: "Dr. Maria Rodriguez",
        hospitalName: "City Pharmacy",
        appointmentTimeSlot: "14:00 - 14:15",
        visitDate: "10/08/2025",
        department: "Medication Pickup",
        claimStatus: "completed",
        type: "pharmacy",
    },
    {
        id: "6",
        bookingId: "PHARM789012",
        physicianName: "Dr. Lisa Chen",
        hospitalName: "Health Plus Pharmacy",
        appointmentTimeSlot: "09:30 - 09:45",
        visitDate: "15/08/2025",
        department: "Prescription Review",
        claimStatus: "accepted",
        type: "pharmacy",
    },
    {
        id: "7",
        bookingId: "PHARM345678",
        physicianName: "Dr. James Wilson",
        hospitalName: "MediCare Pharmacy",
        appointmentTimeSlot: "11:00 - 11:15",
        visitDate: "20/08/2025",
        department: "Medication Consultation",
        claimStatus: "completed",
        type: "pharmacy",
    },
    {
        id: "8",
        bookingId: "PHARM901234",
        physicianName: "Dr. Sarah Thompson",
        hospitalName: "Express Pharmacy",
        appointmentTimeSlot: "16:30 - 16:45",
        visitDate: "22/08/2025",
        department: "Prescription Refill",
        claimStatus: "accepted",
        type: "pharmacy",
    },
    {
        id: "9",
        bookingId: "PHARM567890",
        physicianName: "Dr. Michael Brown",
        hospitalName: "Community Pharmacy",
        appointmentTimeSlot: "13:15 - 13:30",
        visitDate: "25/08/2025",
        department: "Drug Interaction Check",
        claimStatus: "cancel",
        type: "pharmacy",
    },
    {
        id: "10",
        bookingId: "PHARM234567",
        physicianName: "Dr. Emily Davis",
        hospitalName: "Wellness Pharmacy",
        appointmentTimeSlot: "10:45 - 11:00",
        visitDate: "28/08/2025",
        department: "Vaccination",
        claimStatus: "completed",
        type: "pharmacy",
    },
];

export const MemberPharmacyList = () => {
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
                    <MemberActivityLog dataPass={{ detailData: data.data }} />
                )
            } else if (data.type == "pharmacy") {
                setPassComponentByMatch(
                    <MemberPharmacyDetail dataPass={{ detailData: data.data }} />
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
        setApiData(samplePharmacyData);
        setFilteredData(samplePharmacyData);
        const calendarData = convertVisitDataToCalendarData(samplePharmacyData);
        dispatch(updateCalendarDateData({ tabType: 'userPharmacy', dateData: calendarData }));
    }, [dispatch]);
    
    // Update calendar data when this tab becomes active
    useEffect(() => {
        if (topBarAndFilter.calendar.activeTab === 'userPharmacy') {
            const calendarData = convertVisitDataToCalendarData(apiData);
            dispatch(updateCalendarDateData({ tabType: 'userPharmacy', dateData: calendarData }));
        }
    }, [topBarAndFilter.calendar.activeTab, apiData, dispatch]);
    
    useEffect(() => {
        if (topBarAndFilter.filter.selectedDate && topBarAndFilter.calendar.activeTab === 'userPharmacy') {
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
                                        💊
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
                                                onClick={() => handleDrawer({ data: visit, type: "pharmacy" })}
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
                            emptyMessage="No pharmacy visits found"
                            loadingMessage="Loading pharmacy visits..."
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
                                                    💊
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
                                                        onClick={() => handleDrawer({ data: visit, type: "pharmacy" })}
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
                        title: "No Pharmacy Visits Found",
                        description:
                            "There are currently no pharmacy visits to display. This could be because:",
                        reasons: [
                            "• No pharmacy visits have been created yet",
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
                        size: "xl",
                        padding: "xl",
                        className: "overflow-y-auto",
                    },
                    component: passComponentByMatch,
                    title: (
                        <Group gap="sm">
                            <IconActivity size={20} />
                            <div>
                                <Text fw={600} size="lg">
                                    Pharmacy Visit Details
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
