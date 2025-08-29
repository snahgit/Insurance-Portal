import React, { Fragment, useEffect, useState, useRef } from "react";
import { Card, Text, Badge, Button, ActionIcon, Tooltip, Group, Table, Menu } from "@mantine/core";
import { IconCalendar, IconClock, IconActivity, IconEye, IconDots, IconHeartbeat } from "@tabler/icons-react";
import moment from "moment";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { MemberActivityLog } from "../detail/member_all_records/MemberActivityLog";
import { MemberTreatmentDetail } from "../detail/member_all_records/MemberTreatmentDetail";

interface Visit {
    id: string;
    bookingId: string;
    physicianName: string;
    hospitalName: string;
    appointmentTimeSlot: string;
    visitDate: string;
    department: string;
    claimStatus: "completed" | "accepted" | "cancel";
    type: "treatment";
    treatmentType: string;
    procedure: string;
    duration: string;
    doctor: string;
    followUpRequired: boolean;
    treatmentCost: string;
}

const sampleTreatmentData: Visit[] = [
    {
        id: "14",
        bookingId: "TREAT123456",
        physicianName: "Dr. Sarah Johnson",
        hospitalName: "Metro Medical Center",
        appointmentTimeSlot: "09:00 - 12:00",
        visitDate: "29/05/2023",
        department: "Surgery",
        claimStatus: "completed",
        type: "treatment",
        treatmentType: "Surgical",
        procedure: "Arthroscopic Knee Surgery",
        duration: "3 hours",
        doctor: "Dr. Sarah Johnson",
        followUpRequired: true,
        treatmentCost: "$3,500",
    },
    {
        id: "15",
        bookingId: "TREAT789012",
        physicianName: "Dr. Michael Brown",
        hospitalName: "City Hospital",
        appointmentTimeSlot: "14:00 - 16:00",
        visitDate: "30/05/2023",
        department: "Cardiology",
        claimStatus: "accepted",
        type: "treatment",
        treatmentType: "Non-Surgical",
        procedure: "Cardiac Catheterization",
        duration: "2 hours",
        doctor: "Dr. Michael Brown",
        followUpRequired: true,
        treatmentCost: "$2,800",
    },
    {
        id: "16",
        bookingId: "TREAT345678",
        physicianName: "Dr. Lisa Davis",
        hospitalName: "Wellness Clinic",
        appointmentTimeSlot: "10:00 - 11:30",
        visitDate: "31/05/2023",
        department: "Physical Therapy",
        claimStatus: "completed",
        type: "treatment",
        treatmentType: "Rehabilitation",
        procedure: "Physical Therapy Session",
        duration: "1.5 hours",
        doctor: "Dr. Lisa Davis",
        followUpRequired: false,
        treatmentCost: "$150",
    },
];

export const MemberTreatmentList = () => {
    const [apiData, setApiData] = useState<Visit[]>([]);
    const [passComponentByMatch, setPassComponentByMatch] = useState<React.ReactNode>();
    const drawerApiRef = useRef<{ open: () => void } | null>(null);

    const { requireSecurityCheck } = useSecurityCheck();
    const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);

    const handleDrawer = (data: { type: string; data: any }) => {
        const originalAddAction = () => {
            if (data.type == "activityLog") {
                setPassComponentByMatch(
                    <MemberActivityLog dataPass={{ detailData: data.data }} />
                )
            } else if (data.type == "treatment") {
                setPassComponentByMatch(
                    <MemberTreatmentDetail dataPass={{ detailData: data.data }} />
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
        setApiData(sampleTreatmentData);
    }, []);

    return (
        <Fragment>
            {apiData.length > 0 ? (
                topBarAndFilter.viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-0 py-4">
                        {apiData.map((visit: Visit, key: number) => (
                            <Card
                                key={key}
                                withBorder
                                shadow="md"
                                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                            >
                                <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
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
                                        🏥
                                    </div>
                                    <Text fw={600} size="lg" mb="xs">
                                        {visit.procedure}
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
                                        <Text size="sm">{visit.duration}</Text>
                                    </Group>
                                    <Group gap="xs" className="text-gray-600">
                                        <IconHeartbeat size={16} />
                                        <Text size="sm">{visit.doctor}</Text>
                                    </Group>
                                    {/* <div className="flex justify-between items-center">
                                        <Badge
                                            color={getTreatmentTypeColor(visit.treatmentType)}
                                            variant="light"
                                            size="sm"
                                        >
                                            {visit.treatmentType}
                                        </Badge>
                                        <Text size="sm" fw={600} className="text-green-600">
                                            {visit.treatmentCost}
                                        </Text>
                                    </div> */}
                                    {/* {visit.followUpRequired && (
                                        <Badge
                                            color="orange"
                                            variant="light"
                                            size="xs"
                                            className="w-full"
                                        >
                                            Follow-up Required
                                        </Badge>
                                    )} */}

                                    <div className="flex space-x-2 pt-2">
                                        <Tooltip label="View Details">
                                            <Button
                                                variant="light"
                                                size="sm"
                                                leftSection={<IconEye size={16} />}
                                                onClick={() => handleDrawer({ data: visit, type: "treatment" })}
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
                            emptyMessage="No treatments found"
                            loadingMessage="Loading treatments..."
                            onRetry={() => { }}
                        >
                            <Table.Thead className="">
                                <Table.Tr>
                                    <Table.Th className="text-center min-w-40 p-4">Booking ID</Table.Th>
                                    <Table.Th className="text-center min-w-52 p-4">Procedure</Table.Th>
                                    <Table.Th className="text-center min-w-52 p-4">Hospital</Table.Th>
                                    <Table.Th className="text-center min-w-40 p-4">Doctor</Table.Th>
                                    <Table.Th className="text-center min-w-32 p-4">Date</Table.Th>
                                    {/* <Table.Th className="text-center min-w-32 p-4">Duration</Table.Th> */}
                                    {/* <Table.Th className="text-center min-w-40 p-4">Type</Table.Th> */}
                                    {/* <Table.Th className="text-center min-w-32 p-4">Cost</Table.Th> */}
                                    {/* <Table.Th className="text-center min-w-40 p-4">Follow-up</Table.Th> */}
                                    <Table.Th className="text-center min-w-32 p-4">Status</Table.Th>
                                    <Table.Th className="text-center p-4">Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {apiData.map((visit: Visit, key: number) => (
                                    <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Table.Td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl">
                                                    🏥
                                                </span>
                                                <Text fw={600} size="sm">
                                                    {visit.bookingId}
                                                </Text>
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm" fw={500}>
                                                {visit.procedure}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{visit.hospitalName}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">{visit.doctor}</Text>
                                        </Table.Td>
                                        <Table.Td className="p-4">
                                            <Text size="sm">
                                                {moment(visit.visitDate, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                            </Text>
                                        </Table.Td>
                                        {/* <Table.Td className="p-4">
                                            <Text size="sm">{visit.duration}</Text>
                                        </Table.Td> */}
                                        {/* <Table.Td className="p-4">
                                            <Badge
                                                color={getTreatmentTypeColor(visit.treatmentType)}
                                                variant="light"
                                                size="xs"
                                            >
                                                {visit.treatmentType}
                                            </Badge>
                                        </Table.Td> */}
                                        {/* <Table.Td className="p-4">
                                            <Text size="sm" fw={500} className="text-green-600">
                                                {visit.treatmentCost}
                                            </Text>
                                        </Table.Td> */}
                                        {/* <Table.Td className="p-4">
                                            {visit.followUpRequired ? (
                                                <Badge
                                                    color="orange"
                                                    variant="light"
                                                    size="xs"
                                                >
                                                    Required
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    color="gray"
                                                    variant="light"
                                                    size="xs"
                                                >
                                                    Not Required
                                                </Badge>
                                            )}
                                        </Table.Td> */}
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
                                                        Treatment Actions
                                                    </Menu.Label>
                                                    <Menu.Item
                                                        leftSection={<IconEye size={16} />}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                                        onClick={() => handleDrawer({ data: visit, type: "treatment" })}
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
                        title: "No Treatments Found",
                        description:
                            "There are currently no treatments to display. This could be because:",
                        reasons: [
                            "• No treatments have been scheduled yet",
                            "• All treatments may have been completed",
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
                            <IconHeartbeat size={20} />
                            <div>
                                <Text fw={600} size="lg">
                                    Treatment Details
                                </Text>
                                <Text size="sm" className="text-gray-600">
                                    Medical Treatment Information
                                </Text>
                            </div>
                        </Group>
                    ),
                }}
            />
        </Fragment>
    );
};
