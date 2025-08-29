import { Card, Text, Timeline, Box, Group } from "@mantine/core";
import { IconCalendarCheck, IconClock, IconX, IconStethoscope, IconNotes, IconCalendarEvent, IconUserCheck, IconAlertCircle } from "@tabler/icons-react";

export const PatientActivityLog = (__props: { dataPass: any }) => {
  const activityLogs = [
    {
      id: 1,
      type: "booking_accepted",
      title: "Appointment Confirmed",
      description: "Your appointment with Dr. Smith has been confirmed for General Consultation",
      date: "2024-08-18",
      time: "10:30 AM",
      note: "Please arrive 15 minutes early for registration",
      status: "completed",
      doctor: "Dr. Sarah Smith",
      department: "General Medicine"
    },
    {
      id: 2,
      type: "booking_pending",
      title: "Appointment Request Submitted",
      description: "Waiting for doctor's confirmation for Cardiology consultation",
      date: "2024-08-17",
      time: "2:15 PM",
      note: "You will receive confirmation within 24 hours",
      status: "pending",
      doctor: "Dr. Michael Johnson",
      department: "Cardiology"
    },
    {
      id: 3,
      type: "consultation_completed",
      title: "Consultation Completed",
      description: "Successfully completed consultation with prescription provided",
      date: "2024-08-15",
      time: "11:00 AM",
      note: "Follow-up appointment recommended in 2 weeks",
      status: "completed",
      doctor: "Dr. Emily Davis",
      department: "Dermatology"
    },
    {
      id: 4,
      type: "booking_cancelled",
      title: "Appointment Cancelled",
      description: "Appointment cancelled due to doctor's unavailability",
      date: "2024-08-14",
      time: "9:30 AM",
      note: "Refund processed. Please reschedule at your convenience",
      status: "cancelled",
      doctor: "Dr. Robert Wilson",
      department: "Orthopedics"
    },
    {
      id: 5,
      type: "prescription_issued",
      title: "Prescription Issued",
      description: "Digital prescription has been generated and sent to your email",
      date: "2024-08-12",
      time: "4:45 PM",
      note: "Valid for 30 days. Please follow dosage instructions carefully",
      status: "completed",
      doctor: "Dr. Lisa Brown",
      department: "Internal Medicine"
    },
    {
      id: 6,
      type: "test_results",
      title: "Test Results Available",
      description: "Lab test results are now available in your patient portal",
      date: "2024-08-10",
      time: "1:20 PM",
      note: "Please review results and schedule follow-up if needed",
      status: "completed",
      doctor: "Dr. James Miller",
      department: "Laboratory"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking_accepted":
        return <IconCalendarCheck size={20} className="text-green-600 dark:text-green-400" />;
      case "booking_pending":
        return <IconClock size={20} className="text-yellow-600 dark:text-yellow-400" />;
      case "consultation_completed":
        return <IconStethoscope size={20} className="text-blue-600 dark:text-blue-400" />;
      case "booking_cancelled":
        return <IconX size={20} className="text-red-600 dark:text-red-400" />;
      case "prescription_issued":
        return <IconNotes size={20} className="text-purple-600 dark:text-purple-400" />;
      case "test_results":
        return <IconUserCheck size={20} className="text-indigo-600 dark:text-indigo-400" />;
      default:
        return <IconAlertCircle size={20} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case "completed":
  //       return <Badge color="green" variant="light" size="sm">Completed</Badge>;
  //     case "pending":
  //       return <Badge color="yellow" variant="light" size="sm">Pending</Badge>;
  //     case "cancelled":
  //       return <Badge color="red" variant="light" size="sm">Cancelled</Badge>;
  //     default:
  //       return <Badge color="gray" variant="light" size="sm">Unknown</Badge>;
  //   }
  // };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="shadow-sm">
        <Card.Section className="p-6">
          <Timeline active={-1} bulletSize={40} lineWidth={2}>
            {activityLogs.map((activity, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  <div className="flex items-center justify-center w-full h-full rounded-full bg-white dark:bg-gray-800 border-2 border-current">
                    {getActivityIcon(activity.type)}
                  </div>
                }
                color={getTimelineColor(activity.status)}
                className="pb-6"
              >
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <Card.Section className="p-4">
                    <Group justify="space-between" align="flex-start" className="mb-3">
                      <Box>
                        <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">{activity.title}</Text>
                        {/* {getStatusBadge(activity.status)} */}
                      </Box>
                      <Box>
                        <Group gap="xs" className="mb-1">
                          <IconCalendarEvent size={14} className="text-gray-600 dark:text-gray-400" />
                          <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300">{activity.date}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={14} className="text-gray-600 dark:text-gray-400" />
                          <Text size="xs" className="text-gray-500 dark:text-gray-500">{activity.time}</Text>
                        </Group>
                      </Box>
                    </Group>
                  </Card.Section>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card.Section>
      </Card>
    </Box>
  );
}