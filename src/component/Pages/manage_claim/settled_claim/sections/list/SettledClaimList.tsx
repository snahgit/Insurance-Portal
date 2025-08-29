import { Fragment, useRef } from "react";
import { ActionIcon, Badge, Card, Group, Table, Text, Tooltip, Box, Menu, Avatar, NumberFormatter, Button } from "@mantine/core";
import { IconCalendar, IconDetails, IconDots, IconMoneybag, IconPaywall, IconStatusChange } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { useNavigate } from "react-router";
import moment from "moment";
import { PageModal } from "../../../../../common/PageModal";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { SettledClaimMissingRejectForm } from "../form/SettledClaimMissingRejectForm";
import { SettledClaimQuickView } from "../detail/SettledClaimQuickView";
import { SettledClaimPayForm } from "../form/SettledClaimPayForm";
import { SettledClaimReturnForm } from "../form/SettledClaimReturnForm";

export const options = {
  mask: "(___) ___-__-__",
  replacement: { _: /\d/ },
};

export const SettledClaimList = (props: { dataPass: any }) => {
  const { settledClaimList } = props.dataPass;
  const navigate = useNavigate();

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => {
    console.log('Retrying data fetch...');
  };

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const { requireSecurityCheck } = useSecurityCheck();

  const topBarAndFilter = useSelector(
    (state: RootState) => state.pageTopBarAndFilter
  );
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, settledClaimList.length);
  const currentData = settledClaimList.slice(startIndex, endIndex);

  const [settledClaimInfo, __setSettledClaimInfo] = useState(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const [modalSize, setModalSize] = useState<string>('sm');
  const [pageModalType, setPageModalType] = useState<string>('');
  const [passComponentToModalByMatch, setPassComponentToModalByMatch] = useState<React.ReactNode>();

  // const handleDrawer = (data: any) => {
  //   const originalAddAction = () => {
  //     setSettledClaimInfo(data);
  //     setTimeout(() => drawerApiRef.current?.open?.(), 0);
  //   };
  //   requireSecurityCheck(originalAddAction, "Info");
  // };

  const handleModal = (data: any, type: string) => {
    const originalAddAction = () => {
      if (type === "Missing" || type === "Reject") {
        setPageModalType(`${type === "Missing" ? "Missing" : "Reject"} the claim`);
        setModalSize('xl')
        setPassComponentToModalByMatch(<SettledClaimMissingRejectForm dataPass={{ type }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else if (type === "Paid") {
        setPageModalType('Fill the out information before paying the claim');
        setModalSize('md')
        setPassComponentToModalByMatch(<SettledClaimPayForm dataPass={{ id: data }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else if (type === "Returned") {
        setPageModalType('Fill the out reason of returning the claim');
        setModalSize('md')
        setPassComponentToModalByMatch(<SettledClaimReturnForm dataPass={{ id: data }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else {
        console.log("Unknown modal type");
      }
    };
    requireSecurityCheck(originalAddAction, "Status");
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
    if (settledClaimList && settledClaimList.length > 0) {
      dispatch(
        setPagination({
          totalItems: settledClaimList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [settledClaimList, dispatch]);

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data } });
    };
    requireSecurityCheck(originalAddAction, type);
  };

  const claimTypeColor = (type: string) => {
    switch (type) {
      case "Pharmacy":
        return "cyan";
      case "Private Practice":
        return "pink";
      case "Medical Facility":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleStatusColor = (type: string) => {
    switch (type) {
      case "Pending":
        return "yellow";
      case "Under Review":
        return "blue";
      case "Processing":
        return "cyan";
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      case "Paid":
        return "gray";
      case "Returned":
        return "pink";
      case "Completed":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <Fragment>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: modalSize,
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: passComponentToModalByMatch,
          title: pageModalType,
        }} />
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "md",
            position: "right",
            size: "lg",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: <SettledClaimQuickView dataPass={{ settledClaimInfo }} />,
          title: 'Settled Claim Quick Information',
        }}
      />
      <Card.Section className="p-4">
        {
          currentData.length > 0 ? (
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
                {
                  topBarAndFilter.viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {
                        currentData.map((val: any, key: number) => {
                          return (
                            <Card
                              key={key}
                              withBorder
                              shadow="md"
                              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-16 rounded-xl"
                            >
                              <Card.Section className="text-center p-4 pb-1 pt-12 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                                <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
                                  <Avatar
                                    src={val.avatar}
                                    size={80}
                                    radius="lg"
                                    className="border-2 bg-white"
                                  />
                                </div>
                                <Box>
                                  <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                                    {val.name}
                                  </Text>
                                </Box>
                                <Box>
                                  <Text size="sm" c="dimmed" className="mb-2">
                                    SNAH123658
                                  </Text>
                                </Box>
                              </Card.Section>
                              <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                                <div className="flex justify-center space-x-2">
                                  <IconCalendar size={16} className="text-blue-500" />
                                  <Text size="sm" className="font-semibold">
                                    {moment(val.claimDate).format("MM-DD-YYYY")}
                                  </Text>
                                </div>
                                <div className="flex justify-center space-x-2">
                                  <IconMoneybag size={16} className="text-blue-500" />
                                  <Text size="sm" className="font-semibold">
                                    <NumberFormatter prefix="$ " value={val.amount} />
                                  </Text>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                  <Badge
                                    variant="light"
                                    color={claimTypeColor(val.claimType)}
                                    radius="sm"
                                  >
                                    <p>{val.claimType}</p>
                                  </Badge>
                                  <Badge
                                    variant="light"
                                    className="cursor-pointer"
                                    color={handleStatusColor(val.status)}
                                    radius="sm"
                                  >
                                    {val.status}
                                  </Badge>
                                </div>
                              </Card.Section>
                              <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                                <Group justify="center" gap="xs">
                                  {/* <Tooltip label="Quick info">
                                    <ActionIcon
                                      aria-label="Settings"
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
                                  </Tooltip> */}
                                  <Tooltip label="Detail view">
                                    <ActionIcon
                                      aria-label="Settings"
                                      variant="medium"
                                      color="blue"
                                      className="hover:bg-blue-400 ease-in-out duration-300"
                                      onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                                    >
                                      <IconDetails
                                        style={{ width: "70%", height: "70%" }}
                                        stroke={1.5}
                                      />
                                    </ActionIcon>
                                  </Tooltip>
                                  {val.status === 'Approved' && (
                                    <Tooltip label="Pay Claim">
                                      <Button
                                        size="xs"
                                        leftSection={<IconPaywall size={14} />}
                                        variant="blue"
                                        onClick={() => handleModal(val, 'Paid')}
                                      >
                                        Pay&nbsp;<NumberFormatter prefix="$ " value={val.amount} />
                                      </Button>
                                    </Tooltip>
                                  )}
                                  <Tooltip label="Change Status">
                                    {!['Rejected', 'Returned', 'Completed'].includes(val.status) && (
                                      <Menu>
                                        <Menu.Target>
                                          <ActionIcon
                                            size="md"
                                            variant="medium"
                                            color="blue"
                                            className="hover:bg-blue-400 ease-in-out duration-300">
                                            <IconStatusChange size={14} />
                                          </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                          <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                          {val.status === 'Under Review' && (
                                            <>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Processing'); }}>Processing</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Returned'); }}>Returned</Menu.Item>
                                            </>
                                          )}
                                          {val.status === 'Processing' && (
                                            <>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Approved'); }}>Approved</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                            </>
                                          )}
                                          {val.status === 'Approved' && (
                                            <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Paid'); }}>Paid</Menu.Item>
                                          )}
                                          {val.status === 'Paid' && (
                                            <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Completed'); }}>Completed</Menu.Item>
                                          )}
                                          {!['Under Review', 'Processing', 'Approved', 'Paid'].includes(val.status) && (
                                            <>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Pending'); }}>Pending</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Under Review'); }}>Under Review</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Processing'); }}>Processing</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Approved'); }}>Approved</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Paid'); }}>Paid</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Returned'); }}>Returned</Menu.Item>
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Completed'); }}>Completed</Menu.Item>
                                            </>
                                          )}
                                        </Menu.Dropdown>
                                      </Menu>
                                    )}
                                  </Tooltip>
                                </Group>
                              </Card.Section>
                            </Card>
                          );
                        })
                      }
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <PageTableWrapper
                        isLoading={isLoading}
                        error={error}
                        isEmpty={isEmpty}
                        emptyMessage="No patients found"
                        loadingMessage="Loading patients..."
                        onRetry={handleRetry}
                        className="w-full"
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th className="text-center p-4 min-w-60">Patient</Table.Th>
                            <Table.Th className="text-center p-4 min-w-44">Claim Detail</Table.Th>
                            <Table.Th className="text-center p-4 min-w-32">Claim Type</Table.Th>
                            <Table.Th className="text-center p-4 min-w-32">Claim Status</Table.Th>
                            <Table.Th className="text-center p-4">Actions</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {
                            currentData.map((val: any, key: number) => {
                              return (
                                <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <Table.Td className="p-4 text-center">
                                    <div className="flex items-center space-x-3">
                                      <Avatar src={val.avatar} size={50} radius="xl" />
                                      <div>
                                        <Text fw={600} size="sm">
                                          {val.name}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                          SNAH12365
                                        </Text>
                                      </div>
                                    </div>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <div className="space-y-1">
                                      <Text size="sm">
                                        <b>Date: </b>{moment(val.date).format("MM-DD-YYYY")}
                                      </Text>
                                      <Text size="sm">
                                        <b>Amount: </b><NumberFormatter prefix="$" value={val.amount} />
                                      </Text>
                                    </div>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <Badge
                                      variant="light"
                                      color={claimTypeColor(val.claimType)}
                                      radius="sm"
                                    >
                                      <p>{val.claimType}</p>
                                    </Badge>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <Badge
                                      variant="light"
                                      className="cursor-pointer"
                                      color={handleStatusColor(val.status)}
                                      radius="sm"
                                    >
                                      {val.status}
                                    </Badge>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <Group gap="xs">
                                      {!['Rejected', 'Returned', 'Completed'].includes(val.status) && (
                                        <Menu>
                                          <Menu.Target>
                                            <ActionIcon
                                              size="md"
                                              variant="medium"
                                              color="blue"
                                              className="hover:bg-blue-400 ease-in-out duration-300">
                                              <IconStatusChange size={14} />
                                            </ActionIcon>
                                          </Menu.Target>
                                          <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                            <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Select Status</Menu.Label>
                                            {val.status === 'Under Review' && (
                                              <>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Processing'); }}>Processing</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Returned'); }}>Returned</Menu.Item>
                                              </>
                                            )}
                                            {val.status === 'Processing' && (
                                              <>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Approved'); }}>Approved</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                              </>
                                            )}
                                            {val.status === 'Approved' && (
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Paid'); }}>Paid</Menu.Item>
                                            )}
                                            {val.status === 'Paid' && (
                                              <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Completed'); }}>Completed</Menu.Item>
                                            )}
                                            {!['Under Review', 'Processing', 'Approved', 'Paid'].includes(val.status) && (
                                              <>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Pending'); }}>Pending</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Under Review'); }}>Under Review</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Processing'); }}>Processing</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Approved'); }}>Approved</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Rejected'); }}>Rejected</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Paid'); }}>Paid</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Returned'); }}>Returned</Menu.Item>
                                                <Menu.Item className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" onClick={() => { handleModal(val, 'Completed'); }}>Completed</Menu.Item>
                                              </>
                                            )}
                                          </Menu.Dropdown>
                                        </Menu>
                                      )}
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
                                            Settled Claim Actions
                                          </Menu.Label>
                                          {/* <Menu.Item leftSection={<IconInfoCircle size={16} />}
                                          className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                          onClick={() => handleDrawer(val)}
                                        >
                                          <Text size="sm" fw={500}>
                                            Quick Info
                                          </Text>
                                        </Menu.Item> */}
                                          {val.status === 'Approved' && (
                                            <Menu.Item leftSection={<IconPaywall size={16} />}
                                              className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                              onClick={() => handleModal(val, 'Paid')}
                                            >
                                              <Text size="sm" fw={500}>
                                                Pay&nbsp;<NumberFormatter prefix="$ " value={val.amount} />
                                              </Text>
                                            </Menu.Item>

                                          )}
                                          <Menu.Item leftSection={<IconDetails size={16} />}
                                            className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                            onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                                          >
                                            <Text size="sm" fw={500}>
                                              Claim Details
                                            </Text>
                                          </Menu.Item>
                                        </Menu.Dropdown>
                                      </Menu>
                                    </Group>
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
          ) : (<PageNoDataFound dataPass={{
            title: "No Patients Found",
            description: "There are currently no patients to display. This could be because:",
            reasons: [
              "• No patients have been created yet",
              "• All patients may have been archived",
              "• There might be a connectivity issue"
            ]
          }} />
          )}
      </Card.Section>
    </Fragment>
  );
};