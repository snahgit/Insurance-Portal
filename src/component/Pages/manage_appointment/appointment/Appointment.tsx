import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { AppointmentList } from "./sections/list/AppointmentList";
import { useLoaderData } from "react-router";

export const Appointment = () => {
  const loaderData = useLoaderData();
  const topBarAndFilter = {
    heading: "List of all Appointments you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    type: loaderData.type,
    title: "Appointment",
    addNeededRedirectTo: "/manage-appointment/appointment/form",
    addBtnText: "Add Appointment"
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Appointment List",
            items: [
              { title: "Manage Appointment", href: "#" },
              { title: "Appointment List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box className="w-full">
        <Card withBorder className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <AppointmentList />
          <PagePagination dataPass={{ total: 10 }} />
        </Card>
      </Box>
    </Box>
  );
};
