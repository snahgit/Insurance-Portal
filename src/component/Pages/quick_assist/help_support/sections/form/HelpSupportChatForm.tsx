import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Avatar, Box, Button, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { helpSupportAddEditSchema, type HelpSupportAddEditFormType } from "../../../../../../services/zod_schema/quick_assist/help_support/zodHelpSupportAddEditSchema";
import { useState } from "react";
import { IconSend } from "@tabler/icons-react";

export const HelpSupportChatForm = (props: { dataPass: any }) => {
    const { helpSupportInfo } = props.dataPass;
    // const modalDrawer = useSelector((state: RootState) => state.modalDrawer);
    const helpSupportAddEditObject = helpSupportAddEditSchema();
    const form = useFormHelper<HelpSupportAddEditFormType>({
        initialValues: {
            title: helpSupportInfo?.title || '',
            description: helpSupportInfo?.description || '',
            category: helpSupportInfo?.category?.name || '',
            priority: helpSupportInfo?.priority || '',
            message: '',
        },
        validationSchema: helpSupportAddEditObject,
        mode: 'controlled',
    });

    const { mutate: __createDepartment } = useCreateDepartment(() => {
        notifications.show({
            title: 'Success!',
            message: 'Department created successfully',
            color: 'green',
        });
        form.reset();
    });

    // const isLoading = status === "pending";
    // const mode = helpSupportInfo.id ? "edit" : "create";
    const onSubmitCall = (__formData: HelpSupportAddEditFormType) => {
        // const validatedData = helpSupportAddEditObject.parse(formData);
        // createDepartment(validatedData);
    };
    console.log(onSubmitCall);



    const [newMessage, setNewMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const dummyText = {
        "id": 1,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Unable to Login to Patient Portal",
        "description": "I'm having trouble accessing my patient portal account. The system keeps saying invalid credentials even though I'm using correct details.",
        "category": {
            "_id": "6593d4c124fd8992e00f6dea",
            "name": "Account and Login Issues",
            "category": "medical"
        },
        "messages": [
            {
                "type": "text",
                "addedBy": "user",
                "_id": "689496a9b678e92efe02cbac",
                "content": "Hello, I've been trying to log into my patient portal for the past 2 days but it keeps showing 'invalid credentials' error. I'm sure I'm using the correct email and password.",
                "createdAt": "2025-08-07T12:06:01.520Z"
            },
            {
                "type": "img",
                "addedBy": "user",
                "_id": "689496c150d3492f15868688",
                "content": "http://fs1.snah.org/uploads/defaultPath/login-error-screenshot.jpg",
                "createdAt": "2025-08-07T12:06:25.846Z"
            },
            {
                "type": "text",
                "addedBy": "user",
                "_id": "689496f9b678e92efe02cbb7",
                "content": "I've attached a screenshot of the error message. Could you please help me resolve this issue? I need to check my upcoming appointments.",
                "createdAt": "2025-08-07T12:07:21.280Z"
            }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                content: newMessage,
                addedBy: "support",
                createdAt: new Date().toISOString(),
                type: "text"
            };
            setChatMessages([...chatMessages, message]);
            setNewMessage("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Box>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <Text size="lg" fw={600} className="text-gray-800 dark:text-gray-200 mb-4">
                    Live Support Chat
                </Text>
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 h-100 flex flex-col">
                    <div className="flex-1 p-4 overflow-y-auto">
                        <Stack gap="md">
                            {dummyText.messages.map((message, index) => (
                                <div key={index} className={`flex gap-3 ${message.addedBy === 'support' ? 'flex-row-reverse' : ''}`}>
                                    <Avatar
                                        size="sm"
                                        className={`flex-shrink-0 ${message.addedBy === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}
                                    >
                                        {message.addedBy === 'user' ? 'U' : 'S'}
                                    </Avatar>
                                    <Paper
                                        className={`p-3 max-w-xs lg:max-w-md ${message.addedBy === 'user'
                                            ? 'bg-blue-100 dark:bg-blue-900'
                                            : 'bg-green-100 dark:bg-green-900'
                                            }`}
                                        radius="lg"
                                    >
                                        <Group gap="xs" className="mb-1">
                                            <Text size="xs" fw={500} className="text-gray-700 dark:text-gray-300">
                                                {message.addedBy === 'user' ? 'User' : 'Support'}
                                            </Text>
                                            <Text size="xs" className="text-gray-500 dark:text-gray-500">
                                                {formatDate(message.createdAt)}
                                            </Text>
                                        </Group>
                                        {message.type === 'img' ? (
                                            <div>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-2">
                                                    📸 Image attachment:
                                                </Text>
                                                <img
                                                    src={message.content}
                                                    alt="Attachment"
                                                    className="max-w-full h-auto rounded-md"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                                        if (nextElement) {
                                                            nextElement.style.display = 'block';
                                                        }
                                                    }}
                                                />
                                                <div style={{ display: 'none' }} className="text-gray-500 text-sm italic">
                                                    Image could not be loaded
                                                </div>
                                            </div>
                                        ) : (
                                            <Text size="sm" className="text-gray-700 dark:text-gray-300">
                                                {message.content}
                                            </Text>
                                        )}
                                    </Paper>
                                </div>
                            ))}
                            {chatMessages.map((message: any) => (
                                <div key={message.id} className="flex gap-3 flex-row-reverse">
                                    <Avatar size="sm" className="bg-green-500 flex-shrink-0">S</Avatar>
                                    <Paper className="p-3 max-w-xs lg:max-w-md bg-green-100 dark:bg-green-900" radius="lg">
                                        <Group gap="xs" className="mb-1">
                                            <Text size="xs" fw={500} className="text-gray-700 dark:text-gray-300">Support</Text>
                                            <Text size="xs" className="text-gray-500 dark:text-gray-500">
                                                {formatDate(message.createdAt)}
                                            </Text>
                                        </Group>
                                        <Text size="sm" className="text-gray-700 dark:text-gray-300">
                                            {message.content}
                                        </Text>
                                    </Paper>
                                </div>
                            ))}
                        </Stack>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <Group gap="xs">
                            <TextInput
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1"
                                size="md"
                            />
                            <Button
                                onClick={handleSendMessage}
                                leftSection={<IconSend size={16} />}
                                disabled={!newMessage.trim()}
                                size="md"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Send
                            </Button>
                        </Group>
                    </div>
                </div>
            </div>
        </Box>
    );
};
