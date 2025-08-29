import { Group, Text, Anchor, Divider, Box } from "@mantine/core";
import moment from "moment";

export default function Footer() {
  return (
    <Box className="border-gray-200 mt-auto py-1">
      <Group justify="space-between" className="flex-col md:flex-row gap-4 md:gap-0" >
        <Text size="sm" c="dimmed" className="text-center md:text-left">©️ {moment().format('YYYY')} SNAH Healthcare Software Management. All rights reserved.</Text>
        <Group gap="lg" className="flex-wrap justify-center md:justify-end">
          <Anchor href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" >Privacy Policy</Anchor>
          <Divider orientation="vertical" className="hidden sm:block h-4 border-gray-300" />
          <Anchor href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" >Terms & Conditions</Anchor>
        </Group>
      </Group>
    </Box>
  );
}
