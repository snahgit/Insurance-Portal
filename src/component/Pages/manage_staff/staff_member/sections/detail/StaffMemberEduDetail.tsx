import { Timeline, Text } from "@mantine/core";
import { IconSchool, IconBuildingBank } from "@tabler/icons-react";

export const StaffMemberEduDetail = () => {
  return (
    <Timeline active={3} bulletSize={24} lineWidth={2}>
      <Timeline.Item
        bullet={<IconSchool size={12} />}
        title="SNAH medical school"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Department
          </Text>
          : Medical Doctor
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconSchool size={12} />}
        title="SNAH medical school"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Department
          </Text>
          : Medical Doctor
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconBuildingBank size={12} />}
        title="SNAH medical school"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Department
          </Text>
          : Medical Doctor
        </Text>
        <Text c="dimmed" size="sm">
          General Practice
        </Text>
        <Text size="xs" mt={4}>
          02/01/2024 - 02/02/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconBuildingBank size={12} />}
        title="SNAH medical school"
      >
        <Text c="dimmed" size="md" className="flex align-center justify-start">
          <Text size="md" className="font-semibold">
            Department
          </Text>
          : Medical Doctor
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