import { Card, Group, Text, ActionIcon, Button, Stack, Title, Grid, Box, Tooltip, Badge, Divider } from '@mantine/core';
import { IconCalendar, IconPencil, IconPlus } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { PageNoDataFound } from '../../../common/PageNoDataFound';
import { PageModal } from '../../../common/PageModal';
import moment from 'moment';
import { ProfileInsuranceCoveredForm } from '../form/ProfileInsuranceCoveredForm';

interface InsuranceCoveredType {
  selectInsurance: string;
  startDate: string;
  providerId: string;
  endYear: number;
}

export const ProfileInsuranceCovered = (props: { dataPass: any }) => {
  const { isEditProfileActive } = props.dataPass;
  const [insuranceCoveredData, setInsuranceCoveredData] = useState<any>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);
  const [insuranceCovered] = useState<InsuranceCoveredType[]>([
    {
      selectInsurance: "Test Insurance One",
      startDate: "12/01/2022",
      providerId: "PROID1234",
      endYear: 2,
    },
    {
      selectInsurance: "Test Insurance Two",
      startDate: "12/01/2022",
      providerId: "PROID1235",
      endYear: 1,
    },
    {
      selectInsurance: "Test Insurance Thre",
      startDate: "12/01/2022",
      providerId: "PROID1236",
      endYear: 3,
    },
    {
      selectInsurance: "Test Insurance Four",
      startDate: "12/01/2022",
      providerId: "PROID1237",
      endYear: 4,
    }
  ]);

  const handleModal = (data: any) => {
    setInsuranceCoveredData(data);
    setTimeout(() => modalApiRef.current?.open?.(), 0)
  };

  return (
    <Box>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "md",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
            zIndex: 300,
          },
          component: <ProfileInsuranceCoveredForm dataPass={{ insuranceCoveredData }} />,
          title: insuranceCoveredData != null ? "Update insurance" : "Add insurance",
        }} />
      <div className="max-w-7xl mx-auto">
        {isEditProfileActive && (
          <Card className="p-6 mb-8" radius="md">
            <Group justify="space-between">
              <div>
                <Title order={2} c="var(--mantine-color-text)">Insurance covered</Title>
                <Text size="sm" c="dimmed" mt={4}>Manage your insurance covered documents</Text>
              </div>
              <Button
                leftSection={<IconPlus size={18} />}
                onClick={() => handleModal(null)}
                variant="gradient"
                gradient={{ from: 'blue', to: 'indigo', deg: 45 }}
                className="transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                size="md"
                radius="md"
              >
                Add Insurance
              </Button>
            </Group>
          </Card>
        )}
        {insuranceCovered.length === 0 ? (
          <Card className="text-center" radius="md">
            <PageNoDataFound dataPass={{
              title: "No Insurance Covered Found",
              description: "There are currently no Insurance Covered documents to display. This could be because:",
              reasons: [
                "• No Insurance Covered documents have been uploaded yet",
                "• All Insurance Covered documents may have been deleted",
                "• There might be a connectivity issue"
              ]
            }} />
          </Card>
        ) : (
          <Grid>
            {insuranceCovered.map((doc, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 6 }}>
                <Card key={index} withBorder className="bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <Card.Section className="bg-blue-100 dark:bg-gray-700 dark:opacity-70 px-4 py-2">
                    <Group justify="space-between">
                      <Badge color="blue" variant="filled" size="sm">{moment(doc.startDate).format('MMMM Do YYYY')}</Badge>
                      {isEditProfileActive && (
                        <Tooltip label="Edit document">
                          <ActionIcon variant="light" color="blue" size="sm" radius="sm"
                            onClick={() => handleModal(doc)}
                            className="shadow-lg hover:shadow-xl transition-all duration-200">
                            <IconPencil size={14} className="text-blue-600 dark:text-blue-100" />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </Group>
                  </Card.Section>
                  <Stack gap="md" className='mt-3'>
                    <div>
                      <Text size="lg" fw={600} className="text-gray-800 dark:text-blue-300 mb-1">{doc.selectInsurance}</Text>
                      <Text size="sm" className="text-gray-600 dark:text-blue-100">{doc.providerId}</Text>
                    </div>
                    <Divider />
                    <div className="space-y-2">
                      <Group gap="xs">
                        <IconCalendar size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" fw={500} className="text-gray-600 dark:text-gray-50">{moment(doc.startDate).format('MMMM Do YYYY')}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50">End in {doc.endYear} year</Text>
                      </Group>
                    </div>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

        )}
      </div>
    </Box>
  );
};