import { Box, Card, Text, Badge } from "@mantine/core";
import { IconBuilding, IconDetails } from "@tabler/icons-react";

export const DepartmentQuickView = (props: { dataPass: any }) => {
    const { departmentInfo } = props.dataPass;
    // const navigate = useNavigate();

    return (
        <Card.Section className="rounded-lg overflow-hidden">
            {departmentInfo ? (
                <Card
                    withBorder
                    shadow="xl"
                    radius="md"
                    className="max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                    <Card.Section className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-md">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="text-center flex-1">
                                <Box>
                                    <Text size="xl" fw={700} className="mb-2 text-gray-800 dark:text-white">
                                        {departmentInfo.name}
                                    </Text>
                                </Box>
                                <Box>
                                    <Badge
                                        variant="light"
                                        color={departmentInfo.status === "Active" ? "green" : "red"}
                                        size="lg"
                                        className="mb-3"
                                    >
                                        {departmentInfo.status}
                                    </Badge>
                                </Box>
                            </div>
                        </div>
                    </Card.Section>

                    <Card.Section className="p-6 space-y-6 bg-white dark:bg-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <IconBuilding size={20} className="text-blue-500 dark:text-blue-400" />
                                    <div>
                                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300">
                                            Department ID
                                        </Text>
                                        <Text size="sm" className="text-gray-600 dark:text-gray-400">
                                            DEPT-{departmentInfo.id.toString().padStart(4, '0')}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <IconDetails size={20} className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <Text fw={600} size="sm" className="text-gray-700 dark:text-gray-300 mb-1">
                                            Description
                                        </Text>
                                        <Text size="sm" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {departmentInfo.description}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Section>
                </Card>
            ) : (
                <Box className="text-center py-8 bg-white dark:bg-gray-800">
                    <Text size="lg" c="dimmed" className="text-gray-500 dark:text-gray-400">
                        No department information available
                    </Text>
                </Box>
            )}
        </Card.Section>
    );
};
