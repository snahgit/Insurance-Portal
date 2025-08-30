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
import Login from "./Pages/auth/Login";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { logout } from "../redux/slices/UserAuthenticationSlices";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuickAssist } from "./Pages/quick_assist/QuickAssist";
import { PageNotFound } from "./error_page/PageNotFound";
import { ManageStaff } from "./Pages/manage_staff/ManageStaff";
import { TransactionHistory } from "./Pages/transaction_history/TransactionHistory";
import { Layout } from "./layout/Layout";
import { StaffMemberAddEditForm } from "./Pages/manage_staff/staff_member/sections/form/StaffMemberAddEditForm";
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
import { SettledClaimDetail } from "./Pages/manage_claim/settled_claim/sections/detail/SettledClaimDetail";
import { ClaimTransaction } from "./Pages/transaction_history/claim_transaction/ClaimTransaction";
import { PageAudioVideoCall } from "./common/PageAudioVideoCall";
import { ViewAccessLog } from "./Pages/quick_assist/view_access_log/ViewAccessLog";
import { Dashboard } from "./Pages/dashboard/Dashboard";
import { Revenue } from "./Pages/transaction_history/revenue/Revenue";

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
              path: "claim-transaction",
              element: <ClaimTransaction />,
              loader: () => {
                return {
                  type: 'claimTransaction',
                };
              },
            },
            // {
            //   path: "wallet-transaction",
            //   element: <WalletTransaction />,
            //   loader: () => {
            //     return {
            //       type: 'walletTransaction',
            //     };
            //   },
            // },
            {
              path: "revenue",
              element: <Revenue />,
              loader: () => {
                return {
                  type: 'revenue',
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
                  type: 'settledClaim',
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
