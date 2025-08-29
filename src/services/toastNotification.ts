import { notifications } from "@mantine/notifications";

// interface NotitificationProps {
//   title: string;
//   message: string;
//   color: string;
// }

export const showToastNotifications = () => {
  notifications.show({
    title: "Success",
    message: "Your operation was successful!",
    color: "green", // green color for success
    // icon: <IconCheck size={18} />,  // check icon
  });
};
