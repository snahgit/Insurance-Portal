import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

interface AlertInputProps {
  title: string;
  // field: string;
  message: string;
}

const AlertInput: React.FC<AlertInputProps> = ({ title, message }) => {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="yellow" title={title} icon={icon}>
      {message}
    </Alert>
  );
};

export default React.memo(AlertInput);
