import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon, Badge, Card, Group, Table, Text, Tooltip, Box, Menu } from "@mantine/core";
import { IconDetails, IconDots, IconMailPin, IconReceipt, IconSend2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { PageModal } from "../../../../../common/PageModal";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useNavigate } from "react-router";
import moment from "moment";
import { FacilityClaimQuickView } from "../detail/FacilityClaimQuickView";
import { FacilityClaimSendForm } from "../form/FacilityClaimSendForm";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";


const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export const FacilityClaimList = (props: { dataPass: any }) => {
  const { claimRows } = props.dataPass;
  const navigate = useNavigate();

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();

  const startIndex = (pagination.startIndex ?? 1) - 1;
  const endIndex = Math.min(pagination.endIndex ?? claimRows.length, claimRows.length);
  const currentData = useMemo(() => claimRows.slice(startIndex, endIndex), [claimRows, startIndex, endIndex]);

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => console.log("Retrying data fetch...");
  const [claimInfo, setClaimInfo] = useState(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const { requireSecurityCheck } = useSecurityCheck();

  // const openDrawer = (row: any) => {
  //   setClaimInfo(row);
  //   setTimeout(() => drawerApiRef.current?.open?.(), 0);
  // };

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data } });
    };
    requireSecurityCheck(originalAddAction, type);
  };

  const openModal = (row: any) => {
    const originalAddAction = () => {
      setClaimInfo(row);
      setTimeout(() => modalApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, 'Send');
  };

  useEffect(() => {
    const currentViewMode = topBarAndFilter.viewMode;
    const currentPage = pagination.currentPage;
    const currentFilter = topBarAndFilter.filter;

    if (prevViewMode) {
      setIsContentLoading(true);
      const t = setTimeout(() => setIsContentLoading(false), 800);
      return () => clearTimeout(t);
    }
    if (prevCurrentPage) {
      setIsContentLoading(true);
      const t = setTimeout(() => setIsContentLoading(false), 600);
      return () => clearTimeout(t);
    }
    if (prevFilter && JSON.stringify(prevFilter) !== JSON.stringify(currentFilter)) {
      setIsContentLoading(true);
      const t = setTimeout(() => setIsContentLoading(false), 1000);
      return () => clearTimeout(t);
    }

    setPrevViewMode(currentViewMode);
    setPrevCurrentPage(currentPage);
    setPrevFilter(currentFilter);
  }, [
    topBarAndFilter.viewMode,
    pagination.currentPage,
    topBarAndFilter.filter,
    prevViewMode,
    prevCurrentPage,
    prevFilter
  ]);

  useEffect(() => {
    if (claimRows && claimRows.length > 0) {
      dispatch(
        setPagination({
          totalItems: claimRows.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1
        })
      );
    }
  }, [claimRows, dispatch]);

  return (
    <Fragment>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "lg",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true
          },
          component: (
            <FacilityClaimSendForm
              dataPass={{
                claim: claimInfo,
                subject: claimInfo ? `Claim Documents` : undefined
              }}
            />
          ),
          title: "Send Claim Email"
        }}
      />
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
            className: "overflow-y-auto"
          },
          component: <FacilityClaimQuickView dataPass={{ claimInfo }} />,
          title: "Claim Quick Information"
        }}
      />
      <Card.Section className="p-4">
        {currentData.length > 0 ? (
          <div className="relative">
            {isContentLoading && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm">
                <PageLoader type="wave" text="Updating content..." className="h-full" />
              </div>
            )}

            <div className={`transition-all duration-300 ${isContentLoading ? "opacity-50" : "opacity-100"}`}>
              {topBarAndFilter.viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentData.map((row: any) => (
                    <Card
                      key={row.id}
                      withBorder
                      shadow="md"
                      className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-4 rounded-xl"
                    >
                      <Card.Section className="p-4 pb-1 rounded-t-xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <IconReceipt size={18} className="text-blue-500" />
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                            {row.billSnahId}
                          </Text>
                        </div>
                        <Box className="text-center pb-4">
                          <Text size="sm" c="dimmed">
                            {row.snahId}
                          </Text>
                          <Text fw={600} size="sm" className="mt-1">
                            {row.patientName}
                          </Text>
                        </Box>
                      </Card.Section>

                      <Card.Section className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Text size="sm" c="dimmed">
                            Claim date
                          </Text>
                          <Text size="sm" fw={600}>
                            {moment(row.claimDate).format("DD MMM, YYYY")}
                          </Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text size="sm" c="dimmed">
                            Total fee
                          </Text>
                          <Text size="sm" fw={700}>
                            {inr.format(row.totalFee)}
                          </Text>
                        </div>
                        <div className="flex flex-row justify-center gap-2 pt-1">
                          <Badge
                            variant="light"
                            radius="sm"
                            color={row.emailSent === "Yes" ? "blue" : "gray"}
                            leftSection={<IconMailPin size={14} />}
                          >
                            Email: {row.emailSent}
                          </Badge>
                          <Badge
                            variant="light"
                            radius="sm"
                            color={row.status === "Accepted" ? "green" : "yellow"}
                          >
                            {row.status}
                          </Badge>
                        </div>
                      </Card.Section>
                      <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100/40 dark:bg-gray-700/40">
                        <Group justify="center" gap="xs">
                          {/* <Tooltip label="Quick info">
                            <ActionIcon
                              aria-label="Quick info"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => openDrawer(row)}
                            >
                              <IconInfoCircle style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip> */}
                          {/* <Tooltip label="Edit">
                            <ActionIcon
                              aria-label="Edit"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => navigate("form", { state: { id: row.id } })}
                            >
                              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip> */}
                          <Tooltip label="Detail view">
                            <ActionIcon
                              aria-label="Detail"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => navigateUrl({ data: row, type: "detail", url: 'detail' })}
                            >
                              <IconDetails style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>

                          <Tooltip label="Send Claim">
                            <ActionIcon
                              aria-label="Send Claim"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => openModal(row)}
                            >
                              <IconSend2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Card.Section>
                    </Card>
                  ))}
                </div>
              ) : (
                // ===== TABLE =====
                <div className="overflow-x-auto">
                  <PageTableWrapper
                    isLoading={isLoading}
                    error={error}
                    isEmpty={isEmpty}
                    emptyMessage="No claims found"
                    loadingMessage="Loading claims..."
                    onRetry={handleRetry}
                    className="w-full"
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th className="text-center p-4 min-w-64">Claim</Table.Th>
                        <Table.Th className="text-center p-4 min-w-48">Patient</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Claim date</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Total</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Email</Table.Th>
                        <Table.Th className="text-center p-4 min-w-32">Status</Table.Th>
                        <Table.Th className="text-center p-4">Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.map((row: any) => (
                        <Table.Tr
                          key={row.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Table.Td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <IconReceipt size={16} className="text-blue-500" />
                              <Text fw={600} size="sm">
                                {row.billSnahId}
                              </Text>
                            </div>
                          </Table.Td>

                          <Table.Td className="p-4 text-center">
                            <Text size="sm" fw={600}>
                              {row.patientName}
                            </Text>
                          </Table.Td>

                          <Table.Td className="p-4 text-center">
                            <Text size="sm">{moment(row.claimDate).format("DD-MM-YYYY")}</Text>
                          </Table.Td>

                          <Table.Td className="p-4 text-center">
                            <Text size="sm" fw={700}>
                              {inr.format(row.totalFee)}
                            </Text>
                          </Table.Td>

                          <Table.Td className="p-4 text-center">
                            <Badge
                              variant="light"
                              radius="sm"
                              color={row.emailSent === "Yes" ? "blue" : "gray"}
                              leftSection={<IconMailPin size={14} />}
                            >
                              {row.emailSent}
                            </Badge>
                          </Table.Td>

                          <Table.Td className="p-4 text-center">
                            <Badge
                              variant="light"
                              radius="sm"
                              color={row.status === "Accepted" ? "green" : "yellow"}
                            >
                              {row.status}
                            </Badge>
                          </Table.Td>

                          <Table.Td className="p-4">
                            <Menu shadow="md" width={210} trigger="hover" openDelay={100} closeDelay={400}>
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
                                  Claim Actions
                                </Menu.Label>
                                {/* <Menu.Item
                                  leftSection={<IconInfoCircle size={16} />}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  onClick={() => openDrawer(row)}
                                >
                                  <Text size="sm" fw={500}>
                                    Quick Overview
                                  </Text>
                                </Menu.Item> */}
                                {/* <Menu.Item
                                  leftSection={<IconEdit size={16} />}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  onClick={() => navigate("form", { state: { id: row.id } })}
                                >
                                  <Text size="sm" fw={500}>
                                    Edit Claim
                                  </Text>
                                </Menu.Item> */}
                                <Menu.Item
                                  leftSection={<IconDetails size={16} />}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  onClick={() => navigateUrl({ data: row, type: "detail", url: 'detail' })}
                                >
                                  <Text size="sm" fw={500}>
                                    Claim Details
                                  </Text>
                                </Menu.Item>
                                <Menu.Item
                                  leftSection={<IconSend2 size={16} />}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  onClick={() => openModal(row)}
                                >
                                  <Text size="sm" fw={500}>
                                    Send Email
                                  </Text>
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </PageTableWrapper>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PageNoDataFound
            dataPass={{
              title: "No Claims Found",
              description: "There are currently no claims to display. This could be because:",
              reasons: [
                "• No claims have been created yet",
                "• All claims may be archived or filtered out",
                "• There might be a connectivity issue"
              ]
            }}
          />
        )}
      </Card.Section>
    </Fragment>
  );
};
