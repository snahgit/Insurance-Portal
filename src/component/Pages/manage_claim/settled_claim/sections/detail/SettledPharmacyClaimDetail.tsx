import { Fragment } from "react";
import { Card, Text, Badge, Grid, Group, Divider, Paper, Table } from "@mantine/core";
import { IconMedicalCross, IconMathFunction } from "@tabler/icons-react";
import moment from "moment";

interface SettledPharmacyClaimDetailProps {
    claimData: any;
}

export const SettledPharmacyClaimDetail = ({ claimData }: SettledPharmacyClaimDetailProps) => {
    const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

    return (
        <Fragment>
            <Divider
                my="md"
                size="xs"
                variant="dashed"
                color="blue"
                label="Comprehensive Pharmacy Claim Settlement Details"
                labelPosition="center"
                className="w-full"
            />
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-purple-200 dark:border-purple-700 dark:bg-gray-800">
                    <Card.Section className="bg-purple-100 dark:bg-purple-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconMedicalCross size={16} className="text-purple-700 dark:text-purple-400" />
                            <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">Settled Medication Details</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <Table striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>NDC Number</Table.Th>
                                    <Table.Th>Medication</Table.Th>
                                    <Table.Th>Quantity</Table.Th>
                                    <Table.Th>Days Supply</Table.Th>
                                    <Table.Th>Charged</Table.Th>
                                    <Table.Th>Approved</Table.Th>
                                    <Table.Th>Paid</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>0002-1407</Table.Td>
                                    <Table.Td>Quinidine Gluconate 7MG</Table.Td>
                                    <Table.Td>60</Table.Td>
                                    <Table.Td>30</Table.Td>
                                    <Table.Td>{currency(147.66)}</Table.Td>
                                    <Table.Td>{currency(147.66)}</Table.Td>
                                    <Table.Td>{currency(147.66)}</Table.Td>
                                    <Table.Td><Badge color="green" size="sm">Paid</Badge></Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>0003-2408</Table.Td>
                                    <Table.Td>Acetaminophen 500MG</Table.Td>
                                    <Table.Td>42</Table.Td>
                                    <Table.Td>14</Table.Td>
                                    <Table.Td>{currency(68.00)}</Table.Td>
                                    <Table.Td>{currency(68.00)}</Table.Td>
                                    <Table.Td>{currency(68.00)}</Table.Td>
                                    <Table.Td><Badge color="green" size="sm">Paid</Badge></Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-red-200 dark:border-red-700 dark:bg-gray-800">
                    <Card.Section className="bg-red-100 dark:bg-red-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconMedicalCross size={16} className="text-red-700 dark:text-red-400" />
                            <Text fw={600} size="md" className="text-red-800 dark:text-red-200">Settled Allergy Treatment Details</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    id: 1,
                                    dateOfAllergy: "2025-08-01",
                                    numberOfVialsAllergy: "2",
                                    numberOfTreatmentsAllergy: "5",
                                    daysSupplyAllergy: "30",
                                    vialContainsAllergy: "Tree Pollen Extract",
                                    administeredByAllergy: "Dr. Alice Rivera",
                                    totalChargeAllergy: "675.00",
                                    amountPaidAllergy: "675.00",
                                    status: "Settled"
                                },
                                {
                                    id: 2,
                                    dateOfAllergy: "2025-08-15",
                                    numberOfVialsAllergy: "1",
                                    numberOfTreatmentsAllergy: "3",
                                    daysSupplyAllergy: "21",
                                    vialContainsAllergy: "Grass Pollen Extract",
                                    administeredByAllergy: "Dr. Alice Rivera",
                                    totalChargeAllergy: "340.00",
                                    amountPaidAllergy: "340.00",
                                    status: "Settled"
                                }
                            ].map((allergy) => (
                                <Paper key={allergy.id} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                                    <div className="flex justify-between items-center mb-3">
                                        <Badge color="red" variant="light" size="sm">Allergy Treatment #{allergy.id}</Badge>
                                        <Badge color="green" variant="filled" size="sm">{allergy.status}</Badge>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Treatment Date:</Text>
                                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{moment(allergy.dateOfAllergy).format("DD-MM-YYYY")}</Text>
                                            </div>
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Number of Vials:</Text>
                                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.numberOfVialsAllergy}</Text>
                                            </div>
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Treatments:</Text>
                                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.numberOfTreatmentsAllergy}</Text>
                                            </div>
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Days Supply:</Text>
                                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.daysSupplyAllergy}</Text>
                                            </div>
                                            <div className="col-span-2">
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Vial Contains:</Text>
                                                <Text size="xs" className="text-gray-800 dark:text-gray-200">{allergy.vialContainsAllergy}</Text>
                                            </div>
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Total Charged:</Text>
                                                <Text size="sm" fw={600} className="text-red-600 dark:text-red-400">${allergy.totalChargeAllergy}</Text>
                                            </div>
                                            <div>
                                                <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400">Amount Paid:</Text>
                                                <Text size="sm" fw={600} className="text-green-600 dark:text-green-400">${allergy.amountPaidAllergy}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            ))}
                        </div>
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Card withBorder radius="md" className="border-cyan-200 dark:border-cyan-700 dark:bg-gray-800">
                    <Card.Section className="bg-cyan-100 dark:bg-cyan-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconMedicalCross size={16} className="text-cyan-700 dark:text-cyan-400" />
                            <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Pharmacy Settlement Information</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Pharmacy Name</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Global Pharmacy</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NCPDP Number</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">NCPDP12345</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">NPI Number</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">NPI3698</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">Pharmacist Signature</Text>
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Dr. Sarah Wilson</Text>
                                </div>
                                <div>
                                    <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">On-site Nursing Home</Text>
                                    <Badge variant="light" color="red">No</Badge>
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
                <Card withBorder radius="md" className="border-green-200 dark:border-green-700 dark:bg-gray-800">
                    <Card.Section className="bg-green-100 dark:bg-green-900/30 px-4 py-3 rounded-t-md">
                        <Group justify="start">
                            <IconMathFunction size={16} className="text-green-700 dark:text-green-400" />
                            <Text fw={600} size="md" className="text-green-800 dark:text-green-200">Pharmacy Claim Settlement Summary</Text>
                        </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                    <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Total Billed</Text>
                                    <Text size="xl" fw={700} className="text-gray-800 dark:text-gray-200">{currency(claimData?.totalCharge || 215.66)}</Text>
                                </Paper>
                                <Paper className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
                                    <Text size="xs" className="text-gray-600 dark:text-gray-400 mb-2">Insurance Paid</Text>
                                    <Text size="xl" fw={700} className="text-green-600 dark:text-green-400">{currency(claimData?.amountPaid || 215.66)}</Text>
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
                                    PHARMACY CLAIM FULLY SETTLED
                                </Badge>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400 mt-2">
                                    All prescriptions and treatments have been processed and paid in full
                                </Text>
                                <Text size="sm" className="text-gray-600 dark:text-gray-400">
                                    Settlement completed on {moment(claimData?.settlementDate).format("MMMM DD, YYYY")}
                                </Text>
                            </div>
                        </div>
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Fragment>
    );
};
