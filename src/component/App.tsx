import "./ssss.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AudioVideoCallProvider } from "../context/AudioVideoCallContext";
import PageLoader from "./common/page_loader/PageLoader";
import VideoTutorial from "./Pages/quick_assist/video_tutorial/VideoTutorial";
import Dashboard from "./Pages/dashboard/Dashboard";
import Login from "./Pages/auth/Login";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { logout } from "../redux/slices/UserAuthenticationSlices";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Patient } from "./Pages/manage_patient/patient/Patient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MedicalProvider } from "./Pages/medical_provider/MedicalProvider";
import { QuickAssist } from "./Pages/quick_assist/QuickAssist";
import { Department } from "./Pages/medical_provider/department/Department";
import { PageNotFound } from "./error_page/PageNotFound";
import { ManageStaff } from "./Pages/manage_staff/ManageStaff";
import { TransactionHistory } from "./Pages/transaction_history/TransactionHistory";
import { PaymentLog } from "./Pages/transaction_history/payment_log/PaymentLog";
import { ManageSchedule } from "./Pages/manage_schedule/ManageSchedule";
import { Schedule } from "./Pages/manage_schedule/schedule/Schedule";
import { Layout } from "./layout/Layout";
import { ManageAppointment } from "./Pages/manage_appointment/ManageAppointment";
import { AppointmentPrescriptionForm } from "./Pages/manage_appointment/appointment/sections/form/AppointmentPrescriptionForm";
import { Appointment } from "./Pages/manage_appointment/appointment/Appointment";
import { ScheduleAddEditForm } from "./Pages/manage_schedule/schedule/sections/form/ScheduleAddEditForm";
import { StaffMemberAddEditForm } from "./Pages/manage_staff/staff_member/sections/form/StaffMemberAddEditForm";
import { AppointmentAddForm } from "./Pages/manage_appointment/appointment/sections/form/AppointmentAddForm";
import { PhysicianAddEditForm } from "./Pages/medical_provider/physician/sections/form/PhysicianAddEditForm";
import { StaffMember } from "./Pages/manage_staff/staff_member/StaffMember";
import { ManageClaim } from "./Pages/manage_claim/ManageClaim";
import { HelpSupport } from "./Pages/quick_assist/help_support/HelpSupport";
import { HelpSupportDetail } from "./Pages/quick_assist/help_support/sections/detail/HelpSupportDetail";
import { SecurityCheckContext } from "../context/SecurityCheckContext";
import { ManageReport } from "./Pages/manage_report/ManageReport";
import { Report } from "./Pages/manage_report/report/Report";
import { ReportAddEditForm } from "./Pages/manage_report/report/sections/form/ReportAddEditForm";
import { Profile } from "./Pages/profile/Profile";
import { SettledClaim } from "./Pages/manage_claim/settled_claim/SettledClaim";
import { ManageMember } from "./Pages/manage_member/ManageMember";
import { Member } from "./Pages/manage_member/member/Member";
import { MemberDetail } from "./Pages/manage_member/member/sections/detail/MemberDetail";
import { ReportDetail } from "./Pages/manage_report/report/sections/detail/ReportDetail";
import { StaffMemberDetail } from "./Pages/manage_staff/staff_member/sections/detail/StaffMemberDetail";
import { WalletTransaction } from "./Pages/transaction_history/wallet_transaction/WalletTransaction";
import { PatientDetail } from "./Pages/manage_patient/patient/sections/detail/PatientDetail";
import { PhysicianDetail } from "./Pages/medical_provider/physician/sections/detail/PhysicianDetail";
import { ManagePatient } from "./Pages/manage_patient/ManagePatient";
import { Pharmacist } from "./Pages/manage_staff/pharmacist/Pharmacist";
import { PharmacistAddEditForm } from "./Pages/manage_staff/pharmacist/sections/form/PharmacistAddEditForm";
import { PharmacistDetail } from "./Pages/manage_staff/pharmacist/sections/detail/PharmacistDetail";
import { PharmacyClaim } from "./Pages/manage_claim/pharmacy_claim/PharmacyClaim";
import { FacilityClaim } from "./Pages/manage_claim/facility_claim/FacilityClaim";
import { FacilityClaimAddEditForm } from "./Pages/manage_claim/facility_claim/sections/form/FacilityClaimAddEditForm";
import { FacilityClaimDetail } from "./Pages/manage_claim/facility_claim/sections/detail/FacilityClaimDetail";
import { PharmacyClaimAddEditForm } from "./Pages/manage_claim/pharmacy_claim/sections/form/PharmacyClaimAddEditForm";
import { PharmacyClaimDetail } from "./Pages/manage_claim/pharmacy_claim/sections/detail/PharmacyClaimDetail";
import { SettledClaimDetail } from "./Pages/manage_claim/settled_claim/sections/detail/SettledClaimDetail";
import { ClaimTransaction } from "./Pages/transaction_history/claim_transaction/ClaimTransaction";
import { Prescription } from "./Pages/manage_prescription/prescription/Prescription";
import { PrescriptIonInvoiceAddEditForm } from "./Pages/manage_prescription/prescription/sections/form/PrescriptIonInvoiceAddEditForm";
import { PageAudioVideoCall } from "./common/PageAudioVideoCall";
import { PrescriptionDetail } from "./Pages/manage_prescription/prescription/sections/detail/PrescriptionDetail";
import { ViewAccessLog } from "./Pages/quick_assist/view_access_log/ViewAccessLog";
import { Physician } from "./Pages/medical_provider/physician/Physician";

const App = () => {
  const queryClient = new QueryClient();
  const token = useAppSelector((state) => {
    return state?.authentication?.data?.token;
  });
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);

  const dispatch = useAppDispatch();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const INACTIVITY_TIMEOUT = 20 * 60 * 1000;

  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      dispatch(logout());
    }, INACTIVITY_TIMEOUT);
  }, [dispatch]);
  useEffect(() => {
    const events = [
      // "mousemove",
      // "mousedown",
      // "keypress",
      // "scroll",
      // "touchstart",
      "click",
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetTimer]);

  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "blue",
    autoContrast: true,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <PageLoader
              type="custom"
              text="Please wait while we load your application..."
              fullScreen
            />
          }
        >
          <SecurityCheckContext>
            <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
              {token ? (
                <Layout />
              ) : (
                <GoogleReCaptchaProvider
                  reCaptchaKey="6LeFWxYqAAAAAAiFMbd15y7dNpZ-F6gValYKL2Dn"
                  scriptProps={{ async: true, defer: true }}
                >
                  <Login />
                  {/* <ResetPassword /> */}
                </GoogleReCaptchaProvider>
              )}
            </MantineProvider>
          </SecurityCheckContext>
        </Suspense>
      ),
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "manage-patient",
          element: <ManagePatient />,
          loader: () => {
            return {
              type: "list",
            };
          },
          children: [
            {
              path: "patient",
              element: <Patient />,
              loader: () => {
                return {
                  type: 'patient'
                };
              },
            },
            {
              path: "patient/detail",
              element: <PatientDetail />,
              loader: () => {
                return {
                  type: 'detail'
                };
              },
            },
          ],
        },
        {
          path: "manage-schedule",
          element: <ManageSchedule />,
          loader: () => {
            return {
              type: 'manageSchedule',
            };
          },
          children: [
            {
              path: "schedule",
              element: <Schedule />,
              loader: () => {
                return {
                  type: 'schedule',
                };
              },
            },
            {
              path: "schedule/form",
              element: <ScheduleAddEditForm />,
              loader: () => {
                return {
                  type: 'schedule',
                };
              },
            },
          ],
        },
        {
          path: "medical-providers",
          element: <MedicalProvider />,
          loader: () => {
            return {
              type: 'medicalProviders',
            };
          },
          children: [
            {
              path: "physician",
              element: <Physician />,
              loader: () => {
                return {
                  type: 'physician',
                };
              },
            },
            {
              path: "physician/form",
              element: <PhysicianAddEditForm />,
              loader: () => {
                return {
                  type: 'physician',
                };
              },
            },
            {
              path: "physician/detail",
              element: <PhysicianDetail />,
              loader: () => {
                return {
                  type: 'physician',
                };
              },
            },
            {
              path: "department",
              element: <Department />,
              loader: () => {
                return {
                  type: 'department',
                };
              },
            },
          ],
        },
        {
          path: "manage-appointment",
          element: <ManageAppointment />,
          loader: () => {
            return {
              type: 'manageAppointment',
            };
          },
          children: [
            {
              path: "appointment",
              element: <Appointment />,
              loader: () => {
                return {
                  type: 'appointment',
                };
              },
            },
            {
              path: "appointment/form",
              element: <AppointmentAddForm />,
              loader: () => {
                return {
                  type: 'appointment',
                };
              },
            },
            {
              path: "appointment/create-prescription",
              element: <AppointmentPrescriptionForm />,
              loader: () => {
                return {
                  type: 'appointment',
                };
              },
            },
          ],
        },
        {
          path: "quick-assist",
          element: <QuickAssist />,
          loader: () => {
            return {
              type: 'quickAssist',
            };
          },
          children: [
            {
              path: "video-tutorial",
              element: <VideoTutorial />,
              loader: () => {
                return {
                  type: 'videoTutorial',
                };
              },
            },
            {
              path: "help-support",
              element: <HelpSupport />,
              loader: () => {
                return {
                  type: 'helpSupport',
                };
              },
            },
            {
              path: "help-support/detail",
              element: <HelpSupportDetail />,
              loader: () => {
                return {
                  type: 'helpSupport',
                };
              },
            },
            {
              path: "view-access-log",
              element: <ViewAccessLog />,
              loader: () => {
                return {
                  type: 'viewAccessLog',
                };
              },
            },
          ],
        },
        {
          path: "transaction-history",
          element: <TransactionHistory />,
          loader: () => {
            return {
              type: 'transactionHistory',
            };
          },
          children: [
            {
              path: "payment-log",
              element: <PaymentLog />,
              loader: () => {
                return {
                  type: 'paymentLog',
                };
              },
            },
            {
              path: "claim-transaction",
              element: <ClaimTransaction />,
              loader: () => {
                return {
                  type: 'claimTransaction',
                };
              },
            },
            {
              path: "wallet-transaction",
              element: <WalletTransaction />,
              loader: () => {
                return {
                  type: 'walletTransaction',
                };
              },
            },
          ],
        },
        {
          path: "manage-staff",
          element: <ManageStaff />,
          loader: () => {
            return {
              type: 'manageStaff',
            };
          },
          children: [
            {
              path: "staff-member",
              element: <StaffMember />,
              loader: () => {
                return {
                  type: 'staffMember',
                };
              },
            },
            {
              path: "staff-member/form",
              element: <StaffMemberAddEditForm />,
              loader: () => {
                return {
                  type: 'staffMember',
                };
              },
            },
            {
              path: "staff-member/detail",
              element: <StaffMemberDetail />,
              loader: () => {
                return {
                  type: 'staffMember',
                };
              },
            },

            {
              path: "pharmacist",
              element: <Pharmacist />,
              loader: () => {
                return {
                  type: 'pharmacist',
                };
              },
            },
            {
              path: "pharmacist/form",
              element: <PharmacistAddEditForm />,
              loader: () => {
                return {
                  type: 'pharmacist',
                };
              },
            },
            {
              path: "pharmacist/detail",
              element: <PharmacistDetail />,
              loader: () => {
                return {
                  type: 'pharmacist',
                };
              },
            },
          ],
        },
        {
          path: "manage-claim",
          element: <ManageClaim />,
          loader: () => {
            return {
              type: 'manageClaim',
            };
          },
          children: [
            {
              path: "facility-claim",
              element: <FacilityClaim />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "facility-claim/form",
              element: <FacilityClaimAddEditForm />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "facility-claim/detail",
              element: <FacilityClaimDetail />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "pharmacy-claim",
              element: <PharmacyClaim />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "pharmacy-claim/form",
              element: <PharmacyClaimAddEditForm />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "pharmacy-claim/detail",
              element: <PharmacyClaimDetail />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "settled-claim",
              element: <SettledClaim />,
              loader: () => {
                return {
                  type: 'settledClaim',
                };
              },
            },
            {
              path: "settled-claim/detail",
              element: <SettledClaimDetail />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
          ],
        },
        {
          path: "manage-report",
          element: <ManageReport />,
          loader: () => {
            return {
              type: 'manageReport',
            };
          },
          children: [
            {
              path: "report",
              element: <Report />,
              loader: () => {
                return {
                  type: 'report',
                };
              },
            },
            {
              path: "report/form",
              element: <ReportAddEditForm />,
              loader: () => {
                return {
                  type: 'report',
                };
              },
            },
            {
              path: "report/detail",
              element: <ReportDetail />,
              loader: () => {
                return {
                  type: 'report',
                };
              },
            },
          ],
        },
        {
          path: "manage-member",
          element: <ManageMember />,
          loader: () => {
            return {
              type: 'manageMember',
            };
          },
          children: [
            {
              path: "member",
              element: <Member />,
              loader: () => {
                return {
                  type: 'member',
                };
              },
            },
            {
              path: "member/form",
              element: <ReportAddEditForm />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
            {
              path: "member/detail",
              element: <MemberDetail />,
              loader: () => {
                return {
                  type: 'claim',
                };
              },
            },
          ],
        },
        {
          path: "manage-prescription",
          element: <ManageMember />,
          loader: () => {
            return {
              type: 'managePrescription',
            };
          },
          children: [
            {
              path: "prescription",
              element: <Prescription />,
              loader: () => {
                return {
                  type: 'prescription',
                };
              },
            },
            {
              path: "prescription/create-invoice",
              element: <PrescriptIonInvoiceAddEditForm />,
              loader: () => {
                return {
                  type: 'prescription',
                };
              },
            },
            {
              path: "prescription/detail",
              element: <PrescriptionDetail />,
              loader: () => {
                return {
                  type: 'prescription',
                };
              },
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="mainContainer">
      <MantineProvider>
        <Notifications />
        <AudioVideoCallProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <PageAudioVideoCall />
          </QueryClientProvider>
        </AudioVideoCallProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
