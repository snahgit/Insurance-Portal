import { useNavigate } from "react-router";
import { Title, Text, Button, Group, Stack, Paper, ThemeIcon, Box, Anchor } from "@mantine/core";
import { IconHome, IconArrowLeft, IconMoodSad, IconSearch, IconExclamationMark } from "@tabler/icons-react";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Box size="md" className="text-center">
        <Stack gap="xl">
          <div className="relative">
            <Box className="relative z-10">
              <Title order={1} className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" style={{ lineHeight: 1 }} >404</Title>
            </Box>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-3xl"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <ThemeIcon size={80} radius="xl" variant="light" color="blue" className="shadow-lg">
              <IconMoodSad size={40} stroke={1.5} />
            </ThemeIcon>
          </div>
          <Paper shadow="xl" p="xl" radius="lg" className="bg-white/80 backdrop-blur-sm border border-gray-200" >
            <Stack gap="md">
              <Title order={2} className="text-2xl md:text-3xl font-semibold text-gray-800">Oops! Page Not Found</Title>
              <Text size="lg" c="dimmed" className="max-w-md mx-auto leading-relaxed">The page you're looking for seems to have wandered off into the digital void. Don't worry, even the best explorers sometimes take a wrong turn!</Text>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <Group gap="xs" justify="center">
                  <IconExclamationMark size={16} className="text-blue-600" />
                  <Text size="sm" c="blue.7" fw={500}>This might have happened because:</Text>
                </Group>
                <Text size="sm" c="dimmed" className="mt-2">
                  • The page has been moved or deleted<br />
                  • You entered an incorrect URL<br />
                  • The link you followed was broken
                </Text>
              </div>
            </Stack>
          </Paper>
          <Group justify="center" gap="md" className="mt-6">
            <Button leftSection={<IconHome size={18} />} variant="gradient" gradient={{ from: 'blue', to: 'indigo' }} size="lg" radius="xl" className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={() => navigate('/')}>Go to Home</Button>
            <Button leftSection={<IconArrowLeft size={18} />} variant="outline" size="lg" radius="xl" color="gray" className="shadow-md hover:shadow-lg transition-all duration-300" onClick={() => navigate(-1)}>Go Back</Button>
          </Group>
          <div className="mt-8">
            <Text size="sm" c="dimmed" className="mb-2">Need help? Try these popular pages:</Text>
            <Group justify="center" gap="md">
              <Anchor onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer" size="sm">Dashboard</Anchor>
              <Text size="sm" c="dimmed">•</Text>
              <Anchor onClick={() => navigate('/patients')} className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer" size="sm">Patients</Anchor>
              <Text size="sm" c="dimmed">•</Text>
              <Anchor onClick={() => navigate('/appointments')} className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer" size="sm">Appointments</Anchor>
            </Group>
          </div>
          <Paper p="md" radius="md" className="bg-gray-50 border">
            <Group justify="center" gap="xs">
              <IconSearch size={16} className="text-gray-500" />
              <Text size="sm" c="dimmed">Try using the search function or navigation menu to find what you're looking for.</Text>
            </Group>
          </Paper>
        </Stack>
      </Box>
    </div>
  );
};
