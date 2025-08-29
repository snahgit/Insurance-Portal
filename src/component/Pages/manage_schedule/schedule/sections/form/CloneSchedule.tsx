import {Badge,Button,Card,Grid,Select} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";

const CloneSchedule = () => {
  return (
    <div className="pt-2 pb-2">
      <Card withBorder className="bg-blue-50 border-blue-200 mb-4">
        <Card.Section className="px-3 py-3">
          <Grid>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Select
                label="Appt Type"
                placeholder="Pick value"
                disabled
                value={"In-Person"}
                data={["In Person", "Home Visit", "Virutal"]}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Select
                label="Physician"
                placeholder="Pick value"
                disabled
                value={"Test MP MF"}
                data={[
                  "Test MP MF",
                  "Agrentina Gonzalez",
                  "John MH MF",
                  "Rohit Yadav",
                ]}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <DateInput
                placeholder="Enter schedule date"
                label="Schedule Date"
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <p className="text-[14px] font-semibold mt-6 mb-3 ml-2">
              List of slots which also be going cloning and this is not
              changeable *
            </p>
          </Grid>
          <div className="flex items-center flex-wrap justify-center gap-2 mb-3 mt-2">
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
            <Badge
              variant="light"
              color="grey"
              size="lg"
              radius="sm"
              className="mr-2 m cursor-pointer"
            >
              9:00AM - 10:00AM
            </Badge>
          </div>
        </Card.Section>
      </Card>

      <div className="flex">
        <Button
          className="ml-auto border-0 outline-none py-[7px] px-[15px] rounded-md bg-theme-default text-white hover:bg-theme-default"
          leftSection={<IconPlus size={14} />}
        >
          Clone Schedule
        </Button>
      </div>
    </div>
  );
};

export default CloneSchedule;
