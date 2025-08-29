import { Box, Button, Card, Divider, Grid, Group, Image, NumberFormatter, Stack, Text } from "@mantine/core"
import { IconActivity, IconMedicalCrossCircle } from "@tabler/icons-react"
import moment from "moment";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { PageDrawer } from "../../../../../../common/PageDrawer";

export const PatientCaregiverDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;
    const drawerApiRef = useRef<{ open: () => void } | null>(null);

    const handleDrawer = (__data: any) => {
        setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };

    return (
        <Fragment>
            <Stack gap="md">
                <Group gap="xs">
                    <IconMedicalCrossCircle size={20} className="text-green-600" />
                    <Text fw={600} size="lg" className="text-gray-800">About caregiver booking</Text>
                </Group>
                <Card withBorder className="bg-green-50 border-green-200">
                    <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Patient Name</Text>
                                <Text fw={500} className="text-sm">Rahul Biswas</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Patient SNAH ID</Text>
                                <Text fw={500} className="text-sm">SNAHUS931921</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Caregiver Name</Text>
                                <Text fw={500} className="text-sm">{detailData.physicianName}</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Caregiver SNAH ID</Text>
                                <Text fw={500} className="text-sm">SNAHCG726900</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Level</Text>
                                <Text fw={500} className="text-sm">level 1</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Hours</Text>
                                <Text fw={500} className="text-sm">5 Hour</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Job Booking ID</Text>
                                <Text fw={500} className="text-sm">CBID617469</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Caregiver DL/ID</Text>
                                <Text fw={500} className="text-sm">DL1236589</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Service Location</Text>
                                <Text fw={500} className="text-sm">J98X+94, Bethuadahari, West Bengal, 741126, India</Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Card>
                <Card withBorder className="bg-blue-50 border-blue-200">
                    <Stack gap="xs">
                        <Box className="m-auto">
                            <Image src="https://i.pravatar.cc/150?img=29" alt="User Avatar" className="w-36 rounded-lg" />
                        </Box>
                        <Box className="w-full">
                            <Divider my="md" />
                        </Box>
                        <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Status</Text>
                                    <Text fw={500} className="text-sm">{detailData.status}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Service Start Date</Text>
                                    <Text fw={500} className="text-sm">{moment(detailData.visitDate).format("MMM DD, YYYY")}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Booking General Time</Text>
                                    <Text fw={500} className="text-sm">10:00 AM to 10:30 PM</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Charges</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="45.75" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Total Fee</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="78.20" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Net Pay</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="32.45" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={12} className="mt-6 text-center">
                                <Button variant="light" color="blue" onClick={() => handleDrawer('lol')}>View all booking</Button>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Card>
            </Stack >
            <PageDrawer
                onOpenReady={(api: any) => {
                    drawerApiRef.current = api;
                }}
                title={
                    <Group gap="sm">
                        <IconActivity size={20} />
                        <Box>
                            <Text fw={600} size="lg">Caregiver Service Details</Text>
                            <Text size="sm" className="text-gray-600">Detailed information of all bookings</Text>
                        </Box>
                    </Group>
                }
                drawerConfig={{
                    offset: 8,
                    radius: "md",
                    position: "right",
                    size: "md",
                    padding: "xl",
                    className: "overflow-y-auto",
                }}
            >
                <Stack gap="md">
                    <Card withBorder className="bg-blue-50 border-blue-200">
                        <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Status</Text>
                                    <Text fw={500} className="text-sm">{detailData.status}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Date</Text>
                                    <Text fw={500} className="text-sm">{moment(detailData.visitDate).format("MMM DD, YYYY")}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Time</Text>
                                    <Text fw={500} className="text-sm">10:30 AM to 11:30 PM</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Charges</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="45.75" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Total Fee</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="78.20" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Net Pay</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="32.45" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Card>
                    <Card withBorder className="bg-blue-50 border-blue-200">
                        <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Status</Text>
                                    <Text fw={500} className="text-sm">{detailData.status}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Date</Text>
                                    <Text fw={500} className="text-sm">Feb 06, 2023</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Time</Text>
                                    <Text fw={500} className="text-sm">10:00 AM to 10:30 PM</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Charges</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="45.75" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Total Fee</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="78.20" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <Box>
                                    <Text size="sm" className="text-gray-600">Net Pay</Text>
                                    <Text fw={500} className="text-sm">
                                        <NumberFormatter value="32.45" prefix="$ " />
                                    </Text>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Stack>
            </PageDrawer>
        </Fragment >
    );
}