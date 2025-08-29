import { Card, Grid, Group, Stack, Text } from "@mantine/core"
import { IconMedicalCrossCircle } from "@tabler/icons-react"
import moment from "moment";

export const MemberRideDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;
    return (
        <div className="bg-gray-50 min-h-screen">
            <Stack gap="xl" className="pb-6">
                <Group gap="xs" className="mb-3">
                    <IconMedicalCrossCircle size={20} className="text-green-600" />
                    <Text fw={600} size="lg" className="text-gray-800">About ride</Text>
                </Group>
                <Card withBorder className="bg-green-50 border-blue-200">
                    <Stack gap="xs">
                        <Grid>
                            <Grid.Col span={{ base: 12, md: 12 }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Patient Name</Text>
                                                <Text fw={500} className="text-sm">Rahul Biswas</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Driver Name</Text>
                                                <Text fw={500} className="text-sm">John William</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Booking Date</Text>
                                                <Text fw={500} className="text-sm">{moment(detailData?.date).format("MMM DD YYYY")}</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Driver ID</Text>
                                                <Text fw={500} className="text-sm">CBID617469</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Vehicle plate</Text>
                                                <Text fw={500} className="text-sm">SG357</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Registration ID</Text>
                                                <Text fw={500} className="text-sm">REG365987</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Total Amount</Text>
                                                <Text fw={500} className="text-sm">$53.22</Text>
                                            </div>
                                        </Group>
                                    </div>
                                    <div className="space-y-3">
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Patient SNAH ID</Text>
                                                <Text fw={500} className="text-sm">SNAHUS931921</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Driver SNAH ID</Text>
                                                <Text fw={500} className="text-sm">SNAHCG726900</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Status</Text>
                                                <Text fw={500} className="text-sm">{detailData?.status}</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Vehicle model</Text>
                                                <Text fw={500} className="text-sm">GD677</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Insurance Id</Text>
                                                <Text fw={500} className="text-sm">INS123456</Text>
                                            </div>
                                        </Group>
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Total Mile</Text>
                                                <Text fw={500} className="text-sm">5 Mile</Text>
                                            </div>
                                        </Group>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-3">
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Pickup Location</Text>
                                                <Text fw={500} className="text-sm">J98X+94, Bethuadahari, West Bengal, 741126, India</Text>
                                            </div>
                                        </Group>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-3">
                                        <Group gap="xs">
                                            <div>
                                                <Text size="sm" className="text-gray-600">Drop Location</Text>
                                                <Text fw={500} className="text-sm">J98X+94, Bethuadahari, West Bengal, 741126, India</Text>
                                            </div>
                                        </Group>
                                    </div>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Card>
            </Stack >
        </div>
    );
};
