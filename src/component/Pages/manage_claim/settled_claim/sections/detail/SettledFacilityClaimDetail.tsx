import { Fragment } from "react";
import { Card, Text, Badge, Grid, Group, Divider, Paper, Table } from "@mantine/core";
import { IconCalendar, IconListDetails, IconMathFunction, IconPaperclip, IconFileReport } from "@tabler/icons-react";
import moment from "moment";

export const SettledFacilityClaimDetail = (props: { dataPass: any }) => {
    const { claimData, from } = props.dataPass;
    const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
    return (
        <Fragment>
            <Divider
                my="md"
                size="xs"
                variant="dashed"
                color="green"
                label="Comprehensive Facility Claim Settlement Details"
                labelPosition="center"
                className="w-full"
            />
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 dark:bg-gray-800">
                    <Card.Section className="bg-blue-100 dark:bg-blue-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconCalendar size={16} className="text-blue-700 dark:text-blue-400" />
                            <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Settled Appointment Information</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Appointment Date</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Appointment Time</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">10:30 AM</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Place of Service</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Office</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Type of Service</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Consultation</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Settlement Status</Text>
                                    <Badge color="green" variant="filled" size="sm">Paid in Full</Badge>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Settlement Date</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claimData?.settlementDate).format("DD-MM-YYYY")}</Text>
                                </div>
                            </div>
                        </div>
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-red-200 dark:border-red-700 dark:bg-gray-800">
                    <Card.Section className="bg-red-100 dark:bg-red-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconListDetails size={16} className="text-red-700 dark:text-red-400" />
                            <Text fw={600} size="md" className="text-red-800 dark:text-red-200">Settled Medical Information</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Diagnosis Code (ICD-10)</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Z00.00</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Diagnosis Description</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Encounter for general adult medical examination without abnormal findings</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Date of Current Illness</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Date First Consulted</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Treatment Authorization Code</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">AUTH-99112</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Payment Status</Text>
                                    <Badge color="green" variant="filled" size="sm">Completed</Badge>
                                </div>
                            </div>
                        </div>
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-purple-200 dark:border-purple-700 dark:bg-gray-800">
                    <Card.Section className="bg-purple-100 dark:bg-purple-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconListDetails size={16} className="text-purple-700 dark:text-purple-400" />
                            <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">Settled Service Lines</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <Table striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Date of Service</Table.Th>
                                    <Table.Th>CPT Code</Table.Th>
                                    <Table.Th>Description</Table.Th>
                                    <Table.Th>Charge</Table.Th>
                                    <Table.Th>Allowed</Table.Th>
                                    <Table.Th>Paid</Table.Th>
                                    {/* <Table.Th>Status</Table.Th> */}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Table.Td>
                                    <Table.Td>99213</Table.Td>
                                    <Table.Td>Office Visit - Level 3</Table.Td>
                                    <Table.Td>{currency(450.00)}</Table.Td>
                                    <Table.Td>{currency(450.00)}</Table.Td>
                                    <Table.Td>{currency(450.00)}</Table.Td>
                                    {/* <Table.Td><Badge color="green" size="sm">Paid</Badge></Table.Td> */}
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Table.Td>
                                    <Table.Td>87804</Table.Td>
                                    <Table.Td>Infectious Agent Detection</Table.Td>
                                    <Table.Td>{currency(125.00)}</Table.Td>
                                    <Table.Td>{currency(125.00)}</Table.Td>
                                    <Table.Td>{currency(125.00)}</Table.Td>
                                    {/* <Table.Td><Badge color="green" size="sm">Paid</Badge></Table.Td> */}
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>{moment(claimData?.appointmentDate).format("DD-MM-YYYY")}</Table.Td>
                                    <Table.Td>36415</Table.Td>
                                    <Table.Td>Collection of venous blood</Table.Td>
                                    <Table.Td>{currency(25.00)}</Table.Td>
                                    <Table.Td>{currency(25.00)}</Table.Td>
                                    <Table.Td>{currency(25.00)}</Table.Td>
                                    {/* <Table.Td><Badge color="green" size="sm">Paid</Badge></Table.Td> */}
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-orange-200 dark:border-orange-700 dark:bg-gray-800">
                    <Card.Section className="bg-orange-100 dark:bg-orange-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconPaperclip size={16} className="text-orange-700 dark:text-orange-400" />
                            <Text fw={600} size="md" className="text-orange-800 dark:text-orange-200">Settled Claim Documents</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "Medical Records", type: "PDF", size: "2.5 MB", status: "Verified" },
                                { name: "Lab Results", type: "PDF", size: "1.2 MB", status: "Verified" },
                                { name: "Prior Authorization", type: "PDF", size: "850 KB", status: "Verified" },
                                { name: "Settlement Notice", type: "PDF", size: "645 KB", status: "Final" }
                            ].map((doc, index) => (
                                <Paper key={index} className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                                    <Group gap="xs" className="items-start">
                                        <IconFileReport size={20} className="text-orange-600 dark:text-orange-400 mt-1" />
                                        <div className="flex-1">
                                            <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">{doc.name}</Text>
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400">{doc.type} • {doc.size}</Text>
                                            <Badge color="green" variant="light" size="xs" mt="xs">{doc.status}</Badge>
                                        </div>
                                    </Group>
                                </Paper>
                            ))}
                        </div>
                    </Card.Section>
                </Card>
            </Grid.Col>
            {from === 'detail' && (
                <Grid.Col span={{ base: 12 }}>
                    <Card withBorder radius="md" className="border-green-200 dark:border-green-700 dark:bg-gray-800">
                        <Card.Section className="bg-green-100 dark:bg-green-900/30 px-4 py-3 rounded-t-md">
                            <Group justify="start">
                                <IconMathFunction size={16} className="text-green-700 dark:text-green-400" />
                                <Text fw={600} size="md" className="text-green-800 dark:text-green-200">Facility Claim Settlement Summary</Text>
                            </Group>
                        </Card.Section>
                        <Card.Section className="px-4 py-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                        <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Total Billed</Text>
                                        <Text size="xl" fw={700} className="text-gray-800 dark:text-gray-200">{currency(claimData?.totalCharge || 1250.00)}</Text>
                                    </Paper>
                                    <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                        <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Insurance Paid</Text>
                                        <Text size="xl" fw={700} className="text-green-600 dark:text-green-400">{currency(claimData?.amountPaid || 1250.00)}</Text>
                                    </Paper>
                                    <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                        <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Patient Copay</Text>
                                        <Text size="xl" fw={700} className="text-blue-600 dark:text-blue-400">{currency(0)}</Text>
                                    </Paper>
                                    <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                        <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Outstanding</Text>
                                        <Text size="xl" fw={700} className="text-green-600 dark:text-green-400">{currency(0)}</Text>
                                    </Paper>
                                </div>
                                <Divider my="md" />
                                <div className="text-center">
                                    <Badge color="green" size="lg" variant="filled">
                                        FACILITY CLAIM FULLY SETTLED
                                    </Badge>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400 mt-2">
                                        All medical services have been processed and paid in full
                                    </Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                                        Settlement completed on {moment(claimData?.settlementDate).format("MMMM DD, YYYY")}
                                    </Text>
                                </div>
                            </div>
                        </Card.Section>
                    </Card>
                </Grid.Col>
            )}
        </Fragment>
    );
};
