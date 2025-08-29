import { Fragment } from "react";
import { Card, Table, Text, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import moment from "moment";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import type { RootState } from "../../../../../../redux/store";
import { IconCalendar, IconClock } from "@tabler/icons-react";

export const AccessLogList = (props: { dataPass: any }) => {
  const { accessLogList } = props.dataPass;
  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => { }
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);
  const topBarAndFilter = useSelector((state: RootState) => state.pageTopBarAndFilter);
  const pagination = useSelector((state: RootState) => state.pagePagination);
  const startIndex = pagination.startIndex - 1
  const endIndex = Math.min(pagination.endIndex, accessLogList.length)
  const currentData = accessLogList.slice(startIndex, endIndex)

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

  return (
    <Fragment>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {
                    currentData.map((val: any, key: number) => {
                      return (
                        <Card
                          key={key}
                          withBorder
                          shadow="md"
                          className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                        >
                          <Card.Section className="text-center p-4 pb-1 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                            <Box>
                              <Text fw={700} size="lg" className="text-gray-800 dark:text-gray-100">
                                {val.by}
                              </Text>
                            </Box>
                            <Box>
                              <Text size="sm" className="mb-2">{val.snahId}</Text>
                            </Box>
                          </Card.Section>
                          <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                            <div className="flex flex-col justify-center">
                              <Box className="flex items-center justify-center gap-1">
                                <IconCalendar size={16} />
                                <Text size="sm">{val.date ? moment(val.date).format("DD MMM YYYY") : "N/A"}</Text>
                              </Box>
                              <Box className="flex items-center justify-center gap-1 mt-1">
                                <IconClock size={16} />
                                <Text size="sm">{val.time ? moment(val.date + ' ' + val.time).format("hh:mm a") : "N/A"}</Text>
                              </Box>
                              <Box className="mt-4">
                                <Text size="sm" className="line-clamp-2 text-center">{val.access}</Text>
                              </Box>
                            </div>
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
                        <Table.Th className="text-center p-4 min-w-56">Access By</Table.Th>
                        <Table.Th className="text-center p-4 min-w-48">Date & Time</Table.Th>
                        <Table.Th className="text-center p-4 min-w-80">Access</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {
                        currentData.map((val: any, key: number) => {
                          return (
                            <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <Table.Td className="p-4 text-center">
                                <Text size="sm" className="font-bold">{val.by}</Text>
                                <Text size="sm">{val.snahId}</Text>
                              </Table.Td>
                              <Table.Td className="p-4 text-center">
                                <Box className="flex items-center justify-center gap-1">
                                  <IconCalendar size={16} />
                                  <Text size="sm">{val.date ? moment(val.date).format("DD MMM YYYY") : "N/A"}</Text>
                                </Box>
                                <Box className="flex items-center justify-center gap-1 mt-1">
                                  <IconClock size={16} />
                                  <Text size="sm">{val.time ? moment(val.date + ' ' + val.time).format("hh:mm a") : "N/A"}</Text>
                                </Box>
                              </Table.Td>
                              <Table.Td className="p-4 text-center">
                                <Text size="sm" c="dimmed">
                                  {val.access}
                                </Text>
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
            title: "No Patients Found",
            description: "There are currently no patients to display. This could be because:",
            reasons: [
              "• No patients have been created yet",
              "• All patients may have been archived",
              "• There might be a connectivity issue"
            ]
          }} />
        )}
      </Card.Section >
    </Fragment >
  );
};