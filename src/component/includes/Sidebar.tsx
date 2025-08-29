import React, { useState, useEffect } from "react";
import { IconHome, IconChevronRight, IconReportMedical, IconChevronLeft, IconHelpCircle, IconUsersGroup, IconClipboard, IconClover, IconReport } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router";
import { UnstyledButton, Tooltip, Box, Collapse, Group, Text, ActionIcon, ScrollArea, Avatar } from "@mantine/core";

interface SidebarProps {
  handleCollapse: () => void;
  collapse: boolean;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  link: string;
  gradient: string;
  subMenu: {
    title: string;
    link: string;
    nestedMenu: any[];
  }[];
}

const menuData: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <IconHome size={20} />,
    link: "/",
    subMenu: [],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Manage Member",
    link: "/manage-member/member",
    icon: <IconClipboard size={20} />,
    gradient: "from-cyan-500 to-blue-600",
    subMenu: [],
  },
  // {
  //   title: "Medical Provider",
  //   link: "#",
  //   icon: <IconMedicalCross size={20} />,
  //   gradient: "from-emerald-500 to-teal-600",
  //   subMenu: [
  //     {
  //       title: "Physician",
  //       link: "/medical-providers/physician",
  //       nestedMenu: [],
  //     },
  //     {
  //       title: "Department",
  //       link: "/medical-providers/department",
  //       nestedMenu: [],
  //     },
  //   ],
  // },
  // {
  //   title: "Manage Appointment",
  //   link: "#",
  //   icon: <IconReportMedical size={20} />,
  //   gradient: "from-cyan-500 to-pink-600",
  //   subMenu: [
  //     {
  //       title: "Appointment",
  //       link: "/manage-appointment/appointment",
  //       nestedMenu: [],
  //     },
  //   ],
  // },
  // {
  //   title: "Manage Schedule",
  //   link: "/manage-schedule/schedule",
  //   icon: <IconCalendarCheck size={20} />,
  //   gradient: "from-orange-500 to-red-600",
  //   subMenu: [],
  // },
  // {
  //   title: "Patient",
  //   link: "/manage-patient/patient",
  //   icon: <IconBox size={20} />,
  //   gradient: "from-cyan-500 to-blue-600",
  //   subMenu: [],
  // },
  {
    title: "Manage Claim",
    link: "#",
    icon: <IconClover size={20} />,
    gradient: "from-cyan-500 to-blue-600",
    subMenu: [
      // {
      //   title: "Facility claim",
      //   link: "/manage-claim/facility-claim",
      //   nestedMenu: [],
      // },
      // {
      //   title: "Pharmacy claim",
      //   link: "/manage-claim/pharmacy-claim",
      //   nestedMenu: [],
      // },
      {
        title: "Settled claim",
        link: "/manage-claim/settled-claim",
        nestedMenu: [],
      },
    ],
  },
  {
    title: "Manage Report",
    link: "/manage-report/report",
    icon: <IconReport size={20} />,
    gradient: "from-cyan-500 to-blue-600",
    subMenu: [],
  },
  {
    title: "Transaction History",
    link: "#",
    icon: <IconReportMedical size={20} />,
    gradient: "from-cyan-500 to-pink-600",
    subMenu: [
      // {
      //   title: "Payments Log",
      //   link: "/transaction-history/payment-log",
      //   nestedMenu: [],
      // },
      {
        title: "Claim Transaction",
        link: "/transaction-history/claim-transaction",
        nestedMenu: [],
      },
      {
        title: "Wallet Transaction",
        link: "/transaction-history/wallet-transaction",
        nestedMenu: [],
      },
    ],
  },
  {
    title: "Quick Assist",
    link: "#",
    icon: <IconHelpCircle size={20} />,
    gradient: "from-cyan-500 to-pink-600",
    subMenu: [
      {
        title: "Video Tutorial",
        link: "/quick-assist/video-tutorial",
        nestedMenu: [],
      },
      {
        title: "Help & Support",
        link: "/quick-assist/help-support",
        nestedMenu: [],
      },
      {
        title: "View access log",
        link: "/quick-assist/view-access-log",
        nestedMenu: [],
      },
    ],
  },
  {
    title: "Manage Staff",
    link: "#",
    icon: <IconUsersGroup size={20} />,
    gradient: "from-cyan-500 to-pink-600",
    subMenu: [
      {
        title: "Staff Member",
        link: "/manage-staff/staff-member",
        nestedMenu: [],
      },
      // {
      //   title: "Pharmacist",
      //   link: "/manage-staff/pharmacist",
      //   nestedMenu: [],
      // },
    ],
  },
  // {
  //   title: "Manage Prescription",
  //   link: "/manage-prescription/prescription",
  //   icon: <IconPrescription size={20} />,
  //   gradient: "from-cyan-500 to-blue-600",
  //   subMenu: [],
  // },
];

const Sidebar: React.FC<SidebarProps> = ({ handleCollapse, collapse }) => {
  const [openedSubmenu, setOpenedSubmenu] = useState<number | null>(null);
  const [__hoveredSubmenu, setHoveredSubmenu] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    menuData.forEach((item, index) => {
      if (item.subMenu.length > 0) {
        const hasActiveSubmenu = item.subMenu.some(subItem => {
          if (location.pathname === subItem.link) {
            return true;
          }
          return location.pathname.startsWith(subItem.link + "/");
        });
        if (hasActiveSubmenu) {
          setOpenedSubmenu(index);
        }
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    if (openedSubmenu !== null) {
      setHoveredSubmenu(null);
    }
  }, [openedSubmenu]);

  const handleMenuClick = (index: number, hasSubMenu: boolean, link: string) => {
    if (hasSubMenu) {
      setOpenedSubmenu(openedSubmenu === index ? null : index);
    } else {
      setOpenedSubmenu(null);
      if (link !== "#") {
        if (window.innerWidth < 1080) {
          handleCollapse();
        }
      }
    }
  };

  const isMenuActive = (item: MenuItem) => {
    if (item.link !== "#" && location.pathname === item.link) {
      return true;
    }
    if (item.link !== "#" && location.pathname.startsWith(item.link) && item.link !== "/") {
      return true;
    }
    return item.subMenu.some(subItem => {
      if (location.pathname === subItem.link) {
        return true;
      }
      return location.pathname.startsWith(subItem.link + "/");
    });
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasSubMenu = item.subMenu.length > 0;
    const isActive = isMenuActive(item);
    const isSubmenuOpen = openedSubmenu === index;

    if (collapse && hasSubMenu) {
      return (
        <Box key={index}>
          <Tooltip
            label={item.title}
            position="right"
            withArrow
            classNames={{
              tooltip: "bg-gray-900 text-white shadow-lg",
            }}
          >
            <UnstyledButton
              className={`w-full p-2 rounded-md transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${isActive || isSubmenuOpen
                ? "bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 shadow-md"
                : "hover:bg-cyan-50 dark:hover:bg-cyan-800/50"
                }`}
              onClick={() => handleMenuClick(index, hasSubMenu, item.link)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <div
                className={`transition-all duration-300 ${isActive || isSubmenuOpen
                  ? "text-cyan-600 dark:text-cyan-400 scale-110"
                  : "text-gray-600 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:scale-105"
                  }`}
              >
                {item.icon}
              </div>
            </UnstyledButton>
          </Tooltip>

          {/* Submenu inside sidebar */}
          <Collapse in={isSubmenuOpen}>
            <Box className="mt-1 space-y-1">
              {item.subMenu.map((subItem, subIndex) => (
                <Tooltip
                  key={subIndex}
                  label={subItem.title}
                  position="right"
                  withArrow
                  classNames={{
                    tooltip: "bg-gray-900 text-white shadow-lg",
                  }}
                >
                  <NavLink
                    to={subItem.link}
                    className={() => {
                      const isActive = location.pathname === subItem.link || location.pathname.startsWith(subItem.link + "/");
                      return `flex items-center justify-center p-2 rounded-lg text-xs transition-all duration-300 ${isActive
                        ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                        }`;
                    }}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        handleCollapse();
                      }
                    }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${location.pathname === subItem.link || location.pathname.startsWith(subItem.link + "/")
                        ? "bg-cyan-600 dark:bg-cyan-400"
                        : "bg-gray-300 dark:bg-gray-600"
                        }`}
                    />
                  </NavLink>
                </Tooltip>
              ))}
            </Box>
          </Collapse>
        </Box>
      );
    }

    if (collapse && !hasSubMenu) {
      const ButtonContent = () => (
        <div
          className={`w-full p-2 rounded-md transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${isActive
            ? "bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 shadow-md"
            : "hover:bg-cyan-50 dark:hover:bg-cyan-800/50"
            }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
          <div
            className={`transition-all duration-300 ${isActive
              ? "text-cyan-600 dark:text-cyan-400 scale-110"
              : "text-gray-600 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:scale-105"
              }`}
          >
            {item.icon}
          </div>
        </div>
      );

      return (
        <Tooltip
          key={index}
          label={item.title}
          position="right"
          withArrow
          classNames={{
            tooltip: "bg-gray-900 text-white shadow-lg",
          }}
        >
          {item.link !== "#" ? (
            <NavLink
              to={item.link}
              onClick={() => handleMenuClick(index, hasSubMenu, item.link)}
            >
              <ButtonContent />
            </NavLink>
          ) : (
            <UnstyledButton
              onClick={() => handleMenuClick(index, hasSubMenu, item.link)}
            >
              <ButtonContent />
            </UnstyledButton>
          )}
        </Tooltip>
      );
    }

    return (
      <Box key={index}>
        {item.link !== "#" ? (
          <NavLink
            to={item.link}
            className={`w-full p-2 rounded-md transition-all duration-300 group relative overflow-hidden block ${isActive
              ? "bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 shadow-md"
              : "hover:bg-cyan-50 dark:hover:bg-cyan-800/50 hover:translate-x-1"
              }`}
            onClick={() => handleMenuClick(index, hasSubMenu, item.link)}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            <Group className="w-full">
              <div
                className={`transition-all duration-300 ${isActive
                  ? "text-cyan-600 dark:text-cyan-400 scale-110"
                  : "text-gray-600 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:scale-105"
                  }`}
              >
                {item.icon}
              </div>
              <Text
                className={`flex-1 font-medium transition-all duration-300 ${isActive
                  ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                  }`}
              >
                {item.title}
              </Text>
              {hasSubMenu && (
                <IconChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-90" : "group-hover:translate-x-1"
                    } ${isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                    }`}
                />
              )}
            </Group>
          </NavLink>
        ) : (
          <UnstyledButton
            className={`w-full p-2 rounded-md transition-all duration-300 group relative overflow-hidden ${isActive
              ? "bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 shadow-md"
              : "hover:bg-cyan-50 dark:hover:bg-cyan-800/50 hover:translate-x-1"
              }`}
            onClick={() => handleMenuClick(index, hasSubMenu, item.link)}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            <Group className="w-full">
              <div
                className={`transition-all duration-300 ${isActive
                  ? "text-cyan-600 dark:text-cyan-400 scale-110"
                  : "text-gray-600 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:scale-105"
                  }`}
              >
                {item.icon}
              </div>
              <Text
                className={`flex-1 font-medium transition-all duration-300 ${isActive
                  ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                  }`}
              >
                {item.title}
              </Text>
              {hasSubMenu && (
                <IconChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-90" : "group-hover:translate-x-1"
                    } ${isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                    }`}
                />
              )}
            </Group>
          </UnstyledButton>
        )}
        {hasSubMenu && (
          <Collapse in={isSubmenuOpen}>
            <Box className="space-y-1 p-3 mx-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30">
              {item.subMenu.map((subItem, subIndex) => (
                <NavLink
                  key={subIndex}
                  to={subItem.link}
                  className={() => {
                    const isActive = location.pathname === subItem.link || location.pathname.startsWith(subItem.link + "/");
                    return `flex items-center px-2 py-2 rounded-xl text-sm transition-all duration-300 group hover:translate-x-1 ${isActive
                      ? "text-cyan-600 dark:text-cyan-400 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                      }`;
                  }}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      handleCollapse();
                    }
                  }}
                >
                  {() => {
                    const isActive = location.pathname === subItem.link || location.pathname.startsWith(subItem.link + "/");
                    return (
                      <>
                        <div
                          className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${isActive
                            ? "bg-cyan-600 dark:bg-cyan-400 shadow-md"
                            : "bg-gray-300 dark:bg-gray-600 group-hover:bg-cyan-400 dark:group-hover:bg-cyan-500"
                            }`}
                        />
                        <span className="truncate">{subItem.title}</span>
                      </>
                    );
                  }}
                </NavLink>
              ))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box className={`h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${collapse ? "w-20" : "w-100"
      }`}>
      <Box className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className={`flex items-center w-full ${collapse ? "justify-between" : "gap-3"}`}>
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <Avatar
                src="/images/logo.png"
                alt="Logo"
                size={50}
              />
            </div>
          </div>
          {!collapse && (
            <Text className="flex-1 text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              SNAH
            </Text>
          )}
          <ActionIcon
            onClick={handleCollapse}
            variant="subtle"
            className={`transition-all duration-300 hover:scale-110 active:scale-95 ${collapse
              ? "bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 ms-3 rounded-s-none"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            size="lg"
          >
            {collapse ? (
              <IconChevronRight size={18} className={collapse ? "text-white" : "text-gray-600 dark:text-gray-300"} />
            ) : (
              <IconChevronLeft size={18} className={collapse ? "text-white" : "text-gray-600 dark:text-gray-300"} />
            )}
          </ActionIcon>
        </div>
      </Box>
      <ScrollArea className="flex-1 px-2 py-2">
        <Box className="">
          {menuData.map((item, index) => renderMenuItem(item, index))}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default React.memo(Sidebar);
