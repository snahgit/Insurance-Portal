import { Card, Text, Badge, Group, Grid } from "@mantine/core";
import { IconHeartbeat, IconClock, IconCalendar, IconUser } from "@tabler/icons-react";
import moment from "moment";

export const MemberTreatmentDetail = (props: { dataPass: any }) => {
    const { detailData } = props.dataPass;

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "completed":
                return "green";
            case "accepted":
                return "blue";
            case "cancel":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Card withBorder radius="lg" className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 border-gray-200 dark:border-gray-700">
                <div className="text-center p-4">
                    <div className="text-4xl mb-3">🏥</div>
                    <Text size="xl" fw={700} className="text-red-700 dark:text-red-300 mb-2">
                        {detailData.procedure}
                    </Text>
                    <Text size="sm" c="dimmed" className="text-gray-600 dark:text-gray-400">
                        Booking ID: {detailData.bookingId}
                    </Text>
                    <Group justify="center" mt="md">
                        <Badge
                            color={getStatusBadgeColor(detailData.claimStatus)}
                            variant="filled"
                            size="lg"
                        >
                            {detailData.claimStatus.toUpperCase()}
                        </Badge>
                        {/* <Badge
                            color={getTreatmentTypeColor(detailData.treatmentType)}
                            variant="light"
                            size="lg"
                        >
                            {detailData.treatmentType}
                        </Badge> */}
                    </Group>
                </div>
            </Card>

            <Card withBorder radius="lg" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Card.Section className="p-4 bg-gray-50 dark:bg-gray-700">
                    <Group gap="sm">
                        <IconHeartbeat size={20} className="text-red-600 dark:text-red-400" />
                        <Text fw={600} size="lg" className="text-gray-900 dark:text-white">Treatment Information</Text>
                    </Group>
                </Card.Section>
                <div className="p-4 bg-white dark:bg-gray-800">
                    <Grid>
                        <Grid.Col span={12}>
                            <Group gap="xs" className="mb-3">
                                <IconUser size={16} className="text-blue-600 dark:text-blue-400" />
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-white">Doctor:</Text>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300">{detailData.doctor}</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Group gap="xs" className="mb-3">
                                <IconCalendar size={16} className="text-green-600 dark:text-green-400" />
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-white">Date:</Text>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300">
                                    {moment(detailData.visitDate, "DD/MM/YYYY").format("MMM DD, YYYY")}
                                </Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Group gap="xs" className="mb-3">
                                <IconClock size={16} className="text-orange-600 dark:text-orange-400" />
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-white">Duration:</Text>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300">{detailData.duration}</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group gap="xs" className="mb-3">
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-white">Hospital:</Text>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300">{detailData.hospitalName}</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group gap="xs" className="mb-3">
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-white">Department:</Text>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300">{detailData.department}</Text>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>

            {/* <Card withBorder radius="lg">
                <Card.Section className="p-4 bg-gray-50 dark:bg-gray-800">
                    <Group gap="sm">
                        <IconCurrencyDollar size={20} className="text-green-600" />
                        <Text fw={600} size="lg">Cost Information</Text>
                    </Group>
                </Card.Section>
                <div className="p-4">
                    <Group justify="space-between" className="mb-4">
                        <Text size="lg" fw={500}>Treatment Cost:</Text>
                        <Text size="xl" fw={700} className="text-green-600">
                            {detailData.treatmentCost}
                        </Text>
                    </Group>
                    <Divider className="my-3" />
                    <Group justify="center">
                        {detailData.followUpRequired ? (
                            <Badge color="orange" variant="light" size="lg">
                                Follow-up Required
                            </Badge>
                        ) : (
                            <Badge color="green" variant="light" size="lg">
                                Treatment Complete
                            </Badge>
                        )}
                    </Group>
                </div>
            </Card> */}

            <Card withBorder radius="lg">
                <Card.Section className="p-4 bg-gray-50 dark:bg-gray-800">
                    <Text fw={600} size="lg">Additional Notes</Text>
                </Card.Section>
                <div className="p-4">
                    <Text size="sm" c="dimmed">
                        This treatment record contains all the essential information about the medical procedure. 
                        For any questions or concerns, please contact the healthcare provider directly.
                    </Text>
                    {detailData.followUpRequired && (
                        <Text size="sm" className="text-orange-600 mt-3" fw={500}>
                            ⚠️ Please schedule a follow-up appointment as recommended by your healthcare provider.
                        </Text>
                    )}
                </div>
            </Card>
        </div>
    );
};
