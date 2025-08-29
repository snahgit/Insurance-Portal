import { ActionIcon, Button, Card, Grid, Group, Menu, Text } from "@mantine/core";
import { IconArrowAutofitLeft, IconClearAll, IconDots, IconEye, IconFilter, IconGridDots, IconList, IconPlus, IconSearch, IconX, IconCalendar } from "@tabler/icons-react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setFilter, setHeading, setShowFilter, setViewMode, toggleFilter, toggleCalendar, setCalendarDateData, setCalendarActiveTab, setCalendarTitle, clearFilter } from "../../redux/slices/pageTopBarAndFilterSlice";
import { useNavigate } from "react-router";
import { openPageModal } from "../../redux/slices/modalDrawerSlice";
import { useSecurityCheck } from "../../context/SecurityCheckContext";
import { PageDataCalendar } from "./PageDataCalendar";
import { PageDateInput, PageSelect, PageTextInput } from "./PageInput";
import { CONSTANT } from "../../services/constantService";
import { useFormHelper } from "../../services/helperService";
import { filterSchema, type FilterFormType } from "../../services/zod_schema/zodFilterSchema";
import { useAppSelector } from "../../redux/hooks";

export const PageTopBarAndFilter = (props: { dataPass: any }) => {
  // const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const { topBarAndFilter = {} } = props.dataPass;
  const defaultTopBarAndFilter = {
    heading: "",
    viewMode: "grid",
    type: "",
    title: "",
    addBtnText: "",
    addNeededRedirectTo: "/",
    onAddClick: null,
    onBackClick: null,
    whatNeeded: {
      isViewModeNeeded: false,
      isCalendarNeeded: false,
      isFilterNeeded: false,
      isBackNeeded: false,
      isAddNeeded: false,
      isMoreActionNeeded: false,
    },
    modalDrawer: {
      for: "",
    },
  };
  const mergedTopBarAndFilter = {
    ...defaultTopBarAndFilter,
    ...topBarAndFilter,
    whatNeeded: {
      ...defaultTopBarAndFilter.whatNeeded,
      ...(topBarAndFilter.whatNeeded || {}),
    },
    modalDrawer: {
      ...defaultTopBarAndFilter.modalDrawer,
      ...(topBarAndFilter.modalDrawer || {}),
    },
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageTopBarAndFilter = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const { requireSecurityCheck } = useSecurityCheck();

  useEffect(() => {
    dispatch(setShowFilter(false));
    if (mergedTopBarAndFilter.heading) {
      dispatch(setHeading(mergedTopBarAndFilter.heading));
    }
    if (mergedTopBarAndFilter.viewMode) {
      dispatch(setViewMode(mergedTopBarAndFilter.viewMode));
    }
  }, [mergedTopBarAndFilter.heading, mergedTopBarAndFilter.viewMode, dispatch]);

  const handleViewModeChange = (mode: "grid" | "list") => {
    dispatch(setViewMode(mode));
  };
  const handleAddClick = () => {
    const originalAddAction = () => {
      if (mergedTopBarAndFilter.modalDrawer.for) {
        dispatch(
          openPageModal({
            data: {},
            type: "add",
            for: mergedTopBarAndFilter.modalDrawer.for,
          })
        );
      } else {
        navigate(mergedTopBarAndFilter.addNeededRedirectTo);
      }
    };
    requireSecurityCheck(originalAddAction, "Add");
  };
  const handleBackClick = () => {
    if (mergedTopBarAndFilter.onBackClick) {
      mergedTopBarAndFilter.onBackClick();
    } else {
      navigate(-1);
    }
  };
  const handleToggleFilter = () => {
    dispatch(toggleFilter());
  };
  const handleToggleCalendar = () => {
    if (mergedTopBarAndFilter.type === "wallet") {
      return;
    }
    dispatch(setCalendarActiveTab(mergedTopBarAndFilter.type || ""));
    dispatch(setCalendarTitle(mergedTopBarAndFilter.title || ""));
    const currentTabType = mergedTopBarAndFilter.type || "";
    const isCurrentTabData = pageTopBarAndFilter.calendar.activeTab === currentTabType;
    const hasExistingData = Object.keys(pageTopBarAndFilter.calendar.dateData).length > 0;

    if (!isCurrentTabData || !hasExistingData) {
      const realDateData = getRealDateData(currentTabType);
      dispatch(setCalendarDateData(realDateData));
    }

    dispatch(toggleCalendar());
  };

  const getRealDateData = (__tabType: string): Record<string, number> => {
    return {};
  };
  const handleDateSelect = (_date: string) => { };

  // const handleTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(
  //     setFilter({
  //       field: event.target.name as keyof FilterState,
  //       value: event.target.value,
  //     })
  //   );
  // };

  const filterObject = filterSchema();
  const form = useFormHelper<FilterFormType>({
    initialValues: {
      statusFilter: pageTopBarAndFilter.filter.statusFilter || "",
      genderFilter: pageTopBarAndFilter.filter.genderFilter || "",
      scheduleFilter: pageTopBarAndFilter.filter.scheduleFilter || "",
      transactionFilter: pageTopBarAndFilter.filter.transactionFilter || "",
      walletFilter: pageTopBarAndFilter.filter.walletFilter || "",
      textFilter: pageTopBarAndFilter.filter.textFilter || "",
      propertyFilter: pageTopBarAndFilter.filter.propertyFilter || "",
      stateFilter: pageTopBarAndFilter.filter.stateFilter || "",
      dateFilter: pageTopBarAndFilter.filter.dateFilter || null,
    },
    validationSchema: filterObject,
    mode: 'controlled',
  });

  const handleSubmitFilter = () => {
    dispatch(setFilter({ field: "statusFilter", value: form.values.statusFilter || "" }));
    dispatch(setFilter({ field: "genderFilter", value: form.values.genderFilter || "" }));
    dispatch(setFilter({ field: "scheduleFilter", value: form.values.scheduleFilter || "" }));
    dispatch(setFilter({ field: "transactionFilter", value: form.values.transactionFilter || "" }));
    dispatch(setFilter({ field: "walletFilter", value: form.values.walletFilter || "" }));
    dispatch(setFilter({ field: "textFilter", value: form.values.textFilter || "" }));
    dispatch(setFilter({ field: "propertyFilter", value: form.values.propertyFilter || "" }));
    dispatch(setFilter({ field: "stateFilter", value: form.values.stateFilter || "" }));
    dispatch(setFilter({ field: "dateFilter", value: form.values.dateFilter || null }));
  };

  const handleClearFilter = () => {
    form.reset();
    dispatch(clearFilter());
  };

  // const handleChangeFilterClaimType = (value: string | null) => {
  //   dispatch(setFilter({ field: "claimType", value: value || "" }));
  // };

  return (
    <Fragment>
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        className="rounded-t-xl"
      >
        <Group justify="space-between">
          <Text fw={500} className="text-xl font-heading py-4">
            {pageTopBarAndFilter.topBar.heading}
          </Text>
          <Group gap="sm">
            {topBarAndFilter.whatNeeded.isViewModeNeeded && (
              <ActionIcon.Group>
                <ActionIcon
                  variant={
                    pageTopBarAndFilter.viewMode === "grid" ? "filled" : "light"
                  }
                  size="md"
                  aria-label="Gallery"
                  onClick={() => handleViewModeChange("grid")}
                  className="transition-all duration-200"
                >
                  <IconGridDots size={20} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  variant={
                    pageTopBarAndFilter.viewMode === "list" ? "filled" : "light"
                  }
                  size="md"
                  aria-label="Settings"
                  onClick={() => handleViewModeChange("list")}
                  className="transition-all duration-200"
                >
                  <IconList size={20} stroke={1.5} />
                </ActionIcon>
              </ActionIcon.Group>
            )}
            {mergedTopBarAndFilter.whatNeeded.isCalendarNeeded && (
              <Button
                leftSection={<IconCalendar size={14} />}
                variant="light"
                color="blue"
                size="xs"
                onClick={handleToggleCalendar}
              >
                Calendar
              </Button>
            )}
            {mergedTopBarAndFilter.whatNeeded.isFilterNeeded && (
              <Button
                leftSection={<IconFilter size={14} />}
                variant="light"
                color="blue"
                size="xs"
                onClick={handleToggleFilter}
              >
                Filter
              </Button>
            )}
            {mergedTopBarAndFilter.whatNeeded.isAddNeeded && (
              <Button
                leftSection={<IconPlus size={14} />}
                variant="filled"
                color="blue"
                size="md"
                onClick={handleAddClick}
              >
                {mergedTopBarAndFilter.addBtnText}
              </Button>
            )}
            {mergedTopBarAndFilter.whatNeeded.isBackNeeded && (
              <Button
                leftSection={<IconArrowAutofitLeft size={14} />}
                variant="light"
                color="blue"
                size="xs"
                onClick={handleBackClick}
              >
                Back
              </Button>
            )}
            {mergedTopBarAndFilter.whatNeeded.isMoreActionNeeded && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="light" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconFilter size={14} />}
                    onClick={handleToggleFilter}
                  >
                    Filter data
                  </Menu.Item>
                  <Menu.Item leftSection={<IconEye size={14} />}>
                    Preview all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
      </Card.Section>
      {pageTopBarAndFilter.showFilter && (
        <Fragment>
          <Card.Section className="border-b mk_filter">
            <div className="p-4">
              <Group justify="space-between" mb="md">
                <Text fw={500} size="md">
                  Filter Options
                </Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => dispatch(setShowFilter(false))}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>

              <Grid>
                {
                  ([
                    "physician",
                    "department",
                    "appointment",
                    "patient",
                    "member",
                    "staffMember",
                    "pharmacist",
                    "department",
                    "claim"
                  ].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by status"
                        data={[CONSTANT.status.active, CONSTANT.status.inactive]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("statusFilter")}
                        value={form.values.statusFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  ([
                    "physician",
                    "patient",
                    "member"
                  ].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by gender"
                        data={[CONSTANT.gender.male, CONSTANT.gender.female, CONSTANT.gender.other]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("genderFilter")}
                        value={form.values.genderFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["schedule"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by schedule"
                        data={[CONSTANT.schedule.inPerson, CONSTANT.schedule.virtual, CONSTANT.schedule.homeVisit]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("scheduleFilter")}
                        value={form.values.scheduleFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["paymentLog"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by transaction"
                        data={[CONSTANT.transaction.pending, CONSTANT.transaction.paid, CONSTANT.transaction.refunded, CONSTANT.transaction.failed]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("transactionFilter")}
                        value={form.values.transactionFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["viewAccessLog"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageDateInput
                        placeholder="Filter by date"
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("dateFilter")}
                        value={form.values.dateFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["walletTransaction"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by wallet"
                        data={[CONSTANT.wallet.credit, CONSTANT.wallet.debit]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("walletFilter")}
                        value={form.values.walletFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["helpSupport"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by property"
                        data={[CONSTANT.property.high, CONSTANT.property.medium, CONSTANT.property.low]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("propertyFilter")}
                        value={form.values.propertyFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (["helpSupport"].includes(mergedTopBarAndFilter.type)) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <PageSelect
                        placeholder="Filter by state"
                        data={[CONSTANT.state.open, CONSTANT.state.close]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        {...form.getInputProps("stateFilter")}
                        value={form.values.stateFilter || null}
                        clearable
                      />
                    </Grid.Col>
                  )
                }
                {
                  (
                    [
                      "patient",
                      "member",
                      "videoTutorial",
                    ].includes(mergedTopBarAndFilter.type)
                  ) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <PageTextInput
                        placeholder="Search by name..."
                        leftSection={<IconSearch size={16} />}
                        className="flex-1"
                        {...form.getInputProps("textFilter")}
                        value={form.values.textFilter || ''}
                      />
                    </Grid.Col>
                  )
                }



                {/* {(
                  ["userPrivate", "userHospital", "userHome", "userPharmacy", "userCaregiver", "userRide", "userTreatment", "viewAccessLog", "report", "videoTutorial", "staffMember", "pharmacist", "helpSupport", "paymentsLog"].includes(
                    mergedTopBarAndFilter.type
                  )
                ) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <TextInput
                        placeholder="Search by name..."
                        leftSection={<IconSearch size={16} />}
                        className="flex-1"
                        name="searchTerm"
                        value={pageTopBarAndFilter.filter.searchTerm}
                      />
                    </Grid.Col>
                  )}
                {mergedTopBarAndFilter.type == "appointment" && (
                  <>
                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <DatePickerInput
                        type="range"
                        placeholder="Pick dates range"
                        value={value}
                        onChange={setValue}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <Select
                        placeholder="Filter by status"
                        data={["Pending", "Confirmed", "Cancelled", "Completed"]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        value={pageTopBarAndFilter.filter.statusFilter}
                        clearable
                      />
                    </Grid.Col>
                  </>
                )}

                {(
                  ["settledClaim"].includes(
                    mergedTopBarAndFilter.type
                  )
                ) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <Select
                        placeholder="Filter by status"
                        data={["Private Practice", "Medical Facility", "Pharmacy"]}
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        value={pageTopBarAndFilter.filter.claimType || null}
                        clearable
                        comboboxProps={{ withinPortal: true }}
                      />
                    </Grid.Col>
                  )}
                {(
                  ["walletTransaction"].includes(
                    mergedTopBarAndFilter.type
                  )
                ) && (
                    <Grid.Col span={{ base: 12, lg: 3, sm: 6 }}>
                      <Select
                        placeholder="Filter by status"
                        data={
                          mergedTopBarAndFilter.type === "walletTransaction"
                            ? ["Credit", "Debit"]
                            : ["Active", "Inactive"]
                        }
                        className="min-w-32 text-gray-800 dark:text-gray-200"
                        value={pageTopBarAndFilter.filter.statusFilter || null}
                        clearable
                        comboboxProps={{ withinPortal: true }}
                      />
                    </Grid.Col>
                  )}
                {mergedTopBarAndFilter.type === "logs" && (
                  <>
                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <TextInput
                        placeholder="Filter by Accessed by"
                        leftSection={<IconSearch size={16} />}
                        name="accessedBy"
                        value={pageTopBarAndFilter.filter.accessedBy}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 3, sm: 12 }}>
                      <TextInput
                        placeholder="Filter by Email"
                        leftSection={<IconSearch size={16} />}
                        name="email"
                        value={pageTopBarAndFilter.filter.email}
                      />
                    </Grid.Col>
                  </>
                )} */}
                <Grid.Col span={{ base: 12, lg: 3, sm: 12 }} className="gap-2">
                  <Group>
                    <Button variant="light" size="sm" color="blue" leftSection={<IconSearch />} onClick={handleSubmitFilter}>Search</Button>
                    <Button variant="light" size="sm" color="red" leftSection={<IconClearAll />} onClick={handleClearFilter}>Clear</Button>
                  </Group>
                </Grid.Col>
              </Grid>
            </div>
          </Card.Section>
        </Fragment>
      )}
      {mergedTopBarAndFilter.whatNeeded.isCalendarNeeded && (
        <PageDataCalendar
          dateData={pageTopBarAndFilter.calendar.dateData}
          onDateSelect={handleDateSelect}
          activeTab={pageTopBarAndFilter.calendar.title}
        />
      )}
    </Fragment>
  );
};
