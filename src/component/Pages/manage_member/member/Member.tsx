import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { MemberList } from "./sections/list/MemberList";

export const Member = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const allStaffMembers = [
    {
      "id": 1,
      "name": "Ella Jones",
      "email": "ella.jones37@example.com",
      "phone": "8956785139",
      "avatar": "https://i.pravatar.cc/150?img=29",
      "lastVisit": "2025-06-09",
      "status": "Active",
      "gender": "female",
      "memberId": "M001",
      "ssn": "100-00-0001",
      "planType": "Premium"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Pending",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Canceled",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Suspended",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Reactivated",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    },
    {
      "id": 2,
      "name": "Anna Taylor",
      "email": "anna.taylor981@yahoo.com",
      "phone": "9934746525",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-01",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M002",
      "ssn": "100-00-0002",
      "planType": "Basic"
    },
    {
      "id": 3,
      "name": "Sarah Williams",
      "email": "sarah.williams522@example.com",
      "phone": "2724933528",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Active",
      "gender": "female",
      "memberId": "M003",
      "ssn": "100-00-0003",
      "planType": "Standard"
    },
    {
      "id": 4,
      "name": "Amy Wright",
      "email": "amy.wright570@outlook.com",
      "phone": "3363805737",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-02-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M004",
      "ssn": "100-00-0004",
      "planType": "Premium"
    },
    {
      "id": 5,
      "name": "Nina Martinez",
      "email": "nina.martinez669@hotmail.com",
      "phone": "2635594834",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-14",
      "status": "Active",
      "gender": "female",
      "memberId": "M005",
      "ssn": "100-00-0005",
      "planType": "Basic"
    },
    {
      "id": 6,
      "name": "Max Anderson",
      "email": "max.anderson430@yahoo.com",
      "phone": "5944541519",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M006",
      "ssn": "100-00-0006",
      "planType": "Standard"
    },
    {
      "id": 7,
      "name": "Sue Sanchez",
      "email": "sue.sanchez592@outlook.com",
      "phone": "1769008815",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-04-12",
      "status": "Active",
      "gender": "female",
      "memberId": "M007",
      "ssn": "100-00-0007",
      "planType": "Premium"
    },
    {
      "id": 8,
      "name": "Sarah Martin",
      "email": "sarah.martin715@yahoo.com",
      "phone": "1086902380",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-24",
      "status": "Inactive",
      "gender": "female",
      "memberId": "M008",
      "ssn": "100-00-0008",
      "planType": "Basic"
    },
    {
      "id": 9,
      "name": "Max Walker",
      "email": "max.walker88@example.com",
      "phone": "3254586561",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-04-18",
      "status": "Active",
      "gender": "male",
      "memberId": "M009",
      "ssn": "100-00-0009",
      "planType": "Standard"
    },
    {
      "id": 10,
      "name": "Tom Perez",
      "email": "tom.perez781@gmail.com",
      "phone": "6425374730",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-28",
      "status": "Inactive",
      "gender": "male",
      "memberId": "M010",
      "ssn": "100-00-0010",
      "planType": "Premium"
    },
    {
      "id": 11,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive",
      "memberId": "M100",
      "ssn": "100-00-0100",
      "planType": "Basic"
    }
  ]
  const staffMemberList = useMemo(() => {
    let filtered = [...allStaffMembers];
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
        val.gender && val.gender.toLowerCase() === filterState.filter.genderFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allStaffMembers, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Member",
    heading: "List of all staff member you can find below",
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
            pageTitle: "Member List",
            items: [
              { title: "Manage Member", href: "#" },
              { title: "Member List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <MemberList dataPass={{ staffMemberList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};