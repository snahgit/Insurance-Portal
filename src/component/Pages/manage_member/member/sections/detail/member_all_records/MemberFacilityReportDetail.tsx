import { ActionIcon, Card, Grid, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconDownload, IconImageInPicture, IconPrescription, IconPrinter, IconSend } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { PageModal } from "../../../../../../common/PageModal";
import { useSecurityCheck } from "../../../../../../../context/SecurityCheckContext";
import { MemberSendReportForm } from "../../form/MemberSendReportForm";

const sampleImages = [
  {
    id: 1,
    src: "/public/images/atm.jpg",
    alt: "Medical Report 1",
    title: "X-Ray Report",
  },
  {
    id: 2,
    src: "/public/images/insurance.jpg",
    alt: "Medical Report 2",
    title: "Blood Test",
  },
  {
    id: 3,
    src: "/public/images/cardBg.jpg",
    alt: "Medical Report 3",
    title: "MRI Scan",
  },
  {
    id: 4,
    src: "/public/images/accountBg.jpg",
    alt: "Medical Report 4",
    title: "CT Scan",
  },
  {
    id: 5,
    src: "/public/images/viewprofile.jpg",
    alt: "Medical Report 5",
    title: "Ultrasound",
  },
  {
    id: 6,
    src: "/public/images/loginbg.jpg",
    alt: "Medical Report 6",
    title: "ECG Report",
  },
]

export const MemberFacilityReportDetail = () => {
  const [targetFile, setTargetFile] = useState('')
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const modalApiRef = useRef<{ open: () => void } | null>(null)
  const { requireSecurityCheck } = useSecurityCheck()

  const handleDownload = (imageId: number, imageSrc: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `medical-report-${imageId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handlePrint = (imageSrc: string) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print Image</title></head>
          <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
            <img src="${imageSrc}" style="max-width:100%; max-height:100%; object-fit:contain;" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };
  function handleView(__id: number, src: string) {
    window.open(src, "_blank", "noopener,noreferrer")
  }
  const handleModal = (data: any) => {
    const originalAddAction = () => {
      setTargetFile(data)
      setTimeout(() => modalApiRef.current?.open?.(), 0)
    }
    requireSecurityCheck(originalAddAction, "Add")
  };

  // const [currentImage, setCurrentImage] = useState(0);
  // const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const openImageViewer = useCallback((index: number) => {
  //   setCurrentImage(index);
  //   setIsViewerOpen(true);
  // }, []);
  // const closeImageViewer = () => {
  //   setCurrentImage(0);
  //   setIsViewerOpen(false);
  // };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "md",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
            zIndex: 1000,
          },
          component: <MemberSendReportForm dataPass={{ targetFile }} />,
          title: "Update your security PIN",
        }} />
      <Stack gap="xl" className="pb-6">
        <Grid>
          <Grid.Col span={{ base: 12 }}>
            <Paper
              shadow="sm"
              radius="lg"
              className="bg-blue-50 border border-gray-200 overflow-hidden h-full"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <Group gap="sm">
                  <IconPrescription size={24} className="text-white" />
                  <Text size="lg" className="text-white font-bold">
                    MEDICAL REPORTS & IMAGES
                  </Text>
                </Group>
              </div>
              <div className="w-full mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 px-6 pb-36">
                  {sampleImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
                      onMouseEnter={() => setHoveredImage(image.id)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <Card
                        shadow="sm"
                        radius="md"
                        withBorder
                        className="transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <Card.Section className="relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+";
                            }}
                          // onClick={() => openImageViewer(image.id)}
                          />
                          <div
                            className={`absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 transition-all duration-300 h-20 ${hoveredImage === image.id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-full"
                              }`}
                          >
                            <Group
                              gap="xs"
                              className="bg-white rounded-lg p-2 shadow-lg self-center"
                            >
                              <Tooltip label="View">
                                <ActionIcon
                                  variant="light"
                                  color="magenta"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleView(image.id, image.src);
                                  }}
                                  className="hover:bg-magenta-200 ease-in-out duration-300"
                                >
                                  <IconImageInPicture size={18} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Download">
                                <ActionIcon
                                  variant="light"
                                  color="blue"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(image.id, image.src);
                                  }}
                                  className="hover:bg-blue-200 ease-in-out duration-300"
                                >
                                  <IconDownload size={18} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Print">
                                <ActionIcon
                                  variant="light"
                                  color="green"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrint(image.src);
                                  }}
                                  className="hover:bg-green-200 ease-in-out duration-300"
                                >
                                  <IconPrinter size={18} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Send">
                                <ActionIcon
                                  variant="light"
                                  color="orange"
                                  size="sm"
                                  onClick={() => handleModal(image.src)}
                                  className="hover:bg-orange-200 ease-in-out duration-300"
                                >
                                  <IconSend size={18} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </div>
                        </Card.Section>
                        {/* <div className="p-3">
                        <Text fw={500} size="sm" className="text-gray-800 truncate">{image.title}</Text>
                        <Text size="xs" className="text-gray-500 mt-1">Medical Report #{image.id}</Text>
                      </div> */}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
      {/* {isViewerOpen && (
        <ImageViewer
          src={sampleImages.map(img => img.src)}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )} */}
    </div>
  );
};
