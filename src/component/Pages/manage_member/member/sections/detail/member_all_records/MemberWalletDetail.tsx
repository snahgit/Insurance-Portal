import { Fragment } from "react/jsx-runtime";
import { Box, Card, Text, Group, Stack, Badge, ActionIcon, ScrollArea, Divider, Container, Button } from "@mantine/core";
import { IconCreditCard, IconEye, IconEyeOff, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useRef, useState, useMemo } from "react";
import { PageModal } from "../../../../../../common/PageModal";
import { MemberAddFundForm } from "../../form/MemberAddFundForm";
import { PageDateRangePicker, PageSelect } from "../../../../../../common/PageInput";

export const MemberWalletDetail = (__props: { dataPass: any }) => {
    const [showBalance, setShowBalance] = useState(true);
    const modalApiRef = useRef<{ open: () => void } | null>(null);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return [firstDay, now];
    });
    const [transactionTypeFilter, setTransactionTypeFilter] = useState<string | null>('');

    const transactions = [
        {
            id: 1,
            type: 'debit',
            amount: 500,
            description: 'Insurance Claim Payment',
            date: '2025-08-20',
            time: '10:30 AM',
            status: 'completed',
            for: 'Caregiver'
        },
        {
            id: 2,
            type: 'debit',
            amount: 150,
            description: 'Medical Consultation Fee',
            date: '2025-08-19',
            time: '2:15 PM',
            status: 'completed',
            for: 'Ride'
        },
        {
            id: 3,
            type: 'debit',
            amount: 250,
            description: 'Lab Test',
            date: '2025-08-18',
            time: '11:45 AM',
            status: 'completed',
            for: 'CoPay'
        },
        {
            id: 4,
            type: 'debit',
            amount: 300,
            description: 'Prescription Medicine',
            date: '2025-08-17',
            time: '4:20 PM',
            status: 'completed',
            for: 'CoPay'
        },
        {
            id: 5,
            type: 'credit',
            amount: 2000,
            description: 'Add amount to wallet',
            date: '2025-08-16',
            time: '9:00 AM',
            status: 'completed',
            for: 'Caregiver'
        },
    ];

    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);

            // Check date range filter
            let isInDateRange = true;
            if (dateRange[0] || dateRange[1]) {
                let startDate = null;
                let endDate = null;

                if (dateRange[0]) {
                    const start = new Date(dateRange[0]);
                    startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                }

                if (dateRange[1]) {
                    const end = new Date(dateRange[1]);
                    endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
                }

                isInDateRange = (!startDate || transactionDate >= startDate) &&
                    (!endDate || transactionDate <= endDate);
            }

            // Check transaction type filter
            const matchesType = !transactionTypeFilter || transactionTypeFilter === '' ||
                transaction.for.toLowerCase().includes(transactionTypeFilter.toLowerCase());

            return isInDateRange && matchesType;
        });
    }, [transactions, dateRange, transactionTypeFilter]);

    const totalAmounts = useMemo(() => {
        return filteredTransactions.reduce((totals, transaction) => {
            if (transaction.type === 'credit') {
                totals.credit += transaction.amount;
            } else {
                totals.debit += transaction.amount;
            }
            return totals;
        }, { credit: 0, debit: 0 });
    }, [filteredTransactions]);

    const netAmount = totalAmounts.credit - totalAmounts.debit;


    const handleModal = () => {
        // const originalAddAction = () => {
        setTimeout(() => modalApiRef.current?.open?.(), 0);
        // };
        // requireSecurityCheck(originalAddAction, "Edit");
    };

    return (
        <Fragment>
            <PageModal
                onOpenReady={(api) => {
                    modalApiRef.current = api;
                }}
                dataPass={{
                    modalConfig: {
                        size: "xl",
                        radius: "md",
                        padding: "xl",
                        className: "overflow-y-auto",
                        centered: true,
                    },
                    component: <MemberAddFundForm dataPass={{ if: "1", snahId: 'SNAH236589', name: "John Doe" }} />,
                    title: "Add Fund To Wallet",
                }} />
            <Container size="md" className="py-6">
                <Box className="flex justify-center mb-8">
                    <Card
                        className="w-full max-w-md h-64 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 dark:from-blue-900 dark:via-blue-700 dark:to-blue-900 border-0 shadow-2xl"
                        radius="xl"
                        p="xl"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-2 border-white"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white"></div>
                        </div>
                        <Stack justify="space-between" className="h-full relative z-10">
                            <Group justify="space-between" align="flex-start">
                                <Box>
                                    <Text size="sm" className="text-white/80 font-medium">
                                        Available Balance
                                    </Text>
                                    <Group align="center" gap="xs">
                                        <Text size="xl" fw={700} className="text-white">
                                            {showBalance ? '$100' : '****'}
                                        </Text>
                                        <ActionIcon
                                            variant="subtle"
                                            size="sm"
                                            onClick={() => setShowBalance(!showBalance)}
                                            className="text-white/70 hover:text-white hover:bg-white/10"
                                        >
                                            {showBalance ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                                        </ActionIcon>
                                    </Group>
                                </Box>
                                <Text fw={700} className="text-white text-lg">
                                    SNAH
                                </Text>
                            </Group>
                            <Box>
                                <Text fw={600} className="text-white text-lg tracking-wide">
                                    UC DAVIS MEDICAL FACILITY
                                </Text>
                            </Box>
                            <Group justify="space-between" align="flex-end">
                                <Box>
                                    <Group align="center" gap="xs">
                                        <IconCreditCard size={16} className="text-white/80" />
                                        <Text size="sm" className="text-white/80">
                                            Account Number
                                        </Text>
                                    </Group>
                                    <Text fw={500} className="text-white font-mono">
                                        **** **** **** 7995
                                    </Text>
                                </Box>
                                <Box className="text-right">
                                    <Text size="xs" className="text-white/80">
                                        Expiration Date
                                    </Text>
                                    <Text fw={500} className="text-white">
                                        10/28
                                    </Text>
                                </Box>
                            </Group>
                        </Stack>
                    </Card>
                </Box>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" radius="md" p="xl">
                    <Stack gap="lg">
                        <Group gap="md" align="flex-end">
                            <Box>
                                <Text size="sm" fw={500} mb={5}>Date Range</Text>
                                <PageDateRangePicker
                                    placeholder="Pick dates range"
                                    value={dateRange}
                                    onChange={(value) => setDateRange(value as [Date | null, Date | null])}
                                    clearable
                                    className="min-w-48"
                                />
                            </Box>
                            <Box>
                                <Text size="sm" fw={500} mb={5}>Transaction Type</Text>
                                <PageSelect
                                    placeholder="Filter by type"
                                    data={[
                                        { value: '', label: 'All Types' },
                                        { value: 'Ride', label: 'Ride' },
                                        { value: 'Caregiver', label: 'Caregiver' },
                                        { value: 'CoPay', label: 'CoPay' }
                                    ]}
                                    value={transactionTypeFilter}
                                    onChange={setTransactionTypeFilter}
                                    clearable
                                    className="min-w-40"
                                />
                            </Box>
                            <Button variant="outline" color="blue" onClick={handleModal}>Add Funds</Button>
                        </Group>
                    </Stack>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" radius="md" p="xl">
                    <Stack gap="lg">
                        <Group justify="space-between" align="center">
                            <Text size="xl" fw={600} className="text-gray-900 dark:text-white">Transaction History</Text>
                        </Group>
                        <Divider className="border-gray-200 dark:border-gray-600" />
                        <ScrollArea className="h-96">
                            <Stack gap="md">
                                {filteredTransactions.map((transaction) => (
                                    <Card
                                        key={transaction.id}
                                        className="bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        radius="md"
                                        p="md"
                                    >
                                        <Group justify="space-between" align="center">
                                            <Group align="center" gap="md">
                                                <Box
                                                    className={`p-2 rounded-full ${transaction.type === 'credit'
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                        }`}
                                                >
                                                    {transaction.type === 'credit' ? (
                                                        <IconArrowDown size={18} />
                                                    ) : (
                                                        <IconArrowUp size={18} />
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Text fw={500} className="text-gray-900 dark:text-white">
                                                        {transaction.description}
                                                    </Text>
                                                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                                                        {transaction.date} • {transaction.time}
                                                    </Text>
                                                </Box>
                                            </Group>
                                            <Box className="text-right">
                                                <Text
                                                    fw={600}
                                                    className={
                                                        transaction.type === 'credit'
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-red-600 dark:text-red-400'
                                                    }
                                                >
                                                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                                                </Text>
                                                <Badge
                                                    size="sm"
                                                    variant="light"
                                                    color={transaction.status === 'completed' ? 'green' : 'yellow'}
                                                    className="mt-1"
                                                >
                                                    {transaction.status}
                                                </Badge>
                                            </Box>
                                        </Group>
                                    </Card>
                                ))}
                            </Stack>
                        </ScrollArea>
                        <Divider className="border-gray-200 dark:border-gray-600" />
                        <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600" radius="md" p="md">
                            <Stack gap="md">
                                <Group justify="space-between" align="center">
                                    <Text size="md" fw={600} className="text-gray-900 dark:text-white">
                                        Total Credit:
                                    </Text>
                                    <Text
                                        size="lg"
                                        fw={700}
                                        className="text-green-600 dark:text-green-400"
                                    >
                                        +${totalAmounts.credit}
                                    </Text>
                                </Group>
                                <Group justify="space-between" align="center">
                                    <Text size="md" fw={600} className="text-gray-900 dark:text-white">
                                        Total Debit:
                                    </Text>
                                    <Text
                                        size="lg"
                                        fw={700}
                                        className="text-red-600 dark:text-red-400"
                                    >
                                        -${totalAmounts.debit}
                                    </Text>
                                </Group>
                                <Divider className="border-gray-300 dark:border-gray-500" />
                                {/* <Group justify="space-between" align="center">
                                    <Text size="lg" fw={700} className="text-gray-900 dark:text-white">Balance Amount:</Text>
                                    <Text size="xl"
                                        fw={700}
                                        className={
                                            netAmount >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        }
                                    >{netAmount >= 0 ? '+' : ''}${Math.abs(netAmount)}</Text>
                                </Group> */}
                                <Group justify="space-between" align="center">
                                    <Text size="lg" fw={700} className="text-gray-900 dark:text-white">Balance Amount:</Text>
                                    <Text size="xl"
                                        fw={700}
                                        className="text-blue-600 dark:text-blue-400"
                                    >{netAmount >= 0 ? '+' : ''}${Math.abs(netAmount)}</Text>
                                </Group>
                            </Stack>
                        </Card>
                    </Stack>
                </Card>
            </Container>
        </Fragment>
    );
};
