import { Fragment, useRef } from "react";
import { ActionIcon, Card, Group, Table, Text, Tooltip, Menu, NumberFormatter } from "@mantine/core";
import { IconDots, IconInfoCircle, IconViewfinder, IconViewportWide } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageDrawer } from "../../../../../common/PageDrawer";
import moment from "moment";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { RevenueQuickView } from "../detail/RevenueQuickView";


export const RevenueList = (props: { dataPass: any }) => {
  const { paymentsLogList } = props.dataPass;

  const dispatch = useDispatch();
  const topBarAndFilter = useSelector(
    (state: RootState) => state.pageTopBarAndFilter
  );
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const pagination = useSelector((state: RootState) => state.pagePagination);
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, paymentsLogList.length);
  const currentData = paymentsLogList.slice(startIndex, endIndex);

  const [billInfo, setBillInfo] = useState<any>(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);

  const { requireSecurityCheck } = useSecurityCheck();

  const isLoading = false;
  const error = null;
  const isEmpty = paymentsLogList.length === 0;
  const handleRetry = () => {
    console.log('Retrying data fetch...');
  };

  const handleDrawer = (data: any) => {
    const originalAddAction = () => {
      setBillInfo(data);
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Add");
  };

  useEffect(() => {
    const currentViewMode = topBarAndFilter.viewMode;
    const currentPage = pagination.currentPage;
    const currentFilter = topBarAndFilter.filter;

    if (prevViewMode) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (prevCurrentPage) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (prevFilter && JSON.stringify(prevFilter) !== JSON.stringify(currentFilter)) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    setPrevViewMode(currentViewMode);
    setPrevCurrentPage(currentPage);
    setPrevFilter(currentFilter);
  }, [topBarAndFilter.viewMode, pagination.currentPage, topBarAndFilter.filter, prevViewMode, prevCurrentPage, prevFilter]);

  useEffect(() => {
    if (paymentsLogList && paymentsLogList.length > 0) {
      dispatch(
        setPagination({
          totalItems: paymentsLogList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [paymentsLogList, dispatch]);

  return (
    <Fragment>
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "md",
            position: "right",
            size: "xl",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: <RevenueQuickView dataPass={{ billInfo }} />,
          title: 'Revenue Log Quick Information',
        }} />
      <Card.Section className="p-4">
        {currentData.length > 0 ? (
          <div className="relative">
            {isContentLoading && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm">
                <PageLoader
                  type="wave"
                  text="Updating content..."
                  className="h-full"
                />
              </div>
            )}
            <div className={`transition-all duration-300 ${isContentLoading ? 'opacity-50' : 'opacity-100'}`}>
              {topBarAndFilter.viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentData.map((val: any, key: number) => {
                    return (
                      <Card
                        key={key}
                        withBorder
                        shadow="md"
                        radius="lg"
                        className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 mt-4 overflow-hidden"
                      >
                        <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                            {val.billNo}
                          </Text>
                          <Text fw={500} size="sm" className="text-gray-800 dark:text-gray-100 mb-3">
                            {moment(val.billDate).format("MMM DD, YYYY")}
                          </Text>
                          {/* <Box className="mb-3">
                            <Text size="sm" c="dimmed" className="mb-2">{moment(val.billDate).format("DD/MM/YYYY")}</Text>
                            <Badge variant="light" color={getStatusColor(val.status)} radius="sm" >
                              <p>{val.status}</p>
                            </Badge>
                          </Box> */}
                        </Card.Section>
                        <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                          {/* <Text size="sm" className="text-center ps-2 font-bold">
                            <NumberFormatter prefix="$ " value={val.amount} thousandSeparator />
                          </Text>
                          <Text size="sm" className="text-center ps-2">
                            {val.description}
                          </Text> */}
                          <Text fw={500} size="sm" className="text-gray-800 dark:text-gray-100 text-center">
                            <b>Total bill: &nbsp;</b><NumberFormatter value={val.amount} prefix="$ " />
                          </Text>
                          <Text fw={500} size="sm" className="text-gray-800 dark:text-gray-100 text-center">
                            <b>Service Charge: &nbsp;</b><NumberFormatter value="15" prefix="$ " />
                          </Text>
                          <Text fw={500} size="sm" className="text-gray-800 dark:text-gray-100 text-center">
                            <b>Net Amount: &nbsp;</b><NumberFormatter value={val.amount - 15} prefix="$ " />
                          </Text>
                        </Card.Section>
                        <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                          <Group justify="center" gap="xs">
                            <Tooltip label="Quick info">
                              <ActionIcon
                                aria-label="Quick info"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                                onClick={() => handleDrawer(val)}
                              >
                                <IconInfoCircle
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="View Receipt">
                              <ActionIcon
                                aria-label="View Receipt"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                              >
                                <IconViewportWide
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        </Card.Section>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <PageTableWrapper
                    isLoading={isLoading}
                    error={error}
                    isEmpty={isEmpty}
                    emptyMessage="No video tutorials found"
                    loadingMessage="Loading video tutorials..."
                    onRetry={handleRetry}
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th className="text-center min-w-40 p-4">Bill Number</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Bill Date</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Total bill</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Service Charge</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Net Amount</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Action</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.map((val: any, key: number) => {
                        return (
                          <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Table.Td className="text-center p-4">{val.billNo}</Table.Td>
                            <Table.Td className="text-center p-4">{moment(val.billDate).format("DD/MM/YYYY")}</Table.Td>
                            <Table.Td className="text-center p-4"><NumberFormatter prefix="$ " value={val.amount} thousandSeparator /></Table.Td>
                            <Table.Td className="text-center p-4"><NumberFormatter prefix="$ " value="15" thousandSeparator /></Table.Td>
                            <Table.Td className="text-center p-4"><NumberFormatter prefix="$ " value={val.amount - 15} thousandSeparator /></Table.Td>
                            <Table.Td className="text-center p-4">
                              <Menu
                                shadow="md"
                                width={200}
                                trigger="hover"
                                openDelay={100}
                                closeDelay={400}
                              >
                                <Menu.Target>
                                  <ActionIcon
                                    variant="light"
                                    color="blue"
                                    size="md"
                                    className="hover:bg-blue-100 transition-all duration-300"
                                  >
                                    <IconDots size={16} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                  <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    View Recepipt
                                  </Menu.Label>
                                  <Menu.Item leftSection={<IconInfoCircle size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleDrawer(val)}
                                  >
                                    <Text size="sm" fw={500}>
                                      Quick view
                                    </Text>
                                  </Menu.Item>
                                  <Menu.Item leftSection={<IconViewfinder size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  // onClick={() => handleChangeStatus(val)}
                                  >
                                    <Text size="sm" fw={500}>
                                      View receipt
                                    </Text>
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })
                      }
                    </Table.Tbody>
                  </PageTableWrapper>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PageNoDataFound dataPass={{
            title: "No Departments Found",
            description: "There are currently no departments to display. This could be because:",
            reasons: [
              "• No departments have been created yet",
              "• All departments may have been archived",
              "• There might be a connectivity issue"
            ]
          }} />
        )}
      </Card.Section>
    </Fragment>
  );
};