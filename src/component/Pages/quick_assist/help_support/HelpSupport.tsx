import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { HelpSupportList } from "./sections/list/HelpSupportList";

export const HelpSupport = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const allHelpSupport = [
    [
      {
        "id": 1,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Unable to Login to Patient Portal",
        "description": "I'm having trouble accessing my patient portal account. The system keeps saying invalid credentials even though I'm using correct details.",
        "category": {
          "_id": "6593d4c124fd8992e00f6dea",
          "name": "Account and Login Issues",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496a9b678e92efe02cbac",
            "content": "Hello, I've been trying to log into my patient portal for the past 2 days but it keeps showing 'invalid credentials' error. I'm sure I'm using the correct email and password.",
            "createdAt": "2025-08-07T12:06:01.520Z"
          },
          {
            "type": "img",
            "addedBy": "user",
            "_id": "689496c150d3492f15868688",
            "content": "http://fs1.snah.org/uploads/defaultPath/login-error-screenshot.jpg",
            "createdAt": "2025-08-07T12:06:25.846Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496f9b678e92efe02cbb7",
            "content": "I've attached a screenshot of the error message. Could you please help me resolve this issue? I need to check my upcoming appointments.",
            "createdAt": "2025-08-07T12:07:21.280Z"
          }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 2,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Appointment Rescheduling Request",
        "description": "Need to reschedule my cardiology appointment due to work emergency. Looking for available slots next week with same doctor.",
        "category": {
          "_id": "6593d4c124fd8992e00f6dea",
          "name": "Appointment Scheduling",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496a9b678e92efe02cbac",
            "content": "Hi, I have an appointment with Dr. Johnson on August 15th at 2:00 PM for cardiology consultation. Unfortunately, I have a work emergency and need to reschedule.",
            "createdAt": "2025-08-07T12:06:01.520Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "689496c150d3492f15868688",
            "content": "Hello! I can help you reschedule your appointment. Let me check Dr. Johnson's availability for next week.",
            "createdAt": "2025-08-07T12:06:25.846Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "689496f9b678e92efe02cbb7",
            "content": "I've rescheduled your appointment to August 22nd at 3:00 PM. You'll receive a confirmation email shortly. Is there anything else I can help you with?",
            "createdAt": "2025-08-07T12:07:21.280Z"
          }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 3,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Password Reset Not Working",
        "description": "Password reset email not arriving in inbox or spam folder. Tried multiple times but no reset link received.",
        "category": {
          "_id": "6593d4c124fd8992e00f6dea",
          "name": "Forgot Password",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496a9b678e92efe02cbac",
            "content": "I forgot my password and clicked on 'Forgot Password' multiple times, but I'm not receiving any reset emails. I've checked both inbox and spam folders.",
            "createdAt": "2025-08-07T12:06:01.520Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496c150d3492f15868688",
            "content": "My registered email is john.doe@email.com. I really need access to my account to view my test results urgently.",
            "createdAt": "2025-08-07T12:06:25.846Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "689496f9b678e92efe02cbb7",
            "content": "This is quite urgent as I have an appointment tomorrow and need to review my medical history beforehand. Please help me reset my password manually if possible.",
            "createdAt": "2025-08-07T12:07:21.280Z"
          }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 4,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Billing Statement Not Received",
        "description": "I did not receive my latest billing statement. Please send a copy to my email.",
        "category": {
          "_id": "cat4",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg4a",
            "content": "I did not receive my latest billing statement. Please send a copy to my email.",
            "createdAt": "2025-08-01T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg4b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-01T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-01T12:06:01.519Z",
        "updatedAt": "2025-08-01T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 5,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Lab Results Delay",
        "description": "My blood test results are not available after 5 days. When will they be uploaded?",
        "category": {
          "_id": "cat5",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg5a",
            "content": "My blood test results are not available after 5 days. When will they be uploaded?",
            "createdAt": "2025-08-02T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg5b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-02T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-02T12:06:01.519Z",
        "updatedAt": "2025-08-02T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 6,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Request for Prescription Refill",
        "description": "I need a refill for my blood pressure medication. Please process my request.",
        "category": {
          "_id": "cat6",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg6a",
            "content": "I need a refill for my blood pressure medication. Please process my request.",
            "createdAt": "2025-08-03T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg6b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-03T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-03T12:06:01.519Z",
        "updatedAt": "2025-08-03T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 7,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Insurance Claim Status",
        "description": "Can you update me on the status of my insurance claim for last visit?",
        "category": {
          "_id": "cat7",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg7a",
            "content": "Can you update me on the status of my insurance claim for last visit?",
            "createdAt": "2025-08-04T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg7b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-04T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-04T12:06:01.519Z",
        "updatedAt": "2025-08-04T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 8,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Unable to Message Doctor",
        "description": "I am unable to send messages to my doctor through the portal.",
        "category": {
          "_id": "cat8",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg8a",
            "content": "I am unable to send messages to my doctor through the portal.",
            "createdAt": "2025-08-05T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg8b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-05T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-05T12:06:01.519Z",
        "updatedAt": "2025-08-05T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 9,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "App Not Loading",
        "description": "The app is stuck on the loading screen after login.",
        "category": {
          "_id": "cat9",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg9a",
            "content": "The app is stuck on the loading screen after login.",
            "createdAt": "2025-08-06T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg9b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-06T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-06T12:06:01.519Z",
        "updatedAt": "2025-08-06T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 10,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "How to Update Address?",
        "description": "How can I update my home address in my profile?",
        "category": {
          "_id": "cat10",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg10a",
            "content": "How can I update my home address in my profile?",
            "createdAt": "2025-08-07T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg10b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-07T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 11,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Incorrect Test Result Uploaded",
        "description": "The uploaded test result is not mine. Please check and correct.",
        "category": {
          "_id": "cat11",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg11a",
            "content": "The uploaded test result is not mine. Please check and correct.",
            "createdAt": "2025-08-08T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg11b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-08T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-08T12:06:01.519Z",
        "updatedAt": "2025-08-08T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 12,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Need Invoice Copy",
        "description": "I need a copy of my last invoice for reimbursement.",
        "category": {
          "_id": "cat12",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg12a",
            "content": "I need a copy of my last invoice for reimbursement.",
            "createdAt": "2025-08-09T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg12b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-09T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-09T12:06:01.519Z",
        "updatedAt": "2025-08-09T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 13,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Doctor Not Responding",
        "description": "My doctor has not replied to my last message for 3 days.",
        "category": {
          "_id": "cat13",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg13a",
            "content": "My doctor has not replied to my last message for 3 days.",
            "createdAt": "2025-08-10T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg13b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-10T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-10T12:06:01.519Z",
        "updatedAt": "2025-08-10T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 14,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Insurance Card Upload Issue",
        "description": "I am unable to upload my insurance card image.",
        "category": {
          "_id": "cat14",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg14a",
            "content": "I am unable to upload my insurance card image.",
            "createdAt": "2025-08-11T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg14b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-11T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-11T12:06:01.519Z",
        "updatedAt": "2025-08-11T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 15,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Prescription Not Ready",
        "description": "My prescription is not ready at the pharmacy as promised.",
        "category": {
          "_id": "cat15",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg15a",
            "content": "My prescription is not ready at the pharmacy as promised.",
            "createdAt": "2025-08-12T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg15b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-12T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-12T12:06:01.519Z",
        "updatedAt": "2025-08-12T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 16,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Lab Report Missing Page",
        "description": "The lab report is missing the last page. Please resend.",
        "category": {
          "_id": "cat16",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg16a",
            "content": "The lab report is missing the last page. Please resend.",
            "createdAt": "2025-08-13T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg16b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-13T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-13T12:06:01.519Z",
        "updatedAt": "2025-08-13T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 17,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Payment Failed",
        "description": "My payment failed but amount was deducted from my account.",
        "category": {
          "_id": "cat17",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg17a",
            "content": "My payment failed but amount was deducted from my account.",
            "createdAt": "2025-08-14T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg17b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-14T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-14T12:06:01.519Z",
        "updatedAt": "2025-08-14T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 18,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Appointment Reminder Not Received",
        "description": "I did not get a reminder for my appointment yesterday.",
        "category": {
          "_id": "cat18",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg18a",
            "content": "I did not get a reminder for my appointment yesterday.",
            "createdAt": "2025-08-15T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg18b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-15T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-15T12:06:01.519Z",
        "updatedAt": "2025-08-15T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 19,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Unable to Download Report",
        "description": "I am unable to download my medical report from the portal.",
        "category": {
          "_id": "cat19",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg19a",
            "content": "I am unable to download my medical report from the portal.",
            "createdAt": "2025-08-16T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg19b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-16T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-16T12:06:01.519Z",
        "updatedAt": "2025-08-16T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 20,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Change Pharmacy Location",
        "description": "I want to change my preferred pharmacy location.",
        "category": {
          "_id": "cat20",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg20a",
            "content": "I want to change my preferred pharmacy location.",
            "createdAt": "2025-08-17T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg20b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-17T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-17T12:06:01.519Z",
        "updatedAt": "2025-08-17T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 21,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Insurance Denied Claim",
        "description": "My insurance denied the claim for my last visit.",
        "category": {
          "_id": "cat21",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg21a",
            "content": "My insurance denied the claim for my last visit.",
            "createdAt": "2025-08-18T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg21b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-18T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-18T12:06:01.519Z",
        "updatedAt": "2025-08-18T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 22,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Technical Error on Portal",
        "description": "I keep getting a technical error on the portal.",
        "category": {
          "_id": "cat22",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg22a",
            "content": "I keep getting a technical error on the portal.",
            "createdAt": "2025-08-19T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg22b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-19T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-19T12:06:01.519Z",
        "updatedAt": "2025-08-19T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 23,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "General Help Needed",
        "description": "I have a general question about your services.",
        "category": {
          "_id": "cat23",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg23a",
            "content": "I have a general question about your services.",
            "createdAt": "2025-08-20T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg23b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-20T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-20T12:06:01.519Z",
        "updatedAt": "2025-08-20T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 24,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Billing Statement Not Received",
        "description": "I did not receive my latest billing statement. Please send a copy to my email.",
        "category": {
          "_id": "cat24",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg24a",
            "content": "I did not receive my latest billing statement. Please send a copy to my email.",
            "createdAt": "2025-08-21T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg24b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-21T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-21T12:06:01.519Z",
        "updatedAt": "2025-08-21T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 25,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Lab Results Delay",
        "description": "My blood test results are not available after 5 days. When will they be uploaded?",
        "category": {
          "_id": "cat25",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg25a",
            "content": "My blood test results are not available after 5 days. When will they be uploaded?",
            "createdAt": "2025-08-22T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg25b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-22T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-22T12:06:01.519Z",
        "updatedAt": "2025-08-22T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 26,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Request for Prescription Refill",
        "description": "I need a refill for my blood pressure medication. Please process my request.",
        "category": {
          "_id": "cat26",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg26a",
            "content": "I need a refill for my blood pressure medication. Please process my request.",
            "createdAt": "2025-08-23T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg26b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-23T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-23T12:06:01.519Z",
        "updatedAt": "2025-08-23T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 27,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Insurance Claim Status",
        "description": "Can you update me on the status of my insurance claim for last visit?",
        "category": {
          "_id": "cat27",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg27a",
            "content": "Can you update me on the status of my insurance claim for last visit?",
            "createdAt": "2025-08-24T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg27b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-24T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-24T12:06:01.519Z",
        "updatedAt": "2025-08-24T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 28,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Unable to Message Doctor",
        "description": "I am unable to send messages to my doctor through the portal.",
        "category": {
          "_id": "cat28",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg28a",
            "content": "I am unable to send messages to my doctor through the portal.",
            "createdAt": "2025-08-25T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg28b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-25T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-25T12:06:01.519Z",
        "updatedAt": "2025-08-25T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 29,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "App Not Loading",
        "description": "The app is stuck on the loading screen after login.",
        "category": {
          "_id": "cat29",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg29a",
            "content": "The app is stuck on the loading screen after login.",
            "createdAt": "2025-08-26T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg29b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-26T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-26T12:06:01.519Z",
        "updatedAt": "2025-08-26T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 30,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "How to Update Address?",
        "description": "How can I update my home address in my profile?",
        "category": {
          "_id": "cat30",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg30a",
            "content": "How can I update my home address in my profile?",
            "createdAt": "2025-08-27T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg30b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-27T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-27T12:06:01.519Z",
        "updatedAt": "2025-08-27T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 31,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Incorrect Test Result Uploaded",
        "description": "The uploaded test result is not mine. Please check and correct.",
        "category": {
          "_id": "cat31",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg31a",
            "content": "The uploaded test result is not mine. Please check and correct.",
            "createdAt": "2025-08-28T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg31b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-28T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-28T12:06:01.519Z",
        "updatedAt": "2025-08-28T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 32,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Need Invoice Copy",
        "description": "I need a copy of my last invoice for reimbursement.",
        "category": {
          "_id": "cat32",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg32a",
            "content": "I need a copy of my last invoice for reimbursement.",
            "createdAt": "2025-08-01T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg32b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-01T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-01T12:06:01.519Z",
        "updatedAt": "2025-08-01T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 33,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Doctor Not Responding",
        "description": "My doctor has not replied to my last message for 3 days.",
        "category": {
          "_id": "cat33",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg33a",
            "content": "My doctor has not replied to my last message for 3 days.",
            "createdAt": "2025-08-02T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg33b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-02T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-02T12:06:01.519Z",
        "updatedAt": "2025-08-02T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 34,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Insurance Card Upload Issue",
        "description": "I am unable to upload my insurance card image.",
        "category": {
          "_id": "cat34",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg34a",
            "content": "I am unable to upload my insurance card image.",
            "createdAt": "2025-08-03T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg34b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-03T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-03T12:06:01.519Z",
        "updatedAt": "2025-08-03T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 35,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Prescription Not Ready",
        "description": "My prescription is not ready at the pharmacy as promised.",
        "category": {
          "_id": "cat35",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg35a",
            "content": "My prescription is not ready at the pharmacy as promised.",
            "createdAt": "2025-08-04T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg35b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-04T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-04T12:06:01.519Z",
        "updatedAt": "2025-08-04T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 36,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Lab Report Missing Page",
        "description": "The lab report is missing the last page. Please resend.",
        "category": {
          "_id": "cat36",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg36a",
            "content": "The lab report is missing the last page. Please resend.",
            "createdAt": "2025-08-05T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg36b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-05T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-05T12:06:01.519Z",
        "updatedAt": "2025-08-05T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 37,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Payment Failed",
        "description": "My payment failed but amount was deducted from my account.",
        "category": {
          "_id": "cat37",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg37a",
            "content": "My payment failed but amount was deducted from my account.",
            "createdAt": "2025-08-06T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg37b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-06T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-06T12:06:01.519Z",
        "updatedAt": "2025-08-06T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 38,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "Appointment Reminder Not Received",
        "description": "I did not get a reminder for my appointment yesterday.",
        "category": {
          "_id": "cat38",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg38a",
            "content": "I did not get a reminder for my appointment yesterday.",
            "createdAt": "2025-08-07T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg38b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-07T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-07T12:06:01.519Z",
        "updatedAt": "2025-08-07T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 39,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Unable to Download Report",
        "description": "I am unable to download my medical report from the portal.",
        "category": {
          "_id": "cat39",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg39a",
            "content": "I am unable to download my medical report from the portal.",
            "createdAt": "2025-08-08T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg39b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-08T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-08T12:06:01.519Z",
        "updatedAt": "2025-08-08T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 40,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Change Pharmacy Location",
        "description": "I want to change my preferred pharmacy location.",
        "category": {
          "_id": "cat40",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg40a",
            "content": "I want to change my preferred pharmacy location.",
            "createdAt": "2025-08-09T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg40b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-09T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-09T12:06:01.519Z",
        "updatedAt": "2025-08-09T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 41,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Insurance Denied Claim",
        "description": "My insurance denied the claim for my last visit.",
        "category": {
          "_id": "cat41",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg41a",
            "content": "My insurance denied the claim for my last visit.",
            "createdAt": "2025-08-10T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg41b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-10T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-10T12:06:01.519Z",
        "updatedAt": "2025-08-10T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 42,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "Technical Error on Portal",
        "description": "I keep getting a technical error on the portal.",
        "category": {
          "_id": "cat42",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg42a",
            "content": "I keep getting a technical error on the portal.",
            "createdAt": "2025-08-11T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg42b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-11T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-11T12:06:01.519Z",
        "updatedAt": "2025-08-11T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 43,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 2,
        "title": "General Help Needed",
        "description": "I have a general question about your services.",
        "category": {
          "_id": "cat43",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg43a",
            "content": "I have a general question about your services.",
            "createdAt": "2025-08-12T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg43b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-12T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-12T12:06:01.519Z",
        "updatedAt": "2025-08-12T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 44,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Billing Statement Not Received",
        "description": "I did not receive my latest billing statement. Please send a copy to my email.",
        "category": {
          "_id": "cat44",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg44a",
            "content": "I did not receive my latest billing statement. Please send a copy to my email.",
            "createdAt": "2025-08-13T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg44b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-13T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-13T12:06:01.519Z",
        "updatedAt": "2025-08-13T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 45,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Lab Results Delay",
        "description": "My blood test results are not available after 5 days. When will they be uploaded?",
        "category": {
          "_id": "cat45",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg45a",
            "content": "My blood test results are not available after 5 days. When will they be uploaded?",
            "createdAt": "2025-08-14T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg45b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-14T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-14T12:06:01.519Z",
        "updatedAt": "2025-08-14T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 46,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Request for Prescription Refill",
        "description": "I need a refill for my blood pressure medication. Please process my request.",
        "category": {
          "_id": "cat46",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg46a",
            "content": "I need a refill for my blood pressure medication. Please process my request.",
            "createdAt": "2025-08-15T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg46b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-15T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-15T12:06:01.519Z",
        "updatedAt": "2025-08-15T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 47,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Insurance Claim Status",
        "description": "Can you update me on the status of my insurance claim for last visit?",
        "category": {
          "_id": "cat47",
          "name": "Test Results",
          "category": "lab"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg47a",
            "content": "Can you update me on the status of my insurance claim for last visit?",
            "createdAt": "2025-08-16T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg47b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-16T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-16T12:06:01.519Z",
        "updatedAt": "2025-08-16T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 48,
        "status": "open",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 4,
        "title": "Unable to Message Doctor",
        "description": "I am unable to send messages to my doctor through the portal.",
        "category": {
          "_id": "cat48",
          "name": "Prescription Request",
          "category": "pharmacy"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg48a",
            "content": "I am unable to send messages to my doctor through the portal.",
            "createdAt": "2025-08-17T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg48b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-17T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-17T12:06:01.519Z",
        "updatedAt": "2025-08-17T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 49,
        "status": "close",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "App Not Loading",
        "description": "The app is stuck on the loading screen after login.",
        "category": {
          "_id": "cat49",
          "name": "Insurance Query",
          "category": "insurance"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg49a",
            "content": "The app is stuck on the loading screen after login.",
            "createdAt": "2025-08-18T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg49b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-18T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-18T12:06:01.519Z",
        "updatedAt": "2025-08-18T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 50,
        "status": "open",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 3,
        "title": "How to Update Address?",
        "description": "How can I update my home address in my profile?",
        "category": {
          "_id": "cat50",
          "name": "Doctor Communication",
          "category": "medical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg50a",
            "content": "How can I update my home address in my profile?",
            "createdAt": "2025-08-19T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg50b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-19T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-19T12:06:01.519Z",
        "updatedAt": "2025-08-19T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 51,
        "status": "close",
        "priority": "high",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 0,
        "title": "Incorrect Test Result Uploaded",
        "description": "The uploaded test result is not mine. Please check and correct.",
        "category": {
          "_id": "cat51",
          "name": "Technical Support",
          "category": "technical"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg51a",
            "content": "The uploaded test result is not mine. Please check and correct.",
            "createdAt": "2025-08-20T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg51b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-20T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-20T12:06:01.519Z",
        "updatedAt": "2025-08-20T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 52,
        "status": "open",
        "priority": "low",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Need Invoice Copy",
        "description": "I need a copy of my last invoice for reimbursement.",
        "category": {
          "_id": "cat52",
          "name": "General Inquiry",
          "category": "general"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg52a",
            "content": "I need a copy of my last invoice for reimbursement.",
            "createdAt": "2025-08-21T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg52b",
            "content": "Thank you for your attention.",
            "createdAt": "2025-08-21T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-21T12:06:01.519Z",
        "updatedAt": "2025-08-21T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      },
      {
        "id": 53,
        "status": "close",
        "priority": "medium",
        "userType": "user",
        "isActive": true,
        "notSeenByUser": 0,
        "notSeenBySupportUser": 1,
        "title": "Doctor Not Responding",
        "description": "My doctor has not replied to my last message for 3 days.",
        "category": {
          "_id": "cat53",
          "name": "Billing Issue",
          "category": "billing"
        },
        "messages": [
          {
            "type": "text",
            "addedBy": "user",
            "_id": "msg53a",
            "content": "My doctor has not replied to my last message for 3 days.",
            "createdAt": "2025-08-22T12:06:01.519Z"
          },
          {
            "type": "text",
            "addedBy": "support",
            "_id": "msg53b",
            "content": "We have received your request and are working on it. You will be notified once resolved.",
            "createdAt": "2025-08-22T12:06:01.519Z"
          }
        ],
        "createdAt": "2025-08-22T12:06:01.519Z",
        "updatedAt": "2025-08-22T12:06:01.519Z",
        "createdBy": "63f624cf7622256e00005169"
      }
    ]
  ];

  const helpSupportList = useMemo(() => {
    let flatList = allHelpSupport.flat();
    let filtered = [...flatList];
    if (filterState.filter.propertyFilter && filterState.filter.propertyFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.priority.toLowerCase() === filterState.filter.propertyFilter.toLowerCase()
      );
    }
    if (filterState.filter.stateFilter && filterState.filter.stateFilter !== 'all') {
      filtered = filtered.filter(val =>
        val.status.toLowerCase() === filterState.filter.stateFilter.toLowerCase()
      );
    }
    return filtered;
  }, [allHelpSupport, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Create Ticket",
    heading: "List of all help & support list you can find below",
    viewMode: "grid",
    modalDrawer: {
      for: 'createUpdate'
    },
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addBtnText: "Create Ticket"
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Help & Support",
            items: [
              { title: "Quick Assist", href: "#" },
              { title: "Help & Support", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <HelpSupportList dataPass={{ helpSupportList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};