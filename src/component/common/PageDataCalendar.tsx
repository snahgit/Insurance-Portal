import { useEffect, useState } from "react";
import { Card, Group, ActionIcon, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCalendarVisible, setCalendarMonth, setSelectedDate } from "../../redux/slices/pageTopBarAndFilterSlice";
import { PageModal } from "./PageModal";

interface DataCalendarProps {
    dateData: Record<string, number>;
    onDateSelect: (date: string) => void;
    activeTab: string;
}

export const PageDataCalendar = ({ dateData, onDateSelect, activeTab }: DataCalendarProps) => {
    const dispatch = useDispatch();
    const { calendar } = useSelector((state: RootState) => state.pageTopBarAndFilter);
    const [currentMonth, setCurrentMonthLocal] = useState(calendar.currentMonth);

    useEffect(() => {
        setCurrentMonthLocal(calendar.currentMonth);
    }, [calendar.currentMonth]);

    const handleClose = () => {
        dispatch(setCalendarVisible(false));
    };

    const handlePrevMonth = () => {
        const newMonth = dayjs(currentMonth).subtract(1, 'month').toISOString();
        setCurrentMonthLocal(newMonth);
        dispatch(setCalendarMonth(newMonth));
    };

    const handleNextMonth = () => {
        const newMonth = dayjs(currentMonth).add(1, 'month').toISOString();
        setCurrentMonthLocal(newMonth);
        dispatch(setCalendarMonth(newMonth));
    };

    const handleDateClick = (date: string) => {
        dispatch(setSelectedDate(date));
        onDateSelect(date);
        dispatch(setCalendarVisible(false));
    };

    const renderCalendarGrid = () => {
        const startOfMonth = dayjs(currentMonth).startOf('month');
        const endOfMonth = dayjs(currentMonth).endOf('month');
        const startOfWeek = startOfMonth.startOf('week');
        const endOfWeek = endOfMonth.endOf('week');
        const days = [];
        let current = startOfWeek;
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const headerRow = weekDays.map(day => (
            <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-300">
                {day}
            </div>
        ));
        while (current.isBefore(endOfWeek) || current.isSame(endOfWeek)) {
            const dateStr = current.format('YYYY-MM-DD');
            const isCurrentMonth = current.isSame(currentMonth, 'month');
            const isToday = current.isSame(dayjs(), 'day');
            const dataCount = dateData[dateStr] || 0;
            const hasData = dataCount > 0;

            days.push(
                <div
                    key={dateStr}
                    className={`
                        relative p-2 h-12 cursor-pointer border border-gray-100 dark:border-gray-700 transition-all duration-200 select-none
                        ${isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}
                        ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 font-semibold' : ''}
                        ${hasData && isCurrentMonth ? 'hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:shadow-sm' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                        ${!isCurrentMonth ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                    onClick={() => isCurrentMonth && handleDateClick(dateStr)}
                    title={hasData ? `${dataCount} appointment${dataCount > 1 ? 's' : ''} on ${current.format('MMM DD, YYYY')} - Click to filter` : `${current.format('MMM DD, YYYY')} - No appointments`}
                >
                    <div className="text-center text-sm font-medium">
                        {current.date()}
                    </div>
                    {hasData && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="flex gap-0.5 justify-center">
                                {Array.from({ length: Math.min(dataCount, 5) }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            w-1.5 h-1.5 rounded-full shadow-sm
                                            ${dataCount === 1 ? 'bg-green-500 shadow-green-200' : ''}
                                            ${dataCount === 2 ? 'bg-yellow-500 shadow-yellow-200' : ''}
                                            ${dataCount === 3 ? 'bg-orange-500 shadow-orange-200' : ''}
                                            ${dataCount === 4 ? 'bg-red-500 shadow-red-200' : ''}
                                            ${dataCount >= 5 ? 'bg-purple-500 shadow-purple-200' : ''}
                                        `}
                                    />
                                ))}
                                {dataCount > 5 && (
                                    <Text size="xs" className="text-purple-600 dark:text-purple-400 ml-1 font-semibold">
                                        +{dataCount - 5}
                                    </Text>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );

            current = current.add(1, 'day');
        }

        return (
            <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {headerRow}
                {days}
            </div>
        );
    };

    return (
        <PageModal
            opened={calendar.isVisible}
            onClose={handleClose}
            title={
                <Text size="lg" fw={600} className="text-gray-800 dark:text-gray-200">
                    Filter {activeTab} By Date
                </Text>
            }
            modalConfig={{
                size: "lg",
                centered: true,
                padding: "md",
                overlayProps: {
                    backgroundOpacity: 0.05,
                    blur: 0.50,
                }
            }}
        >
            <Card className="border-0">
                <Card.Section className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <Group justify="space-between" align="center">
                        <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={handlePrevMonth}
                            size="lg"
                        >
                            <IconChevronLeft size={18} />
                        </ActionIcon>

                        <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">
                            {dayjs(currentMonth).format('MMMM YYYY')}
                        </Text>

                        <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={handleNextMonth}
                            size="lg"
                        >
                            <IconChevronRight size={18} />
                        </ActionIcon>
                    </Group>
                </Card.Section>

                <Card.Section className="p-6">
                    {renderCalendarGrid()}

                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Text size="sm" fw={500} className="mb-2 text-gray-700 dark:text-gray-300">
                            Legend:
                        </Text>
                        <div className="flex flex-wrap gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-600 dark:text-gray-400">1 record</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-gray-600 dark:text-gray-400">2 records</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-gray-600 dark:text-gray-400">3+ records</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                <span className="text-gray-600 dark:text-gray-400">No records</span>
                            </div>
                        </div>
                        <Text size="xs" className="mt-2 text-gray-500 dark:text-gray-400">
                            Click on any date with records to filter the list
                        </Text>
                    </div>
                </Card.Section>
            </Card>
        </PageModal>
    );
};
