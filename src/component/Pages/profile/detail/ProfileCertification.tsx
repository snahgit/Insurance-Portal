import { Card, Group, Text, ActionIcon, Button, Image, Stack, Title, Grid, Box, Tooltip } from '@mantine/core';
import { IconPencil, IconPlus, IconEye } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { PageNoDataFound } from '../../../common/PageNoDataFound';
import { PageModal } from '../../../common/PageModal';
import moment from 'moment';
import { ProfileCertificationForm } from '../form/ProfileCertificationForm';

interface CertificationType {
  date: string;
  document: string;
}

export const ProfileCertification = (props: { dataPass: any }) => {
  const { isEditProfileActive } = props.dataPass;
  const [certificationData, setcertificationData] = useState<any>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);
  const [certification] = useState<CertificationType[]>([
    {
      date: "12/31/2022",
      document: "/images/loginbg.jpg",
    },
    {
      date: "09/27/2025",
      document: "/images/loginbg.jpg",
    },
    {
      date: "05/15/2019",
      document: "/images/loginbg.jpg",
    },
    {
      date: "01/05/2032",
      document: "/images/loginbg.jpg",
    }
  ]);

  const handleViewDocument = (document: string) => {
    console.log('View document:', document);
  };

  const handleModal = (data: any) => {
    setcertificationData(data);
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
          component: <ProfileCertificationForm dataPass={{ certificationData }} />,
          title: certificationData != null ? "Update your certificate" : "Add your certificate",
        }} />
      <div className="max-w-7xl mx-auto">
        {isEditProfileActive && (
          <Card className="p-6 mb-8" radius="md">
            <Group justify="space-between">
              <div>
                <Title order={2} c="var(--mantine-color-text)">Certification</Title>
                <Text size="sm" c="dimmed" mt={4}>Manage your Know Your Customer certifications</Text>
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
                Add Certification
              </Button>
            </Group>
          </Card>
        )}
        {certification.length === 0 ? (
          <Card className="text-center" radius="md">
            <PageNoDataFound dataPass={{
              title: "No KYC Documents Found",
              description: "There are currently no KYC documents to display. This could be because:",
              reasons: [
                "• No KYC documents have been uploaded yet",
                "• All KYC documents may have been deleted",
                "• There might be a connectivity issue"
              ]
            }} />
          </Card>
        ) : (
          <Grid>
            {certification.map((doc, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 6 }}>
                <Card key={index} withBorder className="bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <Card.Section className="bg-blue-100 dark:bg-gray-700 dark:opacity-70 px-4 py-2">
                    <Group justify="end" gap="sm">
                      <Tooltip label="View document">
                        <ActionIcon variant="filled" color="blue" size="sm" radius="sm"
                          onClick={() => handleViewDocument(doc.document)}
                          className="shadow-lg hover:shadow-xl transition-all duration-200">
                          <IconEye size={14} />
                        </ActionIcon>
                      </Tooltip>
                      {isEditProfileActive && (
                        <Tooltip label="Edit document">
                          <ActionIcon variant="filled" color="orange" size="sm" radius="sm"
                            onClick={() => handleModal(doc)}
                            className="shadow-lg hover:shadow-xl transition-all duration-200">
                            <IconPencil size={14} />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </Group>
                  </Card.Section>
                  <Stack gap="md" className='mt-3'>
                    <Box className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Image src={doc.document}
                        alt='document'
                        height={200}
                        className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => handleViewDocument(doc.document)}
                        fallbackSrc="/images/placeholder.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </Box>
                    <Stack gap="sm">
                      <Box>
                        <Text size="xs" className="tracking-wider font-semibold">Date</Text>
                        <Text size="sm" fw={700} className="font-mono tracking-wider text-teal-600 dark:text-teal-400">{moment(doc.date).format('MMMM Do YYYY')}</Text>
                      </Box>
                    </Stack>
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