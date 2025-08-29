import { ActionIcon, Badge, Box, Card, Group, Menu, Table, Text, Tooltip } from "@mantine/core";
import { IconDots, IconInfoCircle, IconEdit, IconStatusChange } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DepartmentQuickView } from "../detail/DepartmentQuickView";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageModal } from "../../../../../common/PageModal";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { closePageModal, openPageModal } from "../../../../../../redux/slices/modalDrawerSlice";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { notifications } from "@mantine/notifications";
import { useChangeStatusDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import AlertService from "../../../../../../services/alertService";
import { DepartmentAddEditForm } from "../form/DepartmentAddEditForm";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";

export const DepartmentList = (props: { dataPass: any }) => {
  const { departmentList } = props.dataPass;

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => {
    console.log('Retrying data fetch...');
  };

  const [departmentInfo, setDepartmentInfo] = useState<any>(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const topBarAndFilter = useSelector(
    (state: RootState) => state.pageTopBarAndFilter
  );
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, departmentList.length);
  const currentData = departmentList.slice(startIndex, endIndex);

  const modalDrawer = useSelector((state: RootState) => state.modalDrawer);
  const { requireSecurityCheck } = useSecurityCheck();

  const handleDrawer = (data: any) => {
    const originalAddAction = () => {
      setDepartmentInfo(data);
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Info");
  };

  const handleModal = (data: any) => {
    const originalAddAction = () => {
      dispatch(
        openPageModal({
          data: {},
          type: "edit",
          for: 'addEdit',
        })
      );
      setDepartmentInfo(data);
      setTimeout(() => modalApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Edit");
  };

  const { mutate: changeStatusDepartment } = useChangeStatusDepartment(() => {
    notifications.show({
      title: 'Success!',
      message: 'Department status changed successfully',
      color: 'green',
    });
  });

  const handleChangeStatus = (data: any) => {
    const originalAddAction = async () => {
      const resp = await AlertService.sweetAlert({
        title: 'Are you sure you want to proceed?',
        icon: 'warning',
        type: 'confirm',
      });
      if (resp == true) {
        changeStatusDepartment(data.id);
      }
    };
    requireSecurityCheck(originalAddAction, "Change");
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
    if (modalDrawer.pageModal.isOpen) {
      dispatch(closePageModal());
      setDepartmentInfo(modalDrawer.pageModal.data);
      setTimeout(() => modalApiRef.current?.open?.(), 0);
    }
    if (departmentList && departmentList.length > 0) {
      dispatch(
        setPagination({
          totalItems: departmentList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [departmentList, dispatch, modalDrawer]);

  return (
    <Fragment>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "md",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: <DepartmentAddEditForm dataPass={{ departmentInfo }} />,
          title: modalDrawer.pageModal.type === "edit" ? "Update department" : "Create department",
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
            size: "sm",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: <DepartmentQuickView dataPass={{ departmentInfo }} />,
          title: 'Department Info',
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
              {topBarAndFilter.viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentData.map((val: any, key: number) => {
                    return (
                      <Card
                        key={key}
                        withBorder
                        shadow="md"
                        className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                      >
                        <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                            {val.name}
                          </Text>
                          <Box className="mb-3">
                            <Text size="sm" c="dimmed" className="mb-2">SNAH321569</Text>
                            <Badge variant="light" color={val.status == "Active" ? "green" : "red"} radius="sm" >
                              <p>{val.status}</p>
                            </Badge>
                          </Box>
                        </Card.Section>
                        <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                          <Text size="sm" className="text-gray-700 dark:text-gray-300">
                            {val.description}
                          </Text>
                        </Card.Section>
                        <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                          <Group justify="center" gap="xs">
                            <Tooltip label="Quick info">
                              <ActionIcon
                                aria-label="Quick info"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 dark:hover:bg-blue-600 ease-in-out duration-300"
                                onClick={() => handleDrawer(val)}
                              >
                                <IconInfoCircle
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit department">
                              <ActionIcon
                                aria-label="Edit department"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 dark:hover:bg-blue-600 ease-in-out duration-300"
                                onClick={() => handleModal(val)}
                              >
                                <IconEdit
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Change status">
                              <ActionIcon
                                aria-label="Change status"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 dark:hover:bg-blue-600 ease-in-out duration-300"
                                onClick={() => handleChangeStatus(val)}
                              >
                                <IconStatusChange
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
                    emptyMessage="No departments found"
                    loadingMessage="Loading departments..."
                    onRetry={handleRetry}
                  >
                    <Table.Thead className="">
                      <Table.Tr>
                        <Table.Th className="text-center min-w-40 p-4">Name</Table.Th>
                        <Table.Th className="text-center min-w-96 p-4">Detail</Table.Th>
                        <Table.Th className="text-center min-w-28 p-4">Status</Table.Th>
                        <Table.Th className="text-center p-4">Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.map((val: any, key: number) => {
                        return (
                          <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Table.Td className="p-4">
                              <Text fw={600} size="sm">{val.name}</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Text size="sm" c="dimmed">{val.description.substring(0, 60)}...</Text>
                            </Table.Td>
                            <Table.Td className="p-4">
                              <Badge color={val.status === "Active" ? "green" : "red"}>
                                {val.status}
                              </Badge>
                            </Table.Td>
                            <Table.Td className="p-4">
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
                                    className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300"
                                  >
                                    <IconDots size={16} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                  <Menu.Label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Department Actions</Menu.Label>
                                  <Menu.Item
                                    leftSection={<IconInfoCircle size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleDrawer(val)}
                                  >
                                    <Text size="sm" fw={500}>View Department</Text>
                                  </Menu.Item>
                                  <Menu.Item
                                    leftSection={<IconEdit size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleModal(val)}
                                  >
                                    <Text size="sm" fw={500}>Edit Department</Text>
                                  </Menu.Item>
                                  <Menu.Item
                                    leftSection={<IconStatusChange size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleChangeStatus(val)}
                                  >
                                    <Text size="sm" fw={500}>Change Status</Text>
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })}
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