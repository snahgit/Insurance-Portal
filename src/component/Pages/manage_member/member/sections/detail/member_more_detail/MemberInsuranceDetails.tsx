import { Badge, Card, Divider, Grid, Group, Stack, Text } from "@mantine/core"
import { IconCashBanknote } from "@tabler/icons-react"

export const MemberInsuranceDetails = (__props: { dataPass: any }) => {
    return (
        <Stack gap="md">
            <Group gap="xs" className="mb-4">
                <IconCashBanknote size={20} className="text-purple-600 dark:text-purple-400" />
                <Text fw={600} size="lg" className="text-gray-800 dark:text-white">User Insurance Information</Text>
            </Group>
            <Card withBorder className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 mb-4">
                <Card.Section className="bg-purple-100 dark:bg-purple-800/40 px-4 py-3">
                    <Group justify="space-between">
                        <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">Aetna Insurance</Text>
                        <Badge color="purple" variant="filled" size="sm">Active</Badge>
                    </Group>
                </Card.Section>
                <div className="p-4">
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Policy or Member ID</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">hd</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Member Name</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">gw</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Member DOB</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">2023-11-16</Text>
                                        </div>
                                    </Group>
                                </div>
                                <div className="space-y-3">
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Relationship To Member</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">wyw</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Group Number</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">gwu</Text>
                                        </div>
                                    </Group>
                                </div>
                            </div>
                        </Grid.Col>
                        <Divider my="xs" size="md" className="border-gray-300 dark:border-gray-600" />
                        <Grid.Col>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Effective Date:</Text>
                                    <Text size="sm" className="text-black dark:text-white">12/01/2023</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Plan:</Text>
                                    <Text size="sm" className="text-black dark:text-white">1</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RXBIN:</Text>
                                    <Text size="sm" className="text-black dark:text-white">3</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RX IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">4</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RXPCN:</Text>
                                    <Text size="sm" className="text-black dark:text-white">2</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RX FAM DED($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">5</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Preventive:</Text>
                                    <Text size="sm" className="text-black dark:text-white">6</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Doctor Visit PCP($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">7</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Doctor Visit SPC($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">8</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Urgent Care($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">9</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Emergency(%):</Text>
                                    <Text size="sm" className="text-black dark:text-white">10</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Hospital(%):</Text>
                                    <Text size="sm" className="text-black dark:text-white">11</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">INN DED IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">12</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">INN DED FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">13</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON DED IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">14</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON DED FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">15</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">IMM OOPM IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">16</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">IMM OOPM FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">17</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON OOPM IND:</Text>
                                    <Text size="sm" className="text-black dark:text-white">18</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON OOPM FAM:</Text>
                                    <Text size="sm" className="text-black dark:text-white">19</Text>
                                </div>
                            </div>
                        </Grid.Col>
                    </Grid>
                    <Divider my="md" className="border-gray-300 dark:border-gray-600" />
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card withBorder className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Insurance Card Front</Text>
                                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg flex items-center justify-center">
                                    <Text color="white" fw={500}>Card Front Image</Text>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card withBorder className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Insurance Card Back</Text>
                                <div className="h-32 bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                                    <Text color="white" fw={500}>Card Back Image</Text>
                                </div>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>
            <Card withBorder className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 mb-4">
                <Card.Section className="bg-purple-100 dark:bg-purple-800/40 px-4 py-3">
                    <Group justify="space-between">
                        <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">Oscar Health Insurance</Text>
                        <Badge color="purple" variant="filled" size="sm">Active</Badge>
                    </Group>
                </Card.Section>
                <div className="p-4">
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Policy or Member ID</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">hd</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Member Name</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">gw</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Member DOB</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">2023-11-16</Text>
                                        </div>
                                    </Group>
                                </div>
                                <div className="space-y-3">
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Relationship To Member</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">wyw</Text>
                                        </div>
                                    </Group>
                                    <Group gap="xs">
                                        <div>
                                            <Text size="sm" className="text-gray-600 dark:text-gray-400">Group Number</Text>
                                            <Text fw={500} className="text-sm text-gray-900 dark:text-white">gwu</Text>
                                        </div>
                                    </Group>
                                </div>
                            </div>
                        </Grid.Col>
                        <Divider my="xs" size="md" className="border-gray-300 dark:border-gray-600" />
                        <Grid.Col>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Effective Date:</Text>
                                    <Text size="sm" className="text-black dark:text-white">12/01/2023</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Plan:</Text>
                                    <Text size="sm" className="text-black dark:text-white">1</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RXBIN:</Text>
                                    <Text size="sm" className="text-black dark:text-white">3</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RX IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">4</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RXPCN:</Text>
                                    <Text size="sm" className="text-black dark:text-white">2</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">RX FAM DED($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">5</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Preventive:</Text>
                                    <Text size="sm" className="text-black dark:text-white">6</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Doctor Visit PCP($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">7</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Doctor Visit SPC($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">8</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Urgent Care($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">9</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Emergency(%):</Text>
                                    <Text size="sm" className="text-black dark:text-white">10</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">Hospital(%):</Text>
                                    <Text size="sm" className="text-black dark:text-white">11</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">INN DED IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">12</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">INN DED FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">13</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON DED IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">14</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON DED FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">15</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">IMM OOPM IND($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">16</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">IMM OOPM FAM($):</Text>
                                    <Text size="sm" className="text-black dark:text-white">17</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON OOPM IND:</Text>
                                    <Text size="sm" className="text-black dark:text-white">18</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text size="sm" fw={500} className="text-gray-500 dark:text-gray-400">OON OOPM FAM:</Text>
                                    <Text size="sm" className="text-black dark:text-white">19</Text>
                                </div>
                            </div>
                        </Grid.Col>
                    </Grid>
                    <Divider my="md" className="border-gray-300 dark:border-gray-600" />
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card withBorder className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Insurance Card Front</Text>
                                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg flex items-center justify-center">
                                    <Text color="white" fw={500}>Card Front Image</Text>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card withBorder className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-2">Insurance Card Back</Text>
                                <div className="h-32 bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                                    <Text color="white" fw={500}>Card Back Image</Text>
                                </div>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>
        </Stack>
    )
}
