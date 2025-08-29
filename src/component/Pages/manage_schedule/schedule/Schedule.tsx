import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import { ScheduleList } from "./sections/list/SechduleList";
import { useLoaderData } from "react-router";
import type { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/hooks";

export const Schedule = () => {
  const loaderData = useLoaderData();
  const filterState = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const topBarAndFilter = {
    type: loaderData.type,
    title: "Schedule",
    heading: "List of all Schedule you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addNeededRedirectTo: "form",
    addBtnText: "Add Schedule"
  };
  const scheduleDataList = [
    {
      id: 1,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      schedule_date: "08/07/2025",
      pppt_type: "In-Person",
      Slots: "6 slots found",
    },
    {
      id: 2,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      schedule_date: "08/07/2025",
      pppt_type: "Virtual",
      Slots: "6 slots found",
    },
    {
      id: 3,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      schedule_date: "08/07/2025",
      pppt_type: "Home Visit",
      Slots: "6 slots found",
    },
    {
      id: 4,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      schedule_date: "08/07/2025",
      pppt_type: "In-Person",
      Slots: "6 slots found",
    },
  ]

  const scheduleList = useMemo(() => {
    let filtered = [...scheduleDataList];
    if (filterState.filter.scheduleFilter && filterState.filter.scheduleFilter !== 'all') {
      filtered = filtered.filter(dept =>
        dept.pppt_type.toLowerCase() === filterState.filter.scheduleFilter.toLowerCase()
      );
    }
    return filtered;
  }, [scheduleDataList, filterState.filter]);

  const handelRemoveItem = (id: any) => {
    scheduleList.filter((item: any) => item.id !== id);
  }

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Manage Schedule",
            items: [
              { title: "Manage Schedule", href: "#" },
              { title: "Schedule", href: "#" },
              { title: "Schedule List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <ScheduleList dataPass={{ scheduleList, handelRemoveItem }} />
          <PagePagination dataPass={{ total: scheduleList.length }} />
        </Card>
      </Box>
    </Box>
  );
};
