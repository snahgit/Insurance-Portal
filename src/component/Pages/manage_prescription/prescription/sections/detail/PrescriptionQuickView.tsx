import { Card, Text, Group, Button, Avatar, Tabs, Grid, Image, Box, Divider, Paper, ActionIcon } from "@mantine/core";
import { IconAddressBook, IconDetails, IconPhone, IconUser, IconFileText, IconVideo } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useGlobalAudioVideoCall } from "../../../../../../context/AudioVideoCallContext";
import AlertService from "../../../../../../services/alertService";

export const PrescriptionQuickView = (props: { dataPass: any }) => {
    const { prescriptionInfo } = props.dataPass;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("patient");
    const { startVideoCall, startAudioCall } = useGlobalAudioVideoCall();

    const handelCalling = async (data: any) => {
        const resp = await AlertService.sweetAlert({
            title: 'Are you sure you want to proceed?',
            icon: 'warning',
            type: 'confirm',
        });
        if (resp == true) {
            if (data.type === "video") {
                startVideoCall(data.data);
            } else {
                startAudioCall(data.data);
            }
        }
    };

    return (
        <Card.Section className="rounded-lg overflow-hidden">
            <Card withBorder shadow="xl" radius="lg" className="max-w-4xl mx-auto overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <Card.Section className="p-6 patient-bg-gradient dark:bg-gray-900">
                    <Tabs value={activeTab} onChange={(value) => setActiveTab(value || "patient")} variant="pills" className="w-full">
                        <Tabs.List className="flex justify-center gap-4 mb-6">
                            <Tabs.Tab
                                value="patient"
                                className={`
                                    relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg 
                                    ${activeTab === "patient" ?
                                        'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400 text-white shadow-lg' :
                                        'bg-white/80 border-white/40 text-gray-700 hover:border-blue-300 hover:bg-white dark:bg-gray-700/80 dark:border-gray-600/40 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gray-700'}
                                `}
                            >
                                <IconUser size={18} />
                                <Text size="sm" fw={500}>Booking Info</Text>
                                {activeTab === "patient" && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-xl animate-pulse" />
                                )}
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="driver"
                                className={`
                                    relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg 
                                    ${activeTab === "driver" ?
                                        'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400 text-white shadow-lg' :
                                        'bg-white/80 border-white/40 text-gray-700 hover:border-blue-300 hover:bg-white dark:bg-gray-700/80 dark:border-gray-600/40 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gray-700'}
                                `}
                            >
                                <IconFileText size={18} />
                                <Text size="sm" fw={500}>Driver Info</Text>
                                {activeTab === "driver" && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-xl animate-pulse" />
                                )}
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="patient" className="mt-12">
                            <Paper className="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-lg border border-blue-200 dark:from-gray-800 dark:to-gray-800 dark:border-gray-600">
                                <Grid>
                                    <Grid.Col span={12}>
                                        <Group gap="xs" className="mb-3">
                                            <IconUser size={18} className="text-blue-700 dark:text-blue-400" />
                                            <Text fw={600} className="dark:text-gray-200">Patient info</Text>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Grid>
                                            <Grid.Col span={12}>
                                                <Box className="flex items-center justify-between">
                                                    <Group justify="between">
                                                        <Avatar size="lg" className="bg-blue-100 dark:bg-blue-900">
                                                            <IconUser size={24} className="text-blue-600 dark:text-blue-400" />
                                                        </Avatar>
                                                        <Box className="flex flex-col self-center">
                                                            <Box>
                                                                <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">Hans Lindor</Text>
                                                            </Box>
                                                            <Box className="flex items-center gap-1 text-blue-600 dark:text-blue-400 pb-1">
                                                                <IconAddressBook size={16} />
                                                                <Text size="sm" fw={500}>SNAH ID: SNAHUS607266</Text>
                                                            </Box>
                                                        </Box>
                                                    </Group>
                                                    <Box>
                                                        <Group dir="column">
                                                            <Button size="xs" variant="filled" color="blue" onClick={() => handelCalling({ data: "Dr. Marianne Leger", type: "video" })}>
                                                                <IconVideo size={16} />
                                                            </Button>
                                                            <Button size="xs" variant="filled" color="blue" onClick={() => handelCalling({ data: "Dr. Marianne Leger", type: "audio" })}>
                                                                <IconPhone size={16} />
                                                            </Button>
                                                        </Group>
                                                    </Box>
                                                </Box>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Divider my="sm" size="xs" variant="dashed" color="blue" label="Field information about prescription" labelPosition="center" className="dark:opacity-70" />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Grid>
                                                    <Grid.Col span={12}>
                                                        <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Insurance Information</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <Card withBorder className="bg-purple-50 border-purple-200 shadow-sm dark:bg-purple-900/30 dark:border-purple-700">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <Text fw={600} size="sm" className="text-purple-800 dark:text-purple-300">Insurance #1</Text>
                                                                <div className="bg-purple-100 px-2 py-1 rounded-md dark:bg-purple-800">
                                                                    <Text size="xs" className="text-purple-700 dark:text-purple-200">Active</Text>
                                                                </div>
                                                            </div>
                                                            <Grid gutter="md">
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Insurance Name</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">Oscar Health</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Member ID</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">NCAFE681283255</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Group Number</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">GRP-001245</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Plan Type</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">HMO Plus</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                            </Grid>
                                                        </Card>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <Card withBorder className="bg-green-50 border-green-200 shadow-sm dark:bg-green-900/30 dark:border-green-700">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <Text fw={600} size="sm" className="text-green-800 dark:text-green-300">Insurance @2</Text>
                                                                <div className="bg-green-100 px-2 py-1 rounded-md dark:bg-green-800">
                                                                    <Text size="xs" className="text-green-700 dark:text-green-200">Active</Text>
                                                                </div>
                                                            </div>
                                                            <Grid gutter="md">
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Insurance Name</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">United Healthcare</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Member ID</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">UHC789456123</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Group Number</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">GRP-007890</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Plan Type</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">PPO Standard</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                            </Grid>
                                                        </Card>
                                                    </Grid.Col>
                                                </Grid>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Grid>
                                                    <Grid.Col span={12}>
                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Address</Text>
                                                        <Text size="sm" className="dark:text-gray-300">400 Kings Point Dr, Apt 1620, Sunny Isles Beach, FL, 33160, United States</Text>
                                                    </Grid.Col>
                                                </Grid>
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                            <Paper className="bg-gradient-to-r from-cyan-50 to-cyan-50 p-4 rounded-lg border border-cyan-200 mt-6 dark:from-gray-800 dark:to-gray-800 dark:border-gray-600">
                                <Grid>
                                    <Grid.Col span={12}>
                                        <Group gap="xs" className="mb-3">
                                            <IconUser size={18} className="text-cyan-700 dark:text-cyan-400" />
                                            <Text fw={600} className="dark:text-gray-200">Prescription info</Text>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Grid>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Appointment SNAH ID</Text>
                                                <Text size="sm" className="dark:text-gray-300">SNMF279235</Text>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Pharmacy DEA</Text>
                                                <Text size="sm" className="dark:text-gray-300">NA</Text>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Consultation Purpose</Text>
                                                <Text size="sm" className="dark:text-gray-300">Diagnosis</Text>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Prescription SNAH ID</Text>
                                                <Text size="sm" className="dark:text-gray-300">MFPRE890400</Text>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Pharmacy NCPDP</Text>
                                                <Text size="sm" className="dark:text-gray-300">NA</Text>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }} className="flex flex-row justify-between">
                                                <Box className="self-center">
                                                    <Text fw={600} size="sm" className="dark:text-gray-200">Physician Name</Text>
                                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Marianne Leger</Text>
                                                </Box>
                                                <Box className="self-center">
                                                    <Group dir="column" gap="xs">
                                                        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handelCalling({ data: "Dr. Marianne Leger", type: "video" })}>
                                                            <IconVideo style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                        </ActionIcon>
                                                        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handelCalling({ data: "Dr. Marianne Leger", type: "audio" })}>
                                                            <IconPhone style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                        </ActionIcon>
                                                    </Group>
                                                </Box>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">NDC Numbers</Text>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400">NDC568456</Text>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Divider my="sm" size="xs" variant="dashed" color="blue" label="Know about more" labelPosition="center" className="dark:opacity-70" />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Prescription Notes</Text>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, quod nobis? Ratione illum voluptatibus enim quidem ea perferendis et numquam laboriosam facilis? Dolore exercitationem in accusantium a est illo consequatur.</Text>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Additional Notes</Text>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, quod nobis? Ratione illum voluptatibus enim quidem ea perferendis et numquam laboriosam facilis? Dolore exercitationem in accusantium a est illo consequatur.</Text>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Text fw={600} size="sm" className="dark:text-gray-200">Pharmacy Description</Text>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, quod nobis? Ratione illum voluptatibus enim quidem ea perferendis et numquam laboriosam facilis? Dolore exercitationem in accusantium a est illo consequatur.</Text>
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Divider my="sm" size="xs" variant="dashed" color="blue" label="Prescription file" labelPosition="center" className="dark:opacity-70" />
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Grid gutter="md">
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                                <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-700">
                                                    <Card.Section className="p-4">
                                                        <Text fw={600} size="md" className="text-gray-800 mb-3 dark:text-gray-200">Prescription #1</Text>
                                                        <Image
                                                            src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480"
                                                            alt="Prescription"
                                                            className="rounded-md"
                                                        />
                                                    </Card.Section>
                                                </Card>
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                        </Tabs.Panel>
                        <Tabs.Panel value="driver" className="mt-12">
                            <Paper className="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-lg border border-blue-200 dark:from-gray-800 dark:to-gray-800 dark:border-gray-600">
                                <Grid>
                                    <Grid.Col span={12}>
                                        <Group gap="xs" className="mb-3">
                                            <IconFileText size={18} className="text-blue-700 dark:text-blue-400" />
                                            <Text fw={600} className="dark:text-gray-200">Driver info</Text>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Grid>
                                            <Grid.Col span={12}>
                                                <Box className="flex items-center justify-between">
                                                    <Group justify="between">
                                                        <Avatar
                                                            size="lg"
                                                            src="https://i.pravatar.cc/150?img=39"
                                                            alt="Driver Avatar"
                                                            className="border-2 border-blue-200 dark:border-blue-600"
                                                        />
                                                        <Box className="flex flex-col self-center">
                                                            <Box>
                                                                <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">Michael Rodriguez</Text>
                                                            </Box>
                                                            <Box className="flex items-center gap-1 text-blue-600 dark:text-blue-400 pb-1">
                                                                <IconAddressBook size={16} />
                                                                <Text size="sm" fw={500}>SNAH ID: SNAH326598</Text>
                                                            </Box>
                                                        </Box>
                                                    </Group>
                                                    <Box>
                                                        <Group dir="column">
                                                            <Button size="xs" variant="filled" color="blue" onClick={() => handelCalling({ data: "Michael Rodriguez", type: "video" })}>
                                                                <IconVideo size={16} />
                                                            </Button>
                                                            <Button size="xs" variant="filled" color="blue" onClick={() => handelCalling({ data: "Michael Rodriguez", type: "audio" })}>
                                                                <IconPhone size={16} />
                                                            </Button>
                                                        </Group>
                                                    </Box>
                                                </Box>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Divider my="sm" size="xs" variant="dashed" color="blue" label="Driver and vehicle information" labelPosition="center" className="dark:opacity-70" />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Grid>
                                                    <Grid.Col span={12}>
                                                        <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Other Information</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <Card withBorder className="bg-purple-50 border-purple-200 shadow-sm dark:bg-purple-900/30 dark:border-purple-700">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <Text fw={600} size="sm" className="text-purple-800 dark:text-purple-300">Primary Vehicle</Text>
                                                                <div className="bg-purple-100 px-2 py-1 rounded-md dark:bg-purple-800">
                                                                    <Text size="xs" className="text-purple-700 dark:text-purple-200">Active</Text>
                                                                </div>
                                                            </div>
                                                            <Grid gutter="md">
                                                                <Grid.Col span={12}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Vehicle Identification number</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">VIN12345456985632</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={12}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Vehicle Make/Model</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">Dodge</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                            </Grid>
                                                        </Card>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <Card withBorder className="bg-cyan-50 border-cyan-200 shadow-sm dark:bg-cyan-900/30 dark:border-cyan-700">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <Text fw={600} size="sm" className="text-cyan-800 dark:text-cyan-300">License Info</Text>
                                                                <div className="bg-cyan-100 px-2 py-1 rounded-md dark:bg-cyan-800">
                                                                    <Text size="xs" className="text-cyan-700 dark:text-cyan-200">Valid</Text>
                                                                </div>
                                                            </div>
                                                            <Grid gutter="md">
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">License Number</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">FL-D123456789</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">License Plate</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">EVV0919</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                    <Box>
                                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Expiry Date</Text>
                                                                        <Text size="sm" className="dark:text-gray-300">12/28/2026</Text>
                                                                    </Box>
                                                                </Grid.Col>
                                                            </Grid>
                                                        </Card>
                                                    </Grid.Col>
                                                </Grid>
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Grid>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Mobile Number</Text>
                                                        <Text size="sm" className="dark:text-gray-300">+1 (555) 123-4567</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Delivery date:</Text>
                                                        <Text size="sm" className="dark:text-gray-300">12/28/2026</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Pickup Location</Text>
                                                        <Text size="sm" className="dark:text-gray-300">123 Main St, Springfield, IL</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                                        <Text fw={600} size="sm" className="dark:text-gray-200">Drop Location</Text>
                                                        <Text size="sm" className="dark:text-gray-300">456 Elm St, Springfield, IL</Text>
                                                    </Grid.Col>

                                                    {/* <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                        <Text fw={600} size="sm">Rating</Text>
                                                        <Text size="sm">4.8/5.0 ⭐</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                        <Text fw={600} size="sm">Experience</Text>
                                                        <Text size="sm">5 years</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                                                        <Text fw={600} size="sm">Total Trips</Text>
                                                        <Text size="sm">2,847</Text>
                                                    </Grid.Col> */}
                                                </Grid>
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                        </Tabs.Panel>
                    </Tabs>
                </Card.Section>
                <Card.Section className="p-6 bg-white border-t dark:bg-gray-800 dark:border-gray-600">
                    <Group justify="center" gap="md">
                        <Button
                            leftSection={<IconDetails size={14} />}
                            variant="filled"
                            color="blue"
                            onClick={() =>
                                navigate("detail", { state: { id: prescriptionInfo.id } })
                            }
                        >View More</Button>
                    </Group>
                </Card.Section>
            </Card>
        </Card.Section>
    );
};
