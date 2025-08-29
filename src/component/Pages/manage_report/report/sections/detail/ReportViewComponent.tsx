import { Box, Card, Image, Group, ActionIcon, Tooltip, Text, Stack, Badge, Paper } from "@mantine/core";
import { IconEye, IconDownload, IconMaximize, IconX } from "@tabler/icons-react";
import { useState } from "react";

export const ReportViewComponent = (props: { dataPass: any }) => {
    const { selectedImage } = props.dataPass;
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleDownload = () => {
        if (selectedImage) {
            const link = document.createElement('a');
            link.href = selectedImage;
            link.download = `report_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleViewInNewTab = () => {
        if (selectedImage) {
            window.open(selectedImage, '_blank');
        }
    };

    if (isFullscreen) {
        return (
            <Box className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                    <ActionIcon
                        variant="filled"
                        color="red"
                        size="xl"
                        className="absolute top-4 right-4 z-10"
                        onClick={handleFullscreen}
                    >
                        <IconX size={24} />
                    </ActionIcon>
                    <Image
                        src={selectedImage}
                        alt="Report preview - Fullscreen"
                        className="max-w-full max-h-full object-contain"
                        fallbackSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                    />
                </div>
            </Box>
        );
    }

    return (
        <Box>
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                <Card.Section>
                    <div className="relative">
                        <Image
                            src={selectedImage}
                            alt="Report preview"
                            className="w-full h-auto max-h-[60vh] object-contain bg-gray-50 dark:bg-gray-900"
                            fallbackSrc="https://via.placeholder.com/500x500?text=Image+Not+Available"
                        />

                        {/* Overlay controls */}
                        <div className="absolute top-4 right-4">
                            <Group gap="xs">
                                <Tooltip label="Fullscreen View">
                                    <ActionIcon
                                        variant="filled"
                                        color="blue"
                                        size="lg"
                                        onClick={handleFullscreen}
                                        className="backdrop-blur-sm bg-blue-600/80 hover:bg-blue-700/90"
                                    >
                                        <IconMaximize size={18} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </div>
                    </div>
                </Card.Section>

                <Card.Section className="p-4">
                    <Stack gap="md">
                        <div className="flex items-center justify-between">
                            <div>
                                <Text size="lg" fw={600} className="text-gray-800 dark:text-gray-200">
                                    Report Preview
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Medical document viewer
                                </Text>
                            </div>
                            <Badge variant="light" color="blue" size="lg">
                                High Quality
                            </Badge>
                        </div>

                        <Paper className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <Group justify="space-between" align="center">
                                <div>
                                    <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">
                                        Quick Actions
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        View, download, or open in new tab
                                    </Text>
                                </div>
                                <Group gap="sm">
                                    <Tooltip label="View in New Tab">
                                        <ActionIcon
                                            variant="light"
                                            color="blue"
                                            size="lg"
                                            onClick={handleViewInNewTab}
                                        >
                                            <IconEye size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Download Image">
                                        <ActionIcon
                                            variant="light"
                                            color="green"
                                            size="lg"
                                            onClick={handleDownload}
                                        >
                                            <IconDownload size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </Group>
                        </Paper>

                        <div className="text-center">
                            <Text size="xs" c="dimmed" className="italic">
                                Click the fullscreen button for a better viewing experience
                            </Text>
                        </div>
                    </Stack>
                </Card.Section>
            </Card>
        </Box>
    );
};
