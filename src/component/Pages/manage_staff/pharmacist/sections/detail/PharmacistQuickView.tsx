import { Box, Card, Text, Group, Button, Avatar } from "@mantine/core";
import { format } from "@react-input/mask";
import { IconAddressBook, IconCalendar, IconDetails, IconMail, IconPhone, } from "@tabler/icons-react";
import moment from "moment";
import { useNavigate } from "react-router";

export const PharmacistQuickView = (props: { dataPass: any }) => {
    const { pharmacistInfo } = props.dataPass;
    const navigate = useNavigate();
    const options = {
        mask: "(___) ___-__-__",
        replacement: { _: /\d/ },
    };

    return (
        <Card.Section className="rounded-lg overflow-hidden">
            {pharmacistInfo ? (
                <Card
                    withBorder
                    shadow="xl"
                    radius="lg"
                    className="max-w-4xl mx-auto overflow-hidden"
                >
                    <Card.Section className="p-6 patient-bg-gradient">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Avatar
                                src={pharmacistInfo.avatar}
                                size={100}
                                radius="xl"
                                className="border-4 border-white shadow-lg"
                            />
                            <div className="text-center self-center md:text-left flex-1">
                                <Box>
                                    <Text size="xl" fw={700} className="mb-2 text-center">
                                        {pharmacistInfo.name.toUpperCase()}
                                    </Text>
                                    <Text size="sm" fw={400} className="mb-2 text-center">
                                        SNAH123658
                                    </Text>
                                </Box>
                            </div>
                        </div>
                    </Card.Section>
                    <Card.Section className="p-6 bg-gray-50">
                        <Text size="lg" fw={600} className="mb-4 text-gray-800">
                            Contact Information
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                <IconMail size={20} className="text-blue-500" />
                                <div>
                                    <Text
                                        size="xs"
                                        c="dimmed"
                                        className="uppercase tracking-wide"
                                    >
                                        Email
                                    </Text>
                                    <Text size="sm" fw={500}>
                                        {pharmacistInfo.email}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                <IconPhone size={20} className="text-blue-500" />
                                <div>
                                    <Text
                                        size="xs"
                                        c="dimmed"
                                        className="uppercase tracking-wide"
                                    >
                                        Phone
                                    </Text>
                                    <Text size="sm" fw={500}>
                                        {format(pharmacistInfo.phone, options)}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                <IconCalendar size={20} className="text-blue-500" />
                                <div>
                                    <Text
                                        size="xs"
                                        c="dimmed"
                                        className="uppercase tracking-wide"
                                    >
                                        Date Of Birth
                                    </Text>
                                    <Text size="sm" fw={500}>
                                        {moment(pharmacistInfo.lastVisit).format("DD-MM-YYYY")}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                <IconAddressBook size={20} className="text-blue-500" />
                                <div>
                                    <Text
                                        size="xs"
                                        c="dimmed"
                                        className="uppercase tracking-wide"
                                    >
                                        Address
                                    </Text>
                                    <Text size="sm" fw={500}>
                                        J98X+94 , Bethuadahari , West Bengal , 741126 , India
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Card.Section>
                    <Card.Section className="p-6 bg-white border-t">
                        <Group justify="center" gap="md">
                            <Button
                                leftSection={<IconDetails size={14} />}
                                variant="filled"
                                color="blue"
                                onClick={() =>
                                    navigate("detail", { state: { id: pharmacistInfo.id } })
                                }
                            >
                                View More
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
            ) : (
                <div className="text-center p-8">
                    <Text size="lg" c="dimmed">
                        Select a patient to view details
                    </Text>
                </div>
            )}
        </Card.Section>
    );
};
