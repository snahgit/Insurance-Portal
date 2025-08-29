import { useRef, useState } from "react";
import { IconCloudLock, IconCertificate, IconClipboardData, IconUserCircle, IconWallet, IconLock, IconChevronRight, IconListDetails, IconEdit, IconReload } from "@tabler/icons-react";
import { Avatar, Badge, Box, Button, Card, Divider, Grid, Group, Paper, Text } from "@mantine/core";
import { Breadcrumb } from "../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../common/PageTopBarAndFilter";
import { PageDrawer } from "../../common/PageDrawer";
import { ProfileDetail } from "./detail/ProfileDetail";
import { ProfileForm } from "./form/ProfileForm";
import { ProfileWallet } from "./detail/ProfileWallet";
import { ProfilePinForm } from "./form/ProfilePinForm";
import { ProfileKycDocument } from "./detail/ProfileKycDocument";
import { ProfileCertification } from "./detail/ProfileCertification";
import { ProfileInsuranceCovered } from "./detail/ProfileInsuranceCovered";
import { ProfileAccountLinked } from "./detail/ProfileAccountLinked";

const userTabsData = [
  {
    id: 0,
    title: "KYC Documents",
    longTitle: "Manage your KYC documents",
    icon: IconCloudLock,
    tabSize: "lg",
  },
  {
    id: 1,
    title: "Certifications",
    longTitle: "Manage your certifications",
    icon: IconCertificate,
    tabSize: "lg",
  },
  {
    id: 2,
    title: "Insurance Covered",
    longTitle: "Manage your insurance covered",
    icon: IconClipboardData,
    tabSize: "lg",
  },
  {
    id: 3,
    title: "Account Details",
    longTitle: "Manage your account details",
    icon: IconUserCircle,
    tabSize: "lg",
  },
  {
    id: 4,
    title: "Wallet",
    longTitle: "View your wallet information",
    icon: IconWallet,
    tabSize: "xl",
  },
  {
    id: 5,
    title: "Security PIN",
    longTitle: "Manage your PIN",
    icon: IconLock,
    tabSize: "sm",
  },
];

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<{ tabSize: String; id: number; title: string; longTitle: string; icon?: React.ElementType; component: React.ElementType } | undefined>();
  const [isEditProfileActive, setIsEditProfileActive] = useState<boolean>(false);
  const [drawerData, setDrawerData] = useState<number | undefined>();
  const drawerApiRef = useRef<{ open: () => void } | null>(null);
  const profileData = {
    id: 1,
    avatar: "/images/viewprofile.jpg",
    snahId: "SNAH123456",
    name: "UC Davice",
    email: "john.doe@example.com",
    phone: "1234567890",
    telPhone: "1234567891",
    establishedDate: "2023-10-01",
    ein: "EIN123",
    npi: "NPI123",
    createdDate: "2023-10-01",
    registrationId: "REG123",
    userName: "johndoe",
    adminRepFullName: "Jane Doe",
    adminRepTitle: "Administrator",
    faxNumber: "1234567892",
    tax: "Tax123",
    termsAndConditionsApproved: true,
    taxonomy: ["Taxonomy1", "Taxonomy2"],
    naics: ["NAICS1", "NAICS2"],
    about: "LoremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    address: "123 Main St, 123 Main St, 123 Main St, 123 Main St, Anytown, USA",
    status: "Active",
  }
  const topBarAndFilter = {
    heading: "Profile details you can find below",
    viewMode: "grid",
    whatNeeded: {}
  };
  const handleDrawer = (tab: { id: number; title: string; tabSize: string; longTitle: string; icon: React.ElementType }) => {
    setDrawerData(profileData.id);
    setTimeout(() => drawerApiRef.current?.open?.(), 0);
    if (tab.id == 0) {
      setActiveTab({ ...tab, component: ProfileKycDocument });
    } else if (tab.id == 1) {
      setActiveTab({ ...tab, component: ProfileCertification });
    } else if (tab.id == 2) {
      setActiveTab({ ...tab, component: ProfileInsuranceCovered });
    } else if (tab.id == 3) {
      setActiveTab({ ...tab, component: ProfileAccountLinked });
    } else if (tab.id == 4) {
      setActiveTab({ ...tab, component: ProfileWallet });
    } else if (tab.id == 5) {
      setActiveTab({ ...tab, component: ProfilePinForm });
    } else {
      setActiveTab(undefined);
    }
  };

  return (
    <Box>
      <PageDrawer
        onOpenReady={(api) => {
          drawerApiRef.current = api;
        }}
        dataPass={{
          drawerConfig: {
            offset: 8,
            radius: "md",
            position: "right",
            size: activeTab?.tabSize || "md",
            padding: "xl",
            className: "overflow-y-auto",
          },
          component: activeTab?.component ? <activeTab.component dataPass={{ id: drawerData, isEditProfileActive }} /> : null,
          title: activeTab?.longTitle || "Profile Details",
        }}
      />
      <Box>
        <Breadcrumb dataPass={{
          pageTitle: "Profile Info",
          items: [
            { title: "Dashboard", href: "/" },
            { title: 'Profile Info', href: "#", isActive: true }
          ]
        }} />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Card.Section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-600 dark:to-gray-800 rounded-lg p-6">
              <Grid>
                <Grid.Col span={12}>
                  <Grid>
                    <Grid.Col span={{ base: 12, xs: 12, sm: isEditProfileActive ? 6 : 12, md: 4 }} className="flex justify-center">
                      <div className="flex flex-col items-center text-center self-center rounded-md">
                        <Avatar src={profileData.avatar}
                          size={120}
                          radius="md"
                          className="mb-4 shadow-lg mt-5"
                        />
                        <Text size="xl" fw={600} className="text-gray-800">
                          {profileData.name}
                        </Text>
                        <Badge color={profileData.status === 'Active' ? 'green' : 'red'}
                          variant="light"
                          size="sm"
                          className="mt-2"
                        >
                          {profileData.status}
                        </Badge>
                        <Group className="mt-4">
                          {!isEditProfileActive && (
                            <Button leftSection={<IconEdit size={14} />} variant="filled" color="blue" onClick={() => setIsEditProfileActive(true)}>Edit</Button>
                          )}
                          {isEditProfileActive && (
                            <Button leftSection={<IconReload size={14} />} variant="filled" color="blue" onClick={() => setIsEditProfileActive(false)}>Back</Button>
                          )}
                        </Group>
                      </div>
                    </Grid.Col>
                    {isEditProfileActive && (
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 8 }}>
                        <ProfileForm dataPass={{ profileData, type: 'pic' }} />
                      </Grid.Col>
                    )}
                    {!isEditProfileActive && (
                      <Grid.Col span={{ base: 12, xs: 12, sm: isEditProfileActive ? 6 : 12, md: 8 }}>
                        <ProfileDetail dataPass={{ profileData, type: 'basic' }} />
                      </Grid.Col>
                    )}
                  </Grid>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Divider my="md" size="xs" variant="dashed" color="blue" label="Below you find more info" labelPosition="center" className="w-full" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 3 }}>
                      <Paper className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-fit">
                        <Text fw={600} size="lg" className="mb-4 text-gray-800 dark:text-gray-200">Other Sections</Text>
                        <div className="space-y-2">
                          {userTabsData.filter(tab =>
                            (tab.id !== 5 || isEditProfileActive) &&
                            (tab.id !== 4 || !isEditProfileActive)
                          ).map((tab, index) => (
                            <div key={index}
                              onClick={() => handleDrawer(tab)}
                              className={`
                                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                                  ${activeTab?.id === tab.id
                                  ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                }
                                `}
                            >
                              <div className={`
                                  p-2 rounded-md 
                                  ${activeTab?.id === tab.id
                                  ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400'
                                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                                }
                                `}>
                                <tab.icon size={18} />
                              </div>
                              <div className="flex-1">
                                <Text fw={500} size="sm" className={`
                                    ${activeTab?.id === tab.id
                                    ? 'text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300'
                                  }
                                  `}>
                                  {tab.title}
                                </Text>
                              </div>
                              <IconChevronRight
                                size={16}
                                className={`
                                    transition-transform duration-200
                                    ${activeTab?.id === tab.id
                                    ? 'text-blue-500 dark:text-blue-400 rotate-90'
                                    : 'text-gray-400 dark:text-gray-500'
                                  }
                                  `}
                              />
                            </div>
                          ))}
                        </div>
                      </Paper>
                    </Grid.Col>
                    {!isEditProfileActive && (
                      <Grid.Col span={{ base: 12, md: 9 }}>
                        <ProfileDetail dataPass={{ profileData, type: 'more' }} />
                      </Grid.Col>
                    )}
                    {isEditProfileActive && (
                      <Grid.Col span={{ base: 12, md: 9 }}>
                        <Paper className="bg-gradient-to-r from-purple-50 to-purple-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                          <Group gap="xs" className="items-start mb-6">
                            <IconListDetails size={16} className="text-purple-700 dark:text-purple-400 mt-1" />
                            <Text fw={600} className="text-purple-800 dark:text-purple-300">Update your profile information</Text>
                          </Group>
                          <ProfileForm dataPass={{ profileData, type: 'basic' }} />
                        </Paper>
                      </Grid.Col>
                    )}
                  </Grid>
                </Grid.Col>
              </Grid>
            </div>
          </Card.Section>
        </Card>
      </Box>
    </Box>
  );
};