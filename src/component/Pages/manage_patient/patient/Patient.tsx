import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PatientsList } from "./sections/list/PatientsList";
import { Box, Card } from "@mantine/core";
import { PagePagination } from "../../../common/PagePagination";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useLoaderData } from "react-router";

export const Patient = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const topBarAndFilterConfig = {
    type: loaderData.type,
    heading: "List of all patients you can find below",
    viewMode: "grid",
    modalDrawer: {
      for: 'createUpdate'
    },
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
    }
  };

  const allPatient = [
    {
      "id": 1,
      "name": "Ella Jones",
      "email": "ella.jones37@example.com",
      "phone": "8956785139",
      "avatar": "https://i.pravatar.cc/150?img=29",
      "lastVisit": "2025-06-09",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 11,
      "name": "Kate Hernandez",
      "email": "kate.hernandez523@example.com",
      "phone": "8633133813",
      "avatar": "https://i.pravatar.cc/150?img=34",
      "lastVisit": "2025-03-06",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 12,
      "name": "Ryan Flores",
      "email": "ryan.flores469@outlook.com",
      "phone": "5603148987",
      "avatar": "https://i.pravatar.cc/150?img=53",
      "lastVisit": "2025-03-10",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 13,
      "name": "Steve Martinez",
      "email": "steve.martinez856@gmail.com",
      "phone": "5526711104",
      "avatar": "https://i.pravatar.cc/150?img=28",
      "lastVisit": "2025-07-17",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 14,
      "name": "Ryan Martin",
      "email": "ryan.martin91@hotmail.com",
      "phone": "4146877584",
      "avatar": "https://i.pravatar.cc/150?img=66",
      "lastVisit": "2025-04-06",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 15,
      "name": "Ivy Smith",
      "email": "ivy.smith346@gmail.com",
      "phone": "4701647006",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-07-22",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 16,
      "name": "Sarah Nguyen",
      "email": "sarah.nguyen429@gmail.com",
      "phone": "2778089253",
      "avatar": "https://i.pravatar.cc/150?img=31",
      "lastVisit": "2025-03-01",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 17,
      "name": "Steve Jackson",
      "email": "steve.jackson716@gmail.com",
      "phone": "2645974571",
      "avatar": "https://i.pravatar.cc/150?img=67",
      "lastVisit": "2025-07-07",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 18,
      "name": "Mark Miller",
      "email": "mark.miller685@yahoo.com",
      "phone": "6187608530",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-05-03",
      "status": "Inactive",
      "gender": "male"
    },
    {
      "id": 19,
      "name": "Sue Wright",
      "email": "sue.wright647@yahoo.com",
      "phone": "1502642628",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-03-02",
      "status": "Active",
      "gender": "female"
    },
    {
      "id": 20,
      "name": "John Harris",
      "email": "john.harris931@hotmail.com",
      "phone": "9168739217",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-13",
      "status": "Inactive",
      "gender": "female"
    },
    {
      "id": 21,
      "name": "Adam Johnson",
      "email": "adam.johnson153@hotmail.com",
      "phone": "6031207002",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-05-19",
      "status": "Active",
      "gender": "male"
    },
  ]
  const patientList = useMemo(() => {
    let filtered = [...allPatient];
    if (filterState.filter.textFilter) {
      filtered = filtered.filter(val =>
        val.name.toLowerCase().includes(filterState.filter.textFilter.toLowerCase()) || ''
      );
    }
    if (filterState.filter.statusFilter && filterState.filter.statusFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.status.toLowerCase() === filterState.filter.statusFilter.toLowerCase()
      );
    }
    if (filterState.filter.genderFilter && filterState.filter.genderFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.gender.toLowerCase() === filterState.filter.genderFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allPatient, filterState.filter]);

  return (
    <Box>
      <Box>
        <Breadcrumb dataPass={{
          pageTitle: "Patient List",
          items: [
            { title: "Manage Patients", href: "#" },
            { title: "Patients", href: "#" },
            { title: "Patients List", href: "#", isActive: true },
          ]
        }} />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter: topBarAndFilterConfig }} />
          <PatientsList dataPass={{ patientList }} />
          <PagePagination dataPass={{ total: patientList.length }} />
        </Card>
      </Box>
    </Box>
  )
}