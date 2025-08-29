import React from "react";
import { IconSquareRoundedX } from "@tabler/icons-react";

interface UserTab {
  id: number;
  title: string;
  TabComponent: React.ComponentType<any>;
  icon: React.ElementType;
}

interface UsersTabsInterface {
  userTabsData: UserTab[];
  tabActive: number | null;
  sidebarActive: boolean;
  handleCloseSidebar: () => void;
  sideBarName: string;
  editMode: boolean;
  profileCompleteStatus: boolean;
}

const ProfileSidebar: React.FC<UsersTabsInterface> = ({
  userTabsData,
  tabActive,
  sidebarActive,
  sideBarName,
  profileCompleteStatus,
  editMode,
  handleCloseSidebar,
}) => {
  const { TabComponent } = !tabActive
    ? userTabsData[0]
    : userTabsData[tabActive];

  const handleWidth = (title: string) => {
    if (title == "Wallet") return "55%";
  };

  return (
    <div className={`fixed top-0 w-[420px] min-w-[420px] h-screen border-l border-l-[rgba(82,82,108,0.2)] z-8 right-[-100vw] transition-all duration-300 ease-linear bg-[var(--course-bg)] shadow-[0_4px_40px_rgba(39,32,120,0.1)] rounded-tl-[10px] rounded-bl-[10px] ${sidebarActive ? "right-0" : ""}`} style={{ minWidth: handleWidth(sideBarName), zIndex: "8" }} >
      <div className="flex items-center px-[15px] py-[10px] rounded-tl-[10px] justify-between bg-[var(--theme-default)]">
        <h3 className="text-white font-bold">{sideBarName}</h3>
        <div className="w-[30px] h-[30px] text-[var(--white)] flex items-center justify-center rounded-[12px] cursor-pointer" onClick={handleCloseSidebar} >
          <IconSquareRoundedX />
        </div>
      </div>
      <div className="py-[10px] px-[15px]">
        <TabComponent editMode={editMode} profileCompleteStatus={profileCompleteStatus} />
      </div>
    </div>
  );
};

export default ProfileSidebar;
