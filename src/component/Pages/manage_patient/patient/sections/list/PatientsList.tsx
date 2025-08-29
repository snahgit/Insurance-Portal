import { ActionIcon, Avatar, Badge, Box, Card, Group, Menu, Table, Text, Tooltip } from "@mantine/core";
import { IconDots, IconDetails, IconInfoCircle, IconPhone, IconMailPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { format } from "@react-input/mask";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { useNavigate } from "react-router";
import { PatientsQuickView } from "../detail/PatientsQuickView";
import { PageDrawer } from "../../../../../common/PageDrawer";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import PageLoader from "../../../../../common/page_loader/PageLoader";
import { useSecurityCheck } from "../../../../../../context/SecurityCheckContext";

export const options = {
  mask: "(___) ___-__-__",
  replacement: { _: /\d/ },
};

export const PatientsList = (props: { dataPass: any }) => {
  const { patientList } = props.dataPass;
  const navigate = useNavigate();

  const isLoading = false;
  const error = null;
  const isEmpty = false;
  const handleRetry = () => {
    console.log('Retrying data fetch...');
  };

  const topBarAndFilter = useSelector(
    (state: RootState) => state.pageTopBarAndFilter
  );
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const pagination = useSelector((state: RootState) => state.pagePagination);
  const dispatch = useDispatch();
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, patientList.length);
  const currentData = patientList.slice(startIndex, endIndex);

  const [patientInfo, setPatientInfo] = useState(null);
  const drawerApiRef = useRef<{ open: () => void } | null>(null);

  const { requireSecurityCheck } = useSecurityCheck();

  const handleDrawer = (data: any) => {
    const originalAddAction = () => {
      setPatientInfo(data);
      setTimeout(() => drawerApiRef.current?.open?.(), 0);
    };
    requireSecurityCheck(originalAddAction, "Info");
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
    if (patientList && patientList.length > 0) {
      dispatch(
        setPagination({
          totalItems: patientList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [patientList, dispatch]);

  const navigateUrl = ({ data, type, url }: { data: any, type: string, url: string }) => {
    const originalAddAction = () => {
      navigate(url, { state: { id: data } });
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
            size: "lg",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: <PatientsQuickView dataPass={{ patientInfo }} />,
          title: 'Patient Quick Information',
        }}
      />
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
                                <IconMailPin size={16} className="text-blue-500" />
                                <Text size="sm" className="font-semibold">
                                  {val.email}
                                </Text>
                              </div>
                              <div className="flex justify-center space-x-2">
                                <IconPhone size={16} className="text-blue-500" />
                                <Text size="sm" className="font-semibold">
                                  {format(val.phone, options)}
                                </Text>
                              </div>
                              <div className="flex flex-row justify-center gap-2">
                                <Badge
                                  variant="light"
                                  color={val.gender == "male" ? "cyan" : "pink"}
                                  radius="sm"
                                >
                                  <p>{val.gender}</p>
                                </Badge>
                                <Badge
                                  variant="light"
                                  className="cursor-pointer"
                                  color={val.status == "Active" ? "green" : "red"}
                                  radius="sm"
                                >
                                  {val.status}
                                </Badge>
                              </div>
                            </Card.Section>
                            <Card.Section className="p-3 border-t rounded-b-xl bg-blue-100 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-50">
                              <Group justify="center" gap="xs">
                                <Tooltip label="Quick info">
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
                          <Table.Th className="text-center p-4 min-w-60">Patient</Table.Th>
                          <Table.Th className="text-center p-4 min-w-44">Contact</Table.Th>
                          <Table.Th className="text-center p-4 min-w-32">Date of birth</Table.Th>
                          <Table.Th className="text-center p-4 min-w-80">Address</Table.Th>
                          <Table.Th className="text-center p-4">Actions</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {
                          currentData.map((val: any, key: number) => {
                            return (
                              <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <Table.Td className="p-4">
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
                                <Table.Td className="p-4">
                                  <div className="space-y-1">
                                    <Text size="sm">{val.email}</Text>
                                    <Text size="sm" c="dimmed">
                                      {format(val.phone, options)}
                                    </Text>
                                  </div>
                                </Table.Td>
                                <Table.Td className="p-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <Text size="sm" c="dimmed">
                                        {moment(val.age).format("DD-MM-YYYY")}
                                      </Text>
                                    </div>
                                  </div>
                                </Table.Td>
                                <Table.Td className="p-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <Text size="sm" c="dimmed">
                                        J98X+94 , Bethuadahari , West Bengal , 741126 ,
                                        India
                                      </Text>
                                    </div>
                                  </div>
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
                                        className="hover:bg-blue-100 transition-all duration-300"
                                      >
                                        <IconDots size={16} />
                                      </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800">
                                      <Menu.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Patient Actions
                                      </Menu.Label>
                                      <Menu.Item leftSection={<IconInfoCircle size={16} />}
                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                        onClick={() => handleDrawer(val)}
                                      >
                                        <Text size="sm" fw={500}>
                                          Patient Overview
                                        </Text>
                                      </Menu.Item>
                                      <Menu.Item leftSection={<IconDetails size={16} />}
                                        className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                                        onClick={() => navigateUrl({ data: val, type: "detail", url: 'detail' })}
                                      >
                                        <Text size="sm" fw={500}>
                                          Patient Details
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
        ) : <PageNoDataFound dataPass={{
          title: "No Patients Found",
          description: "There are currently no patients to display. This could be because:",
          reasons: [
            "• No patients have been created yet",
            "• All patients may have been archived",
            "• There might be a connectivity issue"
          ]
        }} />
      }
    </Card.Section>
  );
};
