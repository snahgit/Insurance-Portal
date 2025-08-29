import { Avatar, Box, Button, Card, Group, Text } from "@mantine/core";
import { format } from "@react-input/mask";
import {
  IconAddressBook,
  IconCalendar,
  IconDetails,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import moment from "moment";
import { useNavigate } from "react-router";

export const PatientsQuickView = (props: { dataPass: any }) => {
  const { patientInfo } = props.dataPass;
  const navigate = useNavigate();
  const options = {
    mask: "(___) ___-__-__",
    replacement: { _: /\d/ },
  };
  return (
    <Card.Section className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
      {patientInfo ? (
        <Card
          withBorder
          shadow="xl"
          radius="lg"
          className="max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <Card.Section className="p-6 patient-bg-gradient">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar
                src={patientInfo.avatar}
                size={100}
                radius="xl"
                className="border-4 border-white shadow-lg"
              />
              <div className="text-center self-center md:text-left flex-1">
                <Box>
                  <Text size="xl" fw={700} className="mb-2 text-center text-white dark:text-white">
                    {patientInfo.name.toUpperCase()}
                  </Text>
                  <Text size="sm" fw={400} className="mb-2 text-center text-white dark:text-white">
                    SNAH123658
                  </Text>
                </Box>
              </div>
            </div>
          </Card.Section>
          <Card.Section className="p-6 bg-gray-50 dark:bg-gray-800">
            <Text size="lg" fw={600} className="mb-4 text-gray-800 dark:text-gray-200">
              Contact Information
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
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
                    {patientInfo.email}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
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
                    {format(patientInfo.phone, options)}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
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
                    {moment(patientInfo.lastVisit).format("DD-MM-YYYY")}
                  </Text>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
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
          <Card.Section className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <Group justify="center" gap="md">
              <Button
                leftSection={<IconDetails size={14} />}
                variant="filled"
                color="blue"
                onClick={() =>
                  navigate("detail", { state: { id: patientInfo} })
                }
              >
                View More
              </Button>
            </Group>
          </Card.Section>
        </Card>
      ) : (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-900">
          <Text size="lg" c="dimmed" className="text-gray-600 dark:text-gray-400">
            Select a patient to view details
          </Text>
        </div>
      )}
    </Card.Section>
  );
};
