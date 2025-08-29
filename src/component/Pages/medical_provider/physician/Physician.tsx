import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import PhysicianList from "./sections/list/PhysicianList";
import type { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/hooks";
import { useMemo } from "react";

export const Physician = () => {
  const filterState = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const topBarAndFilter = {
    type: "physician",
    title: "Physician",
    addBtnText: "Add Physician",
    heading: "List of all physician you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addNeededRedirectTo: "form",
  };
  const patientDataList = [
    {
      id: 1,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      gender: "male",
      phone: "8956785139",
      email: "testmpmf@snah.org",
      status: "active",
    },
    {
      id: 1,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      gender: "female",
      phone: "8956785139",
      email: "testmpmf@snah.org",
      status: "active",
    },
    {
      id: 1,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      gender: "male",
      phone: "8956785139",
      email: "testmpmf@snah.org",
      status: "active",
    },
    {
      id: 1,
      physician_name: "Test MP MF",
      physician_iD: "MFPHY566146",
      gender: "female",
      phone: "8956785139",
      email: "testmpmf@snah.org",
      status: "inactive",
    },
  ];

  const patientList = useMemo(() => {
    let filtered = [...patientDataList];
    // if (filterState.filter.searchTerm) {
    //   const searchTerm = filterState.filter.searchTerm.toLowerCase();
    //   filtered = filtered.filter(dept =>
    //     dept.name.toLowerCase().includes(searchTerm) ||
    //     dept.description.toLowerCase().includes(searchTerm)
    //   );
    // }
    if (filterState.filter.statusFilter && filterState.filter.statusFilter !== 'all') {
      filtered = filtered.filter(dept =>
        dept.status.toLowerCase() === filterState.filter.statusFilter.toLowerCase()
      );
    }
    if (filterState.filter.genderFilter && filterState.filter.genderFilter !== 'all') {
      filtered = filtered.filter(dept =>
        dept.gender.toLowerCase() === filterState.filter.genderFilter.toLowerCase()
      );
    }
    return filtered;
  }, [patientDataList, filterState.filter]);

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Physician List",
            items: [
              { title: "Medical Providers", href: "#" },
              { title: "Physician List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <PhysicianList dataPass={{ patientList }} />
          <PagePagination dataPass={{ total: patientList.length }} />
        </Card>
      </Box>
    </Box>
  );
};