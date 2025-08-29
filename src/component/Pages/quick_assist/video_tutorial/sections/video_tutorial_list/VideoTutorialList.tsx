import React, { useRef } from "react";
import { ActionIcon, Card, Group, Table, Text, Tooltip, AspectRatio } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../redux/store";
import { setPagination } from "../../../../../../redux/slices/pagePaginationSlice";
import { PageTableWrapper } from "../../../../../common/PageTableWrapper";
import { PageModal } from "../../../../../common/PageModal";
import { PageNoDataFound } from "../../../../../common/PageNoDataFound";
import PageLoader from "../../../../../common/page_loader/PageLoader";


const getThumbnailFromVideoUrl = (videoUrl: string): string => {
  try {
    const fileIdMatch = videoUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h300`;
    }
    return 'https://via.placeholder.com/400x300/f0f0f0/888888?text=Video+Thumbnail';
  } catch (error) {
    console.error('Error extracting thumbnail from video URL:', error);
    return 'https://via.placeholder.com/400x300/f0f0f0/888888?text=Video+Thumbnail';
  }
};

const VideoTutorialList = (props: { dataPass: any }) => {
  const { videoTutorialList } = props.dataPass;

  const dispatch = useDispatch();
  const topBarAndFilter = useSelector(
    (state: RootState) => state.pageTopBarAndFilter
  );

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prevViewMode, setPrevViewMode] = useState<string>("");
  const [prevCurrentPage, setPrevCurrentPage] = useState<number>(1);
  const [prevFilter, setPrevFilter] = useState<any>(null);

  const pagination = useSelector((state: RootState) => state.pagePagination);
  const startIndex = pagination.startIndex - 1;
  const endIndex = Math.min(pagination.endIndex, videoTutorialList.length);
  const currentData = videoTutorialList.slice(startIndex, endIndex);

  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const modalApiRef = useRef<{ open: () => void } | null>(null);

  const isLoading = false;
  const error = null;
  const isEmpty = videoTutorialList.length === 0;

  const handleRetry = () => {
    console.log('Retrying data fetch...');
  };

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video);
    setTimeout(() => modalApiRef.current?.open?.(), 10);
  };

  useEffect(() => {
    const currentViewMode = topBarAndFilter.viewMode;
    const currentPage = pagination.currentPage;
    const currentFilter = topBarAndFilter.filter;

    if (prevViewMode) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (prevCurrentPage) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (prevFilter && JSON.stringify(prevFilter) !== JSON.stringify(currentFilter)) {
      setIsContentLoading(true);
      const timer = setTimeout(() => {
        setIsContentLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    setPrevViewMode(currentViewMode);
    setPrevCurrentPage(currentPage);
    setPrevFilter(currentFilter);
  }, [topBarAndFilter.viewMode, pagination.currentPage, topBarAndFilter.filter, prevViewMode, prevCurrentPage, prevFilter]);

  useEffect(() => {
    if (videoTutorialList && videoTutorialList.length > 0) {
      dispatch(
        setPagination({
          totalItems: videoTutorialList.length,
          itemsPerPage: 12,
          currentPage: pagination.currentPage || 1,
        })
      );
    }
  }, [videoTutorialList, dispatch]);

  return (
    <>
      {
        selectedVideo && (
          <PageModal
            onOpenReady={(api) => {
              modalApiRef.current = api;
            }}
            dataPass={{
              title: selectedVideo.title,
              modalConfig: {
                size: "xl",
                radius: "md",
                padding: "xl",
                className: "overflow-y-auto",
                centered: true,
              },
              component: (
                selectedVideo && (
                  <div className="space-y-4">
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        src={selectedVideo.url.replace('/view?usp=sharing', '/preview')}
                        title={selectedVideo.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </AspectRatio>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Text size="sm" c="dimmed" className="leading-relaxed font-bold">
                        {selectedVideo.content}
                      </Text>
                    </div>
                  </div>
                )
              )
            }} />
        )}
      <Card.Section className="p-4">
        {
          currentData.length > 0 ? (
            <div className="relative">
              {isContentLoading && (
                <div className="absolute inset-0 z-10 backdrop-blur-sm">
                  <PageLoader
                    type="wave"
                    text="Updating content..."
                    className="h-full"
                  />
                </div>
              )}
              <div className={`transition-all duration-300 ${isContentLoading ? 'opacity-50' : 'opacity-100'}`}>
                {
                  topBarAndFilter.viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {
                        currentData.map((video: any, key: number) => {
                          return (
                            <Card
                              key={key}
                              withBorder
                              shadow="md"
                              radius="lg"
                              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 mt-4 overflow-hidden"
                            >
                              <Card.Section className="text-center p-4 pb-4 rounded-tl-[15px] rounded-tr-[15px] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-40">
                                <div className="relative overflow-hidden rounded-t-xl">
                                  <img
                                    src={video.thumbNail || getThumbnailFromVideoUrl(video.url)}
                                    alt={video.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = getThumbnailFromVideoUrl(video.url);
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black sm:bg-opacity-40 sm:opacity-30 bg-opacity-80 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <ActionIcon
                                      size="xl"
                                      radius="xl"
                                      variant="filled"
                                      color="blue"
                                      className="transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg"
                                      onClick={() => handleVideoPlay(video)}
                                    >
                                      <IconPlayerPlay size={24} className="text-white" />
                                    </ActionIcon>
                                  </div>
                                  {/* <Badge
                          variant="filled"
                          color="dark"
                          className="absolute bottom-2 right-2 opacity-80"
                          size="sm"
                        >
                          5:30
                        </Badge> */}
                                </div>
                              </Card.Section>
                              <Card.Section className="p-4 space-y-3 bg-white-100 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-50">
                                <Tooltip label={video.title}>
                                  <Text
                                    fw={600}
                                    size="md"
                                    className="line-clamp-1 text-gray-800 dark:text-white mb-2 text-center"
                                    title={video.title}
                                  >
                                    {video.title}
                                  </Text>
                                </Tooltip>

                                <Text
                                  size="sm"
                                  c="dimmed"
                                  className="line-clamp-3 leading-relaxed mt-5 text-justify"
                                  title={video.content}
                                >
                                  {video.content}
                                </Text>
                              </Card.Section>
                            </Card>
                          );
                        })
                      }
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <PageTableWrapper
                        isLoading={isLoading}
                        error={error}
                        isEmpty={isEmpty}
                        emptyMessage="No video tutorials found"
                        loadingMessage="Loading video tutorials..."
                        onRetry={handleRetry}
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th className="text-center p-4">Sr No</Table.Th>
                            <Table.Th className="text-center min-w-40 p-4">Thumbnail</Table.Th>
                            <Table.Th className="text-center min-w-60 p-4">Title</Table.Th>
                            <Table.Th className="text-center min-w-80 p-4">Description</Table.Th>
                            <Table.Th className="text-center min-w-40 p-4">Action</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {
                            currentData.map((video: any, key: number) => {
                              return (
                                <Table.Tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <Table.Td className="text-center p-4">
                                    {video.id}
                                  </Table.Td>
                                  <Table.Td className="text-center p-4">
                                    <div className="relative group cursor-pointer w-20 h-14 mx-auto">
                                      <img
                                        src={video.thumbNail || getThumbnailFromVideoUrl(video.url)}
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-md"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = getThumbnailFromVideoUrl(video.url);
                                        }}
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
                                        <IconPlayerPlay size={16} className="text-white" />
                                      </div>
                                    </div>
                                  </Table.Td>
                                  <Table.Td className="text-center p-4">
                                    <Text size="sm" fw={500}>{video.title}</Text>
                                  </Table.Td>
                                  <Table.Td className="text-center p-4 max-w-xs">
                                    <Text size="xs" c="dimmed" className="line-clamp-2">
                                      {video.content}
                                    </Text>
                                  </Table.Td>
                                  <Table.Td className="text-center p-4">
                                    <Group justify="center" gap="xs">
                                      <Tooltip label="Watch Video">
                                        <ActionIcon
                                          variant="light"
                                          color="blue"
                                          size="md"
                                          onClick={() => handleVideoPlay(video)}
                                        >
                                          <IconPlayerPlay size={16} />
                                        </ActionIcon>
                                      </Tooltip>
                                    </Group>
                                  </Table.Td>
                                </Table.Tr>
                              );
                            })
                          }
                        </Table.Tbody>
                      </PageTableWrapper>
                    </div>
                  )}
              </div>
            </div>
          ) : <PageNoDataFound dataPass={{
            title: "No Videos Found",
            description: "There are currently no videos to display. This could be because:",
            reasons: [
              "• No videos have been created yet",
              "• All videos may have been archived",
              "• There might be a connectivity issue"
            ]
          }} />
        }
      </Card.Section>
    </>
  );
};
export default React.memo(VideoTutorialList);