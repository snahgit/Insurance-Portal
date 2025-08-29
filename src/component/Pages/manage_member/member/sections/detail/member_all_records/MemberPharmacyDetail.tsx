import { Badge, Box, Divider, Grid, Group, Paper, Stack, Text } from "@mantine/core"
import { IconBrandBooking, IconPrescription, IconPill, IconFileText, IconFile } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime";

export const MemberPharmacyDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;
    return (
        <Fragment>
            <Stack gap="md">
                <Grid>
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Paper shadow="sm" radius="lg" className="bg-emerald-50 border border-gray-200 overflow-hidden h-full">
                            <Box className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4">
                                <Group gap="sm">
                                    <IconBrandBooking size={24} className="text-white" />
                                    <Text size="lg" className="text-white font-bold">BOOKING INFO</Text>
                                </Group>
                            </Box>
                            <Box className="p-6">
                                <Grid>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking SNAH ID</Text>
                                            <Text fw={500} className="text-sm">{detailData.bookingId}</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking Type</Text>
                                            <Badge fw={500} color="blue" variant="light" size="sm">virtual</Badge>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Medical Issue</Text>
                                            <Text fw={500} className="text-sm">Sb</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking Date</Text>
                                            <Text fw={500} className="text-sm">05/12/2025</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking Time</Text>
                                            <Text fw={500} className="text-sm">11:00 – 11:15</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking Status</Text>
                                            <Text fw={500} className="text-sm">{detailData.claimStatus}</Text>
                                            {/* <Badge fw={500} color="green" variant="filled" size="sm">complete</Badge> */}
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Divider my="sm" size="xs" variant="dashed" color="blue" label="More about info" labelPosition="center" />
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Consultation Purpose</Text>
                                            <Text fw={500} className="text-sm">Ss</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Booking Method</Text>
                                            <Text fw={500} className="text-sm">User app</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box className="mt-4">
                                            <Text size="sm" className="text-gray-600">Description</Text>
                                            <Text fw={500} className="text-sm">Ss</Text>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Paper shadow="sm" radius="lg" className="bg-blue-50 border border-gray-200 overflow-hidden h-full">
                            <Box className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                                <Group gap="sm">
                                    <IconPrescription size={24} className="text-white" />
                                    <Text size="lg" className="text-white font-bold">PRESCRIPTION INFO</Text>
                                </Group>
                            </Box>
                            <Box className="p-6">
                                <Grid>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">SNAH Id</Text>
                                            <Text fw={500} className="text-sm">MFPRE65531</Text>
                                        </Box>
                                    </Grid.Col>
                                    {/* <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Status</Text>
                                            <Badge fw={500} color="orange" variant="light" size="sm">refilled</Badge>
                                        </Box>
                                    </Grid.Col> */}
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Physician</Text>
                                            <Text fw={500} className="text-sm">John MH (MF)</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">NDC Numbers</Text>
                                            <Text fw={500} className="text-sm">NDC123654</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Pharmacy Name</Text>
                                            <Text fw={500} className="text-sm">Global Pharmacy</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Pharmacy DEA</Text>
                                            <Text fw={500} className="text-sm">DEA256984</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Initiated Dae</Text>
                                            <Text fw={500} className="text-sm">Aug 22 2025</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Divider my="sm" size="xs" variant="dashed" color="blue" label="More about prescription info" labelPosition="center" />
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Prescription Notes</Text>
                                            <Text fw={500} className="text-sm">sdf a</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">NDC Pres Reason</Text>
                                            <Text fw={500} className="text-sm">dsf</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Additional Notes</Text>
                                            <Text fw={500} className="text-sm">dsf</Text>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                        <Box>
                                            <Text size="sm" className="text-gray-600">Pharmacy Note</Text>
                                            <Text fw={500} className="text-sm">dsf</Text>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid.Col>
                </Grid>
                <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                        <Group gap="sm">
                            <IconPill size={24} className="text-white" />
                            <Text size="lg" className="text-white font-bold">Medicine</Text>
                        </Group>
                    </div>
                    <div className="p-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <Box>
                                        <Text size="sm" className="text-gray-600">Dosage:</Text>
                                        <Text fw={500} className="text-sm">ssd</Text>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <Box>
                                        <Text size="sm" className="text-gray-600">Instructions:</Text>
                                        <Text fw={500} className="text-sm">ssd</Text>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <Box>
                                        <Text size="sm" className="text-gray-600">Duration:</Text>
                                        <Text fw={500} className="text-sm">ssd</Text>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <Box>
                                        <Text size="sm" className="text-gray-600">Frequency:</Text>
                                        <Text fw={500} className="text-sm">ssd</Text>
                                    </Box>
                                </Grid.Col>
                            </Grid>

                            <Box className="mt-4">
                                <Text size="sm" className="text-gray-600">Is Refill:</Text>
                                <Badge color="red" variant="light" size="sm">false</Badge>
                            </Box>
                        </div>
                    </div>
                </Paper>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200 h-full">
                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4">
                                <Group gap="sm">
                                    <IconFileText size={20} className="text-white" />
                                    <Text size="md" className="text-white">Invoice</Text>
                                </Group>
                            </div>
                            <div className="p-6 flex items-center justify-center h-32">
                                <div className="text-center">
                                    <IconFile size={48} className="text-gray-300 mx-auto mb-2" />
                                    <Text size="sm" className="text-gray-600">No document available</Text>
                                </div>
                            </div>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200 h-full">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
                                <Group gap="sm">
                                    <IconFileText size={20} className="text-white" />
                                    <Text size="md" className="text-white">Receipts</Text>
                                </Group>
                            </div>
                            <div className="p-6 flex items-center justify-center h-32">
                                <Box className="text-center">
                                    <IconFile size={48} className="text-gray-300 mx-auto mb-2" />
                                    <Text size="sm" className="text-gray-600">No receipts available</Text>
                                </Box>
                            </div>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200 h-full">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                                <Group gap="sm">
                                    <IconPrescription size={20} className="text-white" />
                                    <Text size="md" className="text-white">Prescriptions</Text>
                                </Group>
                            </div>
                            <div className="p-6 flex items-center justify-center h-32">
                                <Box className="text-center">
                                    <IconFile size={48} className="text-gray-300 mx-auto mb-2" />
                                    <Text size="sm" className="text-gray-600">No prescriptions available</Text>
                                </Box>
                            </div>
                        </Paper>
                    </Grid.Col>
                </Grid>
                <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200">
                    <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-4">
                        <Group gap="sm">
                            <IconFileText size={24} className="text-white" />
                            <Text size="lg" className="text-white font-bold">Prescription File</Text>
                        </Group>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[...Array(12)].map((_, index) => (
                                <Box key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                    <IconFile size={40} className="text-gray-400 mb-2" />
                                    <Text size="sm" className="text-gray-600 text-center">File {index + 1}</Text>
                                </Box>
                            ))}
                        </div>
                    </div>
                </Paper>
            </Stack>
        </Fragment>
    );
};
