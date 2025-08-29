import { Box, Button, Center, Text, Title } from "@mantine/core";
import { IconFileX, IconRefresh } from "@tabler/icons-react";

export const PageNoDataFound = (props: { dataPass: { title: string; description: string; reasons: string[] } } ) => {
  const { title, description, reasons } = props.dataPass;
  return (
    <Center className="pt-6 pb-1">
      <Box className="text-center max-w-md mx-auto p-4 bg-blue-50 rounded-lg border-2 border-cyan-500">
        <IconFileX
          size={80}
          className="text-gray-400 mx-auto mb-4"
          stroke={1.5}
        />
        <Title order={3} className="text-gray-600 mb-2">{title}</Title>
        <Text className="text-gray-500 mb-6 leading-relaxed">
          {description}
        </Text>
        <ul className="text-sm text-gray-500 text-left mb-6 space-y-1">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
        <Button
          leftSection={<IconRefresh size={16} />}
          variant="light"
          // onClick={loadRecords}
          className="bg-cyan-50 hover:bg-cyan-100 text-cyan-600 border-cyan-200"
        >
          Refresh Data
        </Button>
      </Box>
    </Center>
  );
};
