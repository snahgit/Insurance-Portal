import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { SettledClaimList } from "./sections/list/SettledClaimList";

export const SettledClaim = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const allSettledClaims = [
    {
      id: 1,
      name: "Ella Jones",
      email: "ella.jones37@example.com",
      phone: "8956785139",
      avatar: "https://i.pravatar.cc/150?img=29",
      claimDate: "2025-06-09",
      status: "Pending",
      amount: 27,
      plan: "Basic",
      claimType: "Pharmacy"
    },
    {
      id: 2,
      name: "Anna Taylor",
      email: "anna.taylor981@yahoo.com",
      phone: "9934746525",
      avatar: "https://i.pravatar.cc/150?img=64",
      claimDate: "2025-05-01",
      status: "Under Review",
      amount: 34,
      plan: "Basic",
      claimType: "Private Practice"
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "sarah.williams522@example.com",
      phone: "2724933528",
      avatar: "https://i.pravatar.cc/150?img=39",
      claimDate: "2025-04-22",
      status: "Processing",
      amount: 45,
      plan: "Basic",
      claimType: "Medical Facility"
    },
    {
      id: 4,
      name: "Amy Wright",
      email: "amy.wright570@outlook.com",
      phone: "3363805737",
      avatar: "https://i.pravatar.cc/150?img=51",
      claimDate: "2025-02-24",
      status: "Approved",
      amount: 58,
      plan: "Basic",
      claimType: "Pharmacy"
    },
    {
      id: 5,
      name: "Nina Martinez",
      email: "nina.martinez669@hotmail.com",
      phone: "2635594834",
      avatar: "https://i.pravatar.cc/150?img=1",
      claimDate: "2025-05-14",
      status: "Rejected",
      amount: 63,
      plan: "Basic",
      claimType: "Private Practice"
    },
    {
      id: 6,
      name: "Max Anderson",
      email: "max.anderson430@yahoo.com",
      phone: "5944541519",
      avatar: "https://i.pravatar.cc/150?img=18",
      claimDate: "2025-04-02",
      status: "Paid",
      amount: 72,
      plan: "Basic",
      claimType: "Medical Facility"
    },
    {
      id: 7,
      name: "Sue Sanchez",
      email: "sue.sanchez592@outlook.com",
      phone: "1769008815",
      avatar: "https://i.pravatar.cc/150?img=10",
      claimDate: "2025-04-12",
      status: "Returned",
      amount: 81,
      plan: "Basic",
      claimType: "Pharmacy"
    },
    {
      id: 8,
      name: "Sarah Martin",
      email: "sarah.martin715@yahoo.com",
      phone: "1086902380",
      avatar: "https://i.pravatar.cc/150?img=57",
      claimDate: "2025-06-24",
      status: "Completed",
      amount: 92,
      plan: "Basic",
      claimType: "Private Practice"
    },
    {
      id: 9,
      name: "Max Walker",
      email: "max.walker88@example.com",
      phone: "3254586561",
      avatar: "https://i.pravatar.cc/150?img=58",
      claimDate: "2025-04-18",
      status: "Rejected",
      amount: 19,
      plan: "Basic",
      claimType: "Medical Facility"
    },
    {
      id: 10,
      name: "Tom Perez",
      email: "tom.perez781@gmail.com",
      phone: "6425374730",
      avatar: "https://i.pravatar.cc/150?img=22",
      claimDate: "2025-05-28",
      status: "Pending",
      amount: 25,
      plan: "Basic",
      claimType: "Pharmacy"
    }
  ]
  const settledClaimList = useMemo(() => {
    let rows = [...allSettledClaims];
    const role = (filterState.filter.claimFilter || "all").toLowerCase();
    if (role !== "all") rows = rows.filter(r => r.status.toLowerCase() === role);
    return rows;
  }, [allSettledClaims, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Settled Claims",
    heading: "List of all settled claims you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
    },
    addNeededRedirectTo: "form",
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Settled Claim List",
            items: [
              { title: "Manage Staff", href: "#" },
              { title: "Settled Claim List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <SettledClaimList dataPass={{ settledClaimList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};