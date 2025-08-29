import React from "react";
import { Box, Button, Card, Grid, Select, Text, TextInput, Badge } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useLocation } from "react-router";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import ErrorIndicator from "../../../../../includes/ErrorIndicator";

interface ApppointmentTimeProps {
  appointmentDate: string;
  startTime: string;
  endTime: string;
}

export const ScheduleAddEditForm = () => {
  const { state } = useLocation()
  const mode = state ? "edit" : "create";

  const timezoneref = useRef<HTMLInputElement>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>("");
  const [allslots, setAllSlots] = useState<string[]>([]);
  const [selectSlot, setSelectedSlots] = useState<string[]>([]);
  const [appointmentType, setAppiontmentType] = useState<string | null>("");
  const [physician, setPhysician] = useState<string | null>("");
  const [error, setError] = useState<{ [key: string]: string | boolean }>({});
  const [appointmentTime, setAppointmentTime] = useState<ApppointmentTimeProps>(
    {
      appointmentDate: "",
      startTime: "",
      endTime: "",
    }
  );

  const topBarAndFilter = {
    type: "schedule",
    heading: mode === "edit" ? "Edit Schedule" : "Create Schedule",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };

  const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentTime((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectedSlots = (data: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(data)) {
        return prev.filter((item) => item !== data);
      }
      return [...prev, data];
    });
  };

  function getTimeSlotRanges(
    start: string,
    end: string,
    interval: string | number
  ) {
    const result: string[] = [];
    const pad = (x: number) => String(x).padStart(2, "0");

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const startMinutes = toMinutes(start);
    const endMinutes = toMinutes(end);
    const numericInterval =
      typeof interval === "string" ? parseInt(interval) : interval;

    for (
      let current = startMinutes;
      current + numericInterval <= endMinutes;
      current += numericInterval
    ) {
      const slotStartH = Math.floor(current / 60);
      const slotStartM = current % 60;
      const slotEndH = Math.floor((current + numericInterval) / 60);
      const slotEndM = (current + numericInterval) % 60;

      const slotRange = `${pad(slotStartH)}:${pad(slotStartM)} - ${pad(
        slotEndH
      )}:${pad(slotEndM)}`;
      result.push(slotRange);
    }
    setAllSlots(result);
  }

  const handleGetSlots = () => {
    if (
      timeSlot &&
      appointmentTime.startTime &&
      appointmentTime.endTime &&
      appointmentTime.startTime < appointmentTime.endTime
    ) {
      getTimeSlotRanges(
        appointmentTime.startTime,
        appointmentTime.endTime,
        parseInt(timeSlot)
      );
      setError({});
    } else {
      setError({
        timeSlot: !timeSlot && "Please provide time slot",
        startTime: !appointmentTime.startTime && "Please provide start time",
        timerror:
          !(appointmentTime.startTime < appointmentTime.endTime) &&
          "End Time should not be greater than Start Time",
      });
      setAllSlots([]);
    }
  };

  const handleCreateSchdule = () => {
    if (!appointmentType || !physician || !appointmentTime.appointmentDate) {
      setError({
        appointmentType: !appointmentType && "Please provide sechdule type",
        physician: !physician && "Please provide physician",
        appointmentDate:
          !appointmentTime.appointmentDate && "Please provide sechdule date",
      });
    } else {
      setError({});
    }
  };

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezoneref.current) {
      timezoneref.current.value = tz;
    }
  });

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Manage Schedule",
            items: [
              { title: "Manage Schedule", href: "#" },
              { title: "Schedule", href: "/manage-schedule/schedule" },
              { title: mode === "edit" ? "Edit Schedule" : "Create Schedule", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Box className="p-3">
            <Grid>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <Select
                  label="Sechdule Type"
                  placeholder="Pick value"
                  value={appointmentType}
                  error={error.appointmentType}
                  onChange={setAppiontmentType}
                  data={["In Person", "Home Visit", "Virutal"]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <Select
                  label="Physician"
                  placeholder="Pick value"
                  value={physician}
                  error={error.physician}
                  onChange={setPhysician}
                  data={[
                    "Test MP MF",
                    "Agrentina Gonzalez",
                    "John MH MF",
                    "Rohit Yadav",
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <label className="mb-1 text-sm">Sechdule Date</label>
                <br />

                <input
                  type="date"
                  name="appointmentDate"
                  onChange={handleAppointmentChange}
                  value={appointmentTime.appointmentDate}
                  className={`
                block w-full h-9
                px-3
                text-base   
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-700
                border border-[#ced4da] dark:border-gray-600
                rounded
                transition-all duration-150
                outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500
                placeholder:text-gray-400
                appearance-none
                cursor-pointer
                ${error.appointmentDate && "border-red-300"}
                `}
                />
                {error.appointmentDate && (
                  <ErrorIndicator error={error.appointmentDate} />
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <TextInput
                  ref={timezoneref}
                  disabled
                  label="Local Time Zone"
                  placeholder="Input placeholder"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <Select
                  label="Time Slot"
                  value={timeSlot}
                  onChange={setTimeSlot}
                  placeholder="Pick value"
                  error={error.timeSlot}
                  data={["15", "30", "45", "60", "120"]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <label className="mb-1 text-sm">Start Time</label>
                <br />

                <input
                  type="time"
                  name="startTime"
                  value={appointmentTime.startTime}
                  onChange={(e) => {
                    if (
                      appointmentTime.endTime &&
                      e.target.value > appointmentTime.endTime
                    ) {
                      setError({
                        ...error,
                        startTimeError:
                          "Start Time should not be greater than end Time",
                      });
                    } else {
                      setError({});
                    }
                    setAppointmentTime({
                      ...appointmentTime,
                      startTime: e.target.value,
                    });
                  }}
                  className={`
                    block w-full h-9
                    px-3
                    text-base
                    text-gray-900 dark:text-white
                    bg-white dark:bg-gray-700
                    border border-[#ced4da] dark:border-gray-600
                    rounded
                    transition-all duration-150
                    outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500
                    placeholder:text-gray-400
                    appearance-none
                    cursor-pointer
                    
                    ${(error.startTime || error.startTimeError) &&
                    "border-red-300"
                    }
                `}
                />
                {(error.startTime || error.startTimeError) && (
                  <ErrorIndicator
                    error={error.startTime || error.startTimeError}
                  />
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <label className="mb-1 text-sm">End Time</label>
                <br />

                <input
                  type="time"
                  name="endTime"
                  onChange={(e) => {
                    if (e.target.value < appointmentTime.startTime) {
                      setError({
                        ...error,
                        endTimerror:
                          "End Time should not be smaller than Start Time",
                      });
                    } else {
                      setError({});
                    }
                    setAppointmentTime({
                      ...appointmentTime,
                      endTime: e.target.value,
                    });
                  }}
                  value={appointmentTime.endTime}
                  disabled={!appointmentTime.startTime}
                  className={`
                    block w-full h-9
                    px-3
                    text-base
                    text-gray-900 dark:text-white
                  dark:bg-gray-700
                    border border-[#ced4da] dark:border-gray-600
                    rounded
                    transition-all duration-150
                    outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500
                    placeholder:text-gray-400
                    appearance-none
                    cursor-pointer
                    ${!appointmentTime.startTime ? "bg-grey" : "bg-white"}
                    ${error.endTimerror && "border-red-300"}
                  `}
                />
                {error.endTimerror && (
                  <ErrorIndicator error={error.endTimerror} />
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                <Button
                  leftSection={<IconPlus size={14} />}
                  className="mt-6 border-0 outline-none py-[7px] px-[15px] rounded-md bg-theme-default text-white hover:bg-theme-default"
                  onClick={handleGetSlots}
                >
                  Get Slots
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
          {allslots.length != 0 && (
            <>
              {" "}
              <Text fw={500} className="text-xl mt-4">
                Generated Slots
              </Text>
              <div className="w-full p-[18px] rounded-md border border-[rgba(128,128,128,0.33)] mt-[10px]">
                {allslots.length == 0
                  ? "No slot selected"
                  : allslots &&
                  allslots.length > 0 &&
                  allslots.map((data, i) => {
                    const isSelected = selectSlot.includes(data);
                    return (
                      <Badge
                        key={i}
                        variant={isSelected ? "filled" : "light"} // visually distinct variants
                        color="blue"
                        size="lg"
                        radius="sm"
                        className="m-1 cursor-pointer"
                        onClick={() => {
                          handleSelectedSlots(data);
                        }}
                      >
                        {data}
                      </Badge>
                    );
                  })}
              </div>
              <Grid>
                <Grid.Col
                  span={{ base: 12, md: 12, lg: 12 }}
                  className="text-right"
                >
                  <Button
                    onClick={handleCreateSchdule}
                    leftSection={<IconPlus size={14} />}
                    variant="filled"
                    color="blue"
                    size="sm"
                    className="mt-6 border-0 outline-none py-[10px] px-[15px] rounded-md bg-theme-default text-white hover:bg-theme-default"
                  >
                    Create
                  </Button>
                </Grid.Col>
              </Grid>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};
