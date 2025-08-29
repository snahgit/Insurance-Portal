import React, { useState } from 'react';
import { Card, Tabs, Table, Text, Button, Group } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { PageNoDataFound } from "./PageNoDataFound";

export interface TabConfig {
    value: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
}

export interface TabItemData {
    id: string;
    [key: string]: any;
}

export interface TabsData {
    [tabValue: string]: TabItemData[];
}

export interface GridCardProps {
    item: TabItemData;
    onViewMore?: (item: TabItemData) => void;
    renderCard?: (item: TabItemData, onViewMore?: (item: TabItemData) => void) => React.ReactNode;
}

export interface TableProps {
    data: TabItemData[];
    columns: Array<{
        key: string;
        label: string;
        render?: (item: TabItemData) => React.ReactNode;
    }>;
    onViewMore?: (item: TabItemData) => void;
    actions?: (item: TabItemData) => React.ReactNode;
}

export interface NoDataConfig {
    title: string;
    description: string;
    reasons?: string[];
}

export interface PageTabsWrapperProps {
    tabsConfig: TabConfig[];
    tabsData: TabsData;
    defaultActiveTab: string;
    onTabChange?: (tabValue: string) => void;
    renderGridCard?: (item: TabItemData, onViewMore?: (item: TabItemData) => void) => React.ReactNode;
    tableConfig?: {
        columns: Array<{
            key: string;
            label: string;
            render?: (item: TabItemData) => React.ReactNode;
        }>;
        actions?: (item: TabItemData) => React.ReactNode;
    };
    onViewMore?: (item: TabItemData, tabValue: string) => void;
    noDataConfig?: NoDataConfig;
    paginatedData?: TabItemData[];
    className?: string;
    variant?: 'pills' | 'default';
    cardProps?: {
        withBorder?: boolean;
        shadow?: string;
        className?: string;
    };
}

export const PageTabsWrapper: React.FC<PageTabsWrapperProps> = ({
    tabsConfig,
    tabsData,
    defaultActiveTab,
    onTabChange,
    renderGridCard,
    tableConfig,
    onViewMore,
    noDataConfig = {
        title: "No Data Found",
        description: "There are currently no records to display.",
    },
    paginatedData,
    className = "",
    variant = 'pills',
    cardProps = {
        withBorder: true,
        shadow: "sm",
        className: "rounded-xl"
    }
}) => {
    const [activeTab, setActiveTab] = useState<string>(defaultActiveTab);
    const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);

    // Use provided paginated data or fall back to tabsData
    const currentData = paginatedData || tabsData[activeTab] || [];

    const handleTabChange = (value: string | null) => {
        if (value) {
            setActiveTab(value);
            onTabChange?.(value);
        }
    };

    const handleViewMore = (item: TabItemData) => {
        onViewMore?.(item, activeTab);
    };

    // Default grid card renderer
    const defaultGridCardRenderer = (item: TabItemData) => (
        <Card
            withBorder
            shadow="md"
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
        >
            <Card.Section className="text-center p-4 pb-2 bg-gradient-to-br from-blue-50 to-white dark:from-gray-600 dark:to-gray-800 bg-opacity-40 rounded-t-xl">
                <div className="flex justify-between items-start mb-2">
                    <Text
                        size="xs"
                        c="dimmed"
                        className="bg-white px-2 py-1 rounded-full"
                    >
                        {item.id}
                    </Text>
                </div>
                <Text fw={700} size="lg" className="mb-2">
                    {item.title || item.name || 'Item'}
                </Text>
                <Text size="sm" c="dimmed" className="mb-2">
                    {item.description || item.subtitle || ''}
                </Text>
            </Card.Section>
            <Card.Section className="p-3 border-t rounded-b-xl">
                <Group justify="center" gap="xs">
                    <Button
                        justify="center"
                        size="xs"
                        variant="light"
                        color="blue"
                        className="hover:bg-blue-400 ease-in-out duration-300"
                        leftSection={<IconInfoCircle size={14} />}
                        onClick={() => handleViewMore(item)}
                    >
                        View More
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );

    // Default table renderer
    const defaultTableRenderer = () => {
        if (!tableConfig) return null;

        return (
            <div className="overflow-x-auto p-4">
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    className="min-w-full"
                >
                    <Table.Thead>
                        <Table.Tr>
                            {tableConfig.columns.map((column) => (
                                <Table.Th key={column.key} className="text-left p-4">
                                    {column.label}
                                </Table.Th>
                            ))}
                            {tableConfig.actions && (
                                <Table.Th className="text-center p-4">Actions</Table.Th>
                            )}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {currentData.map((item: TabItemData, index: number) => (
                            <Table.Tr
                                key={item.id || index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                {tableConfig.columns.map((column) => (
                                    <Table.Td key={column.key} className="p-4">
                                        {column.render ? column.render(item) : (
                                            <Text size="sm">
                                                {item[column.key] || '-'}
                                            </Text>
                                        )}
                                    </Table.Td>
                                ))}
                                {tableConfig.actions && (
                                    <Table.Td className="p-4 text-center">
                                        {tableConfig.actions(item)}
                                    </Table.Td>
                                )}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>
        );
    };

    return (
        <Card.Section className={`px-4 pt-4 ${className}`} {...cardProps}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant={variant}
            >
                <Tabs.List className="flex flex-wrap gap-2 mb-4">
                    {tabsConfig.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <Tabs.Tab
                                key={tab.value}
                                value={tab.value}
                                leftSection={<IconComponent size={16} />}
                                className={`w-full sm:w-auto px-4 py-2 rounded-lg border-solid border-2 border-sky-200 dark:border-sky-700 font-medium transition-all duration-200 ${activeTab === tab.value
                                        ? `bg-${tab.color}-500 text-white shadow-md`
                                        : `bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-${tab.color}-50 hover:text-${tab.color}-600`
                                    }`}
                            >
                                {tab.label}
                            </Tabs.Tab>
                        );
                    })}
                </Tabs.List>

                {tabsConfig.map((tab) => (
                    <Tabs.Panel key={tab.value} value={tab.value}>
                        {currentData.length > 0 ? (
                            topBarAndFilter.viewMode === "grid" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-0 py-4">
                                    {currentData.map((item: TabItemData, index: number) =>
                                        renderGridCard ? (
                                            <div key={item.id || index}>
                                                {renderGridCard(item, handleViewMore)}
                                            </div>
                                        ) : (
                                            <div key={item.id || index}>
                                                {defaultGridCardRenderer(item)}
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                defaultTableRenderer()
                            )
                        ) : (
                            <PageNoDataFound
                                dataPass={{
                                    title: noDataConfig.title,
                                    description: noDataConfig.description,
                                    reasons: noDataConfig.reasons || []
                                }}
                            />
                        )}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </Card.Section>
    );
};

export default PageTabsWrapper;
