import { ActionIcon, Box, Grid, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconBrandBooking, IconEye, IconPrescription } from "@tabler/icons-react";
import { Fragment, useRef } from "react";
import { PageDrawer } from "../../../../../../common/PageDrawer";
import { useSecurityCheck } from "../../../../../../../context/SecurityCheckContext";
import { MemberFacilityReportDetail } from "./MemberFacilityReportDetail";

export const MemberFacilityDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;
    const drawerApiRef = useRef<{ open: () => void } | null>(null);
    const { requireSecurityCheck } = useSecurityCheck();
    const handleDrawer = (_data: string) => {
        const originalAddAction = () => {
            if (drawerApiRef.current) {
                drawerApiRef.current.open();
            }
        };
        requireSecurityCheck(originalAddAction, "Add");
    };
    return (
        <Fragment>
            <div className="bg-gray-50 min-h-screen">
                <Stack gap="xl" className="pb-6">
                    <Grid>
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <Paper
                                shadow="sm"
                                radius="lg"
                                className="bg-emerald-50 border border-gray-200 overflow-hidden h-full"
                            >
                                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4">
                                    <Group gap="sm">
                                        <IconBrandBooking size={24} className="text-white" />
                                        <Text size="lg" className="text-white font-bold">BOOKING INFO</Text>
                                    </Group>
                                </div>
                                <div className="p-6">
                                    <Grid>
                                        <Grid.Col span={6}>
                                            <Stack gap="xs">
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Booking SNAH ID</Text>
                                                    <Text fw={500} className="text-sm">SNMF212565</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Booking Type</Text>
                                                    <Text fw={500} className="text-sm">virtual</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Department</Text>
                                                    <Text fw={500} className="text-sm">Heart</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Consultation Purpose</Text>
                                                    <Text fw={500} className="text-sm">Mk W</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Description</Text>
                                                    <Text fw={500} className="text-sm">Mk E</Text>
                                                </div>
                                            </Stack>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Stack gap="xs">
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Booking Date</Text>
                                                    <Text fw={500} className="text-sm">12/04/2023</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Time</Text>
                                                    <Text fw={500} className="text-sm">15:50 - 16:05</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Booking Status</Text>
                                                    <Text fw={500} className="text-sm">{detailData.claimStatus}</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Physician Name</Text>
                                                    <Text fw={500} className="text-sm">John MH (MF)</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Booking Via</Text>
                                                    <Text fw={500} className="text-sm">user app</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Medical Issue</Text>
                                                    <Text fw={500} className="text-sm">Mk Q</Text>
                                                </div>
                                            </Stack>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <Paper
                                shadow="sm"
                                radius="lg"
                                className="bg-blue-50 border border-gray-200 overflow-hidden h-full"
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                                    <Group gap="sm">
                                        <IconPrescription size={24} className="text-white" />
                                        <Text size="lg" className="text-white font-bold">PRESCRIPTION INFO</Text>
                                    </Group>
                                </div>
                                <div className="p-6">
                                    <Grid>
                                        <Grid.Col span={6}>
                                            <Stack gap="md">
                                                <div>
                                                    <Text size="sm" className="text-gray-600">SNAH Id</Text>
                                                    <Text fw={500} className="text-sm">MFPREE000947</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Status</Text>
                                                    <Text fw={500} className="text-sm">Pending</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">NDC Numbers</Text>
                                                    <Text fw={500} className="text-sm">NDA1232</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Prescription Notes</Text>
                                                    <Text fw={500} className="text-sm">SNMXASA</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Prescription File</Text>
                                                    <Text fw={500} className="text-sm">File</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Prescribed By</Text>
                                                    <Text fw={500} className="text-sm">John MH (MF)</Text>
                                                </div>
                                            </Stack>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Stack gap="md">
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Physician</Text>
                                                    <Text fw={500} className="text-sm">John william</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">NDC Pres Reason</Text>
                                                    <Text fw={500} className="text-sm">Test</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Pharmacy Name</Text>
                                                    <Text fw={500} className="text-sm">Test</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Pharmacy DEA</Text>
                                                    <Text fw={500} className="text-sm">Test</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Pharmacy Note</Text>
                                                    <Text fw={500} className="text-sm">Test</Text>
                                                </div>
                                                <div>
                                                    <Text size="sm" className="text-gray-600">Additional Notes</Text>
                                                    <Text fw={500} className="text-sm">Test</Text>
                                                </div>
                                            </Stack>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                            <Paper
                                shadow="sm"
                                radius="lg"
                                className="bg-orange-50 border border-gray-200 overflow-hidden h-full"
                            >
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                                    <Group gap="sm">
                                        <IconPrescription size={24} className="text-white" />
                                        <Text size="lg" className="text-white font-bold">
                                            PATIENT REPORT INFO
                                        </Text>
                                    </Group>
                                </div>
                                <div className="p-6">
                                    <Grid mb-4 justify="center">
                                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }} className="p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                                            <Grid>
                                                <Grid.Col span={12} className="hover:shadow-lg transition-all duration-300 bg-gray-200 dark:bg-gray-800 text-center">
                                                    <Text fw={600} size="xl" className="text-gray-800 dark:text-gray-200 mb-1">Patient Report 1</Text>
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Surgery Report</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">1 file found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Consultation</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">3 files found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Test Results</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">2 files found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Prescription</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">1 file found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Surgery Report</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">2 files found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Therapy</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">4 files found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Consultation</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">1 file found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between mb-4">
                                                        <div className="flex-1">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Treatment</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">3 files found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between">
                                                        <div className="">
                                                            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200 mb-1">Test Results</Text>
                                                            <Text size="xs" className="text-gray-600 dark:text-gray-300">1 file found</Text>
                                                        </div>
                                                        <div className="self-center">
                                                            <Tooltip label="Tooltip for disabled button">
                                                                <ActionIcon size="md" onClick={() => handleDrawer("Surgery")}>
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </div>
                                                    </Box>
                                                </Grid.Col>
                                            </Grid>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack >
            </div >
            <PageDrawer
                onOpenReady={(api) => {
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
                    component: <MemberFacilityReportDetail />,
                    title: "Member Details",
                }}
            />
        </Fragment>
    );
};
