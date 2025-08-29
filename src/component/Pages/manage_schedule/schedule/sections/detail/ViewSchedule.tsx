import { Badge, Card, Text, Title, Group } from "@mantine/core";
import { IconInfoCircle, IconClock } from "@tabler/icons-react";

const ViewSchedule = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <Card.Section className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
          <Group>
            <IconInfoCircle size={20} className="text-blue-600 dark:text-blue-400" />
            <Title order={5} className="text-blue-700 dark:text-blue-300">Schedule Information</Title>
          </Group>
        </Card.Section>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium">
                Physician Name
              </Text>
              <Text size="sm" className="text-gray-900 dark:text-gray-100 font-semibold">
                Test MP MF
              </Text>
            </div>

            <div className="space-y-1">
              <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium">
                Physician ID
              </Text>
              <Text size="sm" className="text-gray-900 dark:text-gray-100 font-semibold">
                MFPHY566146
              </Text>
            </div>

            <div className="space-y-1">
              <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium">
                Schedule Date
              </Text>
              <Text size="sm" className="text-gray-900 dark:text-gray-100 font-semibold">
                12/02/2025
              </Text>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <Card.Section className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
          <Group>
            <IconClock size={20} className="text-green-600 dark:text-green-400" />
            <Title order={5} className="text-green-700 dark:text-green-300">Time Slots</Title>
          </Group>
        </Card.Section>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Badge
                variant="light"
                color="blue"
                size="lg"
                radius="sm"
                className="m-auto py-2 px-4 w-full"
              >
                9:00 - 10:00
              </Badge>
              <Badge
                variant="light"
                color="blue"
                size="lg"
                radius="sm"
                className="m-auto py-2 px-4 w-full"
              >
                10:00 - 11:00
              </Badge>
              <Badge
                variant="light"
                color="blue"
                size="lg"
                radius="sm"
                className="m-auto py-2 px-4 w-full"
              >
                11:00 - 12:00
              </Badge>
              </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewSchedule;
