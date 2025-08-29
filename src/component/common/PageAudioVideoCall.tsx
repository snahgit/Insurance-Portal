import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Card, Text, Avatar, Group, Tooltip, ActionIcon, Transition } from '@mantine/core';
import { IconVideo, IconVideoOff, IconMicrophone, IconMicrophoneOff, IconPhoneOff, IconMaximize, IconMinimize, IconGripVertical, IconCancel } from '@tabler/icons-react';
import { useGlobalAudioVideoCall } from '../../context/AudioVideoCallContext';

export const PageAudioVideoCall: React.FC = () => {
    const { isCallOpen, callType, physicianName, physicianAvatar, endCall } = useGlobalAudioVideoCall();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDialing, setIsDialing] = useState(true);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 400, y: window.innerHeight - 500 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const widgetRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let interval: any;
        if (isCallOpen && callType) {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCallOpen, callType]);
    useEffect(() => {
        if (!isCallOpen) {
            setCallDuration(0);
            setIsVideoMuted(false);
            setIsAudioMuted(false);
            setIsFullscreen(false);
            setIsDialing(true);
        } else {
            // Start dialing animation for 10 seconds
            setIsDialing(true);
            const dialingTimer = setTimeout(() => {
                setIsDialing(false);
            }, 10000);
            return () => clearTimeout(dialingTimer);
        }
    }, [isCallOpen]);
    useEffect(() => {
        const handleResize = () => {
            if (widgetRef.current) {
                const rect = widgetRef.current.getBoundingClientRect();
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;

                setPosition(prev => ({
                    x: Math.min(Math.max(0, prev.x), maxX),
                    y: Math.min(Math.max(0, prev.y), maxY)
                }));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as Element).closest('.drag-handle')) {
            setIsDragging(true);
            const rect = widgetRef.current?.getBoundingClientRect();
            if (rect) {
                setDragOffset({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        }
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && widgetRef.current) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                const rect = widgetRef.current.getBoundingClientRect();
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;
                setPosition({
                    x: Math.min(Math.max(0, newX), maxX),
                    y: Math.min(Math.max(0, newY), maxY)
                });
            }
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const handleEndCall = () => {
        endCall();
    };
    if (!isCallOpen || !callType) return null;

    if (isFullscreen) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black">
                <Transition
                    mounted={isCallOpen}
                    transition="fade"
                    duration={300}
                >
                    {(styles) => (
                        <div style={styles} className="h-full w-full relative">
                            {/* Header controls */}
                            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full bg-green-400 ${isDialing ? 'animate-pulse' : ''}`} />
                                        <Text size="lg" fw={600}>
                                            {callType === 'video' ? 'Video Call' : 'Audio Call'}
                                        </Text>
                                        <Text size="md" className="opacity-75">
                                            {formatTime(callDuration)}
                                        </Text>
                                    </div>
                                </div>
                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    color="white"
                                    onClick={() => setIsFullscreen(false)}
                                >
                                    <IconMinimize size={20} />
                                </ActionIcon>
                            </div>
                            <div className="h-full w-full flex items-center justify-center relative">
                                {isDialing ? (
                                    <div className="text-center text-white">
                                        <div className="relative mb-20">
                                            <Avatar
                                                size={120}
                                                src={physicianAvatar}
                                                alt={physicianName}
                                                className="border-4 border-white/30 shadow-2xl animate-pulse"
                                            >
                                                {physicianName.split(' ').map(n => n[0]).join('')}
                                            </Avatar>
                                            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping"></div>
                                        </div>
                                        <Text size="xl" fw={600} className="mb-2">
                                            Calling {physicianName}...
                                        </Text>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <Fragment>
                                        {callType === 'video' && !isVideoMuted ? (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center relative">
                                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                                <div className="relative z-10 text-center text-white">
                                                    <Avatar
                                                        size={150}
                                                        src={physicianAvatar}
                                                        alt={physicianName}
                                                        className="mx-auto mb-4 opacity-90"
                                                    >
                                                        {physicianName.split(' ').map(n => n[0]).join('')}
                                                    </Avatar>
                                                    <Text size="xl" fw={600} className="mb-2">{physicianName}</Text>
                                                    <Text size="lg" className="opacity-75">Video Active</Text>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center text-white">
                                                <Avatar
                                                    size={150}
                                                    src={physicianAvatar}
                                                    alt={physicianName}
                                                    className="mx-auto mb-4 border-4 border-white/30 shadow-2xl"
                                                >
                                                    {physicianName.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Text size="xl" fw={600} className="mb-2">{physicianName}</Text>
                                                <Text size="lg" className="opacity-75">
                                                    {callType === 'video' ? 'Video call connected' : 'Audio call connected'}
                                                </Text>
                                            </div>
                                        )}
                                        {callType === 'video' && !isVideoMuted && (
                                            <div className="absolute bottom-20 right-6 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/30 shadow-xl overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                                                    <Text size="sm" className="text-white opacity-75">Your Video</Text>
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <Group justify="center" gap="xl">
                                    <Tooltip label={isAudioMuted ? "Unmute" : "Mute"}>
                                        <ActionIcon
                                            size="xl"
                                            radius="xl"
                                            variant="filled"
                                            color={isAudioMuted ? "red" : "gray"}
                                            onClick={() => setIsAudioMuted(!isAudioMuted)}
                                            className="hover:scale-110 transition-transform"
                                            disabled={isDialing}
                                        >
                                            {isAudioMuted ?
                                                <IconMicrophoneOff size={24} /> :
                                                <IconMicrophone size={24} />
                                            }
                                        </ActionIcon>
                                    </Tooltip>
                                    {callType === 'video' && (
                                        <Tooltip label={isVideoMuted ? "Turn on camera" : "Turn off camera"}>
                                            <ActionIcon
                                                size="xl"
                                                radius="xl"
                                                variant="filled"
                                                color={isVideoMuted ? "red" : "gray"}
                                                onClick={() => setIsVideoMuted(!isVideoMuted)}
                                                className="hover:scale-110 transition-transform"
                                                disabled={isDialing}
                                            >
                                                {isVideoMuted ?
                                                    <IconVideoOff size={24} /> :
                                                    <IconVideo size={24} />
                                                }
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                    <Tooltip label="End Call">
                                        <ActionIcon
                                            size="xl"
                                            radius="xl"
                                            variant="filled"
                                            color="red"
                                            onClick={handleEndCall}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            <IconPhoneOff size={24} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        );
    }

    return (
        <div ref={widgetRef}
            className="fixed z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'default'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Transition
                mounted={isCallOpen}
                transition="scale"
                duration={300}
                timingFunction="ease"
            >
                {(styles) => (
                    <Card
                        style={styles}
                        shadow="xl"
                        radius="lg"
                        className={`
                            bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-300 shadow-2xl
                            w-96 h-[28rem]
                            ${isHovered ? 'scale-105' : ''}
                            ${isDragging ? 'shadow-3xl scale-105' : ''}
                        `}
                        onMouseDown={handleMouseDown}
                    >
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white cursor-grab active:cursor-grabbing drag-handle">
                            <div className="flex items-center gap-2">
                                <IconGripVertical size={16} className="text-blue-200 dark:text-blue-300 drag-handle" />
                                <div className={`w-2 h-2 rounded-full bg-green-400 animate-pulse`} />
                                <Text size="sm" fw={500}>
                                    {callType === 'video' ? 'Video Call' : 'Audio Call'}
                                </Text>
                                <Text size="xs" className="opacity-75">
                                    {formatTime(callDuration)}
                                </Text>
                            </div>
                            <div className="flex items-center gap-1">
                                <ActionIcon
                                    size="sm"
                                    variant="subtle"
                                    color="white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFullscreen(true);
                                    }}
                                >
                                    <IconMaximize size={14} />
                                </ActionIcon>
                                <ActionIcon
                                    size="sm"
                                    variant="subtle"
                                    color="white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEndCall();
                                    }}
                                >
                                    <IconCancel size={14} />
                                </ActionIcon>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col" style={{ pointerEvents: 'auto' }}>
                            {isDialing ? (
                                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                    <div className="relative mb-20">
                                        <Avatar
                                            size={100}
                                            src={physicianAvatar}
                                            alt={physicianName}
                                            className="border-4 border-blue-200 dark:border-blue-400 shadow-lg animate-pulse"
                                        >
                                            {physicianName.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                        <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping"></div>
                                    </div>
                                    <div className="text-center mt-6 space-y-2">
                                        <Text fw={600} size="lg" className="text-gray-800 dark:text-gray-200">
                                            Calling {physicianName}...
                                        </Text>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                        <div className="relative">
                                            {callType === 'video' && !isVideoMuted ? (
                                                <div className="w-40 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                                    <div className="relative z-10 text-center">
                                                        <Avatar
                                                            size={60}
                                                            src={physicianAvatar}
                                                            alt={physicianName}
                                                            className="mx-auto mb-2 opacity-75"
                                                        >
                                                            {physicianName.split(' ').map(n => n[0]).join('')}
                                                        </Avatar>
                                                        <Text size="xs" className="text-white opacity-75">Video Active</Text>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <Avatar
                                                        size={100}
                                                        src={physicianAvatar}
                                                        alt={physicianName}
                                                        className="border-4 border-blue-200 dark:border-blue-400 shadow-lg"
                                                    >
                                                        {physicianName.split(' ').map(n => n[0]).join('')}
                                                    </Avatar>
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute -bottom-2 -right-2 flex gap-1">
                                                {isAudioMuted && (
                                                    <div className="bg-red-500 p-1 rounded-full">
                                                        <IconMicrophoneOff size={12} className="text-white" />
                                                    </div>
                                                )}
                                                {callType === 'video' && isVideoMuted && (
                                                    <div className="bg-red-500 p-1 rounded-full">
                                                        <IconVideoOff size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center space-y-2">
                                            <Text fw={600} size="lg" className="text-gray-800 dark:text-gray-200">
                                                {physicianName}
                                            </Text>
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                <Text size="sm" className="text-gray-600 dark:text-gray-400">
                                                    {callType === 'video' ? 'Video call connected' : 'Audio call connected'}
                                                </Text>
                                            </div>
                                            <Text size="xs" className="text-gray-500 dark:text-gray-500">
                                                Connection quality: Excellent
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Group justify="center" gap="md">
                                            <Tooltip label={isAudioMuted ? "Unmute" : "Mute"}>
                                                <ActionIcon
                                                    size="lg"
                                                    radius="xl"
                                                    variant="filled"
                                                    color={isAudioMuted ? "red" : "blue"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsAudioMuted(!isAudioMuted);
                                                    }}
                                                    className="hover:scale-110 transition-transform"
                                                    disabled={isDialing}
                                                >
                                                    {isAudioMuted ?
                                                        <IconMicrophoneOff size={20} /> :
                                                        <IconMicrophone size={20} />
                                                    }
                                                </ActionIcon>
                                            </Tooltip>
                                            {callType === 'video' && (
                                                <Tooltip label={isVideoMuted ? "Turn on camera" : "Turn off camera"}>
                                                    <ActionIcon
                                                        size="lg"
                                                        radius="xl"
                                                        variant="filled"
                                                        color={isVideoMuted ? "red" : "blue"}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsVideoMuted(!isVideoMuted);
                                                        }}
                                                        className="hover:scale-110 transition-transform"
                                                        disabled={isDialing}
                                                    >
                                                        {isVideoMuted ?
                                                            <IconVideoOff size={20} /> :
                                                            <IconVideo size={20} />
                                                        }
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                            <Tooltip label="End Call">
                                                <ActionIcon
                                                    size="lg"
                                                    radius="xl"
                                                    variant="filled"
                                                    color="red"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEndCall();
                                                    }}
                                                    className="hover:scale-110 transition-transform"
                                                >
                                                    <IconPhoneOff size={20} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </Card>
                )}
            </Transition>
        </div>
    );
};
