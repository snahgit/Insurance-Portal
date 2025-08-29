import { ActionIcon, Card, Group, Table, Text, Tooltip, Box, Menu, } from "@mantine/core";
import { IconDetails, IconDots, IconEdit } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import { useNavigate } from "react-router";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";

export const options = {
  mask: "(___) ___-__-__",
  replacement: { _: /\d/ },
};

export const ReportList = (props: { dataPass: any }) => {
  const { staffMemberList } = props.dataPass;
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
  const endIndex = Math.min(pagination.endIndex, staffMemberList.length);
  const currentData = staffMemberList.slice(startIndex, endIndex);

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
    if (staffMemberList && staffMemberList.length > 0) {
      dispatch(
        setPagination({
          totalItems: staffMemberList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [staffMemberList, dispatch]);

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data.id } });
    };
    requireSecurityCheck(originalAddAction, type);
  };
  return (
    <Fragment>
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
                              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-4 rounded-xl"
                            >
                              <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                                <Box>
                                  <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100 line-clamp-1">
                                    {val.planName}
                                  </Text>
                                </Box>
                                <Box>
                                  <Text size="sm" c="dimmed" className="mb-2">{val.appointmentId}</Text>
                                </Box>
                              </Card.Section>
                              <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                                <Text size="sm" c="dimmed"
                                  className="line-clamp-3 leading-relaxed text-justify"
                                  title={val.description}>{val.description}</Text>
                              </Card.Section>
                              <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                                <Group justify="center" gap="xs">
                                  <Tooltip label="Edit">
                                    <ActionIcon
                                      aria-label="Settings"
                                      variant="medium"
                                      color="blue"
                                      className="hover:bg-blue-400 ease-in-out duration-300"
                                      onClick={() => navigateUrl({ data: val, type: "Edit", url: "form" })}
                                    >
                                      <IconEdit
                                        style={{ width: "70%", height: "70%" }}
                                        stroke={1.5}
                                      />
                                    </ActionIcon>
                                  </Tooltip>
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
                            <Table.Th className="text-center p-4 min-w-44">Appointment ID</Table.Th>
                            <Table.Th className="text-center p-4 min-w-44">Plan Name</Table.Th>
                            <Table.Th className="text-center p-4 min-w-60">Description</Table.Th>
                            <Table.Th className="text-center p-4">Actions</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {
                            currentData.map((val: any, key: number) => {
                              return (
                                <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <Table.Td className="p-4 text-center">
                                    <Text size="xs" c="dimmed">{val.appointmentId}</Text>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <Text size="sm" c="dimmed" className="line-clamp-1">{val.planName}</Text>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
                                    <Text size="sm" c="dimmed" className="line-clamp-1">{val.description}</Text>
                                  </Table.Td>
                                  <Table.Td className="p-4 text-center">
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
                                          Staff Actions
                                        </Menu.Label>
                                        <Menu.Item leftSection={<IconEdit size={16} />}
                                          className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                          onClick={() => navigateUrl({ data: val, type: "edit", url: 'form' })}
                                        >
                                          <Text size="sm" fw={500}>
                                            Edit Staff
                                          </Text>
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconDetails size={16} />}
                                          className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                          onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                                        >
                                          <Text size="sm" fw={500}>
                                            Staff Details
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