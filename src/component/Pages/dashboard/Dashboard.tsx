import { Grid, Card, Text, Title, Group, Stack, Badge, Progress, SimpleGrid, Paper, ActionIcon, Table, Container, ThemeIcon, RingProgress, Center } from "@mantine/core";
import { IconUsers, IconCurrencyDollar, IconFileText, IconShield, IconAlertTriangle, IconCheck, IconClock, IconArrowRight, IconEye, IconEdit } from "@tabler/icons-react";

export const Dashboard = () => {
  // Mock data for the dashboard
  const statsData = [
    {
      title: "Total Members",
      value: "12,847",
      change: "+12.5%",
      positive: true,
      icon: IconUsers,
      color: "blue",
    },
    {
      title: "Total Claims",
      value: "3,294",
      change: "+8.2%",
      positive: true,
      icon: IconFileText,
      color: "green",
    },
    {
      title: "Claims Processed",
      value: "2,847",
      change: "-2.1%",
      positive: false,
      icon: IconCheck,
      color: "teal",
    },
    {
      title: "Total Premium",
      value: "$2.4M",
      change: "+15.3%",
      positive: true,
      icon: IconCurrencyDollar,
      color: "violet",
    },
  ];

  const recentClaims = [
    {
      id: "CLM001",
      member: "John Doe",
      type: "Medical",
      amount: "$1,250",
      status: "Pending",
      date: "2025-08-28",
    },
    {
      id: "CLM002",
      member: "Jane Smith",
      type: "Dental",
      amount: "$450",
      status: "Approved",
      date: "2025-08-27",
    },
    {
      id: "CLM003",
      member: "Mike Johnson",
      type: "Vision",
      amount: "$320",
      status: "Processing",
      date: "2025-08-26",
    },
    {
      id: "CLM004",
      member: "Sarah Wilson",
      type: "Medical",
      amount: "$2,100",
      status: "Rejected",
      date: "2025-08-25",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "yellow";
      case "Processing":
        return "blue";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container fluid className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Stack gap="xl">
        {/* Header */}
        <div className="mb-6">
          <Title order={1} className="text-gray-800 dark:text-white mb-2">
            Insurance Dashboard
          </Title>
          <Text c="dimmed" size="lg" className="dark:text-gray-300">
            Welcome back! Here's what's happening with your insurance portal today.
          </Text>
        </div>

        {/* Statistics Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {statsData.map((stat) => (
            <Card
              key={stat.title}
              shadow="sm"
              padding="lg"
              radius="md"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Group justify="space-between" mb="xs">
                <ThemeIcon
                  size="xl"
                  radius="md"
                  variant="light"
                  color={stat.color}
                  className="dark:bg-opacity-20"
                >
                  <stat.icon size={24} />
                </ThemeIcon>
                <Badge
                  color={stat.positive ? "green" : "red"}
                  variant="light"
                  size="sm"
                  className="dark:bg-opacity-20"
                >
                  {stat.change}
                </Badge>
              </Group>
              <Text size="xl" fw={700} className="text-gray-800 dark:text-white">
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed" className="dark:text-gray-400">
                {stat.title}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Main Content Grid */}
        <Grid gutter="lg">
          {/* Claims Overview */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full"
            >
              <Group justify="space-between" mb="md">
                <Title order={3} className="text-gray-800 dark:text-white">
                  Recent Claims
                </Title>
                <ActionIcon
                  variant="light"
                  color="blue"
                  className="hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  <IconArrowRight size={16} />
                </ActionIcon>
              </Group>

              <Table striped highlightOnHover className="dark:text-gray-300">
                <Table.Thead>
                  <Table.Tr className="dark:border-gray-600">
                    <Table.Th className="dark:text-gray-300">Claim ID</Table.Th>
                    <Table.Th className="dark:text-gray-300">Member</Table.Th>
                    <Table.Th className="dark:text-gray-300">Type</Table.Th>
                    <Table.Th className="dark:text-gray-300">Amount</Table.Th>
                    <Table.Th className="dark:text-gray-300">Status</Table.Th>
                    <Table.Th className="dark:text-gray-300">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {recentClaims.map((claim) => (
                    <Table.Tr key={claim.id} className="dark:border-gray-700">
                      <Table.Td className="dark:text-gray-300 font-medium">
                        {claim.id}
                      </Table.Td>
                      <Table.Td className="dark:text-gray-300">{claim.member}</Table.Td>
                      <Table.Td className="dark:text-gray-300">{claim.type}</Table.Td>
                      <Table.Td className="dark:text-gray-300 font-semibold">
                        {claim.amount}
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getStatusColor(claim.status)}
                          variant="light"
                          size="sm"
                          className="dark:bg-opacity-20"
                        >
                          {claim.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            size="sm"
                            className="hover:bg-blue-50 dark:hover:bg-blue-900"
                          >
                            <IconEye size={14} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="yellow"
                            size="sm"
                            className="hover:bg-yellow-50 dark:hover:bg-yellow-900"
                          >
                            <IconEdit size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Grid.Col>

          {/* Quick Stats */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Claims Processing Rate */}
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <Group justify="space-between" mb="md">
                  <Title order={4} className="text-gray-800 dark:text-white">
                    Claims Processing
                  </Title>
                  <ThemeIcon color="green" variant="light" size="sm">
                    <IconShield size={16} />
                  </ThemeIcon>
                </Group>

                <Center>
                  <RingProgress
                    size={120}
                    thickness={12}
                    sections={[
                      { value: 65, color: "green" },
                      { value: 20, color: "yellow" },
                      { value: 15, color: "red" },
                    ]}
                    label={
                      <Center>
                        <div className="text-center">
                          <Text size="lg" fw={700} className="dark:text-white">
                            85%
                          </Text>
                          <Text size="xs" c="dimmed" className="dark:text-gray-400">
                            Processed
                          </Text>
                        </div>
                      </Center>
                    }
                  />
                </Center>

                <Stack gap="xs" mt="md">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <Text size="sm" className="dark:text-gray-300">Approved</Text>
                    </Group>
                    <Text size="sm" fw={500} className="dark:text-gray-300">65%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <Text size="sm" className="dark:text-gray-300">Pending</Text>
                    </Group>
                    <Text size="sm" fw={500} className="dark:text-gray-300">20%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <Text size="sm" className="dark:text-gray-300">Rejected</Text>
                    </Group>
                    <Text size="sm" fw={500} className="dark:text-gray-300">15%</Text>
                  </Group>
                </Stack>
              </Card>

              {/* Monthly Premium Collection */}
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <Group justify="space-between" mb="md">
                  <Title order={4} className="text-gray-800 dark:text-white">
                    Monthly Premium
                  </Title>
                  <ThemeIcon color="blue" variant="light" size="sm">
                    <IconCurrencyDollar size={16} />
                  </ThemeIcon>
                </Group>

                <Text size="xl" fw={700} className="text-blue-600 dark:text-blue-400 mb-xs">
                  $847,320
                </Text>
                <Text size="sm" c="dimmed" mb="md" className="dark:text-gray-400">
                  Collected this month
                </Text>

                <Progress value={82} size="lg" radius="md" className="mb-md" />
                <Group justify="space-between">
                  <Text size="sm" className="dark:text-gray-300">Target: $1,000,000</Text>
                  <Text size="sm" fw={500} c="blue" className="dark:text-blue-400">82%</Text>
                </Group>
              </Card>

              {/* Alerts */}
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <Group justify="space-between" mb="md">
                  <Title order={4} className="text-gray-800 dark:text-white">
                    Alerts
                  </Title>
                  <ThemeIcon color="orange" variant="light" size="sm">
                    <IconAlertTriangle size={16} />
                  </ThemeIcon>
                </Group>

                <Stack gap="sm">
                  <Paper
                    p="sm"
                    radius="md"
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  >
                    <Group gap="xs">
                      <IconAlertTriangle size={16} className="text-red-600 dark:text-red-400" />
                      <Text size="sm" className="text-red-800 dark:text-red-300">
                        5 claims pending for over 7 days
                      </Text>
                    </Group>
                  </Paper>

                  <Paper
                    p="sm"
                    radius="md"
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                  >
                    <Group gap="xs">
                      <IconClock size={16} className="text-yellow-600 dark:text-yellow-400" />
                      <Text size="sm" className="text-yellow-800 dark:text-yellow-300">
                        Premium due reminders sent
                      </Text>
                    </Group>
                  </Paper>

                  <Paper
                    p="sm"
                    radius="md"
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  >
                    <Group gap="xs">
                      <IconUsers size={16} className="text-blue-600 dark:text-blue-400" />
                      <Text size="sm" className="text-blue-800 dark:text-blue-300">
                        25 new member applications
                      </Text>
                    </Group>
                  </Paper>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};
