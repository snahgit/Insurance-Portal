import { DepartmentList } from "./sections/list/DepartmentList";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useMemo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { useLoaderData } from "react-router";

export const Department = () => {
  const filterState = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const loaderData = useLoaderData();
  const allDepartments = [
    {
      "id": 1,
      "name": "Department 1",
      "description": "This is a detailed description for Department 1, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 2,
      "name": "Department 2",
      "description": "This is a detailed description for Department 2, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Inactive"
    },
    {
      "id": 3,
      "name": "Department 3",
      "description": "This is a detailed description for Department 3, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 4,
      "name": "Department 4",
      "description": "This is a detailed description for Department 4, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 5,
      "name": "Department 5",
      "description": "This is a detailed description for Department 5, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 6,
      "name": "Department 6",
      "description": "This is a detailed description for Department 6, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 7,
      "name": "Department 7",
      "description": "This is a detailed description for Department 7, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 8,
      "name": "Department 8",
      "description": "This is a detailed description for Department 8, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 9,
      "name": "Department 9",
      "description": "This is a detailed description for Department 9, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 10,
      "name": "Department 10",
      "description": "This is a detailed description for Department 10, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 11,
      "name": "Department 11",
      "description": "This is a detailed description for Department 11, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 12,
      "name": "Department 12",
      "description": "This is a detailed description for Department 12, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 13,
      "name": "Department 13",
      "description": "This is a detailed description for Department 13, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 14,
      "name": "Department 14",
      "description": "This is a detailed description for Department 14, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 15,
      "name": "Department 15",
      "description": "This is a detailed description for Department 15, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 16,
      "name": "Department 16",
      "description": "This is a detailed description for Department 16, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 17,
      "name": "Department 17",
      "description": "This is a detailed description for Department 17, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 18,
      "name": "Department 18",
      "description": "This is a detailed description for Department 18, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 19,
      "name": "Department 19",
      "description": "This is a detailed description for Department 19, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 20,
      "name": "Department 20",
      "description": "This is a detailed description for Department 20, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 21,
      "name": "Department 21",
      "description": "This is a detailed description for Department 21, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 22,
      "name": "Department 22",
      "description": "This is a detailed description for Department 22, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 23,
      "name": "Department 23",
      "description": "This is a detailed description for Department 23, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 24,
      "name": "Department 24",
      "description": "This is a detailed description for Department 24, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 25,
      "name": "Department 25",
      "description": "This is a detailed description for Department 25, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 26,
      "name": "Department 26",
      "description": "This is a detailed description for Department 26, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 27,
      "name": "Department 27",
      "description": "This is a detailed description for Department 27, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 28,
      "name": "Department 28",
      "description": "This is a detailed description for Department 28, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 29,
      "name": "Department 29",
      "description": "This is a detailed description for Department 29, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 30,
      "name": "Department 30",
      "description": "This is a detailed description for Department 30, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 31,
      "name": "Department 31",
      "description": "This is a detailed description for Department 31, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 32,
      "name": "Department 32",
      "description": "This is a detailed description for Department 32, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 33,
      "name": "Department 33",
      "description": "This is a detailed description for Department 33, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 34,
      "name": "Department 34",
      "description": "This is a detailed description for Department 34, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 35,
      "name": "Department 35",
      "description": "This is a detailed description for Department 35, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 36,
      "name": "Department 36",
      "description": "This is a detailed description for Department 36, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 37,
      "name": "Department 37",
      "description": "This is a detailed description for Department 37, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 38,
      "name": "Department 38",
      "description": "This is a detailed description for Department 38, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 39,
      "name": "Department 39",
      "description": "This is a detailed description for Department 39, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 40,
      "name": "Department 40",
      "description": "This is a detailed description for Department 40, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 41,
      "name": "Department 41",
      "description": "This is a detailed description for Department 41, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 42,
      "name": "Department 42",
      "description": "This is a detailed description for Department 42, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 43,
      "name": "Department 43",
      "description": "This is a detailed description for Department 43, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 44,
      "name": "Department 44",
      "description": "This is a detailed description for Department 44, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 45,
      "name": "Department 45",
      "description": "This is a detailed description for Department 45, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 46,
      "name": "Department 46",
      "description": "This is a detailed description for Department 46, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 47,
      "name": "Department 47",
      "description": "This is a detailed description for Department 47, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 48,
      "name": "Department 48",
      "description": "This is a detailed description for Department 48, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 49,
      "name": "Department 49",
      "description": "This is a detailed description for Department 49, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    },
    {
      "id": 50,
      "name": "Department 50",
      "description": "This is a detailed description for Department 50, providing insights into its operations, goals, and the services it offers to the community.",
      "status": "Active"
    }
  ]

  const departmentList = useMemo(() => {
    let filtered = [...allDepartments];
    if (filterState.filter.statusFilter && filterState.filter.statusFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.status.toLowerCase() === filterState.filter.statusFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allDepartments, filterState.filter]);

  const topBarAndFilterConfig = {
    type: loaderData.type,
    title: "Department",
    addBtnText: "Add Department",
    heading: "List of all departments you can find below",
    viewMode: "grid",
    modalDrawer: {
      for: 'createUpdate'
    },
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    }
  };


  return (
    <Box>
      <Box>
        <Breadcrumb dataPass={{
          pageTitle: "Department List",
          items: [
            { title: "Department", href: "#" },
            { title: "Department List", href: "#", isActive: true },
          ]
        }} />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter: topBarAndFilterConfig }} />
          <DepartmentList dataPass={{ departmentList }} />
          <PagePagination dataPass={{ total: departmentList.length }} />
        </Card>
      </Box>
    </Box>
  )
}