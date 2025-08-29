import { Box, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import { IconMedicalCrossCircle } from "@tabler/icons-react"
import moment from "moment";

export const PatientRideDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;
    return (
        <Stack gap="xl" className="pb-6">
            <Group gap="xs">
                <IconMedicalCrossCircle size={20} className="text-green-600" />
                <Text fw={600} size="lg" className="text-gray-800">About ride booking</Text>
            </Group>
            <Card withBorder className="bg-green-50 border-blue-200">
                <Stack gap="xs">
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
                                <Text size="sm" className="text-gray-600">Booking Date</Text>
                                <Text fw={500} className="text-sm">{moment(detailData?.date).format("MMM DD YYYY")}</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Total Amount</Text>
                                <Text fw={500} className="text-sm">$53.22</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Status</Text>
                                <Text fw={500} className="text-sm">{detailData?.status}</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Total Mile</Text>
                                <Text fw={500} className="text-sm">5 Mile</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Pickup Location</Text>
                                <Text fw={500} className="text-sm">J98X+94, Bethuadahari, West Bengal, 741126, India</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Drop Location</Text>
                                <Text fw={500} className="text-sm">J98X+94, Bethuadahari, West Bengal, 741126, India</Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Stack>
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
                                <Text size="sm" className="text-gray-600">Driver Name</Text>
                                <Text fw={500} className="text-sm">John William</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Driver SNAH ID</Text>
                                <Text fw={500} className="text-sm">SNAHCG726900</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Driver ID</Text>
                                <Text fw={500} className="text-sm">CBID617469</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Vehicle plate</Text>
                                <Text fw={500} className="text-sm">SG357</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Vehicle make/model</Text>
                                <Text fw={500} className="text-sm">GD677</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Registration ID</Text>
                                <Text fw={500} className="text-sm">REG365987</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                            <Box>
                                <Text size="sm" className="text-gray-600">Insurance Id</Text>
                                <Text fw={500} className="text-sm">INS123456</Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Card>
        </Stack >
    );
};
