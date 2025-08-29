import { Divider, Group, Paper, Text } from "@mantine/core";
import { IconCalendar, IconListDetails, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import moment from "moment";
import { format } from '@react-input/mask'
import { Fragment } from "react/jsx-runtime";

export const ProfileDetail = (props: { dataPass: any }) => {
  const { profileData, type } = props.dataPass;
  const options = {
    mask: '(___) ___-__-__',
    replacement: { _: /\d/ },
  };

  return (
    <Fragment>
      {type === 'basic' && (
        <Fragment>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4">
            <div className="space-y-3">
              <Group gap="xs" className="items-start">
                <IconUser size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">SNAH ID</Text>
                  <Text fw={500}>{profileData.snahId}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconCalendar size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Email</Text>
                  <Text fw={500}>{profileData.email}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconPhone size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Phone</Text>
                  <Text fw={500}>{format(profileData.phone, options)}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconPhone size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Tel Phone</Text>
                  <Text fw={500}>{format(profileData.telPhone, options)}</Text>
                </div>
              </Group>
            </div>
            <div className="space-y-3">
              <Group gap="xs" className="items-start">
                <IconMail size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Established Date</Text>
                  <Text fw={500}>{moment(profileData.establishedDate).format('DD-MM-YYYY')}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconCalendar size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">EIn Number</Text>
                  <Text fw={500}>{profileData.ein}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconCalendar size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">NPI Number</Text>
                  <Text fw={500}>{profileData.npi}</Text>
                </div>
              </Group>
              <Group gap="xs" className="items-start">
                <IconMail size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Created Date</Text>
                  <Text fw={500}>{moment(profileData.createdDate).format('DD-MM-YYYY')}</Text>
                </div>
              </Group>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 justify-center gap-4 mt-4">
            <div className="space-y-3">
              <Group gap="xs" className="items-start">
                <IconMail size={15} className="text-blue-600 mt-1" />
                <div>
                  <Text size="sm" className="text-gray-600">Address</Text>
                  <Text fw={500}>{profileData.address}</Text>
                </div>
              </Group>
            </div>
          </div>
        </Fragment>
      )}
      {type === 'more' && (
        <Fragment>
          <Paper className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <Group gap="xs" className="items-start mb-6">
              <IconListDetails size={16} className="text-emerald-700 dark:text-emerald-400 mt-1" />
              <Text fw={600} className="text-emerald-800 dark:text-emerald-300">More info</Text>
            </Group>
            <Group>
              <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-4">
                <div className="space-y-3">
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Registration Id</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.registrationId}</Text>
                    </div>
                  </Group>
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">User Name</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.userName}</Text>
                    </div>
                  </Group>
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Taxonomy</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.taxonomy}</Text>
                    </div>
                  </Group>
                </div>
                <div className="space-y-3">
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Admin Rep Full Name</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.adminRepFullName}</Text>
                    </div>
                  </Group>
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Admin Rep Title</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.adminRepTitle}</Text>
                    </div>
                  </Group>
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Naics</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.naics}</Text>
                    </div>
                  </Group>
                </div>
                <div className="space-y-3">
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Fax Number</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.faxNumber}</Text>
                    </div>
                  </Group>
                  <Group gap="xs" className="items-center">
                    <div>
                      <Text size="sm" className="text-gray-600 dark:text-gray-400">Tax</Text>
                      <Text fw={500} className="text-gray-800 dark:text-gray-200">{profileData.tax}</Text>
                    </div>
                  </Group>
                </div>
              </div>
            </Group>
          </Paper>
          <div className="grid grid-cols-1 md:grid-cols-1">
            <Divider my="xl" size="xs" variant="dashed" color="blue" label="Know about myself" labelPosition="center" className="w-full" />
            <div className="space-y-3">
              <Group gap="xs" className="items-center">
                <div>
                  <Text size="sm" className="text-gray-800 dark:text-gray-200 text-justify">{profileData.about}</Text>
                </div>
              </Group>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};