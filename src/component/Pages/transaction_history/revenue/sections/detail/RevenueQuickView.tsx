import { Box, Card, Text, Group, Divider, Button, Grid, Stack, NumberFormatter } from "@mantine/core";
import { IconReceipt, IconDownload, IconEye } from "@tabler/icons-react";

export const RevenueQuickView = (props: { dataPass: any }) => {
    const { billInfo } = props.dataPass;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card.Section className="rounded-lg overflow-hidden">
            {billInfo ? (
                <Card
                    withBorder
                    shadow="xl"
                    radius="lg"
                    className="max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-800"
                >
                    <Card.Section className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                <IconReceipt size={40} className="text-white" />
                            </div>
                            <div className="text-center md:text-left flex-1 self-center">
                                <Box>
                                    <Text size="xl" fw={700} className="mb-2 text-gray-800 dark:text-gray-100">Bill #{billInfo.billNo}</Text>
                                </Box>
                                <Box>
                                    <Text>{formatDate(billInfo.billDate)}</Text>
                                </Box>
                            </div>
                            <Stack gap={1} className="self-center">
                                <div className="flex flex-row justify-between gap-3">
                                    <Text size="sm" className="text-gray-500 dark:text-gray-400 self-center">Total bill:</Text>
                                    <Text size="md" fw={700} className="text-green-600 dark:text-green-400"><NumberFormatter value="40" prefix="$ " /></Text>
                                </div>
                                <div className="flex flex-row justify-between gap-3">
                                    <Text size="sm" className="text-gray-500 dark:text-gray-400 self-center">Service charge:</Text>
                                    <Text size="md" fw={700} className="text-red-600 dark:text-red-400"><NumberFormatter value="10" prefix="$ " /></Text>
                                </div>
                                <div className="flex flex-row justify-between gap-3">
                                    <Text size="sm" className="text-gray-500 dark:text-gray-400 self-center">Net Amount:</Text>
                                    <Text size="md" fw={700} className="text-blue-600 dark:text-blue-400"><NumberFormatter value="30" prefix="$ " /></Text>
                                </div>
                            </Stack>
                        </div>
                    </Card.Section>
                    <Card.Section className="p-6 space-y-6">
                        <Grid>
                            <Grid.Col span={{ base: 12 }}>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">
                                            Detail
                                        </Text>
                                        <Text size="sm" className="text-gray-900 dark:text-gray-100 font-medium">
                                            {billInfo.description}
                                        </Text>
                                    </div>
                                </div>
                            </Grid.Col>
                        </Grid>
                        <Divider className="my-6" />
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-3">
                                Receipt & Documentation
                            </Text>
                            <Group gap="md">
                                <Button
                                    leftSection={<IconEye size={16} />}
                                    variant="light"
                                    color="blue"
                                    size="sm"
                                    component="a"
                                    href={billInfo.receiptLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:shadow-md transition-shadow"
                                >View Receipt</Button>
                                <Button
                                    leftSection={<IconDownload size={16} />}
                                    variant="outline"
                                    color="gray"
                                    size="sm"
                                    component="a"
                                    href={billInfo.receiptLink}
                                    download
                                    className="hover:shadow-md transition-shadow"
                                >Download</Button>
                            </Group>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                            <Text size="xs" className="text-blue-700 dark:text-blue-300">
                                <strong>Transaction ID:</strong> TXN-{billInfo.id.toString().padStart(6, '0')} |
                                <strong>Generated:</strong> {formatDate(billInfo.billDate)}
                            </Text>
                        </div>
                    </Card.Section>
                </Card>
            ) : (
                <Box className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconReceipt size={40} className="text-gray-400" />
                    </div>
                    <Text size="lg" c="dimmed" className="mb-2">
                        No bill information available
                    </Text>
                    <Text size="sm" c="dimmed">
                        Select a payment record to view detailed bill information
                    </Text>
                </Box>
            )}
        </Card.Section>
    );
};
