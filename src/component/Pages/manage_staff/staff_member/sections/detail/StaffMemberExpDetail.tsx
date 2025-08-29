import { Timeline, Text } from "@mantine/core";
import { IconBriefcase2 } from "@tabler/icons-react";

export const StaffMemberExpDetail = () => {
  return (
    <Timeline active={3} bulletSize={24} lineWidth={2}>
      <Timeline.Item
        bullet={<IconBriefcase2 size={12} />}
        title="General Practice"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Postion
          </Text>
          : CMO
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconBriefcase2 size={12} />}
        title="General Practice"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Postion
          </Text>
          : CMO
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconBriefcase2 size={12} />}
        title="General Practice"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Postion
          </Text>
          : CMO
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconBriefcase2 size={12} />}
        title="General Practice"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Postion
          </Text>
          : CMO
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
    </Timeline>
  );
};