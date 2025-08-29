import { Timeline, Text } from "@mantine/core";
import { IconSchool, IconBuildingBank } from "@tabler/icons-react";

export const PhysicianEduDetail = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <Timeline active={3} bulletSize={24} lineWidth={2} className="dark:text-white">
        <Timeline.Item
          bullet={<IconSchool size={12} />}
          title="SNAH medical school"
        >
          <Text c="dimmed" size="md" className="flex align-center justify-start text-gray-600 dark:text-gray-300">
            <Text size="md" className="font-semibold text-gray-900 dark:text-white">
              Department
            </Text>
            : Medical Doctor
          </Text>
          <Text c="dimmed" size="sm" className="text-gray-600 dark:text-gray-400">
            General Practice
          </Text>
          <Text size="xs" mt={4} className="text-gray-500 dark:text-gray-400">
            02/01/2024 - 02/02/2024
          </Text>
        </Timeline.Item>
        <Timeline.Item
          bullet={<IconSchool size={12} />}
          title="SNAH medical school"
        >
          <Text c="dimmed" size="md" className="flex align-center justify-start text-gray-600 dark:text-gray-300">
            <Text size="md" className="font-semibold text-gray-900 dark:text-white">
              Department
            </Text>
            : Medical Doctor
          </Text>
          <Text c="dimmed" size="sm" className="text-gray-600 dark:text-gray-400">
            General Practice
          </Text>
          <Text size="xs" mt={4} className="text-gray-500 dark:text-gray-400">
            02/01/2024 - 02/02/2024
          </Text>
        </Timeline.Item>
        <Timeline.Item
          bullet={<IconBuildingBank size={12} />}
          title="SNAH medical school"
        >
          <Text c="dimmed" size="md" className="flex align-center justify-start text-gray-600 dark:text-gray-300">
            <Text size="md" className="font-semibold text-gray-900 dark:text-white">
              Department
            </Text>
            : Medical Doctor
          </Text>
          <Text c="dimmed" size="sm" className="text-gray-600 dark:text-gray-400">
            General Practice
          </Text>
          <Text size="xs" mt={4} className="text-gray-500 dark:text-gray-400">
            02/01/2024 - 02/02/2024
          </Text>
        </Timeline.Item>
        <Timeline.Item
          bullet={<IconBuildingBank size={12} />}
          title="SNAH medical school"
        >
          <Text c="dimmed" size="md" className="flex align-center justify-start text-gray-600 dark:text-gray-300">
            <Text size="md" className="font-semibold text-gray-900 dark:text-white">
              Department
            </Text>
            : Medical Doctor
          </Text>
          <Text c="dimmed" size="sm" className="text-gray-600 dark:text-gray-400">
            General Practice
          </Text>
          <Text size="xs" mt={4} className="text-gray-500 dark:text-gray-400">
            02/01/2024 - 02/02/2024
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
