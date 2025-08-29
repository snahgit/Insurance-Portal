import React from 'react';
import { Stack, Group, Alert, Button, Text, Table, Paper, Center, Loader, Box } from "@mantine/core";
import { IconAlertCircle, IconRefresh, IconSearch, IconDatabaseOff } from "@tabler/icons-react";

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = ""
}) => (
  <Table.Thead className={`bg-gray-50 ${className}`}>
    {children}
  </Table.Thead>
);

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = ""
}) => (
  <Table.Tbody className={className}>
    {children}
  </Table.Tbody>
);

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  showSearchButton?: boolean;
  onSearch?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No data available",
  icon = <IconDatabaseOff size={48} />,
  showSearchButton = false,
  onSearch
}) => (
  <Table.Tr>
    <Table.Td colSpan={100} style={{ textAlign: 'center', padding: '3rem' }}>
      <Center>
        <Stack align="center" gap="md">
          <Box style={{ color: '#64748b' }}>
            {icon}
          </Box>
          <Text size="md" c="dimmed" fw={500}>
            {message}
          </Text>
          {showSearchButton && onSearch && (
            <Button
              variant="light"
              leftSection={<IconSearch size={16} />}
              onClick={onSearch}
              size="sm"
            >
              Search Again
            </Button>
          )}
        </Stack>
      </Center>
    </Table.Td>
  </Table.Tr>
);

interface LoadingStateProps {
  colSpan?: number;
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  colSpan = 100,
  message = "Loading data..."
}) => (
  <Table.Tr>
    <Table.Td colSpan={colSpan} style={{ textAlign: 'center', padding: '3rem' }}>
      <Center>
        <Stack align="center" gap="md">
          <Loader size="md" color="emerald" />
          <Text size="sm" c="dimmed">
            {message}
          </Text>
        </Stack>
      </Center>
    </Table.Td>
  </Table.Tr>
);

interface TableWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  tableProps?: any;
  paperProps?: any;
  striped?: boolean;
  highlightOnHover?: boolean;
  withTableBorder?: boolean;
  withColumnBorders?: boolean;
  className?: string;
}

export const PageTableWrapper: React.FC<TableWrapperProps> = ({
  children,
  isLoading = false,
  error,
  isEmpty = false,
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  showRetry = true,
  onRetry,
  tableProps,
  paperProps,
  striped = true,
  highlightOnHover = true,
  withTableBorder = true,
  withColumnBorders = false,
  className = "min-w-full"
}) => {
  return (
    <Stack gap="md" className='overflow-hidden'>
      {error && (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          color="red" 
          variant="filled" 
          radius="md"
          title="Error Loading Data"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">{error}</Text>
            {showRetry && onRetry && (
              <Button
                variant="white"
                size="xs"
                leftSection={<IconRefresh size={14} />}
                onClick={onRetry}
              >
                Retry
              </Button>
            )}
          </Group>
        </Alert>
      )}

      <Paper shadow="sm" radius="md" withBorder {...paperProps} className='overflow-y-auto'>
        <Table
          striped={striped}
          highlightOnHover={highlightOnHover}
          withTableBorder={withTableBorder}
          withColumnBorders={withColumnBorders}
          className={className}
          {...tableProps}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === TableBody) {
              const bodyContent = [
                isLoading && (
                  <LoadingState 
                    key="loading" 
                    message={loadingMessage} 
                  />
                ),
                !isLoading && isEmpty && !error && (
                  <EmptyState 
                    key="empty" 
                    message={emptyMessage}
                    showSearchButton={showRetry}
                    onSearch={onRetry}
                  />
                ),
                !isLoading && !isEmpty && !error && (child.props as any).children
              ].filter(Boolean);
              
              return React.cloneElement(child as React.ReactElement<any>, {}, ...bodyContent);
            }
            return child;
          })}
        </Table>
      </Paper>
    </Stack>
  );
};