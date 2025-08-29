import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { AccessLogList } from "./sections/list/AccessLogList";

export const ViewAccessLog = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const accessLogData = [
    [
      { id: 1, access: "View patient details", date: "2025/05/15", time: "10:00:00", by: "John Willam", snahId: "SNAH123456" },
      { id: 2, access: "Edit patient record", date: "2025/05/16", time: "11:15:00", by: "Emily Carter", snahId: "SNAH123457" },
      { id: 3, access: "Delete appointment", date: "2025/05/17", time: "09:30:00", by: "Michael Brown", snahId: "SNAH123458" },
      { id: 4, access: "Add new member", date: "2025/05/18", time: "14:45:00", by: "Sarah Lee", snahId: "SNAH123459" },
      { id: 5, access: "View claim status", date: "2025/05/19", time: "16:20:00", by: "David Kim", snahId: "SNAH123460" },
      { id: 6, access: "Approve prescription", date: "2025/05/20", time: "13:10:00", by: "Olivia Green", snahId: "SNAH123461" },
      { id: 7, access: "Reject claim", date: "2025/05/21", time: "08:55:00", by: "James White", snahId: "SNAH123462" },
      { id: 8, access: "Update schedule", date: "2025/05/22", time: "12:40:00", by: "Sophia Black", snahId: "SNAH123463" },
      { id: 9, access: "View staff list", date: "2025/05/23", time: "10:25:00", by: "William Scott", snahId: "SNAH123464" },
      { id: 10, access: "Reset password", date: "2025/05/24", time: "15:35:00", by: "Ava King", snahId: "SNAH123465" },
      { id: 11, access: "Export report", date: "2025/05/25", time: "17:50:00", by: "Benjamin Young", snahId: "SNAH123466" },
      { id: 12, access: "Import patient data", date: "2025/05/26", time: "09:05:00", by: "Mia Hall", snahId: "SNAH123467" },
      { id: 13, access: "View audit log", date: "2025/05/27", time: "11:30:00", by: "Lucas Allen", snahId: "SNAH123468" },
      { id: 14, access: "Change theme", date: "2025/05/28", time: "13:55:00", by: "Charlotte Wright", snahId: "SNAH123469" },
      { id: 15, access: "Send notification", date: "2025/05/29", time: "16:10:00", by: "Henry Baker", snahId: "SNAH123470" },
      { id: 16, access: "View insurance info", date: "2025/05/30", time: "14:20:00", by: "Amelia Adams", snahId: "SNAH123471" },
      { id: 17, access: "Edit staff profile", date: "2025/06/01", time: "10:50:00", by: "Jack Nelson", snahId: "SNAH123472" },
      { id: 18, access: "View prescription", date: "2025/06/02", time: "12:15:00", by: "Ella Carter", snahId: "SNAH123473" },
      { id: 19, access: "Add new provider", date: "2025/06/03", time: "09:40:00", by: "Logan Perez", snahId: "SNAH123474" },
      { id: 20, access: "Remove member", date: "2025/06/04", time: "11:05:00", by: "Grace Turner", snahId: "SNAH123475" },
      { id: 21, access: "Update patient info", date: "2025/06/05", time: "13:30:00", by: "Carter Evans", snahId: "SNAH123476" },
      { id: 22, access: "View transaction history", date: "2025/06/06", time: "15:55:00", by: "Scarlett Hill", snahId: "SNAH123477" },
      { id: 23, access: "Approve member", date: "2025/06/07", time: "10:15:00", by: "Wyatt Moore", snahId: "SNAH123478" },
      { id: 24, access: "Reject member", date: "2025/06/08", time: "12:40:00", by: "Layla Clark", snahId: "SNAH123479" },
      { id: 25, access: "View dashboard", date: "2025/06/09", time: "14:05:00", by: "Sebastian Lewis", snahId: "SNAH123480" },
      { id: 26, access: "Edit claim", date: "2025/06/10", time: "16:30:00", by: "Zoe Walker", snahId: "SNAH123481" },
      { id: 27, access: "Delete provider", date: "2025/06/11", time: "09:55:00", by: "Matthew Hall", snahId: "SNAH123482" },
      { id: 28, access: "Add appointment", date: "2025/06/12", time: "11:20:00", by: "Penelope Allen", snahId: "SNAH123483" },
      { id: 29, access: "Edit schedule", date: "2025/06/13", time: "13:45:00", by: "Daniel Young", snahId: "SNAH123484" },
      { id: 30, access: "View member details", date: "2025/06/14", time: "15:10:00", by: "Lily Hernandez", snahId: "SNAH123485" },
      { id: 31, access: "Export member list", date: "2025/06/15", time: "10:35:00", by: "Jackson King", snahId: "SNAH123486" },
      { id: 32, access: "Import claim data", date: "2025/06/16", time: "12:00:00", by: "Victoria Wright", snahId: "SNAH123487" },
      { id: 33, access: "View provider list", date: "2025/06/17", time: "14:25:00", by: "Luke Scott", snahId: "SNAH123488" },
      { id: 34, access: "Edit insurance info", date: "2025/06/18", time: "16:50:00", by: "Hannah Adams", snahId: "SNAH123489" },
      { id: 35, access: "Delete staff", date: "2025/06/19", time: "09:15:00", by: "Levi Nelson", snahId: "SNAH123490" },
      { id: 36, access: "Add new claim", date: "2025/06/20", time: "11:40:00", by: "Sofia Carter", snahId: "SNAH123491" },
      { id: 37, access: "Approve schedule", date: "2025/06/21", time: "13:05:00", by: "David Perez", snahId: "SNAH123492" },
      { id: 38, access: "Reject schedule", date: "2025/06/22", time: "15:30:00", by: "Ella Turner", snahId: "SNAH123493" },
      { id: 39, access: "View audit trail", date: "2025/06/23", time: "10:55:00", by: "Mason Evans", snahId: "SNAH123494" },
      { id: 40, access: "Edit transaction", date: "2025/06/24", time: "12:20:00", by: "Avery Hill", snahId: "SNAH123495" },
      { id: 41, access: "Delete claim", date: "2025/06/25", time: "14:45:00", by: "Ethan Moore", snahId: "SNAH123496" },
      { id: 42, access: "Add staff", date: "2025/06/26", time: "17:10:00", by: "Madison Clark", snahId: "SNAH123497" },
      { id: 43, access: "Edit provider info", date: "2025/06/27", time: "09:35:00", by: "Logan Lewis", snahId: "SNAH123498" },
      { id: 44, access: "View prescription list", date: "2025/06/28", time: "11:00:00", by: "Chloe Walker", snahId: "SNAH123499" },
      { id: 45, access: "Approve patient", date: "2025/06/29", time: "13:25:00", by: "Elijah Hall", snahId: "SNAH123500" },
      { id: 46, access: "Reject patient", date: "2025/06/30", time: "15:50:00", by: "Lillian Allen", snahId: "SNAH123501" },
      { id: 47, access: "View insurance claims", date: "2025/07/01", time: "10:15:00", by: "Samuel Young", snahId: "SNAH123502" },
      { id: 48, access: "Edit audit log", date: "2025/07/02", time: "12:40:00", by: "Nora Wright", snahId: "SNAH123503" },
      { id: 49, access: "Delete audit log", date: "2025/07/03", time: "14:05:00", by: "Owen Scott", snahId: "SNAH123504" },
      {
        id: 50,
        access: "Add insurance info",
        date: "2025/07/04",
        time: "16:30:00",
        by: "Hazel Adams",
        snahId: "SNAH123505"
      }
    ]
  ];

  const accessLogList = useMemo(() => {
    let flatList = accessLogData.flat();
    let filtered = [...flatList];
    filtered = filtered.filter(item =>
      item.date.includes(filterState.filter.dateFilter ?? "")
    );
    return filtered;
  }, [accessLogData, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "View Access Log",
    heading: "List of all access log entries you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
    },
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "View Access Log",
            items: [
              { title: "Quick Assist", href: "#" },
              { title: "View Access Log", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <AccessLogList dataPass={{ accessLogList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};