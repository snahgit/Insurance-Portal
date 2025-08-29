import { Fragment, useState } from "react";
import { Paper, Group, Stack, Button, Text, Box, Loader, Alert} from "@mantine/core";
import { IconMapPin, IconSearch, IconCar, IconCalendar } from "@tabler/icons-react";
import { PageDateTimeInput } from "../../../../../common/PageInput";
import { FormField } from "../../../../../common/PageFromWrapper";

export const PrescriptionSearchForDriver = () => {
  const fromLocation = "Medical Facility - 123 Healthcare Ave, City Center";
  const toLocation = "Patient Home - 456 Residential St, Suburb Area";
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!dateTime) {
      return;
    }
    setIsSearching(true);
    setShowResults(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 10000);
  };

  // const driverData = [
  //   {
  //     id: 1,
  //     name: "John Smith",
  //     rating: 4.8,
  //     phone: "+1 234-567-8900",
  //     carModel: "Toyota Camry",
  //     carNumber: "ABC 123",
  //     price: "$25.00",
  //     eta: "5 mins",
  //     avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JS"
  //   },
  //   {
  //     id: 2,
  //     name: "Mike Johnson",
  //     rating: 4.9,
  //     phone: "+1 234-567-8901",
  //     carModel: "Honda Accord",
  //     carNumber: "XYZ 456",
  //     price: "$22.00",
  //     eta: "8 mins",
  //     avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MJ"
  //   }
  // ];

  return (
    <Fragment>
      <Paper className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
        <Box className="mb-6">
          <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-100 mb-2">Search for Driver</Text>
          <Text size="sm" className="text-gray-600 dark:text-gray-300">Find available drivers for prescription delivery</Text>
        </Box>
        <Stack gap="md">
          <div className="flex flex-row gap-4">
            <Box className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <Group gap="sm">
                <IconMapPin size={16} className="text-blue-500 dark:text-blue-400" />
                <Text size="sm" fw={700} className="text-gray-700 dark:text-gray-200">From Location</Text>
              </Group>
              <Text size="sm" className="text-gray-800 dark:text-gray-100 mt-3">{fromLocation}</Text>
            </Box>
            <Box className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <Group gap="sm">
                <IconMapPin size={16} className="text-green-500 dark:text-green-400" />
                <Text size="sm" fw={700} className="text-gray-700 dark:text-gray-200">To Location</Text>
              </Group>
              <Text size="sm" className="text-gray-800 dark:text-gray-100 mt-3">{toLocation}</Text>
            </Box>
          </div>
          <FormField label="Pickup Date & Time" required >
            <PageDateTimeInput
              placeholder="MM/DD/YYYY h:mm AM/PM"
              valueFormat="MMM DD YYYY hh:mm A"
              size="sm"
              value={dateTime}
              onChange={(date) => {
                setDateTime(date);
              }}
              timePickerProps={{
                withDropdown: true,
                popoverProps: { withinPortal: false },
                format: '12h',
              }}
              leftSection={<IconCalendar size={16} />}
            />
          </FormField>
          <Button
            onClick={handleSearch}
            loading={isSearching}
            disabled={!dateTime || isSearching}
            leftSection={<IconSearch size={16} />}
            size="md"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
            fullWidth
          >
            {isSearching ? "Searching for drivers..." : "Search Drivers"}
          </Button>
        </Stack>
        {isSearching && (
          <Box className="mt-8 text-center">
            <Paper className="p-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
              <Stack align="center" gap="md">
                <Loader size="lg" color="blue" />
                <Text size="lg" fw={500} className="text-blue-700 dark:text-blue-300">
                  Searching for available drivers...
                </Text>
                <Text size="sm" className="text-blue-600 dark:text-blue-400">
                  Please wait while we find the best drivers for your route
                </Text>
                <div className="flex space-x-2 mt-4">
                  <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Stack>
            </Paper>
          </Box>
        )}
        {showResults && !isSearching && (
          <Box className="mt-8">
            <Alert
              icon={<IconCar size={20} />}
              title="Drivers Found!"
              color="green"
              className="mb-6"
            >
              We found <b>John Doe</b> available drivers for your route.
            </Alert>
            {/* <Stack gap="md">
              {driverData.map((driver) => (
                <Card
                  key={driver.id}
                  shadow="sm"
                  padding="lg"
                  className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow duration-200"
                >
                  <Group justify="space-between" className="mb-4">
                    <Group>
                      <Avatar
                        src={driver.avatar}
                        size="lg"
                        radius="xl"
                        className="border-2 border-blue-100 dark:border-blue-800"
                      />
                      <div>
                        <Text fw={600} size="lg" className="text-gray-800 dark:text-gray-100">
                          {driver.name}
                        </Text>
                        <Group gap="xs" className="mt-1">
                          <IconStar size={14} className="text-yellow-400 fill-current" />
                          <Text size="sm" className="text-gray-600 dark:text-gray-300">
                            {driver.rating} rating
                          </Text>
                        </Group>
                      </div>
                    </Group>
                    <Badge
                      color="green"
                      variant="light"
                      size="lg"
                      className="font-semibold"
                    >
                      {driver.price}
                    </Badge>
                  </Group>

                  <Divider className="my-3 border-gray-200 dark:border-gray-600" />

                  <Group justify="space-between" className="mb-4">
                    <div className="flex items-center space-x-2">
                      <IconCar size={16} className="text-gray-500 dark:text-gray-400" />
                      <Text size="sm" className="text-gray-700 dark:text-gray-200">
                        {driver.carModel} • {driver.carNumber}
                      </Text>
                    </div>
                    <Text size="sm" fw={500} className="text-blue-600 dark:text-blue-400">
                      ETA: {driver.eta}
                    </Text>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Group>
                      <IconPhone size={16} className="text-gray-500 dark:text-gray-400" />
                      <Text size="sm" className="text-gray-600 dark:text-gray-300">
                        {driver.phone}
                      </Text>
                    </Group>
                    <Button
                      size="sm"
                      variant="filled"
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                      Book Driver
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack> */}
          </Box>
        )}
      </Paper>
    </Fragment>
  );
};
