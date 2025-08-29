import { Avatar, Box, Button, Card, Group, Text } from "@mantine/core";
import { format } from "@react-input/mask";
import {
  IconAddressBook,
  IconCalendar,
  IconDetails,
  IconMail,
  IconPhone,
  IconUserCheck,
} from "@tabler/icons-react";
import moment from "moment";
import { useNavigate } from "react-router";

export const PhysicianQuicView = (props: { dataPass: any }) => {
  const { physicianData } = props.dataPass;
  console.log(physicianData);

  const navigate = useNavigate();
  const options = {
    mask: "(___) ___-__-__",
    replacement: { _: /\d/ },
  };
  return (
    <Card.Section className="rounded-lg overflow-hidden">
      {physicianData ? (
        <Card
          withBorder
          shadow="xl"
          radius="lg"
          className="max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <Card.Section className="p-6 dark:bg-gray-700 bg-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar
                src="https://i.pravatar.cc/150?img=64"
                size={100}
                radius="lg"
                className="border-4 border-white dark:border-gray-600 shadow-lg"
              />
              <div className="text-center self-center md:text-left flex-1">
                <Box className="flex flex-col md:flex-row md:items-center gap-2 justify-center">
                  <Text size="xl" fw={700} className="text-center text-gray-900 dark:text-white">
                    {physicianData.physician_name.toUpperCase()}
                  </Text>
                  <Text size="sm" fw={400} className="text-center text-gray-700 dark:text-gray-300">
                    (Medical Provider)
                  </Text>
                </Box>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center">
                    <Text size="xs" className="uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Medical Providers ID:
                    </Text>
                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                      {physicianData.physician_iD}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card.Section>
          <Card.Section className="p-6 bg-gray-50 dark:bg-gray-800">
            <Text size="lg" fw={600} className="mb-4 text-gray-800 dark:text-white">
              Contact Information
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <IconMail size={20} className="text-blue-500 dark:text-blue-400" />
                <div>
                  <Text
                    size="xs"
                    c="dimmed"
                    className="uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    Email
                  </Text>
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                    {physicianData.email}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <IconPhone size={20} className="text-blue-500 dark:text-blue-400" />
                <div>
                  <Text
                    size="xs"
                    c="dimmed"
                    className="uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    Phone
                  </Text>
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                    {format(physicianData.phone, options)}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <IconCalendar size={20} className="text-blue-500 dark:text-blue-400" />
                <div>
                  <Text
                    size="xs"
                    c="dimmed"
                    className="uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    Date Of Birth
                  </Text>
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                    {moment().format("DD-MM-YYYY")}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <IconUserCheck size={20} className="text-blue-500 dark:text-blue-400" />
                <div>
                  <Text
                    size="xs"
                    c="dimmed"
                    className="uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    Gender
                  </Text>
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                    {physicianData.gender}
                  </Text>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <IconAddressBook size={20} className="text-blue-500 dark:text-blue-400" />
                <div>
                  <Text
                    size="xs"
                    c="dimmed"
                    className="uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    Address
                  </Text>
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                    J98X+94 , Bethuadahari , West Bengal , 741126 , India
                  </Text>
                </div>
              </div>
            </div>
          </Card.Section>
          <Card.Section className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
            <Group justify="center" gap="md">
              <Button
                leftSection={<IconDetails size={14} />}
                variant="filled"
                color="blue"
                onClick={() => navigate("detail")}
              >
                View More
              </Button>
            </Group>
          </Card.Section>
        </Card>
      ) : (
        <div className="text-center p-8">
          <Text size="lg" c="dimmed" className="text-gray-600 dark:text-gray-400">
            Select a patient to view details
          </Text>
        </div>
      )}
    </Card.Section>
  );
}
