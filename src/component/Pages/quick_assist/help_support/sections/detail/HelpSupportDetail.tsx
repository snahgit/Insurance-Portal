import { Box, Card, Text, Avatar, Badge, Group, Divider } from "@mantine/core";
import { IconPhone, IconUser, IconClock, IconTag, IconAlertCircle, IconCalendar } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { HelpSupportChatForm } from "../form/HelpSupportChatForm";

export const HelpSupportDetail = () => {
  const loaderData = useLoaderData();
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Detail Ticket",
    heading: "Help & Support Ticket Details",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };

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
  console.log(handleKeyPress);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'blue';
      case 'close': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Help & Support Detail",
            items: [
              { title: "Quick Assist", href: "#" },
              { title: "Help & Support List", href: "/quick-assist/help-support" },
              { title: "Help & Support Detail", href: "#", isActive: true },
            ],
          }}
        />
      </Box>

      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white dark:bg-gray-900">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col items-center text-center lg:w-1/4">
                  <Avatar size="xl" className="mb-3 bg-blue-500">
                    <IconUser size={32} />
                  </Avatar>
                  <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">John Doe</Text>
                  <Badge color="green" variant="light" size="sm" className="mt-2">Active User</Badge>
                  <Group gap="xs" className="mt-3">
                    <IconPhone size={16} className="text-blue-600" />
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</Text>
                  </Group>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Group gap="xs" className="mb-2">
                        <IconTag size={18} className="text-blue-600" />
                        <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">Ticket ID</Text>
                      </Group>
                      <Text size="lg" fw={600} className="text-gray-800 dark:text-gray-200">#{dummyText.id}</Text>
                    </div>

                    <div>
                      <Group gap="xs" className="mb-2">
                        <IconAlertCircle size={18} className="text-orange-600" />
                        <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">Priority</Text>
                      </Group>
                      <Badge color={getPriorityColor(dummyText.priority)} variant="filled" size="md">
                        {dummyText.priority.toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <Group gap="xs" className="mb-2">
                        <IconCalendar size={18} className="text-green-600" />
                        <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">Created</Text>
                      </Group>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">
                        {formatDate(dummyText.createdAt)}
                      </Text>
                    </div>

                    <div>
                      <Group gap="xs" className="mb-2">
                        <IconClock size={18} className="text-purple-600" />
                        <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">Status</Text>
                      </Group>
                      <Badge color={getStatusColor(dummyText.status)} variant="light" size="md">
                        {dummyText.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Text size="lg" fw={600} className="text-gray-800 dark:text-gray-200 mb-2">
                      {dummyText.title}
                    </Text>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-3">
                      Category: {dummyText.category.name}
                    </Text>
                    <Text size="sm" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dummyText.description}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <Divider my="xl" size="sm" variant="dashed" color="blue" label="Support Chat" labelPosition="center" />
          </Card.Section>
          <Card.Section>
            <HelpSupportChatForm dataPass={{ helpSupportInfo: dummyText }} />
          </Card.Section>
        </Card>
      </Box>
    </Box>
  );
};