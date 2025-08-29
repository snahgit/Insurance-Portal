import { IconSearch, IconBrightnessDown, IconBell, IconChevronDown, IconUser, IconLogout, IconLock, IconMoonStars, IconMenu4 } from "@tabler/icons-react";
import { Avatar, Menu, useMantineColorScheme } from "@mantine/core";
import Flag from "react-world-flags";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { setLanguage } from "../../redux/slices/languageSlice";
import { toggleColorScheme } from "../../redux/slices/themeSlice";
import type { RootState } from "../../redux/store";
import { CloseButton, TextInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/UserAuthenticationSlices";
import { useNavigatetoRoutes } from "../../custom_hooks/useNavigateToRoutes";
import NotificationPanel from "./NotificationPanel";

type LanguageCode = "us" | "ar";
export interface FlagProps {
  id: number;
  title: string;
  code: LanguageCode;
}

const countryFlagData: FlagProps[] = [
  {
    id: 1,
    title: "English (US)",
    code: "us",
  },
  {
    id: 7,
    title: "لعربية ",
    code: "ar",
  },
];

interface SidebarProps {
  handleCollapse: () => void;
  collapse: boolean;
}

const Header: React.FC<SidebarProps> = ({ handleCollapse }) => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [searchvisible, setSearchVisible] = useState<boolean>(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state?.authentication?.data?.user);
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const { setColorScheme: setMantineColorScheme } = useMantineColorScheme();
  const naviagateRoutes = useNavigatetoRoutes();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigate = (url: string) => {
    naviagateRoutes(url);
  };

  const toggleLanguageMenu = () => {
    setShowLanguage((prev) => !prev);
  };

  const language = useSelector((state: RootState) => state.language.language);

  const handleSelectLanguage = (data: FlagProps) => {
    dispatch(setLanguage(data));
    setShowLanguage(false);
  };

  const handleSearch = () => {
    setSearchVisible(!searchvisible);
  };

  const handleNotificationToggle = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
  };

  const handleToggleTheme = () => {
    dispatch(toggleColorScheme());
  };

  useEffect(() => {
    const updateTheme = () => {
      const htmlElement = document.documentElement;
      if (colorScheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      setMantineColorScheme(colorScheme);
    };

    // Use requestAnimationFrame to avoid blocking the main thread
    requestAnimationFrame(updateTheme);
  }, [colorScheme, setMantineColorScheme]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const savedColorScheme = localStorage.getItem('mantine-color-scheme');

    if (savedColorScheme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguage(false);
      }
    };

    if (showLanguage) {
      document.addEventListener("mousedown", handleClickOutside, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguage]);

  return (
    <div className="flex items-center justify-end min-w-full py-3">
      {searchvisible && (
        <div className="flex-1 animate-in fade-in duration-300">
          <div className="relative">
            <TextInput
              placeholder="Search anything..."
              leftSection={<IconSearch size={16} className="text-slate-400" />}
              rightSection={
                <CloseButton
                  size="sm"
                  onClick={() => setSearchVisible(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                />
              }
              className="w-full"
              classNames={{
                input:
                  "border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-500/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-300",
              }}
              autoFocus
            />
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between w-full px-4">
        <div className="flex">
          <button
            onClick={handleCollapse}
            className="lg:hidden group relative p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <IconMenu4 className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={toggleLanguageMenu}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <Flag
                code={language.code}
                style={{ width: "20px", height: "15px" }}
                className="rounded-sm shadow-sm"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300 hidden sm:block">
                {language.title}
              </span>
              <IconChevronDown
                size={14}
                className={`text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-all duration-300 ${showLanguage ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showLanguage && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-500/20 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {countryFlagData.map((data) => (
                    <button
                      key={data.id}
                      onClick={() => handleSelectLanguage(data)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${language.code === data.code
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                        }`}
                    >
                      <Flag
                        code={data.code}
                        style={{ width: "20px", height: "15px" }}
                        className="rounded-sm shadow-sm"
                      />
                      <span className="truncate">{data.title}</span>
                      {language.code === data.code && (
                        <div className="ml-auto w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className={`group relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${searchvisible
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <IconSearch
              className={`w-5 h-5 transition-colors duration-300 ${searchvisible
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                }`}
            />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="group relative p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            {colorScheme === "light" ? (
              <IconMoonStars className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300" />
            ) : (
              <IconBrightnessDown className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={handleNotificationToggle}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${notificationPanelOpen
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <IconBell className={`w-5 h-5 transition-colors duration-300 ${notificationPanelOpen
                ? "text-purple-600 dark:text-purple-400"
                : "text-slate-600 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                }`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/30"></div>
            </button>

            <NotificationPanel
              isOpen={notificationPanelOpen}
              onClose={() => setNotificationPanelOpen(false)}
            />
          </div>

          <Menu shadow="xl" radius="xl" position="bottom-end" offset={8}>
            <Menu.Target>
              <button className="group relative flex items-center gap-3 px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <Avatar
                  radius="lg"
                  src='https://i.pravatar.cc/150?img=18'
                  alt="Profile"
                  size="sm"
                  className="ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600 transition-all duration-300"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300 truncate max-w-24">
                    {userData?.name || "User"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    Admin
                  </p>
                </div>
                <IconChevronDown
                  size={16}
                  className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300"
                />
              </button>
            </Menu.Target>

            <Menu.Dropdown className="border-0 shadow-2xl shadow-slate-500/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-2">
              <Menu.Item
                leftSection={<IconUser size={16} className="text-indigo-500" />}
                onClick={() => handleNavigate("/profile")}
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                My Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLock size={16} className="text-emerald-500" />}
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                Change Password
              </Menu.Item>

              <Menu.Divider className="my-2 border-slate-200 dark:border-slate-700" />

              <Menu.Item
                color="red"
                leftSection={<IconLogout size={16} className="text-red-500" />}
                onClick={handleLogout}
                className="rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
