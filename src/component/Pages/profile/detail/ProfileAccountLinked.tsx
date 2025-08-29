import { Card, Group, Text, ActionIcon, Button, Stack, Title, Grid, Box, Tooltip, Divider } from '@mantine/core';
import { IconPencil, IconPlus, IconBuildingBank, IconBuilding, IconRoute, IconId, IconUser, IconHome, IconMapPin, IconMap, IconMail } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { PageNoDataFound } from '../../../common/PageNoDataFound';
import { PageModal } from '../../../common/PageModal';
import { ProfileAccountLinkedForm } from '../form/ProfileAccountLinkedForm';

interface AccountLinkedType {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  routingNumber: string;
  accountType: string;
  accountOwnership: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const ProfileAccountLinked = (props: { dataPass: any }) => {
  const { isEditProfileActive } = props.dataPass;
  const [accountLinkedData, setAccountLinkedData] = useState<any>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);
  const [accountLinked] = useState<AccountLinkedType[]>([
    {
      accountHolderName: 'John Doe',
      accountNumber: '123456789',
      bankName: 'Bank of America',
      branchName: 'Main Branch',
      routingNumber: '987654321',
      accountType: 'Checking',
      accountOwnership: 'Individual',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    }, {
      accountHolderName: 'John Doe',
      accountNumber: '123456789',
      bankName: 'Bank of America',
      branchName: 'Main Branch',
      routingNumber: '987654321',
      accountType: 'Checking',
      accountOwnership: 'Individual',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    }, {
      accountHolderName: 'John Doe',
      accountNumber: '123456789',
      bankName: 'Bank of America',
      branchName: 'Main Branch',
      routingNumber: '987654321',
      accountType: 'Checking',
      accountOwnership: 'Individual',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    }, {
      accountHolderName: 'John Doe',
      accountNumber: '123456789',
      bankName: 'Bank of America',
      branchName: 'Main Branch',
      routingNumber: '987654321',
      accountType: 'Checking',
      accountOwnership: 'Individual',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    },
  ]);

  const handleModal = (data: any) => {
    setAccountLinkedData(data);
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
          component: <ProfileAccountLinkedForm dataPass={{ accountLinkedData }} />,
          title: accountLinkedData != null ? "Update your account" : "Add new account",
        }} />
      <div className="max-w-7xl mx-auto">
        {isEditProfileActive && (
          <Card className="p-6 mb-8" radius="md">
            <Group justify="space-between">
              <div>
                <Title order={2} c="var(--mantine-color-text)">Account Linked</Title>
                <Text size="sm" c="dimmed" mt={4}>Manage your account linked</Text>
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
                Add Account
              </Button>
            </Group>
          </Card>
        )}
        {accountLinked.length === 0 ? (
          <Card className="text-center" radius="md">
            <PageNoDataFound dataPass={{
              title: "No Account Linked Found",
              description: "There are currently no Account Linked documents to display. This could be because:",
              reasons: [
                "• No Account Linked documents have been uploaded yet",
                "• All Account Linked documents may have been deleted",
                "• There might be a connectivity issue"
              ]
            }} />
          </Card>
        ) : (
          <Grid>
            {accountLinked.map((doc, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 6 }}>
                <Card key={index} withBorder className="bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  {isEditProfileActive && (
                    <Card.Section className="bg-blue-100 dark:bg-gray-700 dark:opacity-70 px-4 py-2">
                      <Group justify="end" gap="sm">
                        <Tooltip label="Edit document">
                          <ActionIcon variant="filled" color="orange" size="sm" radius="sm"
                            onClick={() => handleModal(doc)}
                            className="shadow-lg hover:shadow-xl transition-all duration-200">
                            <IconPencil size={14} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Card.Section>
                  )}
                  <Stack gap="md" className={isEditProfileActive ? 'mt-3' : ''}>
                    <div>
                      <Text size="lg" fw={600} className="text-gray-800 dark:text-blue-300 mb-1 text-center">{doc.accountHolderName}</Text>
                    </div>
                    <Divider />
                    <div className="space-y-2">
                      <Group gap="xs">
                        <IconBuildingBank size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Acc Number: </b>{doc.accountNumber}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconBuildingBank size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Bank: </b>{doc.bankName}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconBuilding size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Branch: </b>{doc.branchName}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconRoute size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Routing: </b>{doc.routingNumber}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconId size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Type: </b>{doc.accountType}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconUser size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Ownership: </b>{doc.accountOwnership}</Text>
                      </Group>
                      <Group gap="xs">
                        <Divider />
                      </Group>
                      <Group gap="xs">
                        <IconHome size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Street: </b>{doc.street}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconMapPin size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>City: </b>{doc.city}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconMap size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>State: </b>{doc.state}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconMail size={14} className="text-gray-500 dark:text-gray-50" />
                        <Text size="sm" className="text-gray-600 dark:text-gray-50"><b>Zip Code: </b>{doc.zipCode}</Text>
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

// accountHolderName
// accountNumber
// bankName
// branchName
// routingNumber
// accountType
// accountOwnership
// street
// city
// state
// zipCode