import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { PharmacistList } from "./sections/list/PharmacistList";

export const Pharmacist = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const allPharmacists = [
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
      "status": "Active"
    },
    {
      "id": 12,
      "name": "Ryan Flores",
      "email": "ryan.flores469@outlook.com",
      "phone": "5603148987",
      "avatar": "https://i.pravatar.cc/150?img=53",
      "lastVisit": "2025-03-10",
      "status": "Inactive"
    },
    {
      "id": 13,
      "name": "Steve Martinez",
      "email": "steve.martinez856@gmail.com",
      "phone": "5526711104",
      "avatar": "https://i.pravatar.cc/150?img=28",
      "lastVisit": "2025-07-17",
      "status": "Active"
    },
    {
      "id": 14,
      "name": "Ryan Martin",
      "email": "ryan.martin91@hotmail.com",
      "phone": "4146877584",
      "avatar": "https://i.pravatar.cc/150?img=66",
      "lastVisit": "2025-04-06",
      "status": "Inactive"
    },
    {
      "id": 15,
      "name": "Ivy Smith",
      "email": "ivy.smith346@gmail.com",
      "phone": "4701647006",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-07-22",
      "status": "Active"
    },
    {
      "id": 16,
      "name": "Sarah Nguyen",
      "email": "sarah.nguyen429@gmail.com",
      "phone": "2778089253",
      "avatar": "https://i.pravatar.cc/150?img=31",
      "lastVisit": "2025-03-01",
      "status": "Inactive"
    },
    {
      "id": 17,
      "name": "Steve Jackson",
      "email": "steve.jackson716@gmail.com",
      "phone": "2645974571",
      "avatar": "https://i.pravatar.cc/150?img=67",
      "lastVisit": "2025-07-07",
      "status": "Active"
    },
    {
      "id": 18,
      "name": "Mark Miller",
      "email": "mark.miller685@yahoo.com",
      "phone": "6187608530",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-05-03",
      "status": "Inactive"
    },
    {
      "id": 19,
      "name": "Sue Wright",
      "email": "sue.wright647@yahoo.com",
      "phone": "1502642628",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-03-02",
      "status": "Active"
    },
    {
      "id": 20,
      "name": "John Harris",
      "email": "john.harris931@hotmail.com",
      "phone": "9168739217",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-05-13",
      "status": "Inactive"
    },
    {
      "id": 21,
      "name": "Adam Johnson",
      "email": "adam.johnson153@hotmail.com",
      "phone": "6031207002",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-05-19",
      "status": "Active"
    },
    {
      "id": 22,
      "name": "Lisa Miller",
      "email": "lisa.miller478@example.com",
      "phone": "4333549172",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-03-06",
      "status": "Inactive"
    },
    {
      "id": 23,
      "name": "Ian Martin",
      "email": "ian.martin200@example.com",
      "phone": "3222448263",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-04-26",
      "status": "Active"
    },
    {
      "id": 24,
      "name": "John Martinez",
      "email": "john.martinez43@outlook.com",
      "phone": "3391552752",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "lastVisit": "2025-04-27",
      "status": "Inactive"
    },
    {
      "id": 25,
      "name": "Sarah Moore",
      "email": "sarah.moore364@example.com",
      "phone": "6678815561",
      "avatar": "https://i.pravatar.cc/150?img=11",
      "lastVisit": "2025-03-03",
      "status": "Active"
    },
    {
      "id": 26,
      "name": "Zoe Robinson",
      "email": "zoe.robinson299@example.com",
      "phone": "5334773935",
      "avatar": "https://i.pravatar.cc/150?img=23",
      "lastVisit": "2025-02-13",
      "status": "Inactive"
    },
    {
      "id": 27,
      "name": "Mary Lee",
      "email": "mary.lee576@gmail.com",
      "phone": "9106568139",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "lastVisit": "2025-07-30",
      "status": "Active"
    },
    {
      "id": 28,
      "name": "May Walker",
      "email": "may.walker380@outlook.com",
      "phone": "8043887097",
      "avatar": "https://i.pravatar.cc/150?img=45",
      "lastVisit": "2025-03-05",
      "status": "Inactive"
    },
    {
      "id": 29,
      "name": "Steve Williams",
      "email": "steve.williams746@yahoo.com",
      "phone": "4645093046",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "lastVisit": "2025-07-17",
      "status": "Active"
    },
    {
      "id": 30,
      "name": "Mia Young",
      "email": "mia.young17@gmail.com",
      "phone": "6782923073",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "lastVisit": "2025-06-04",
      "status": "Inactive"
    },
    {
      "id": 31,
      "name": "Luke Hill",
      "email": "luke.hill499@outlook.com",
      "phone": "5207373205",
      "avatar": "https://i.pravatar.cc/150?img=11",
      "lastVisit": "2025-06-04",
      "status": "Active"
    },
    {
      "id": 32,
      "name": "Max Martin",
      "email": "max.martin587@hotmail.com",
      "phone": "5942197048",
      "avatar": "https://i.pravatar.cc/150?img=28",
      "lastVisit": "2025-06-12",
      "status": "Inactive"
    },
    {
      "id": 33,
      "name": "Adam Sanchez",
      "email": "adam.sanchez706@example.com",
      "phone": "3426944012",
      "avatar": "https://i.pravatar.cc/150?img=17",
      "lastVisit": "2025-07-16",
      "status": "Active"
    },
    {
      "id": 34,
      "name": "May Lee",
      "email": "may.lee912@gmail.com",
      "phone": "6583331214",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-03-12",
      "status": "Inactive"
    },
    {
      "id": 35,
      "name": "Chris Robinson",
      "email": "chris.robinson608@example.com",
      "phone": "8996141168",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-05-16",
      "status": "Active"
    },
    {
      "id": 36,
      "name": "Mia Rodriguez",
      "email": "mia.rodriguez242@outlook.com",
      "phone": "4993941260",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-03-26",
      "status": "Inactive"
    },
    {
      "id": 37,
      "name": "David Jackson",
      "email": "david.jackson542@outlook.com",
      "phone": "1825774839",
      "avatar": "https://i.pravatar.cc/150?img=3",
      "lastVisit": "2025-04-04",
      "status": "Active"
    },
    {
      "id": 38,
      "name": "Nina Johnson",
      "email": "nina.johnson251@example.com",
      "phone": "3435802846",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-03-22",
      "status": "Inactive"
    },
    {
      "id": 39,
      "name": "Amy Williams",
      "email": "amy.williams353@example.com",
      "phone": "9878523068",
      "avatar": "https://i.pravatar.cc/150?img=45",
      "lastVisit": "2025-07-23",
      "status": "Active"
    },
    {
      "id": 40,
      "name": "Luke Brown",
      "email": "luke.brown961@yahoo.com",
      "phone": "2709315125",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-02-09",
      "status": "Inactive"
    },
    {
      "id": 41,
      "name": "Lisa Nguyen",
      "email": "lisa.nguyen765@hotmail.com",
      "phone": "4885821631",
      "avatar": "https://i.pravatar.cc/150?img=26",
      "lastVisit": "2025-05-11",
      "status": "Active"
    },
    {
      "id": 42,
      "name": "Kate Lee",
      "email": "kate.lee822@gmail.com",
      "phone": "4106376247",
      "avatar": "https://i.pravatar.cc/150?img=31",
      "lastVisit": "2025-04-11",
      "status": "Inactive"
    },
    {
      "id": 43,
      "name": "Rose Jackson",
      "email": "rose.jackson335@yahoo.com",
      "phone": "2885391464",
      "avatar": "https://i.pravatar.cc/150?img=47",
      "lastVisit": "2025-02-18",
      "status": "Active"
    },
    {
      "id": 44,
      "name": "Paul Ramirez",
      "email": "paul.ramirez350@yahoo.com",
      "phone": "8276142231",
      "avatar": "https://i.pravatar.cc/150?img=46",
      "lastVisit": "2025-07-27",
      "status": "Inactive"
    },
    {
      "id": 45,
      "name": "Ben Thompson",
      "email": "ben.thompson472@example.com",
      "phone": "9828926728",
      "avatar": "https://i.pravatar.cc/150?img=62",
      "lastVisit": "2025-02-19",
      "status": "Active"
    },
    {
      "id": 46,
      "name": "Max Jackson",
      "email": "max.jackson599@example.com",
      "phone": "4627895094",
      "avatar": "https://i.pravatar.cc/150?img=42",
      "lastVisit": "2025-04-10",
      "status": "Inactive"
    },
    {
      "id": 47,
      "name": "Kate King",
      "email": "kate.king515@hotmail.com",
      "phone": "6556416895",
      "avatar": "https://i.pravatar.cc/150?img=37",
      "lastVisit": "2025-07-30",
      "status": "Active"
    },
    {
      "id": 48,
      "name": "Zoe Rodriguez",
      "email": "zoe.rodriguez889@example.com",
      "phone": "5624946898",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-05-02",
      "status": "Inactive"
    },
    {
      "id": 49,
      "name": "Mia Johnson",
      "email": "mia.johnson400@hotmail.com",
      "phone": "1989065639",
      "avatar": "https://i.pravatar.cc/150?img=38",
      "lastVisit": "2025-02-16",
      "status": "Active"
    },
    {
      "id": 50,
      "name": "Sue Gonzalez",
      "email": "sue.gonzalez988@yahoo.com",
      "phone": "4636215577",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "lastVisit": "2025-07-06",
      "status": "Inactive"
    },
    {
      "id": 51,
      "name": "John Martinez",
      "email": "john.martinez984@outlook.com",
      "phone": "5103972043",
      "avatar": "https://i.pravatar.cc/150?img=24",
      "lastVisit": "2025-06-24",
      "status": "Active"
    },
    {
      "id": 52,
      "name": "Mia Brown",
      "email": "mia.brown689@yahoo.com",
      "phone": "9362363677",
      "avatar": "https://i.pravatar.cc/150?img=17",
      "lastVisit": "2025-03-05",
      "status": "Inactive"
    },
    {
      "id": 53,
      "name": "Eva Lewis",
      "email": "eva.lewis929@example.com",
      "phone": "3443658659",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "lastVisit": "2025-03-08",
      "status": "Active"
    },
    {
      "id": 54,
      "name": "Eva Hernandez",
      "email": "eva.hernandez385@example.com",
      "phone": "2053826994",
      "avatar": "https://i.pravatar.cc/150?img=16",
      "lastVisit": "2025-03-27",
      "status": "Inactive"
    },
    {
      "id": 55,
      "name": "Mark Lewis",
      "email": "mark.lewis569@hotmail.com",
      "phone": "5406561159",
      "avatar": "https://i.pravatar.cc/150?img=41",
      "lastVisit": "2025-05-22",
      "status": "Active"
    },
    {
      "id": 56,
      "name": "Sam Martin",
      "email": "sam.martin507@example.com",
      "phone": "8517439631",
      "avatar": "https://i.pravatar.cc/150?img=40",
      "lastVisit": "2025-04-05",
      "status": "Inactive"
    },
    {
      "id": 57,
      "name": "May Davis",
      "email": "may.davis866@hotmail.com",
      "phone": "6338663753",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "lastVisit": "2025-07-20",
      "status": "Active"
    },
    {
      "id": 58,
      "name": "Emma Garcia",
      "email": "emma.garcia980@yahoo.com",
      "phone": "7953678181",
      "avatar": "https://i.pravatar.cc/150?img=23",
      "lastVisit": "2025-05-18",
      "status": "Inactive"
    },
    {
      "id": 59,
      "name": "Emma Martinez",
      "email": "emma.martinez56@example.com",
      "phone": "8241187118",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-05-30",
      "status": "Active"
    },
    {
      "id": 60,
      "name": "Joy White",
      "email": "joy.white103@example.com",
      "phone": "5854179620",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "lastVisit": "2025-02-09",
      "status": "Inactive"
    },
    {
      "id": 61,
      "name": "Mark King",
      "email": "mark.king398@yahoo.com",
      "phone": "4017216929",
      "avatar": "https://i.pravatar.cc/150?img=52",
      "lastVisit": "2025-06-15",
      "status": "Active"
    },
    {
      "id": 62,
      "name": "Mike Robinson",
      "email": "mike.robinson266@outlook.com",
      "phone": "8532217608",
      "avatar": "https://i.pravatar.cc/150?img=42",
      "lastVisit": "2025-03-12",
      "status": "Inactive"
    },
    {
      "id": 63,
      "name": "Jack Ramirez",
      "email": "jack.ramirez148@outlook.com",
      "phone": "7052888638",
      "avatar": "https://i.pravatar.cc/150?img=21",
      "lastVisit": "2025-05-17",
      "status": "Active"
    },
    {
      "id": 64,
      "name": "Lucy Hill",
      "email": "lucy.hill750@yahoo.com",
      "phone": "5188513257",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "lastVisit": "2025-07-30",
      "status": "Inactive"
    },
    {
      "id": 65,
      "name": "David Miller",
      "email": "david.miller380@hotmail.com",
      "phone": "9857668190",
      "avatar": "https://i.pravatar.cc/150?img=6",
      "lastVisit": "2025-07-31",
      "status": "Active"
    },
    {
      "id": 66,
      "name": "Kate Johnson",
      "email": "kate.johnson234@yahoo.com",
      "phone": "2248044843",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-06-26",
      "status": "Inactive"
    },
    {
      "id": 67,
      "name": "Luke Garcia",
      "email": "luke.garcia445@example.com",
      "phone": "5991017870",
      "avatar": "https://i.pravatar.cc/150?img=49",
      "lastVisit": "2025-05-12",
      "status": "Active"
    },
    {
      "id": 68,
      "name": "Emma Taylor",
      "email": "emma.taylor259@gmail.com",
      "phone": "8831977897",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-04-22",
      "status": "Inactive"
    },
    {
      "id": 69,
      "name": "Ian Sanchez",
      "email": "ian.sanchez219@outlook.com",
      "phone": "9333945641",
      "avatar": "https://i.pravatar.cc/150?img=63",
      "lastVisit": "2025-05-03",
      "status": "Active"
    },
    {
      "id": 70,
      "name": "Joy Young",
      "email": "joy.young71@yahoo.com",
      "phone": "9357366513",
      "avatar": "https://i.pravatar.cc/150?img=49",
      "lastVisit": "2025-05-08",
      "status": "Inactive"
    },
    {
      "id": 71,
      "name": "Jane Torres",
      "email": "jane.torres845@gmail.com",
      "phone": "6036851368",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-04-30",
      "status": "Active"
    },
    {
      "id": 72,
      "name": "Nina Moore",
      "email": "nina.moore365@gmail.com",
      "phone": "6046217184",
      "avatar": "https://i.pravatar.cc/150?img=19",
      "lastVisit": "2025-06-12",
      "status": "Inactive"
    },
    {
      "id": 73,
      "name": "Paul Martinez",
      "email": "paul.martinez309@outlook.com",
      "phone": "7904453339",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-05-27",
      "status": "Active"
    },
    {
      "id": 74,
      "name": "Sue Lee",
      "email": "sue.lee479@outlook.com",
      "phone": "3641384638",
      "avatar": "https://i.pravatar.cc/150?img=20",
      "lastVisit": "2025-04-23",
      "status": "Inactive"
    },
    {
      "id": 75,
      "name": "May Davis",
      "email": "may.davis232@outlook.com",
      "phone": "5538213593",
      "avatar": "https://i.pravatar.cc/150?img=48",
      "lastVisit": "2025-02-13",
      "status": "Active"
    },
    {
      "id": 76,
      "name": "David Lopez",
      "email": "david.lopez500@gmail.com",
      "phone": "6734814327",
      "avatar": "https://i.pravatar.cc/150?img=49",
      "lastVisit": "2025-03-06",
      "status": "Inactive"
    },
    {
      "id": 77,
      "name": "Amy Hill",
      "email": "amy.hill453@yahoo.com",
      "phone": "7943605841",
      "avatar": "https://i.pravatar.cc/150?img=50",
      "lastVisit": "2025-05-10",
      "status": "Active"
    },
    {
      "id": 78,
      "name": "Lea Brown",
      "email": "lea.brown322@yahoo.com",
      "phone": "2986706377",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-05-20",
      "status": "Inactive"
    },
    {
      "id": 79,
      "name": "John Jones",
      "email": "john.jones654@hotmail.com",
      "phone": "7242832340",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "lastVisit": "2025-02-22",
      "status": "Active"
    },
    {
      "id": 80,
      "name": "Chris Thomas",
      "email": "chris.thomas639@outlook.com",
      "phone": "8299055762",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-07-23",
      "status": "Inactive"
    },
    {
      "id": 81,
      "name": "Mia Thompson",
      "email": "mia.thompson689@outlook.com",
      "phone": "7376347045",
      "avatar": "https://i.pravatar.cc/150?img=14",
      "lastVisit": "2025-05-30",
      "status": "Active"
    },
    {
      "id": 82,
      "name": "Jane Jackson",
      "email": "jane.jackson646@yahoo.com",
      "phone": "5164645636",
      "avatar": "https://i.pravatar.cc/150?img=5",
      "lastVisit": "2025-03-13",
      "status": "Inactive"
    },
    {
      "id": 83,
      "name": "Sue Taylor",
      "email": "sue.taylor800@yahoo.com",
      "phone": "6995814791",
      "avatar": "https://i.pravatar.cc/150?img=21",
      "lastVisit": "2025-03-07",
      "status": "Active"
    },
    {
      "id": 84,
      "name": "John Smith",
      "email": "john.smith527@gmail.com",
      "phone": "5356024218",
      "avatar": "https://i.pravatar.cc/150?img=61",
      "lastVisit": "2025-04-14",
      "status": "Inactive"
    },
    {
      "id": 85,
      "name": "Zoe Brown",
      "email": "zoe.brown393@hotmail.com",
      "phone": "4321415316",
      "avatar": "https://i.pravatar.cc/150?img=40",
      "lastVisit": "2025-05-27",
      "status": "Active"
    },
    {
      "id": 86,
      "name": "Luke Smith",
      "email": "luke.smith939@hotmail.com",
      "phone": "6162948796",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-04-28",
      "status": "Inactive"
    },
    {
      "id": 87,
      "name": "John White",
      "email": "john.white172@hotmail.com",
      "phone": "2927269351",
      "avatar": "https://i.pravatar.cc/150?img=3",
      "lastVisit": "2025-04-13",
      "status": "Active"
    },
    {
      "id": 88,
      "name": "Rose Clark",
      "email": "rose.clark407@gmail.com",
      "phone": "2622988853",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-07-05",
      "status": "Inactive"
    },
    {
      "id": 89,
      "name": "Sam Wilson",
      "email": "sam.wilson550@hotmail.com",
      "phone": "4043079679",
      "avatar": "https://i.pravatar.cc/150?img=59",
      "lastVisit": "2025-04-17",
      "status": "Active"
    },
    {
      "id": 90,
      "name": "Nina Johnson",
      "email": "nina.johnson296@yahoo.com",
      "phone": "2438988562",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-31",
      "status": "Inactive"
    },
    {
      "id": 91,
      "name": "Lea Anderson",
      "email": "lea.anderson570@hotmail.com",
      "phone": "9537739460",
      "avatar": "https://i.pravatar.cc/150?img=31",
      "lastVisit": "2025-03-04",
      "status": "Active"
    },
    {
      "id": 92,
      "name": "Eva Johnson",
      "email": "eva.johnson474@example.com",
      "phone": "5464615186",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-07-23",
      "status": "Inactive"
    },
    {
      "id": 93,
      "name": "Luke Davis",
      "email": "luke.davis774@yahoo.com",
      "phone": "6395637799",
      "avatar": "https://i.pravatar.cc/150?img=36",
      "lastVisit": "2025-04-19",
      "status": "Active"
    },
    {
      "id": 94,
      "name": "Mia Anderson",
      "email": "mia.anderson112@gmail.com",
      "phone": "5724491808",
      "avatar": "https://i.pravatar.cc/150?img=16",
      "lastVisit": "2025-06-28",
      "status": "Inactive"
    },
    {
      "id": 95,
      "name": "Eva Sanchez",
      "email": "eva.sanchez325@example.com",
      "phone": "1895502062",
      "avatar": "https://i.pravatar.cc/150?img=62",
      "lastVisit": "2025-07-27",
      "status": "Active"
    },
    {
      "id": 96,
      "name": "David Rodriguez",
      "email": "david.rodriguez584@outlook.com",
      "phone": "4531565040",
      "avatar": "https://i.pravatar.cc/150?img=10",
      "lastVisit": "2025-03-11",
      "status": "Inactive"
    },
    {
      "id": 97,
      "name": "Joy Jackson",
      "email": "joy.jackson998@yahoo.com",
      "phone": "1818405640",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-03-23",
      "status": "Active"
    },
    {
      "id": 98,
      "name": "Anna Smith",
      "email": "anna.smith145@gmail.com",
      "phone": "1445641068",
      "avatar": "https://i.pravatar.cc/150?img=13",
      "lastVisit": "2025-07-26",
      "status": "Inactive"
    },
    {
      "id": 99,
      "name": "Ben Rodriguez",
      "email": "ben.rodriguez218@example.com",
      "phone": "9955035620",
      "avatar": "https://i.pravatar.cc/150?img=53",
      "lastVisit": "2025-02-14",
      "status": "Active"
    },
    {
      "id": 100,
      "name": "Sue Martinez",
      "email": "sue.martinez686@example.com",
      "phone": "1367361444",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-05-05",
      "status": "Inactive"
    },
    {
      "id": 101,
      "name": "Emma Martinez",
      "email": "emma.martinez458@outlook.com",
      "phone": "8434266360",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "lastVisit": "2025-06-29",
      "status": "Active"
    },
    {
      "id": 102,
      "name": "Sue Flores",
      "email": "sue.flores764@hotmail.com",
      "phone": "2928436991",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-06-16",
      "status": "Inactive"
    },
    {
      "id": 103,
      "name": "Kate Wilson",
      "email": "kate.wilson625@yahoo.com",
      "phone": "6463516826",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-03-27",
      "status": "Active"
    },
    {
      "id": 104,
      "name": "Ian Lee",
      "email": "ian.lee959@hotmail.com",
      "phone": "1864981544",
      "avatar": "https://i.pravatar.cc/150?img=26",
      "lastVisit": "2025-02-23",
      "status": "Inactive"
    },
    {
      "id": 105,
      "name": "Joy Lee",
      "email": "joy.lee753@gmail.com",
      "phone": "8093343415",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-05-12",
      "status": "Active"
    },
    {
      "id": 106,
      "name": "John Hernandez",
      "email": "john.hernandez959@gmail.com",
      "phone": "1456632224",
      "avatar": "https://i.pravatar.cc/150?img=65",
      "lastVisit": "2025-05-05",
      "status": "Inactive"
    },
    {
      "id": 107,
      "name": "May Rodriguez",
      "email": "may.rodriguez200@gmail.com",
      "phone": "3278897269",
      "avatar": "https://i.pravatar.cc/150?img=42",
      "lastVisit": "2025-04-06",
      "status": "Active"
    },
    {
      "id": 108,
      "name": "Rose Miller",
      "email": "rose.miller254@example.com",
      "phone": "7529079942",
      "avatar": "https://i.pravatar.cc/150?img=42",
      "lastVisit": "2025-03-29",
      "status": "Inactive"
    },
    {
      "id": 109,
      "name": "Eva Perez",
      "email": "eva.perez476@outlook.com",
      "phone": "5517778134",
      "avatar": "https://i.pravatar.cc/150?img=12",
      "lastVisit": "2025-03-28",
      "status": "Active"
    },
    {
      "id": 110,
      "name": "Mike Lee",
      "email": "mike.lee436@hotmail.com",
      "phone": "3204035995",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "lastVisit": "2025-06-05",
      "status": "Inactive"
    },
    {
      "id": 111,
      "name": "James Ramirez",
      "email": "james.ramirez774@gmail.com",
      "phone": "2235183942",
      "avatar": "https://i.pravatar.cc/150?img=25",
      "lastVisit": "2025-05-09",
      "status": "Active"
    },
    {
      "id": 112,
      "name": "Kate Moore",
      "email": "kate.moore65@outlook.com",
      "phone": "6288277486",
      "avatar": "https://i.pravatar.cc/150?img=17",
      "lastVisit": "2025-06-25",
      "status": "Inactive"
    },
    {
      "id": 113,
      "name": "Luke Flores",
      "email": "luke.flores148@example.com",
      "phone": "9911371540",
      "avatar": "https://i.pravatar.cc/150?img=66",
      "lastVisit": "2025-03-28",
      "status": "Active"
    },
    {
      "id": 114,
      "name": "Amy Lewis",
      "email": "amy.lewis282@gmail.com",
      "phone": "8535754114",
      "avatar": "https://i.pravatar.cc/150?img=12",
      "lastVisit": "2025-04-30",
      "status": "Inactive"
    },
    {
      "id": 115,
      "name": "Anna King",
      "email": "anna.king233@gmail.com",
      "phone": "3812106303",
      "avatar": "https://i.pravatar.cc/150?img=55",
      "lastVisit": "2025-03-09",
      "status": "Active"
    },
    {
      "id": 116,
      "name": "Sarah Young",
      "email": "sarah.young293@yahoo.com",
      "phone": "4217666480",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-02-25",
      "status": "Inactive"
    },
    {
      "id": 117,
      "name": "Mark Jackson",
      "email": "mark.jackson383@gmail.com",
      "phone": "6429881679",
      "avatar": "https://i.pravatar.cc/150?img=38",
      "lastVisit": "2025-02-19",
      "status": "Active"
    },
    {
      "id": 118,
      "name": "Nina Wilson",
      "email": "nina.wilson406@yahoo.com",
      "phone": "8335313653",
      "avatar": "https://i.pravatar.cc/150?img=52",
      "lastVisit": "2025-05-08",
      "status": "Inactive"
    },
    {
      "id": 119,
      "name": "Rose Hernandez",
      "email": "rose.hernandez918@yahoo.com",
      "phone": "7727509881",
      "avatar": "https://i.pravatar.cc/150?img=65",
      "lastVisit": "2025-04-05",
      "status": "Active"
    },
    {
      "id": 120,
      "name": "Eva Hernandez",
      "email": "eva.hernandez734@hotmail.com",
      "phone": "8745223686",
      "avatar": "https://i.pravatar.cc/150?img=37",
      "lastVisit": "2025-06-22",
      "status": "Inactive"
    },
    {
      "id": 121,
      "name": "Lisa Jackson",
      "email": "lisa.jackson749@hotmail.com",
      "phone": "6889509519",
      "avatar": "https://i.pravatar.cc/150?img=20",
      "lastVisit": "2025-07-10",
      "status": "Active"
    },
    {
      "id": 122,
      "name": "Peter Moore",
      "email": "peter.moore489@yahoo.com",
      "phone": "1524285923",
      "avatar": "https://i.pravatar.cc/150?img=16",
      "lastVisit": "2025-03-16",
      "status": "Inactive"
    },
    {
      "id": 123,
      "name": "Mia Scott",
      "email": "mia.scott960@hotmail.com",
      "phone": "2229152472",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-08-04",
      "status": "Active"
    },
    {
      "id": 124,
      "name": "Sue Young",
      "email": "sue.young492@gmail.com",
      "phone": "9365472686",
      "avatar": "https://i.pravatar.cc/150?img=30",
      "lastVisit": "2025-05-04",
      "status": "Inactive"
    },
    {
      "id": 125,
      "name": "Alex Garcia",
      "email": "alex.garcia512@hotmail.com",
      "phone": "3537183926",
      "avatar": "https://i.pravatar.cc/150?img=7",
      "lastVisit": "2025-02-20",
      "status": "Active"
    },
    {
      "id": 126,
      "name": "Lea Harris",
      "email": "lea.harris4@outlook.com",
      "phone": "5835341826",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-06-06",
      "status": "Inactive"
    },
    {
      "id": 127,
      "name": "Emma Robinson",
      "email": "emma.robinson754@outlook.com",
      "phone": "8549777372",
      "avatar": "https://i.pravatar.cc/150?img=43",
      "lastVisit": "2025-04-09",
      "status": "Active"
    },
    {
      "id": 128,
      "name": "Lucy Robinson",
      "email": "lucy.robinson874@yahoo.com",
      "phone": "7324532660",
      "avatar": "https://i.pravatar.cc/150?img=9",
      "lastVisit": "2025-06-12",
      "status": "Inactive"
    },
    {
      "id": 129,
      "name": "Paul Clark",
      "email": "paul.clark792@gmail.com",
      "phone": "9425548871",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-06-19",
      "status": "Active"
    },
    {
      "id": 130,
      "name": "Ivy Jones",
      "email": "ivy.jones667@example.com",
      "phone": "5626444447",
      "avatar": "https://i.pravatar.cc/150?img=5",
      "lastVisit": "2025-06-11",
      "status": "Inactive"
    },
    {
      "id": 131,
      "name": "Nina Garcia",
      "email": "nina.garcia532@yahoo.com",
      "phone": "4764075263",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-05-06",
      "status": "Active"
    },
    {
      "id": 132,
      "name": "Emma Walker",
      "email": "emma.walker777@example.com",
      "phone": "9211648154",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-02-13",
      "status": "Inactive"
    },
    {
      "id": 133,
      "name": "Kate Garcia",
      "email": "kate.garcia906@yahoo.com",
      "phone": "1631606862",
      "avatar": "https://i.pravatar.cc/150?img=59",
      "lastVisit": "2025-05-21",
      "status": "Active"
    },
    {
      "id": 134,
      "name": "Lea Perez",
      "email": "lea.perez759@hotmail.com",
      "phone": "9413833106",
      "avatar": "https://i.pravatar.cc/150?img=65",
      "lastVisit": "2025-07-13",
      "status": "Inactive"
    },
    {
      "id": 135,
      "name": "Nina Thomas",
      "email": "nina.thomas371@hotmail.com",
      "phone": "2981165362",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-02-08",
      "status": "Active"
    },
    {
      "id": 136,
      "name": "Ben Lee",
      "email": "ben.lee729@outlook.com",
      "phone": "2962296574",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "lastVisit": "2025-03-16",
      "status": "Inactive"
    },
    {
      "id": 137,
      "name": "Max Hill",
      "email": "max.hill910@example.com",
      "phone": "6189828986",
      "avatar": "https://i.pravatar.cc/150?img=57",
      "lastVisit": "2025-05-08",
      "status": "Active"
    },
    {
      "id": 138,
      "name": "Luke Moore",
      "email": "luke.moore391@example.com",
      "phone": "5451837078",
      "avatar": "https://i.pravatar.cc/150?img=20",
      "lastVisit": "2025-05-27",
      "status": "Inactive"
    },
    {
      "id": 139,
      "name": "Dan Taylor",
      "email": "dan.taylor875@hotmail.com",
      "phone": "6635901646",
      "avatar": "https://i.pravatar.cc/150?img=47",
      "lastVisit": "2025-02-13",
      "status": "Active"
    },
    {
      "id": 140,
      "name": "Paul Davis",
      "email": "paul.davis387@gmail.com",
      "phone": "1278551154",
      "avatar": "https://i.pravatar.cc/150?img=49",
      "lastVisit": "2025-05-24",
      "status": "Inactive"
    },
    {
      "id": 141,
      "name": "James Sanchez",
      "email": "james.sanchez924@gmail.com",
      "phone": "3794977639",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-04-30",
      "status": "Active"
    },
    {
      "id": 142,
      "name": "Dan Harris",
      "email": "dan.harris413@outlook.com",
      "phone": "7698399625",
      "avatar": "https://i.pravatar.cc/150?img=53",
      "lastVisit": "2025-07-11",
      "status": "Inactive"
    },
    {
      "id": 143,
      "name": "Emma Smith",
      "email": "emma.smith917@yahoo.com",
      "phone": "5472124303",
      "avatar": "https://i.pravatar.cc/150?img=52",
      "lastVisit": "2025-07-14",
      "status": "Active"
    },
    {
      "id": 144,
      "name": "Joy Smith",
      "email": "joy.smith469@yahoo.com",
      "phone": "5194453354",
      "avatar": "https://i.pravatar.cc/150?img=20",
      "lastVisit": "2025-06-14",
      "status": "Inactive"
    },
    {
      "id": 145,
      "name": "Ian Moore",
      "email": "ian.moore527@yahoo.com",
      "phone": "2253656951",
      "avatar": "https://i.pravatar.cc/150?img=19",
      "lastVisit": "2025-06-14",
      "status": "Active"
    },
    {
      "id": 146,
      "name": "Adam Lopez",
      "email": "adam.lopez606@hotmail.com",
      "phone": "7084771248",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-07-23",
      "status": "Inactive"
    },
    {
      "id": 147,
      "name": "John Jones",
      "email": "john.jones366@yahoo.com",
      "phone": "3826235909",
      "avatar": "https://i.pravatar.cc/150?img=36",
      "lastVisit": "2025-04-08",
      "status": "Active"
    },
    {
      "id": 148,
      "name": "Max Jackson",
      "email": "max.jackson218@hotmail.com",
      "phone": "5313592808",
      "avatar": "https://i.pravatar.cc/150?img=27",
      "lastVisit": "2025-02-14",
      "status": "Inactive"
    },
    {
      "id": 149,
      "name": "Sue Young",
      "email": "sue.young753@gmail.com",
      "phone": "3478188207",
      "avatar": "https://i.pravatar.cc/150?img=62",
      "lastVisit": "2025-03-15",
      "status": "Active"
    },
    {
      "id": 150,
      "name": "Tom Hill",
      "email": "tom.hill471@gmail.com",
      "phone": "3481731185",
      "avatar": "https://i.pravatar.cc/150?img=25",
      "lastVisit": "2025-06-17",
      "status": "Inactive"
    },
    {
      "id": 151,
      "name": "Jack Flores",
      "email": "jack.flores266@outlook.com",
      "phone": "3005843631",
      "avatar": "https://i.pravatar.cc/150?img=8",
      "lastVisit": "2025-02-25",
      "status": "Active"
    },
    {
      "id": 152,
      "name": "Lea Anderson",
      "email": "lea.anderson619@yahoo.com",
      "phone": "2653746265",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-03-26",
      "status": "Inactive"
    },
    {
      "id": 153,
      "name": "Tom Perez",
      "email": "tom.perez578@hotmail.com",
      "phone": "8496926328",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "lastVisit": "2025-07-22",
      "status": "Active"
    },
    {
      "id": 154,
      "name": "Chris Sanchez",
      "email": "chris.sanchez460@gmail.com",
      "phone": "5439096059",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-05-08",
      "status": "Inactive"
    },
    {
      "id": 155,
      "name": "Amy Gonzalez",
      "email": "amy.gonzalez745@yahoo.com",
      "phone": "4327583288",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "lastVisit": "2025-03-01",
      "status": "Active"
    },
    {
      "id": 156,
      "name": "Paul Clark",
      "email": "paul.clark368@gmail.com",
      "phone": "4844358094",
      "avatar": "https://i.pravatar.cc/150?img=37",
      "lastVisit": "2025-06-07",
      "status": "Inactive"
    },
    {
      "id": 157,
      "name": "Dan Williams",
      "email": "dan.williams927@gmail.com",
      "phone": "7248525538",
      "avatar": "https://i.pravatar.cc/150?img=13",
      "lastVisit": "2025-07-26",
      "status": "Active"
    },
    {
      "id": 158,
      "name": "Sam Wright",
      "email": "sam.wright535@hotmail.com",
      "phone": "6263101932",
      "avatar": "https://i.pravatar.cc/150?img=58",
      "lastVisit": "2025-07-13",
      "status": "Inactive"
    },
    {
      "id": 159,
      "name": "Paul Lee",
      "email": "paul.lee957@outlook.com",
      "phone": "3115042013",
      "avatar": "https://i.pravatar.cc/150?img=54",
      "lastVisit": "2025-07-19",
      "status": "Active"
    },
    {
      "id": 160,
      "name": "Tom Anderson",
      "email": "tom.anderson809@yahoo.com",
      "phone": "3606075473",
      "avatar": "https://i.pravatar.cc/150?img=66",
      "lastVisit": "2025-06-06",
      "status": "Inactive"
    },
    {
      "id": 161,
      "name": "Jack King",
      "email": "jack.king265@example.com",
      "phone": "7767647514",
      "avatar": "https://i.pravatar.cc/150?img=14",
      "lastVisit": "2025-02-18",
      "status": "Active"
    },
    {
      "id": 162,
      "name": "Rose Garcia",
      "email": "rose.garcia598@outlook.com",
      "phone": "4186246487",
      "avatar": "https://i.pravatar.cc/150?img=34",
      "lastVisit": "2025-05-10",
      "status": "Inactive"
    },
    {
      "id": 163,
      "name": "Sue Young",
      "email": "sue.young140@gmail.com",
      "phone": "6156689514",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "lastVisit": "2025-03-11",
      "status": "Active"
    },
    {
      "id": 164,
      "name": "Max Thompson",
      "email": "max.thompson299@outlook.com",
      "phone": "5764359212",
      "avatar": "https://i.pravatar.cc/150?img=7",
      "lastVisit": "2025-05-12",
      "status": "Inactive"
    },
    {
      "id": 165,
      "name": "Steve Rodriguez",
      "email": "steve.rodriguez284@gmail.com",
      "phone": "2519985289",
      "avatar": "https://i.pravatar.cc/150?img=41",
      "lastVisit": "2025-06-16",
      "status": "Active"
    },
    {
      "id": 166,
      "name": "Ivy Jones",
      "email": "ivy.jones723@example.com",
      "phone": "4903669620",
      "avatar": "https://i.pravatar.cc/150?img=49",
      "lastVisit": "2025-03-05",
      "status": "Inactive"
    },
    {
      "id": 167,
      "name": "Luke Ramirez",
      "email": "luke.ramirez263@yahoo.com",
      "phone": "3739512913",
      "avatar": "https://i.pravatar.cc/150?img=21",
      "lastVisit": "2025-07-05",
      "status": "Active"
    },
    {
      "id": 168,
      "name": "Tom Ramirez",
      "email": "tom.ramirez831@hotmail.com",
      "phone": "2805496853",
      "avatar": "https://i.pravatar.cc/150?img=39",
      "lastVisit": "2025-02-22",
      "status": "Inactive"
    },
    {
      "id": 169,
      "name": "Mark Hill",
      "email": "mark.hill254@yahoo.com",
      "phone": "9895893053",
      "avatar": "https://i.pravatar.cc/150?img=11",
      "lastVisit": "2025-04-07",
      "status": "Active"
    },
    {
      "id": 170,
      "name": "Sam Allen",
      "email": "sam.allen369@example.com",
      "phone": "1048697648",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-06-16",
      "status": "Inactive"
    },
    {
      "id": 171,
      "name": "John Taylor",
      "email": "john.taylor523@example.com",
      "phone": "9862347310",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "lastVisit": "2025-03-30",
      "status": "Active"
    },
    {
      "id": 172,
      "name": "Lisa Sanchez",
      "email": "lisa.sanchez276@gmail.com",
      "phone": "4992318071",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-04-15",
      "status": "Inactive"
    },
    {
      "id": 173,
      "name": "Luke Lewis",
      "email": "luke.lewis10@gmail.com",
      "phone": "6433366475",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-02-11",
      "status": "Active"
    },
    {
      "id": 174,
      "name": "Zoe Gonzalez",
      "email": "zoe.gonzalez482@yahoo.com",
      "phone": "1935189462",
      "avatar": "https://i.pravatar.cc/150?img=30",
      "lastVisit": "2025-04-26",
      "status": "Inactive"
    },
    {
      "id": 175,
      "name": "Paul Thompson",
      "email": "paul.thompson732@yahoo.com",
      "phone": "9316428343",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-06-04",
      "status": "Active"
    },
    {
      "id": 176,
      "name": "Emma Garcia",
      "email": "emma.garcia848@gmail.com",
      "phone": "8626516378",
      "avatar": "https://i.pravatar.cc/150?img=41",
      "lastVisit": "2025-07-19",
      "status": "Inactive"
    },
    {
      "id": 177,
      "name": "Ian Lopez",
      "email": "ian.lopez109@outlook.com",
      "phone": "8605406651",
      "avatar": "https://i.pravatar.cc/150?img=34",
      "lastVisit": "2025-05-13",
      "status": "Active"
    },
    {
      "id": 178,
      "name": "Eva Hernandez",
      "email": "eva.hernandez429@example.com",
      "phone": "6225865379",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "lastVisit": "2025-07-08",
      "status": "Inactive"
    },
    {
      "id": 179,
      "name": "Jane Ramirez",
      "email": "jane.ramirez385@yahoo.com",
      "phone": "3926349547",
      "avatar": "https://i.pravatar.cc/150?img=19",
      "lastVisit": "2025-06-09",
      "status": "Active"
    },
    {
      "id": 180,
      "name": "Ella Nguyen",
      "email": "ella.nguyen184@hotmail.com",
      "phone": "9804395010",
      "avatar": "https://i.pravatar.cc/150?img=38",
      "lastVisit": "2025-02-06",
      "status": "Inactive"
    },
    {
      "id": 181,
      "name": "Mike Lewis",
      "email": "mike.lewis93@outlook.com",
      "phone": "3059173454",
      "avatar": "https://i.pravatar.cc/150?img=31",
      "lastVisit": "2025-04-06",
      "status": "Active"
    },
    {
      "id": 182,
      "name": "Anna Sanchez",
      "email": "anna.sanchez24@example.com",
      "phone": "4716562740",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "lastVisit": "2025-07-29",
      "status": "Inactive"
    },
    {
      "id": 183,
      "name": "Mike Thompson",
      "email": "mike.thompson489@outlook.com",
      "phone": "3206614639",
      "avatar": "https://i.pravatar.cc/150?img=23",
      "lastVisit": "2025-07-30",
      "status": "Active"
    },
    {
      "id": 184,
      "name": "Sue Clark",
      "email": "sue.clark983@hotmail.com",
      "phone": "9741022434",
      "avatar": "https://i.pravatar.cc/150?img=63",
      "lastVisit": "2025-05-08",
      "status": "Inactive"
    },
    {
      "id": 185,
      "name": "Ryan Moore",
      "email": "ryan.moore160@example.com",
      "phone": "2103724232",
      "avatar": "https://i.pravatar.cc/150?img=35",
      "lastVisit": "2025-07-15",
      "status": "Active"
    },
    {
      "id": 186,
      "name": "Ben Lopez",
      "email": "ben.lopez808@outlook.com",
      "phone": "2812574239",
      "avatar": "https://i.pravatar.cc/150?img=13",
      "lastVisit": "2025-06-07",
      "status": "Inactive"
    },
    {
      "id": 187,
      "name": "Luke Gonzalez",
      "email": "luke.gonzalez992@gmail.com",
      "phone": "5475283890",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-05-13",
      "status": "Active"
    },
    {
      "id": 188,
      "name": "Ian Johnson",
      "email": "ian.johnson157@gmail.com",
      "phone": "8874783102",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "lastVisit": "2025-04-13",
      "status": "Inactive"
    },
    {
      "id": 189,
      "name": "May Johnson",
      "email": "may.johnson130@hotmail.com",
      "phone": "6243155399",
      "avatar": "https://i.pravatar.cc/150?img=18",
      "lastVisit": "2025-04-02",
      "status": "Active"
    },
    {
      "id": 190,
      "name": "Lucy Gonzalez",
      "email": "lucy.gonzalez111@example.com",
      "phone": "1222395411",
      "avatar": "https://i.pravatar.cc/150?img=16",
      "lastVisit": "2025-05-29",
      "status": "Inactive"
    },
    {
      "id": 191,
      "name": "Ella Scott",
      "email": "ella.scott296@gmail.com",
      "phone": "3493046606",
      "avatar": "https://i.pravatar.cc/150?img=26",
      "lastVisit": "2025-05-18",
      "status": "Active"
    },
    {
      "id": 192,
      "name": "Mike Wilson",
      "email": "mike.wilson744@hotmail.com",
      "phone": "8016679470",
      "avatar": "https://i.pravatar.cc/150?img=22",
      "lastVisit": "2025-06-07",
      "status": "Inactive"
    },
    {
      "id": 193,
      "name": "Mary Jackson",
      "email": "mary.jackson604@yahoo.com",
      "phone": "1568142463",
      "avatar": "https://i.pravatar.cc/150?img=67",
      "lastVisit": "2025-07-20",
      "status": "Active"
    },
    {
      "id": 194,
      "name": "David Martin",
      "email": "david.martin202@yahoo.com",
      "phone": "8209367180",
      "avatar": "https://i.pravatar.cc/150?img=5",
      "lastVisit": "2025-07-28",
      "status": "Inactive"
    },
    {
      "id": 195,
      "name": "Lea Smith",
      "email": "lea.smith889@hotmail.com",
      "phone": "4892016017",
      "avatar": "https://i.pravatar.cc/150?img=13",
      "lastVisit": "2025-02-14",
      "status": "Active"
    },
    {
      "id": 196,
      "name": "Joy Scott",
      "email": "joy.scott273@example.com",
      "phone": "2148179607",
      "avatar": "https://i.pravatar.cc/150?img=44",
      "lastVisit": "2025-07-12",
      "status": "Inactive"
    },
    {
      "id": 197,
      "name": "Sue Gonzalez",
      "email": "sue.gonzalez659@outlook.com",
      "phone": "8233103345",
      "avatar": "https://i.pravatar.cc/150?img=51",
      "lastVisit": "2025-06-12",
      "status": "Active"
    },
    {
      "id": 198,
      "name": "Dan Miller",
      "email": "dan.miller401@example.com",
      "phone": "8305474220",
      "avatar": "https://i.pravatar.cc/150?img=66",
      "lastVisit": "2025-02-26",
      "status": "Inactive"
    },
    {
      "id": 199,
      "name": "Paul Lee",
      "email": "paul.lee672@gmail.com",
      "phone": "5817456648",
      "avatar": "https://i.pravatar.cc/150?img=44",
      "lastVisit": "2025-07-26",
      "status": "Active"
    },
    {
      "id": 200,
      "name": "Mark Wright",
      "email": "mark.wright652@gmail.com",
      "phone": "7133478136",
      "avatar": "https://i.pravatar.cc/150?img=64",
      "lastVisit": "2025-02-15",
      "status": "Inactive"
    }
  ]
  const pharmacistList = useMemo(() => {
    let filtered = [...allPharmacists];
    if (filterState.filter.textFilter) {
      const textFilter = filterState.filter.textFilter.toLowerCase();
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(textFilter) || ''
      );
    }
    if (filterState.filter.statusFilter && filterState.filter.statusFilter !== 'all') {
      filtered = filtered.filter(dept =>
        dept.status.toLowerCase() === filterState.filter.statusFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allPharmacists, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Pharmacist",
    heading: "List of all pharmacists you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addNeededRedirectTo: "form",
    addBtnText: "Add Pharmacist"
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Pharmacist List",
            items: [
              { title: "Manage Staff", href: "#" },
              { title: "Pharmacist List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <PharmacistList dataPass={{ pharmacistList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};