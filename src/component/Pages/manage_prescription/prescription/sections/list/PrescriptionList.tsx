import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon, Badge, Card, Group, Table, Text, Tooltip, Box, Menu } from "@mantine/core";
import { IconDetails, IconDots, IconInfoCircle, IconReceipt, IconStatusChange } from "@tabler/icons-react";
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
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";
import { SettledClaimMissingRejectForm } from "../../../../manage_claim/settled_claim/sections/form/SettledClaimMissingRejectForm";
import { PrescriptionQuickView } from "../detail/PrescriptionQuickView";
import { PrescriptionSearchForDriver } from "../other/PrescriptionSearchForDriver";


export const PrescriptionList = (props: { dataPass: any }) => {
  const { prescriptionList } = props.dataPass;
  const navigate = useNavigate();

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();

  const startIndex = (pagination.startIndex ?? 1) - 1;
  const endIndex = Math.min(pagination.endIndex ?? prescriptionList.length, prescriptionList.length);
  const currentData = useMemo(() => prescriptionList.slice(startIndex, endIndex), [prescriptionList, startIndex, endIndex]);

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => console.log("Retrying data fetch...");
  const [prescriptionInfo, setPrescriptionInfo] = useState(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const [modalSize, setModalSize] = useState<string>('sm');
  const [pageModalType, setPageModalType] = useState<string>('');
  const [passComponentToModalByMatch, setPassComponentToModalByMatch] = useState<React.ReactNode>();

  const { requireSecurityCheck } = useSecurityCheck();

  const getEnabledStatusOptions = (currentStatus: string, type: string) => {
    const statusOptions = {
      initiate: false,
      processing: false,
      pickedUp: false,
      locatingDriver: false,
      pickedUpByDriver: false,
      outForDelivery: false,
      delivered: false,
      rejected: true
    };

    switch (currentStatus) {
      case "Pending":
        statusOptions.initiate = true;
        break;
      case "Initiate":
        statusOptions.processing = true;
        break;
      case "Processing":
        if (type === "Pickup") {
          statusOptions.pickedUp = true;
        } else if (type === "Delivery") {
          statusOptions.locatingDriver = true;
        }
        break;
      case "Picked Up":
        statusOptions.delivered = true;
        break;
      case "Locating Driver":
        statusOptions.pickedUpByDriver = true;
        break;
      case "Picked Up By Driver":
        statusOptions.outForDelivery = true;
        break;
      case "Out For Delivery":
        statusOptions.delivered = true;
        break;
      case "Delivered":
      case "Rejected":
        statusOptions.rejected = false;
        break;
    }

    return statusOptions;
  };

  const openDrawer = (row: any) => {
    const originalAddAction = () => {
      setPrescriptionInfo(row);
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Status");
  };

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data } });
    };
    requireSecurityCheck(originalAddAction, type);
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
    if (prescriptionList && prescriptionList.length > 0) {
      dispatch(
        setPagination({
          totalItems: prescriptionList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1
        })
      );
    }
  }, [prescriptionList, dispatch]);

  const handleModal = (data: any, type: string) => {
    const originalAddAction = () => {
      if (type === "Reject") {
        setPageModalType("Reject the prescription");
        setModalSize('xl')
        setPassComponentToModalByMatch(<SettledClaimMissingRejectForm dataPass={{ type }} />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else if (type === "Processing") {
        navigate("create-invoice", { state: { id: data } })
      } else if (type === "Locating Driver") {
        setPageModalType('Search driver for delivery');
        setModalSize('xl')
        setPassComponentToModalByMatch(<PrescriptionSearchForDriver />);
        setTimeout(() => modalApiRef.current?.open?.(), 0);
      } else {
        console.log("Unknown modal type");
      }
    };
    requireSecurityCheck(originalAddAction, "Status");
  };

  const handleTypeColor = (status: string) => {
    switch (status) {
      case "Delivery":
        return "green";
      case "Pickup":
        return "yellow";
      default:
        return "gray";
    }
  };

  const handleStatusColor = (type: string) => {
    switch (type) {
      case "Pending":
        return "blue";
      case "Initiate":
        return "pink";
      case "Processing":
        return "green";
      case "Picked Up":
        return "lemon";
      case "Locating Driver":
        return "cyan";
      case "Picked Up By Driver":
        return "purple";
      case "Out For Delivery":
        return "magenta";
      case "Delivered":
        return "skyblue";
      case "Rejected":
        return "red";
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
            centered: true
          },
          component: passComponentToModalByMatch,
          title: pageModalType
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
            size: "xxl",
            padding: "xl",
            className: "overflow-y-auto"
          },
          component: <PrescriptionQuickView dataPass={{ prescriptionInfo }} />,
          title: "Prescription Quick View"
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
                  {currentData.map((val: any, key: number) => (
                    <Card
                      key={key}
                      withBorder
                      shadow="md"
                      className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-4 rounded-xl"
                    >
                      <Card.Section className="p-4 pb-1 rounded-t-xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <IconReceipt size={18} className="text-blue-500" />
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">{val.snahId}</Text>
                        </div>
                        <Box className="text-center pb-4">
                          <Text size="sm" c="dimmed">{moment(val.date).format("MMM DD, YYYY")}</Text>
                        </Box>
                      </Card.Section>
                      <Card.Section className="p-4 space-y-3 h-full">
                        <Box className="flex flex-col items-center justify-center gap-3 mb-4">
                          <Badge
                            variant="light"
                            radius="sm"
                            color={handleTypeColor(val.type)}
                          >
                            {val.type}
                          </Badge>
                          <Badge
                            variant="light"
                            radius="sm"
                            color={handleStatusColor(val.status)}
                          >
                            {val.status}
                          </Badge>
                        </Box>
                        <div className="flex items-center justify-between">
                          <Text size="sm" c="dimmed">Patient:</Text>
                          <Text size="sm" fw={600}>{val.patientName}</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text size="sm" c="dimmed">Physician:</Text>
                          <Text size="sm" fw={600}>{val.physicianName}</Text>
                        </div>
                        {val.status === "Rejected" && (
                          <div className="flex items-center">
                            <Text size="sm" fw={700}>Reason:&nbsp;</Text>
                            <Text size="sm" fw={500}>Out of order</Text>
                          </div>
                        )}
                      </Card.Section>
                      <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100/40 dark:bg-gray-700/40">
                        <Group justify="center" gap="xs">
                          <Tooltip label="Quick info">
                            <ActionIcon
                              aria-label="Quick info"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => openDrawer(val)}
                            >
                              <IconInfoCircle style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Detail view">
                            <ActionIcon
                              aria-label="Detail"
                              variant="medium"
                              color="blue"
                              className="hover:bg-blue-400 ease-in-out duration-300"
                              onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                            >
                              <IconDetails style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>
                          {val.status !== "Delivered" && val.status !== "Rejected" && (
                            <Tooltip label="Change Status">
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
                                  {(() => {
                                    const enabledOptions = getEnabledStatusOptions(val.status, val.type);
                                    return (
                                      <Fragment>
                                        <Menu.Item
                                          className={enabledOptions.initiate ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                          onClick={enabledOptions.initiate ? () => { handleModal(val, 'Initiate'); } : undefined}
                                          disabled={!enabledOptions.initiate}
                                        >
                                          Initiate
                                        </Menu.Item>
                                        <Menu.Item
                                          className={enabledOptions.processing ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                          onClick={enabledOptions.processing ? () => { handleModal(val, 'Processing'); } : undefined}
                                          disabled={!enabledOptions.processing}
                                        >
                                          Processing
                                        </Menu.Item>
                                        {val.type === "Pickup" && (
                                          <Menu.Item
                                            className={enabledOptions.pickedUp ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                            onClick={enabledOptions.pickedUp ? () => { handleModal(val, 'Picked Up'); } : undefined}
                                            disabled={!enabledOptions.pickedUp}
                                          >
                                            Picked Up
                                          </Menu.Item>
                                        )}
                                        {val.type === "Delivery" && (
                                          <Fragment>
                                            <Menu.Item
                                              className={enabledOptions.locatingDriver ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                              onClick={enabledOptions.locatingDriver ? () => { handleModal(val, 'Locating Driver'); } : undefined}
                                              disabled={!enabledOptions.locatingDriver}
                                            >
                                              Locating Driver
                                            </Menu.Item>
                                            <Menu.Item
                                              className={enabledOptions.pickedUpByDriver ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                              onClick={enabledOptions.pickedUpByDriver ? () => { handleModal(val, 'Picked Up By Driver'); } : undefined}
                                              disabled={!enabledOptions.pickedUpByDriver}
                                            >
                                              Picked Up By Driver
                                            </Menu.Item>
                                            <Menu.Item
                                              className={enabledOptions.outForDelivery ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                              onClick={enabledOptions.outForDelivery ? () => { handleModal(val, 'Out For Delivery'); } : undefined}
                                              disabled={!enabledOptions.outForDelivery}
                                            >
                                              Out For Delivery
                                            </Menu.Item>
                                          </Fragment>
                                        )}
                                        <Menu.Item
                                          className={enabledOptions.delivered ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                          onClick={enabledOptions.delivered ? () => { handleModal(val, 'Delivered'); } : undefined}
                                          disabled={!enabledOptions.delivered}
                                        >
                                          Delivered
                                        </Menu.Item>
                                        {enabledOptions.rejected && (
                                          <Menu.Item
                                            className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                            onClick={() => { handleModal(val, 'Rejected'); }}
                                          >
                                            Rejected
                                          </Menu.Item>
                                        )}
                                      </Fragment>
                                    );
                                  })()}
                                </Menu.Dropdown>
                              </Menu>
                            </Tooltip>
                          )}
                        </Group>
                      </Card.Section>
                    </Card>
                  ))}
                </div>
              ) : (
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
                        <Table.Th className="text-center p-4 min-w-64">Prescription SNAH ID</Table.Th>
                        <Table.Th className="text-center p-4 min-w-48">Appointment Date</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Patient Name</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Physician Name</Table.Th>
                        <Table.Th className="text-center p-4 min-w-40">Prescription Type</Table.Th>
                        <Table.Th className="text-center p-4 min-w-32">Status</Table.Th>
                        <Table.Th className="text-center p-4">Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.map((val: any, key: number) => (
                        <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <Table.Td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <IconReceipt size={16} className="text-blue-500" />
                              <Text fw={600} size="sm">
                                {val.snahId}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td className="p-4 text-center">
                            <Text size="sm" fw={600}>{moment(val.date).format("MMM DD, YYYY")}</Text>
                          </Table.Td>
                          <Table.Td className="p-4 text-center">
                            <Text size="sm">{val.patientName}</Text>
                          </Table.Td>
                          <Table.Td className="p-4 text-center">
                            <Text size="sm" fw={700}>{val.physicianName}</Text>
                          </Table.Td>
                          <Table.Td className="p-4 text-center">
                            <Badge
                              variant="light"
                              radius="sm"
                              color={handleTypeColor(val.type)}
                            >
                              {val.type}
                            </Badge>
                          </Table.Td>
                          <Table.Td className="p-4 text-center">
                            <Badge
                              variant="light"
                              radius="sm"
                              color={handleStatusColor(val.status)}
                            >
                              {val.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td className="p-4">
                            <Group gap="xs">
                              {val.status !== "Delivered" && val.status !== "Rejected" && (
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
                                    {(() => {
                                      const enabledOptions = getEnabledStatusOptions(val.status, val.type);
                                      return (
                                        <Fragment>
                                          <Menu.Item
                                            className={enabledOptions.initiate ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                            onClick={enabledOptions.initiate ? () => { handleModal(val, 'Initiate'); } : undefined}
                                            disabled={!enabledOptions.initiate}
                                          >
                                            Initiate
                                          </Menu.Item>
                                          <Menu.Item
                                            className={enabledOptions.processing ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                            onClick={enabledOptions.processing ? () => { handleModal(val, 'Processing'); } : undefined}
                                            disabled={!enabledOptions.processing}
                                          >
                                            Processing
                                          </Menu.Item>
                                          {val.type === "Pickup" && (
                                            <Menu.Item
                                              className={enabledOptions.pickedUp ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                              onClick={enabledOptions.pickedUp ? () => { handleModal(val, 'Picked Up'); } : undefined}
                                              disabled={!enabledOptions.pickedUp}
                                            >
                                              Picked Up
                                            </Menu.Item>
                                          )}
                                          {val.type === "Delivery" && (
                                            <Fragment>
                                              <Menu.Item
                                                className={enabledOptions.locatingDriver ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                                onClick={enabledOptions.locatingDriver ? () => { handleModal(val, 'Locating Driver'); } : undefined}
                                                disabled={!enabledOptions.locatingDriver}
                                              >
                                                Locating Driver
                                              </Menu.Item>
                                              <Menu.Item
                                                className={enabledOptions.pickedUpByDriver ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                                onClick={enabledOptions.pickedUpByDriver ? () => { handleModal(val, 'Picked Up By Driver'); } : undefined}
                                                disabled={!enabledOptions.pickedUpByDriver}
                                              >
                                                Picked Up By Driver
                                              </Menu.Item>
                                              <Menu.Item
                                                className={enabledOptions.outForDelivery ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                                onClick={enabledOptions.outForDelivery ? () => { handleModal(val, 'Out For Delivery'); } : undefined}
                                                disabled={!enabledOptions.outForDelivery}
                                              >
                                                Out For Delivery
                                              </Menu.Item>
                                            </Fragment>
                                          )}
                                          <Menu.Item
                                            className={enabledOptions.delivered ? "hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200" : "opacity-50 cursor-not-allowed"}
                                            onClick={enabledOptions.delivered ? () => { handleModal(val, 'Delivered'); } : undefined}
                                            disabled={!enabledOptions.delivered}
                                          >
                                            Delivered
                                          </Menu.Item>
                                          {enabledOptions.rejected && (
                                            <Menu.Item
                                              className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                              onClick={() => { handleModal(val, 'Rejected'); }}
                                            >
                                              Rejected
                                            </Menu.Item>
                                          )}
                                        </Fragment>
                                      );
                                    })()}
                                  </Menu.Dropdown>
                                </Menu>
                              )}
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
                                    Prescription Actions
                                  </Menu.Label>
                                  <Menu.Item
                                    leftSection={<IconInfoCircle size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => openDrawer(val)}
                                  >
                                    <Text size="sm" fw={500}>Quick Overview</Text>
                                  </Menu.Item>
                                  <Menu.Item
                                    leftSection={<IconDetails size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                                  >
                                    <Text size="sm" fw={500}>Claim Details</Text>
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>
                            </Group>
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
