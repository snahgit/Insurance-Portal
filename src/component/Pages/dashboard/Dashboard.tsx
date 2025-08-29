import { Card, Grid, Text, Group, Badge, ActionIcon, Progress, Avatar, Table, Button, SimpleGrid, ThemeIcon, RingProgress, Center, Paper, Stack } from "@mantine/core";
import { IconUsers, IconCalendarEvent, IconBuildingHospital, IconUserPlus, IconArrowUpRight, IconArrowDownRight, IconEye, IconStethoscope, IconClock, IconActivity, IconHeart } from "@tabler/icons-react";

const Dashboard = () => {
  const statsData = [
    {
      title: "Total Patients",
      value: "2,847",
      icon: IconUsers,
      color: "blue",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Appointments Today",
      value: "47",
      icon: IconCalendarEvent,
      color: "green",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Active Departments",
      value: "12",
      icon: IconBuildingHospital,
      color: "violet",
      change: "0%",
      changeType: "neutral"
    },
    {
      title: "New Registrations",
      value: "156",
      icon: IconUserPlus,
      color: "orange",
      change: "-3%",
      changeType: "decrease"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      doctor: "Dr. Emily Smith",
      department: "Cardiology",
      time: "09:30 AM",
      status: "confirmed",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      doctor: "Dr. James Wilson",
      department: "Neurology",
      time: "11:00 AM",
      status: "pending",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      patientName: "Emma Davis",
      doctor: "Dr. Maria Garcia",
      department: "Pediatrics",
      time: "02:15 PM",
      status: "completed",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      patientName: "Robert Taylor",
      doctor: "Dr. David Lee",
      department: "Orthopedics",
      time: "03:45 PM",
      status: "confirmed",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const quickActions = [
    {
      title: "Schedule Appointment",
      description: "Book new patient appointment",
      icon: IconCalendarEvent,
      color: "blue"
    },
    {
      title: "Patient Registration",
      description: "Add new patient to system",
      icon: IconUserPlus,
      color: "green"
    },
    {
      title: "Medical Records",
      description: "View patient medical history",
      icon: IconStethoscope,
      color: "violet"
    },
    {
      title: "Emergency Cases",
      description: "Handle urgent medical cases",
      icon: IconActivity,
      color: "red"
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="mb-8">
        <Text size="xl" fw={700} className="text-gray-800 dark:text-gray-200 mb-2">
          Insurance Portal Dashboard
        </Text>
        <Text size="sm" c="dimmed">
          Welcome back! Here's what's happening at your insurance portal today.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" className="mb-8">
        {statsData.map((stat, index) => (
          <Card key={index} withBorder shadow="sm" className="hover:shadow-md transition-shadow">
            <Group justify="apart">
              <div>
                <Text c="dimmed" size="xs" fw={700} className="uppercase tracking-wide">
                  {stat.title}
                </Text>
                <Text fw={700} size="xl" className="mt-1">
                  {stat.value}
                </Text>
                <Group gap="xs" className="mt-2">
                  <Text
                    size="xs"
                    c={stat.changeType === 'increase' ? 'teal' : stat.changeType === 'decrease' ? 'red' : 'gray'}
                    className="flex items-center gap-1"
                  >
                    {stat.changeType === 'increase' && <IconArrowUpRight size={14} />}
                    {stat.changeType === 'decrease' && <IconArrowDownRight size={14} />}
                    {stat.change}
                  </Text>
                  <Text size="xs" c="dimmed">vs last month</Text>
                </Group>
              </div>
              <ThemeIcon color={stat.color} size="xl" radius="md" variant="light">
                <stat.icon size={24} />
              </ThemeIcon>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Grid gutter="md">
        {/* Recent Appointments */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder shadow="sm" className="h-full">
            <Group justify="apart" className="mb-4">
              <Text fw={600} size="lg">Today's Appointments</Text>
              <Button variant="light" size="xs">View All</Button>
            </Group>

            <Table className="w-full">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Patient</Table.Th>
                  <Table.Th>Doctor</Table.Th>
                  <Table.Th>Department</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentAppointments.map((appointment) => (
                  <Table.Tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar src={appointment.avatar} size="sm" radius="xl" />
                        <Text size="sm" fw={500}>{appointment.patientName}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{appointment.doctor}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" size="sm">{appointment.department}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <IconClock size={14} />
                        <Text size="sm">{appointment.time}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          appointment.status === 'confirmed' ? 'green' :
                            appointment.status === 'pending' ? 'orange' : 'blue'
                        }
                        variant="light"
                        size="sm"
                      >
                        {appointment.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon variant="light" size="sm">
                        <IconEye size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        {/* Quick Actions & Overview */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="md">
            {/* Quick Actions */}
            <Card withBorder shadow="sm">
              <Text fw={600} size="lg" className="mb-4">Quick Actions</Text>
              <Stack gap="sm">
                {quickActions.map((action, index) => (
                  <Paper key={index} p="md" className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-gray-200 dark:border-gray-700">
                    <Group>
                      <ThemeIcon color={action.color} size="lg" radius="md" variant="light">
                        <action.icon size={20} />
                      </ThemeIcon>
                      <div className="flex-1">
                        <Text size="sm" fw={500}>{action.title}</Text>
                        <Text size="xs" c="dimmed">{action.description}</Text>
                      </div>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Card>

            {/* Patient Overview */}
            <Card withBorder shadow="sm">
              <Text fw={600} size="lg" className="mb-4">Patient Overview</Text>
              <Stack gap="md">
                <div>
                  <Group justify="apart" className="mb-2">
                    <Text size="sm">Occupancy Rate</Text>
                    <Text size="sm" fw={500}>78%</Text>
                  </Group>
                  <Progress value={78} color="blue" size="sm" />
                </div>

                <div>
                  <Group justify="apart" className="mb-2">
                    <Text size="sm">Emergency Cases</Text>
                    <Text size="sm" fw={500}>12</Text>
                  </Group>
                  <Progress value={24} color="red" size="sm" />
                </div>

                <div>
                  <Group justify="apart" className="mb-2">
                    <Text size="sm">Critical Patients</Text>
                    <Text size="sm" fw={500}>8</Text>
                  </Group>
                  <Progress value={16} color="orange" size="sm" />
                </div>
              </Stack>
            </Card>

            {/* Department Status */}
            <Card withBorder shadow="sm">
              <Text fw={600} size="lg" className="mb-4">Department Status</Text>
              <Center>
                <RingProgress
                  size={120}
                  thickness={8}
                  sections={[
                    { value: 40, color: 'blue', tooltip: 'Cardiology - 40%' },
                    { value: 25, color: 'cyan', tooltip: 'Neurology - 25%' },
                    { value: 15, color: 'orange', tooltip: 'Pediatrics - 15%' },
                    { value: 20, color: 'green', tooltip: 'Orthopedics - 20%' },
                  ]}
                  label={
                    <Center>
                      <IconHeart size={24} />
                    </Center>
                  }
                />
              </Center>
              <Stack gap="xs" className="mt-4">
                <Group justify="apart">
                  <Group gap="xs">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <Text size="xs">Cardiology</Text>
                  </Group>
                  <Text size="xs" fw={500}>40%</Text>
                </Group>
                <Group justify="apart">
                  <Group gap="xs">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <Text size="xs">Neurology</Text>
                  </Group>
                  <Text size="xs" fw={500}>25%</Text>
                </Group>
                <Group justify="apart">
                  <Group gap="xs">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <Text size="xs">Pediatrics</Text>
                  </Group>
                  <Text size="xs" fw={500}>15%</Text>
                </Group>
                <Group justify="apart">
                  <Group gap="xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <Text size="xs">Orthopedics</Text>
                  </Group>
                  <Text size="xs" fw={500}>20%</Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
