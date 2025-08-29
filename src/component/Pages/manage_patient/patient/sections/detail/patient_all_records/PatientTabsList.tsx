import { Fragment, useState } from "react";
import { Card, Tabs, Text } from "@mantine/core";
import { IconStethoscope, IconBuilding, IconHome, IconPill, IconNurse, IconClipboard, IconCar } from "@tabler/icons-react";
import { PageTopBarAndFilter } from "../../../../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../../../../common/PagePagination";
import { PatientPrivateList } from "../../list/PatientPrivateList";
import { PatientHospitalList } from "../../list/PatientHospitalList";
import { PatientHomeList } from "../../list/PatientHomeList";
import { PatientPharmacyList } from "../../list/PatientPharmacyList";
import { PatientCaregiverList } from "../../list/PatientCaregiverList";
import { PatientTreatmentList } from "../../list/PatientTreatmentList";
import { PatientRideList } from "../../list/PatientRideList";

export const PatientTabsList = () => {
  const [activeTab, setActiveTab] = useState<string>("private");
  const tabsConfig = [
    {
      value: "private",
      label: "Private Practice Visit",
      icon: IconStethoscope,
      color: "blue",
      component: PatientPrivateList,
      topBarConfig: {
        type: "userPrivate",
        title: 'Private Practice Visits',
        heading: "List of all private practice visits by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "hospital",
      label: "Hospital Visit",
      icon: IconBuilding,
      color: "blue",
      component: PatientHospitalList,
      topBarConfig: {
        type: "userHospital",
        title: 'Hospital Visits',
        heading: "List of all hospital visits by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "home",
      label: "Home Healthcare",
      icon: IconHome,
      color: "blue",
      component: PatientHomeList,
      topBarConfig: {
        type: "userHome",
        title: 'Home Healthcare Visits',
        heading: "List of all home healthcare visits by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "pharmacy",
      label: "Pharmacy",
      icon: IconPill,
      color: "blue",
      component: PatientPharmacyList,
      topBarConfig: {
        type: "userPharmacy",
        title: 'Pharmacy Visits',
        heading: "List of all pharmacy visits by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "caregiver",
      label: "Caregiver",
      icon: IconNurse,
      color: "blue",
      component: PatientCaregiverList,
      topBarConfig: {
        type: "userCaregiver",
        title: 'Caregiver Services',
        heading: "List of all caregiver services by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "ride",
      label: "Ride",
      icon: IconCar,
      color: "blue",
      component: PatientRideList,
      topBarConfig: {
        type: "userRide",
        title: 'Ride Services',
        heading: "List of all ride services by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
          isCalendarNeeded: true,
        }
      }
    },
    {
      value: "treatment",
      label: "Treatment Log",
      icon: IconClipboard,
      color: "blue",
      component: PatientTreatmentList,
      topBarConfig: {
        type: "userTreatment",
        title: 'Treatment Log',
        heading: "List of all treatment logs by the patient found below",
        viewMode: "grid",
        whatNeeded: {
          isViewModeNeeded: true,
          isFilterNeeded: true,
        }
      }
    },
  ];

  return (
    <Fragment>
      <Card className="mx-auto max-w-7xl shadow-xl border-0 overflow-hidden">
        <Card.Section className="px-6 py-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700">
          <div className="text-center">
            <Text
              size="xl"
              fw={700}
              className="text-white mb-2 tracking-wide"
            >
              Patient Healthcare Records
            </Text>
            <Text
              size="sm"
              className="text-emerald-100 opacity-90"
            >
              Comprehensive view of all healthcare services and activities
            </Text>
          </div>
        </Card.Section>
        <Card.Section className="px-6 py-6 bg-gray-100 dark:bg-gray-800">
          <Tabs
            value={activeTab}
            onChange={(value) => setActiveTab(value || "private")}
            variant="pills"
            className="w-full"
          >
            <Tabs.List className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-6 px-1">
              {tabsConfig.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Tabs.Tab
                    key={tab.value}
                    value={tab.value}
                    className={`
                      relative group overflow-hidden flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg 
                      ${activeTab === tab.value ?
                        'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400 text-white shadow-lg' :
                        'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600'}
                    `}
                  >
                    <div className={`flex justify-center mb-1 transition-transform duration-300 ${activeTab === tab.value ? 'animate-pulse' : 'group-hover:scale-110'}`}>
                      <IconComponent size={20} />
                    </div>
                    <Text
                      size="xs"
                      fw={500}
                      className="text-center leading-tight"
                    >
                      {tab.label}
                    </Text>
                    {activeTab === tab.value && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-xl animate-pulse" />
                    )}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700 overflow-hidden">
              {tabsConfig.map((tab) => {
                const ComponentToRender = tab.component;
                return (
                  <Tabs.Panel key={tab.value} value={tab.value} className="p-0">
                    <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
                      <PageTopBarAndFilter dataPass={{ topBarAndFilter: tab.topBarConfig }} />
                      <ComponentToRender />
                      <PagePagination dataPass={{ total: 10 }} />
                    </Card>
                  </Tabs.Panel>
                );
              })}
            </div>
          </Tabs>
        </Card.Section>
      </Card>
    </Fragment>
  );
};
