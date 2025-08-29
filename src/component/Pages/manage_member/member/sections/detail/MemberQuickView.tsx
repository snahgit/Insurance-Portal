import { Box, Card, Text, Group, Button, Avatar } from "@mantine/core";
import { format } from "@react-input/mask";
import { IconAddressBook, IconCalendar, IconDetails, IconPhone, } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export const MemberQuickView = (props: { dataPass: any }) => {
    const { staffMemberInfo } = props.dataPass;
    const navigate = useNavigate();
    const options = {
        mask: "(___) ___-__-__",
        replacement: { _: /\d/ },
    };

    return (
        <Card.Section className="rounded-lg overflow-hidden">
            {staffMemberInfo ? (
                <Card
                    withBorder
                    shadow="xl"
                    radius="lg"
                    className="max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-800"
                >
                    <Card.Section className="p-6 patient-bg-gradient dark:from-blue-900/40 dark:to-purple-900/40">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Avatar
                                src={staffMemberInfo.avatar}
                                size={100}
                                radius="xl"
                                className="border-4 border-white dark:border-gray-300 shadow-lg"
                            />
                            <div className="text-center self-center md:text-left flex-1">
                                <Box>
                                    <Text size="xl" fw={700} className="mb-2 text-center text-gray-900 dark:text-white">
                                        {staffMemberInfo.name.toUpperCase()}
                                    </Text>
                                    <Text size="sm" fw={400} className="mb-2 text-center text-gray-600 dark:text-gray-300">
                                        SNAH123658
                                    </Text>
                                </Box>
                            </div>
                        </div>
                    </Card.Section>
                    <Card.Section className="p-6 bg-gray-50 dark:bg-gray-700">
                        <Text size="lg" fw={600} className="mb-4 text-gray-800 dark:text-white">
                            Other Information
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-600">
                                <IconPhone size={20} className="text-blue-500 dark:text-blue-400" />
                                <div>
                                    <Text size="xs" c="dimmed" className="uppercase tracking-wide dark:text-gray-400" >
                                        Phone
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                                        {format(staffMemberInfo.phone, options)}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-600">
                                <IconCalendar size={20} className="text-blue-500 dark:text-blue-400" />
                                <div>
                                    <Text size="xs" c="dimmed" className="uppercase tracking-wide dark:text-gray-400" >
                                        Member Id
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                                        {staffMemberInfo.memberId}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-600">
                                <IconCalendar size={20} className="text-blue-500 dark:text-blue-400" />
                                <div>
                                    <Text size="xs" c="dimmed" className="uppercase tracking-wide dark:text-gray-400" >
                                        SSN
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                                        {staffMemberInfo.ssn}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-600">
                                <IconCalendar size={20} className="text-blue-500 dark:text-blue-400" />
                                <div>
                                    <Text size="xs" c="dimmed" className="uppercase tracking-wide dark:text-gray-400" >
                                        Plan Type
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                                        {staffMemberInfo.planType}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-600">
                                <IconAddressBook size={20} className="text-blue-500 dark:text-blue-400" />
                                <div>
                                    <Text size="xs" c="dimmed" className="uppercase tracking-wide dark:text-gray-400" >
                                        Address
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                                        J98X+94 , Bethuadahari , West Bengal , 741126 , India
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Card.Section>
                    <Card.Section className="p-6 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                        <Group justify="center" gap="md">
                            <Button
                                leftSection={<IconDetails size={14} />}
                                variant="filled"
                                color="blue"
                                onClick={() =>
                                    navigate("detail", { state: { id: staffMemberInfo } })
                                }
                            >
                                View More
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
            ) : (
                <div className="text-center p-8 bg-white dark:bg-gray-800">
                    <Text size="lg" c="dimmed" className="text-gray-600 dark:text-gray-400">
                        Select a patient to view details
                    </Text>
                </div>
            )}
        </Card.Section>
    );
};
