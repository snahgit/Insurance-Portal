import { useRef } from "react";
import { ActionIcon, Badge, Box, Card, Group, Menu, Table, Text, Tooltip } from "@mantine/core";
import { IconDots, IconDetails, IconEdit, IconCopyCheck, IconCalendarClock, IconTrashX, IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../../../../../redux/store";
import AlertService from "../../../../../../services/alertService";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageDrawer } from "../../../../../common/PageDrawer";
import ViewSchedule from "../detail/ViewSchedule";
import CloneSchedule from "../form/CloneSchedule";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";

export const ScheduleList = (props: { dataPass: any }) => {
  const { scheduleList, handelRemoveItem } = props.dataPass;
  const [drawerType, setDrawerType] = useState<number | null>(1);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const navigate = useNavigate();

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, scheduleList.length);
  const currentData = scheduleList.slice(startIndex, endIndex);

  const { requireSecurityCheck } = useSecurityCheck();

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => {
    console.log("Retrying data fetch...");
  };

  const handleDrawer = (type: number) => {
    const originalAddAction = () => {
      setDrawerType(type);
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Info");
  };

  const handleRemove = async (data: any) => {
    const resp = await AlertService.sweetAlert({
      title: 'Are you sure you want to proceed?',
      icon: 'warning',
      type: 'confirm',
    });
    if (resp == true) {
      const originalAddAction = () => {
        handelRemoveItem(data);
      };
      requireSecurityCheck(originalAddAction, "Add");
    }
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
    if (scheduleList && scheduleList.length > 0) {
      dispatch(
        setPagination({
          totalItems: scheduleList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [scheduleList, dispatch]);

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data.id } });
    };
    requireSecurityCheck(originalAddAction, type);
  };

  return (
    <Card.Section className="p-4">
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "md",
            position: "right",
            size: "md",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: drawerType == 1 ? <ViewSchedule /> : <CloneSchedule />,
          title: drawerType == 1 ? "Schedule Details" : "Clone Appointment",
        }}
      />
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
            {
              topBarAndFilter.viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentData.map((val: any, key: number) => {
                    return (
                      <Card
                        key={key}
                        withBorder
                        shadow="md"
                        radius="lg"
                        className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-4"
                      >
                        <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                          <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                            {val.physician_iD}
                          </Text>
                          <Box>
                            <Text size="sm" c="dimmed" className="mb-2">
                              {val.physician_name}
                            </Text>
                          </Box>
                        </Card.Section>
                        <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                          <div className="justify-center sm:justify-start flex-col flex items-center space-x-1 ">
                            <Box className="flex items-center space-x-2">
                              <IconCalendarClock size={20} className="text-gray-500" />
                              <Text className="font-sm font-semibold">
                                Appointment Date
                              </Text>
                            </Box>
                            <Box size="sm">
                              <Text className="font-sm font-normal ps-2">
                                {val.schedule_date}
                              </Text>
                            </Box>
                          </div>
                          <div className="flex items-center justify-center space-x-2 mt-3">
                            <Badge variant="light" color="violet" radius="sm">
                              {val.pppt_type}
                            </Badge>
                            <Badge
                              variant="light"
                              className="cursor-pointer"
                              color="green"
                              radius="sm"
                            >
                              {val.Slots}
                            </Badge>
                          </div>
                        </Card.Section>
                        <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                          <Group justify="center" gap="xs">
                            <Tooltip label="Quick info">
                              <ActionIcon
                                aria-label="Info"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                                onClick={() => handleDrawer(2)}
                              >
                                <IconInfoCircle
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit schedule">
                              <ActionIcon
                                aria-label="Settings"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                                onClick={() => navigateUrl({ data: val, type: "edit", url: 'form' })}
                              >
                                <IconEdit
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Clone schedule">
                              <ActionIcon
                                aria-label="Settings"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                                onClick={() => handleDrawer(1)}
                              >
                                <IconCopyCheck
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Delete schedule">
                              <ActionIcon
                                aria-label="Settings"
                                variant="medium"
                                color="blue"
                                className="hover:bg-blue-400 ease-in-out duration-300"
                                onClick={() => handleRemove(val.id)}
                              >
                                <IconTrashX
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
                    emptyMessage="No schedule found"
                    loadingMessage="Loading schedule..."
                    onRetry={handleRetry}
                  >
                    <Table.Thead className="">
                      <Table.Tr>
                        <Table.Th className="text-center p-4">Sr No</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Physician Name</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Physician ID</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Schedule Date</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Appointment type</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Slots</Table.Th>
                        <Table.Th className="text-center min-w-40 p-4">Action</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {currentData.map((val: any, key: number) => {
                        return (
                          <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Table.Td className="text-center p-4">
                              {val.id}
                            </Table.Td>
                            <Table.Td className="text-center p-4">
                              <Text size="sm">{val.physician_name}</Text>
                            </Table.Td>
                            <Table.Td className=" text-center p-4">
                              <Text size="sm" c="text-center dimmed">
                                {val.physician_iD}
                              </Text>
                            </Table.Td>
                            <Table.Td className="text-center p-4">
                              <Text size="sm" c="dimmed">
                                {val.schedule_date}
                              </Text>
                            </Table.Td>
                            <Table.Td className="text-center p-4">
                              <Badge variant="light" color="violet" radius="sm">
                                {val.pppt_type}
                              </Badge>
                            </Table.Td>
                            <Table.Td className=" text-center p-4">
                              <Badge
                                variant="light"
                                className="cursor-pointer"
                                color="green"
                                radius="sm"
                              >
                                {val.Slots}
                              </Badge>
                            </Table.Td>

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
                                    Appointment Actions
                                  </Menu.Label>
                                  <Menu.Item leftSection={<IconInfoCircle size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleDrawer(2)}
                                  >
                                    <Text size="sm" fw={500}>Info</Text>
                                  </Menu.Item>
                                  <Menu.Item leftSection={<IconEdit size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => navigateUrl({ data: val, type: "edit", url: 'form' })}
                                  >
                                    <Text size="sm" fw={500}>Edit</Text>
                                  </Menu.Item>
                                  <Menu.Item leftSection={<IconDetails size={16} />}
                                    onClick={() => handleDrawer(1)}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                  >
                                    <Text size="sm" fw={500}>Clone</Text>
                                  </Menu.Item>
                                  <Menu.Divider />
                                  <Menu.Item leftSection={<IconTrashX size={16} />}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                    onClick={() => handleRemove(val.id)}
                                  >
                                    <Text size="sm" fw={500}>Delete</Text>
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
        <PageNoDataFound
          dataPass={{
            title: "No Schedule Found",
            description:
              "There are currently no schedules to display. This could be because:",
            reasons: [
              "• No schedules have been created yet",
              "• All schedules may have been archived",
              "• There might be a connectivity issue",
            ],
          }}
        />
      )}
    </Card.Section>
  );
};
