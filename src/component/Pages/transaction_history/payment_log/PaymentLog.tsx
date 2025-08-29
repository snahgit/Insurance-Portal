import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/hooks";
import { PaymentsLogList } from "./sections/list/PaymentsLogList";
import { useLoaderData } from "react-router";

export const PaymentLog = () => {
  const loaderData = useLoaderData();
  const filterState = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const topBarAndFilter = {
    type: loaderData.type,
    heading: "List of all payment logs you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
    },
    addNeededRedirectTo: "form",
  };
  const allPaymentsLogList = [
    {
      "id": 1,
      "billNo": "INV-001",
      "billDate": "2023-09-22",
      "patientName": "Charlie Lee",
      "physicianName": "Dr. Adams",
      "amount": 147.76,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=1"
    },
    {
      "id": 2,
      "billNo": "INV-002",
      "billDate": "2023-08-17",
      "patientName": "Jane Smith",
      "physicianName": "Dr. Hall",
      "amount": 411.09,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=2"
    },
    {
      "id": 3,
      "billNo": "INV-003",
      "billDate": "2023-11-05",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Walker",
      "amount": 128.03,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=3"
    },
    {
      "id": 4,
      "billNo": "INV-004",
      "billDate": "2023-04-22",
      "patientName": "Emily Clark",
      "physicianName": "Dr. Carter",
      "amount": 489.05,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=4"
    },
    {
      "id": 5,
      "billNo": "INV-005",
      "billDate": "2023-09-04",
      "patientName": "Bob Brown",
      "physicianName": "Dr. Adams",
      "amount": 545.28,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=5"
    },
    {
      "id": 6,
      "billNo": "INV-006",
      "billDate": "2023-10-05",
      "patientName": "Olivia Harris",
      "physicianName": "Dr. Smith",
      "amount": 142.03,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=6"
    },
    {
      "id": 7,
      "billNo": "INV-007",
      "billDate": "2023-10-20",
      "patientName": "Bob Brown",
      "physicianName": "Dr. Adams",
      "amount": 369.41,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=7"
    },
    {
      "id": 8,
      "billNo": "INV-008",
      "billDate": "2023-11-25",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Adams",
      "amount": 273.78,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=8"
    },
    {
      "id": 9,
      "billNo": "INV-009",
      "billDate": "2023-01-31",
      "patientName": "John Doe",
      "physicianName": "Dr. Lee",
      "amount": 74.81,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=9"
    },
    {
      "id": 10,
      "billNo": "INV-010",
      "billDate": "2023-11-27",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Young",
      "amount": 464.9,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=10"
    },
    {
      "id": 11,
      "billNo": "INV-011",
      "billDate": "2023-12-13",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Patel",
      "amount": 231.34,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=11"
    },
    {
      "id": 12,
      "billNo": "INV-012",
      "billDate": "2023-03-22",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Walker",
      "amount": 344.95,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=12"
    },
    {
      "id": 13,
      "billNo": "INV-013",
      "billDate": "2023-10-19",
      "patientName": "David Wilson",
      "physicianName": "Dr. Patel",
      "amount": 135.66,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=13"
    },
    {
      "id": 14,
      "billNo": "INV-014",
      "billDate": "2023-08-14",
      "patientName": "Michael Scott",
      "physicianName": "Dr. Lee",
      "amount": 351.64,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=14"
    },
    {
      "id": 15,
      "billNo": "INV-015",
      "billDate": "2023-07-08",
      "patientName": "John Doe",
      "physicianName": "Dr. Young",
      "amount": 271.45,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=15"
    },
    {
      "id": 16,
      "billNo": "INV-016",
      "billDate": "2023-03-27",
      "patientName": "Michael Scott",
      "physicianName": "Dr. Young",
      "amount": 503.13,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=16"
    },
    {
      "id": 17,
      "billNo": "INV-017",
      "billDate": "2023-09-01",
      "patientName": "Charlie Lee",
      "physicianName": "Dr. Kim",
      "amount": 435.41,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=17"
    },
    {
      "id": 18,
      "billNo": "INV-018",
      "billDate": "2023-06-10",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Patel",
      "amount": 492.49,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=18"
    },
    {
      "id": 19,
      "billNo": "INV-019",
      "billDate": "2023-04-26",
      "patientName": "Jane Smith",
      "physicianName": "Dr. Evans",
      "amount": 326.21,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=19"
    },
    {
      "id": 20,
      "billNo": "INV-020",
      "billDate": "2023-09-23",
      "patientName": "Emily Clark",
      "physicianName": "Dr. Patel",
      "amount": 414.71,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=20"
    },
    {
      "id": 21,
      "billNo": "INV-021",
      "billDate": "2023-01-19",
      "patientName": "Charlie Lee",
      "physicianName": "Dr. Kim",
      "amount": 67.19,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=21"
    },
    {
      "id": 22,
      "billNo": "INV-022",
      "billDate": "2023-03-08",
      "patientName": "Jane Smith",
      "physicianName": "Dr. Walker",
      "amount": 349.4,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=22"
    },
    {
      "id": 23,
      "billNo": "INV-023",
      "billDate": "2023-10-02",
      "patientName": "Michael Scott",
      "physicianName": "Dr. Lee",
      "amount": 291.18,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=23"
    },
    {
      "id": 24,
      "billNo": "INV-024",
      "billDate": "2023-09-30",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Hall",
      "amount": 478.79,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=24"
    },
    {
      "id": 25,
      "billNo": "INV-025",
      "billDate": "2023-06-05",
      "patientName": "Emily Clark",
      "physicianName": "Dr. Patel",
      "amount": 341.02,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=25"
    },
    {
      "id": 26,
      "billNo": "INV-026",
      "billDate": "2023-11-29",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Hall",
      "amount": 390.36,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=26"
    },
    {
      "id": 27,
      "billNo": "INV-027",
      "billDate": "2023-06-25",
      "patientName": "Charlie Lee",
      "physicianName": "Dr. Adams",
      "amount": 212.5,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=27"
    },
    {
      "id": 28,
      "billNo": "INV-028",
      "billDate": "2023-11-07",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Lee",
      "amount": 107.73,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=28"
    },
    {
      "id": 29,
      "billNo": "INV-029",
      "billDate": "2023-09-12",
      "patientName": "Jane Smith",
      "physicianName": "Dr. Kim",
      "amount": 224.91,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=29"
    },
    {
      "id": 30,
      "billNo": "INV-030",
      "billDate": "2023-03-30",
      "patientName": "John Doe",
      "physicianName": "Dr. Evans",
      "amount": 398.92,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=30"
    },
    {
      "id": 31,
      "billNo": "INV-031",
      "billDate": "2023-09-22",
      "patientName": "Emily Clark",
      "physicianName": "Dr. Smith",
      "amount": 60.33,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=31"
    },
    {
      "id": 32,
      "billNo": "INV-032",
      "billDate": "2023-06-28",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Walker",
      "amount": 166.33,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=32"
    },
    {
      "id": 33,
      "billNo": "INV-033",
      "billDate": "2023-08-18",
      "patientName": "Charlie Lee",
      "physicianName": "Dr. Kim",
      "amount": 511.65,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=33"
    },
    {
      "id": 34,
      "billNo": "INV-034",
      "billDate": "2023-07-23",
      "patientName": "Olivia Harris",
      "physicianName": "Dr. Evans",
      "amount": 417.62,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=34"
    },
    {
      "id": 35,
      "billNo": "INV-035",
      "billDate": "2023-09-20",
      "patientName": "David Wilson",
      "physicianName": "Dr. Lee",
      "amount": 411.68,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=35"
    },
    {
      "id": 36,
      "billNo": "INV-036",
      "billDate": "2023-07-02",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Evans",
      "amount": 456.82,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=36"
    },
    {
      "id": 37,
      "billNo": "INV-037",
      "billDate": "2023-06-04",
      "patientName": "David Wilson",
      "physicianName": "Dr. Walker",
      "amount": 542.34,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=37"
    },
    {
      "id": 38,
      "billNo": "INV-038",
      "billDate": "2023-11-12",
      "patientName": "Emily Clark",
      "physicianName": "Dr. Carter",
      "amount": 184.88,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=38"
    },
    {
      "id": 39,
      "billNo": "INV-039",
      "billDate": "2023-05-14",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Smith",
      "amount": 243.48,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=39"
    },
    {
      "id": 40,
      "billNo": "INV-040",
      "billDate": "2023-07-13",
      "patientName": "Michael Scott",
      "physicianName": "Dr. Lee",
      "amount": 206.55,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=40"
    },
    {
      "id": 41,
      "billNo": "INV-041",
      "billDate": "2023-07-06",
      "patientName": "Sophia Turner",
      "physicianName": "Dr. Smith",
      "amount": 89.73,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=41"
    },
    {
      "id": 42,
      "billNo": "INV-042",
      "billDate": "2023-12-22",
      "patientName": "Jane Smith",
      "physicianName": "Dr. Carter",
      "amount": 51.15,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=42"
    },
    {
      "id": 43,
      "billNo": "INV-043",
      "billDate": "2023-01-16",
      "patientName": "Michael Scott",
      "physicianName": "Dr. Hall",
      "amount": 211.49,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=43"
    },
    {
      "id": 44,
      "billNo": "INV-044",
      "billDate": "2023-02-03",
      "patientName": "Bob Brown",
      "physicianName": "Dr. Lee",
      "amount": 373.85,
      "status": "Paid",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=44"
    },
    {
      "id": 45,
      "billNo": "INV-045",
      "billDate": "2023-09-09",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Young",
      "amount": 328.19,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=45"
    },
    {
      "id": 46,
      "billNo": "INV-046",
      "billDate": "2023-05-14",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Adams",
      "amount": 352.26,
      "status": "Failed",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=46"
    },
    {
      "id": 47,
      "billNo": "INV-047",
      "billDate": "2023-08-12",
      "patientName": "John Doe",
      "physicianName": "Dr. Adams",
      "amount": 249.76,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=47"
    },
    {
      "id": 48,
      "billNo": "INV-048",
      "billDate": "2023-02-22",
      "patientName": "Olivia Harris",
      "physicianName": "Dr. Walker",
      "amount": 302.16,
      "status": "Refunded",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=48"
    },
    {
      "id": 49,
      "billNo": "INV-049",
      "billDate": "2023-06-27",
      "patientName": "John Doe",
      "physicianName": "Dr. Hall",
      "amount": 312.77,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=49"
    },
    {
      "id": 50,
      "billNo": "INV-050",
      "billDate": "2023-11-05",
      "patientName": "Alice Johnson",
      "physicianName": "Dr. Adams",
      "amount": 70.73,
      "status": "Pending",
      "receiptLink": "https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing&receipt=50"
    }
  ]
  
  const paymentsLogList = useMemo(() => {
    let filtered = [...allPaymentsLogList];
    if (filterState.filter.transactionFilter && filterState.filter.transactionFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.status.toLowerCase() === filterState.filter.transactionFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allPaymentsLogList, filterState.filter]);

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Payments Log List",
            items: [
              { title: "Transduction History", href: "#" },
              { title: "Payments Log List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <PaymentsLogList dataPass={{ paymentsLogList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
}