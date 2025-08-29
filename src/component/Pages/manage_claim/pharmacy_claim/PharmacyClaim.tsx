import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { PharmacyClaimList } from "./sections/list/PharmacyClaimList";

export const PharmacyClaim = () => {
  // const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);
  const claimRows = [
    { id: 1, billSnahId: "MFQBILL940914", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 10.0, claimDate: "2025-02-08", emailSent: "No", status: "Pending" },
    { id: 2, billSnahId: "MFQBILL371817", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 67.0, claimDate: "2023-12-20", emailSent: "No", status: "Pending" },
    { id: 3, billSnahId: "MFQBILL863153", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 300.0, claimDate: "2023-12-01", emailSent: "No", status: "Accepted" },
    { id: 4, billSnahId: "MFQBILL554025", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 300.0, claimDate: "2023-12-01", emailSent: "No", status: "Accepted" },
    { id: 5, billSnahId: "MFINV652518", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 57.50, claimDate: "2023-11-27", emailSent: "No", status: "Accepted" },
    { id: 6, billSnahId: "MFINV823639", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 600.0, claimDate: "2023-12-01", emailSent: "No", status: "Accepted" },
    { id: 7, billSnahId: "MFQBILL407584", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 99.0, claimDate: "2023-12-01", emailSent: "No", status: "Accepted" },
    { id: 8, billSnahId: "MFQBILL177504", patientName: "Rahul Biswas", snahId: "SNAHUS931921", totalFee: 60.0, claimDate: "2023-12-01", emailSent: "No", status: "Pending" },
    { id: 9, billSnahId: "MFQBILL900101", patientName: "Anita Sharma", snahId: "SNAHUS123111", totalFee: 120.0, claimDate: "2024-01-15", emailSent: "Yes", status: "Accepted" },
    { id: 10, billSnahId: "MFQBILL900102", patientName: "Amit Kumar", snahId: "SNAHUS123112", totalFee: 45.0, claimDate: "2024-01-20", emailSent: "No", status: "Pending" },
    { id: 11, billSnahId: "MFQBILL900103", patientName: "Sneha Verma", snahId: "SNAHUS123113", totalFee: 250.0, claimDate: "2024-02-05", emailSent: "Yes", status: "Accepted" },
    { id: 12, billSnahId: "MFQBILL900104", patientName: "Rajeev Singh", snahId: "SNAHUS123114", totalFee: 75.5, claimDate: "2024-02-12", emailSent: "No", status: "Pending" },
    { id: 13, billSnahId: "MFQBILL900105", patientName: "Priya Gupta", snahId: "SNAHUS123115", totalFee: 180.0, claimDate: "2024-03-03", emailSent: "Yes", status: "Accepted" },
    { id: 14, billSnahId: "MFQBILL900106", patientName: "Mohit Jain", snahId: "SNAHUS123116", totalFee: 89.0, claimDate: "2024-03-18", emailSent: "No", status: "Pending" },
    { id: 15, billSnahId: "MFQBILL900107", patientName: "Ritu Malhotra", snahId: "SNAHUS123117", totalFee: 400.0, claimDate: "2024-04-01", emailSent: "Yes", status: "Accepted" },
    { id: 16, billSnahId: "MFQBILL900108", patientName: "Suresh Reddy", snahId: "SNAHUS123118", totalFee: 150.0, claimDate: "2024-04-11", emailSent: "No", status: "Pending" },
    { id: 17, billSnahId: "MFQBILL900109", patientName: "Nisha Yadav", snahId: "SNAHUS123119", totalFee: 210.0, claimDate: "2024-05-02", emailSent: "Yes", status: "Accepted" },
    { id: 18, billSnahId: "MFQBILL900110", patientName: "Deepak Mehta", snahId: "SNAHUS123120", totalFee: 99.0, claimDate: "2024-05-15", emailSent: "No", status: "Pending" },
    { id: 19, billSnahId: "MFQBILL900111", patientName: "Sunita Rao", snahId: "SNAHUS123121", totalFee: 310.0, claimDate: "2024-06-01", emailSent: "Yes", status: "Accepted" },
    { id: 20, billSnahId: "MFQBILL900112", patientName: "Ramesh Nair", snahId: "SNAHUS123122", totalFee: 88.0, claimDate: "2024-06-19", emailSent: "No", status: "Pending" },
    { id: 21, billSnahId: "MFQBILL900113", patientName: "Kiran Patel", snahId: "SNAHUS123123", totalFee: 450.0, claimDate: "2024-07-01", emailSent: "Yes", status: "Accepted" },
    { id: 22, billSnahId: "MFQBILL900114", patientName: "Vivek Saxena", snahId: "SNAHUS123124", totalFee: 210.0, claimDate: "2024-07-15", emailSent: "No", status: "Pending" },
    { id: 23, billSnahId: "MFQBILL900115", patientName: "Meera Iyer", snahId: "SNAHUS123125", totalFee: 330.0, claimDate: "2024-07-28", emailSent: "Yes", status: "Accepted" },
    { id: 24, billSnahId: "MFQBILL900116", patientName: "Anil Deshmukh", snahId: "SNAHUS123126", totalFee: 76.0, claimDate: "2024-08-04", emailSent: "No", status: "Pending" },
    { id: 25, billSnahId: "MFQBILL900117", patientName: "Shalini Menon", snahId: "SNAHUS123127", totalFee: 140.0, claimDate: "2024-08-17", emailSent: "Yes", status: "Accepted" },
    { id: 26, billSnahId: "MFQBILL900118", patientName: "Arun Joshi", snahId: "SNAHUS123128", totalFee: 110.0, claimDate: "2024-08-23", emailSent: "No", status: "Pending" },
    { id: 27, billSnahId: "MFQBILL900119", patientName: "Divya Kapoor", snahId: "SNAHUS123129", totalFee: 500.0, claimDate: "2024-09-10", emailSent: "Yes", status: "Accepted" },
    { id: 28, billSnahId: "MFQBILL900120", patientName: "Sanjay Ghosh", snahId: "SNAHUS123130", totalFee: 220.0, claimDate: "2024-09-21", emailSent: "No", status: "Pending" },
    { id: 29, billSnahId: "MFQBILL900121", patientName: "Neha Chawla", snahId: "SNAHUS123131", totalFee: 135.0, claimDate: "2024-10-02", emailSent: "Yes", status: "Accepted" },
    { id: 30, billSnahId: "MFQBILL900122", patientName: "Harish Bhat", snahId: "SNAHUS123132", totalFee: 80.0, claimDate: "2024-10-15", emailSent: "No", status: "Pending" },
    { id: 31, billSnahId: "MFQBILL900123", patientName: "Alka Sharma", snahId: "SNAHUS123133", totalFee: 205.0, claimDate: "2024-11-01", emailSent: "Yes", status: "Accepted" },
    { id: 32, billSnahId: "MFQBILL900124", patientName: "Sandeep Kaur", snahId: "SNAHUS123134", totalFee: 64.0, claimDate: "2024-11-12", emailSent: "No", status: "Pending" },
    { id: 33, billSnahId: "MFQBILL900125", patientName: "Ajay Chauhan", snahId: "SNAHUS123135", totalFee: 410.0, claimDate: "2024-11-25", emailSent: "Yes", status: "Accepted" },
    { id: 34, billSnahId: "MFQBILL900126", patientName: "Rekha Das", snahId: "SNAHUS123136", totalFee: 150.0, claimDate: "2024-12-05", emailSent: "No", status: "Pending" },
    { id: 35, billSnahId: "MFQBILL900127", patientName: "Naveen Khanna", snahId: "SNAHUS123137", totalFee: 320.0, claimDate: "2024-12-18", emailSent: "Yes", status: "Accepted" },
    { id: 36, billSnahId: "MFQBILL900128", patientName: "Preeti Nanda", snahId: "SNAHUS123138", totalFee: 105.0, claimDate: "2025-01-03", emailSent: "No", status: "Pending" },
    { id: 37, billSnahId: "MFQBILL900129", patientName: "Vinod Malviya", snahId: "SNAHUS123139", totalFee: 210.0, claimDate: "2025-01-14", emailSent: "Yes", status: "Accepted" },
    { id: 38, billSnahId: "MFQBILL900130", patientName: "Rashmi Kaul", snahId: "SNAHUS123140", totalFee: 190.0, claimDate: "2025-01-27", emailSent: "No", status: "Pending" },
    { id: 39, billSnahId: "MFQBILL900131", patientName: "Karthik Pillai", snahId: "SNAHUS123141", totalFee: 360.0, claimDate: "2025-02-10", emailSent: "Yes", status: "Accepted" },
    { id: 40, billSnahId: "MFQBILL900132", patientName: "Geeta Bansal", snahId: "SNAHUS123142", totalFee: 72.0, claimDate: "2025-02-22", emailSent: "No", status: "Pending" },
  ];

  const filteredRows = useMemo(() => {
    let rows = [...claimRows];
    const role = (filterState.filter.statusFilter || "all").toLowerCase();
    if (role !== "all") rows = rows.filter(r => r.status.toLowerCase() === role);
    return rows;
  }, [claimRows, filterState.filter.statusFilter]);

  const topBarAndFilter = {
    type: "claim",
    title: "Claim",
    heading: "List of all claims you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addNeededRedirectTo: "form",
    addBtnText: "Create Claim",
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Pharmacy Claim List",
            items: [
              { title: "Manage Claim", href: "#" },
              { title: "Pharmacy Claim List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card
          withBorder
          shadow="sm"
          className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60"
        >
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <PharmacyClaimList dataPass={{ claimRows: filteredRows }} />
          <PagePagination dataPass={{ total: filteredRows.length || 0 }} />
        </Card>
      </Box>
    </Box>
  );
};
