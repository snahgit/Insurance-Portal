import { Badge, Card, Divider, Grid, Group, Stack, Text } from "@mantine/core";
import { IconHistory, IconMail, IconMapPin, IconMedicalCross, IconMedicalCrossCircle, IconPhone } from "@tabler/icons-react";

export const PatientOtherInfoDetails = (__props: { dataPass: any }) => {
  return (
    <Stack gap="md" className="pb-6">
      <div>
        <Group gap="xs" className="mb-3">
          <IconHistory size={20} className="text-blue-600 dark:text-blue-400" />
          <Text fw={600} size="lg" className="text-gray-800 dark:text-white">Others Information</Text>
        </Group>
        <Card withBorder className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <Stack gap="xs">
            <Grid>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">My referral id</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">HEALTH123</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Cell Number</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">2236587</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Alternate Phone</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">3214587456</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Home Phone</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">8965325698</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Occupation</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">Retired</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Weight</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">5 Feet 11 Inch</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Height</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">70 KG</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Physical Limitations</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">Ee may be</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Mental Or Cognitive Limitations</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">There is some found</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Special Diet</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">Diabetic</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">How Did You Learn About</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">PCP(Primary Care Provider)</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Created Date</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">10-02-2025</Text>
                      </div>
                    </Group>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>
      </div>
      <div className="mt-5">
        <Group gap="xs" className="mb-3">
          <IconMedicalCrossCircle size={20} className="text-green-600 dark:text-green-400" />
          <Text fw={600} size="lg" className="text-gray-800 dark:text-white">Pharmacy Info</Text>
        </Group>
        <Card withBorder className="bg-green-50 dark:bg-green-900/20 border-blue-200 dark:border-green-700">
          <Stack gap="xs">
            <Grid>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Name</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">HEALTH123</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Phone</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">5656884562</Text>
                      </div>
                    </Group>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <Group gap="md">
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Address</Text>
                    <Text fw={500} className="text-sm text-gray-900 dark:text-white">Flat 3B, Ceebros Apartments, Teynampet, 789563</Text>
                  </div>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>
      </div>
      <div className="mt-5">
        <Group gap="xs" className="mb-3">
          <IconMedicalCross size={20} className="text-orange-600 dark:text-orange-400" />
          <Text fw={600} size="lg" className="text-gray-800 dark:text-white">PCP Info</Text>
        </Group>
        <Card withBorder className="bg-orange-50 dark:bg-orange-900/20 border-blue-200 dark:border-orange-700">
          <Stack gap="xs">
            <Grid>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Name</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">HEALTH123</Text>
                      </div>
                    </Group>
                  </div>
                  <div className="space-y-3">
                    <Group gap="xs">
                      <div>
                        <Text size="sm" className="text-gray-600 dark:text-gray-400">Phone</Text>
                        <Text fw={500} className="text-sm text-gray-900 dark:text-white">5656884562</Text>
                      </div>
                    </Group>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <Group gap="md">
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Address</Text>
                    <Text fw={500} className="text-sm text-gray-900 dark:text-white">Flat 3B, Ceebros Apartments, Teynampet, 789563</Text>
                  </div>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>
      </div>
      <div className="mt-5">
        <Group gap="xs" className="mb-4">
          <IconPhone size={20} className="text-red-600 dark:text-red-400" />
          <Text fw={600} size="lg" className="text-gray-800 dark:text-white">Emergency Contacts</Text>
        </Group>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card withBorder className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 hover:shadow-lg transition-shadow duration-200">
            <Card.Section className="bg-red-100 dark:bg-red-800/40 px-4 py-2">
              <Group justify="space-between">
                <Badge color="red" variant="filled" size="sm">Primary</Badge>
                <IconPhone size={16} className="text-red-600 dark:text-red-400" />
              </Group>
            </Card.Section>
            <Stack gap="md" className="p-4">
              <div>
                <Text size="lg" fw={600} className="text-gray-800 dark:text-white mb-1">Jane Doe</Text>
                <Text size="sm" className="text-gray-600 dark:text-gray-400">Spouse</Text>
              </div>
              <Divider className="border-gray-200 dark:border-gray-600" />
              <div className="space-y-2">
                <Group gap="xs">
                  <IconPhone size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">+1 234 567 8901</Text>
                </Group>
                <Group gap="xs">
                  <IconMail size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-900 dark:text-white">jane.doe@email.com</Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-600 dark:text-gray-400">Same as member</Text>
                </Group>
              </div>
            </Stack>
          </Card>
          <Card withBorder className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 hover:shadow-lg transition-shadow duration-200">
            <Card.Section className="bg-orange-100 dark:bg-orange-800/40 px-4 py-2">
              <Group justify="space-between">
                <Badge color="orange" variant="filled" size="sm">Secondary</Badge>
                <IconPhone size={16} className="text-orange-600 dark:text-orange-400" />
              </Group>
            </Card.Section>
            <Stack gap="md" className="p-4">
              <div>
                <Text size="lg" fw={600} className="text-gray-800 dark:text-white mb-1">Michael Doe</Text>
                <Text size="sm" className="text-gray-600 dark:text-gray-400">Son</Text>
              </div>
              <Divider className="border-gray-200 dark:border-gray-600" />
              <div className="space-y-2">
                <Group gap="xs">
                  <IconPhone size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">+1 234 567 8902</Text>
                </Group>
                <Group gap="xs">
                  <IconMail size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-900 dark:text-white">michael.doe@email.com</Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-600 dark:text-gray-400">456 Oak Street, NY 10002</Text>
                </Group>
              </div>
            </Stack>
          </Card>
          <Card withBorder className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-200">
            <Card.Section className="bg-blue-100 dark:bg-blue-800/40 px-4 py-2">
              <Group justify="space-between">
                <Badge color="blue" variant="filled" size="sm">Friend</Badge>
                <IconPhone size={16} className="text-blue-600 dark:text-blue-400" />
              </Group>
            </Card.Section>
            <Stack gap="md" className="p-4">
              <div>
                <Text size="lg" fw={600} className="text-gray-800 dark:text-white mb-1">Dr. Sarah Wilson</Text>
                <Text size="sm" className="text-gray-600 dark:text-gray-400">Family Friend & Doctor</Text>
              </div>
              <Divider className="border-gray-200 dark:border-gray-600" />
              <div className="space-y-2">
                <Group gap="xs">
                  <IconPhone size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">+1 234 567 8903</Text>
                </Group>
                <Group gap="xs">
                  <IconMail size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-900 dark:text-white">dr.wilson@hospital.com</Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-600 dark:text-gray-400">Central Hospital, NY</Text>
                </Group>
              </div>
            </Stack>
          </Card>
          <Card withBorder className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow duration-200">
            <Card.Section className="bg-green-100 dark:bg-green-800/40 px-4 py-2">
              <Group justify="space-between">
                <Badge color="green" variant="filled" size="sm">Work</Badge>
                <IconPhone size={16} className="text-green-600 dark:text-green-400" />
              </Group>
            </Card.Section>
            <Stack gap="md" className="p-4">
              <div>
                <Text size="lg" fw={600} className="text-gray-800 dark:text-white mb-1">HR Department</Text>
                <Text size="sm" className="text-gray-600 dark:text-gray-400">Workplace Emergency</Text>
              </div>
              <Divider className="border-gray-200 dark:border-gray-600" />
              <div className="space-y-2">
                <Group gap="xs">
                  <IconPhone size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" fw={500} className="text-gray-900 dark:text-white">+1 234 567 8904</Text>
                </Group>
                <Group gap="xs">
                  <IconMail size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-900 dark:text-white">hr@company.com</Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={14} className="text-gray-500 dark:text-gray-400" />
                  <Text size="sm" className="text-gray-600 dark:text-gray-400">789 Business Ave, NY 10003</Text>
                </Group>
              </div>
            </Stack>
          </Card>
        </div>
        <Card withBorder className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 mt-4">
          <Card.Section className="bg-yellow-100 dark:bg-yellow-800/40 px-4 py-2">
            <Text fw={600} size="sm" className="text-yellow-800 dark:text-yellow-200">Emergency Instructions</Text>
          </Card.Section>
          <div className="p-4">
            <Text size="sm" className="text-gray-700 dark:text-gray-300">
              • Contact in order: Jane Doe (Primary), Michael Doe (Secondary), Dr. Sarah Wilson
            </Text>
            <Text size="sm" className="text-gray-700 dark:text-gray-300 mt-2">
              • Member has severe allergy to Penicillin - inform medical staff immediately
            </Text>
            <Text size="sm" className="text-gray-700 dark:text-gray-300 mt-2">
              • Medical insurance card located in wallet - Blue Cross Blue Shield
            </Text>
          </div>
        </Card>
      </div>
    </Stack>
  )
}