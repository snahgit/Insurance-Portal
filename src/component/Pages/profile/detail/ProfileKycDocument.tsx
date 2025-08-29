import { Card, Group, Text, ActionIcon, Button, Image, Stack, Title, Grid, Box, Tooltip } from '@mantine/core';
import { IconPencil, IconPlus, IconEye } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { PageNoDataFound } from '../../../common/PageNoDataFound';
import { PageModal } from '../../../common/PageModal';
import { ProfileKycDocumentForm } from '../form/ProfileKycDocumentForm';

interface KycDocumentType {
  documentType: string;
  documentNumber: string;
  document: string;
}

export const ProfileKycDocument = (props: { dataPass: any }) => {
  const { isEditProfileActive } = props.dataPass;
  const [kycDocumentData, setKycDocumentData] = useState<any>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);
  const [kycDocument] = useState<KycDocumentType[]>([
    {
      documentType: "eni",
      documentNumber: "DOC123",
      document: "/images/loginbg.jpg",
    },
    {
      documentType: "business license",
      documentNumber: "DOC124",
      document: "/images/loginbg.jpg",
    },
    {
      documentType: "business license",
      documentNumber: "DOC125",
      document: "/images/loginbg.jpg",
    },
    {
      documentType: "eni",
      documentNumber: "DOC126",
      document: "/images/loginbg.jpg",
    }
  ]);

  const handleViewDocument = (document: string) => {
    console.log('View document:', document);
  };

  const handleModal = (data: any) => {
    setKycDocumentData(data);
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
            size: "xl",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
            zIndex: 300,
          },
          component: <ProfileKycDocumentForm dataPass={{ kycDocumentData }} />,
          title: kycDocumentData != null ? "Update kyc document" : "Add kyc document",
        }} />
      <div className="max-w-7xl mx-auto">
        {isEditProfileActive && (
          <Card className="p-6 mb-8" radius="md">
            <Group justify="space-between">
              <div>
                <Title order={2} c="var(--mantine-color-text)">KYC Documents</Title>
                <Text size="sm" c="dimmed" mt={4}>Manage your Know Your Customer documents</Text>
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
                Add Document
              </Button>
            </Group>
          </Card>
        )}
        {kycDocument.length === 0 ? (
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
            {kycDocument.map((doc, index) => (
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
                  <Stack gap="md" className="mt-4">
                    <Box className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Image src={doc.document}
                        alt={`${doc.documentType} document`}
                        height={200}
                        className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => handleViewDocument(doc.document)}
                        fallbackSrc="/images/placeholder.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </Box>
                    <Stack gap="sm">
                      <Box>
                        <Text size="xs" className="tracking-wider font-semibold">Document Type</Text>
                        <Text size="sm" fw={700} className="font-mono tracking-wider text-teal-600 dark:text-teal-400">{doc.documentType}</Text>
                      </Box>
                      <Box>
                        <Text size="xs" className="tracking-wider font-semibold">Document Number</Text>
                        <Text size="sm" fw={700} className="font-mono tracking-wider text-teal-600 dark:text-teal-400">{doc.documentNumber}</Text>
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