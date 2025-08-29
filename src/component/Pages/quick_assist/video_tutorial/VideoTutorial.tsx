import React, { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/hooks";
import VideoTutorialList from "./sections/video_tutorial_list/VideoTutorialList";
import { useLoaderData } from "react-router";

const VideoTutorial = () => {
  const loaderData = useLoaderData();
  const textFilter = useAppSelector((state: RootState) => state.pageTopBarAndFilter);
  const topBarAndFilter = {
    type: loaderData.type,
    heading: "List of all Video Tutorials you can find below",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
    },
    addNeededRedirectTo: "form",
  };
  const allVideoTutorialList = [
    {
      id: 1,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/1roiErZynuRveNUOVhAusxOPq-W-a-sB7/view?usp=sharing',
      title: 'Booking a Caregiver',
      content: 'This tutorial guides you through the process of booking a caregiver, from searching for available caregivers to confirming your booking. Learn how to view profiles, select the right caregiver, and manage your bookings with ease.'
    },
    {
      id: 2,
      isAccess: false,
      // thumbNail: 'https://t4.ftcdn.net/jpg/04/83/93/81/360_F_483938185_LeH5ySfRClEUKNbbSDVO4196v8H8ZRoS.jpg',
      url: 'https://drive.google.com/file/d/1W-ZpQgjlIhuuX3acTYbmsdrKrTK5OlqS/view?usp=sharing',
      title: 'Booking an In-Home Appointment',
      content: 'Follow these steps to book an in-home appointment. The video covers searching for providers, checking their availability, selecting a time slot, and confirming your appointment, ensuring a smooth and convenient experience.'
    },
    {
      id: 3,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/1nvI0KUd5FTlqEpD9eHvuS6tE8_9ULMCi/view?usp=sharing',
      title: 'Booking an In-Office Appointment',
      content: 'Learn how to book an in-office appointment with a medical provider. This tutorial explains how to search for providers, view their profiles, select a suitable time, and confirm your appointment.'
    },
    {
      id: 4,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/15XPaV5DxOjgFxZCvSyOZt6jrgOAp0lkg/view?usp=sharing',
      title: 'Booking an Online Appointment',
      content: 'This video shows you how to book an online appointment using the portal. Learn how to choose a provider, select a time, and complete the booking process from the comfort of your home.'
    },
    {
      id: 5,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/1AtLfln8ZnNxKN-tBVNCOBoq7YyJ0zAFM/view?usp=sharing',
      title: 'Completion of Consultation',
      content: 'Understand the steps to complete your consultation. This tutorial covers what to expect after your appointment, how to review notes, and how to follow up if needed.'
    },
    {
      id: 6,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/13dtORBC5tqgztK9GYfAcGqJNrZNwMXLk/view?usp=sharing',
      title: 'Prescription Delivery',
      content: 'Discover how prescription delivery works. This video explains how to request, track, and receive your prescriptions, ensuring you get your medication on time and securely.'
    },
    {
      id: 7,
      isAccess: false,
      // thumbNail: 'https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg',
      url: 'https://drive.google.com/file/d/1qr-lmRY21LzcNuZo54oZHDAflstjJ6YG/view?usp=sharing',
      title: 'SNAH User',
      content: 'A quick guide for SNAH users to get started. Learn how to navigate the portal, update your profile, manage notifications, and access important features for a smooth experience.'
    }
  ];

  const videoTutorialList = useMemo(() => {
    let filtered = [...allVideoTutorialList];
    if (textFilter.filter.textFilter) {
      filtered = filtered.filter(dept =>
        dept.title.toLowerCase().includes(textFilter.filter.textFilter.toLowerCase()) ||
        dept.content.toLowerCase().includes(textFilter.filter.textFilter.toLowerCase())
      );
    }
    return filtered;
  }, [allVideoTutorialList, textFilter.filter]);

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Video Tutorial List",
            items: [
              { title: "Quick Assist", href: "#" },
              { title: "Video Tutorial List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <VideoTutorialList dataPass={{ videoTutorialList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};

export default React.memo(VideoTutorial);
