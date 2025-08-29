import React, { useState, useRef, useEffect } from 'react';
import {
    IconBell,
    IconX,
    IconCalendar,
    IconUser,
    IconAlertTriangle,
    IconCheck,
    IconClock,
    IconDots,
    IconTrash,
    IconMail,
} from '@tabler/icons-react';
import { Badge, Avatar, ActionIcon, Menu, ScrollArea, Text, Button } from '@mantine/core';

interface Notification {
    id: string;
    type: 'appointment' | 'patient' | 'system' | 'message';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
    avatar?: string;
    actionUrl?: string;
}

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    notifications?: Notification[];
}

// Mock notification data
const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'appointment',
        title: 'New Appointment Request',
        message: 'John Doe has requested an appointment for tomorrow at 2:00 PM',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        isRead: false,
        priority: 'high',
        avatar: '/images/profile.png',
    },
    {
        id: '2',
        type: 'patient',
        title: 'Patient Check-in',
        message: 'Sarah Johnson has checked in for her 3:30 PM appointment',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        isRead: false,
        priority: 'medium',
        avatar: '/images/profile.png',
    },
    {
        id: '3',
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin at 11:00 PM tonight',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true,
        priority: 'low',
    },
    {
        id: '4',
        type: 'message',
        title: 'New Message',
        message: 'Dr. Smith sent you a message regarding patient care protocols',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        isRead: true,
        priority: 'medium',
    },
    {
        id: '5',
        type: 'appointment',
        title: 'Appointment Cancelled',
        message: 'Michael Brown has cancelled his appointment scheduled for today',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        isRead: true,
        priority: 'medium',
    },
];

const NotificationPanel: React.FC<NotificationPanelProps> = ({
    isOpen,
    onClose,
    notifications = mockNotifications,
}) => {
    const [notificationList, setNotificationList] = useState<Notification[]>(notifications);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'appointment':
                return <IconCalendar size={16} className="text-blue-500" />;
            case 'patient':
                return <IconUser size={16} className="text-green-500" />;
            case 'system':
                return <IconAlertTriangle size={16} className="text-orange-500" />;
            case 'message':
                return <IconMail size={16} className="text-purple-500" />;
            default:
                return <IconBell size={16} className="text-gray-500" />;
        }
    };

    const getPriorityColor = (priority: Notification['priority']) => {
        switch (priority) {
            case 'high':
                return 'red';
            case 'medium':
                return 'yellow';
            case 'low':
                return 'green';
            default:
                return 'gray';
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - timestamp.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return timestamp.toLocaleDateString();
    };

    const markAsRead = (notificationId: string) => {
        setNotificationList(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const deleteNotification = (notificationId: string) => {
        setNotificationList(prev =>
            prev.filter(notification => notification.id !== notificationId)
        );
    };

    const markAllAsRead = () => {
        setNotificationList(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const clearAll = () => {
        setNotificationList([]);
    };

    const unreadCount = notificationList.filter(n => !n.isRead).length;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
            {/* Backdrop for mobile */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden" onClick={onClose} />

            {/* Panel */}
            <div
                ref={panelRef}
                className="fixed right-4 top-16 lg:absolute lg:right-0 lg:top-full lg:mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-500/20 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <IconBell size={20} className="text-slate-600 dark:text-slate-300" />
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Notifications</h3>
                        </div>
                        {unreadCount > 0 && (
                            <Badge
                                size="sm"
                                variant="filled"
                                color="red"
                                className="animate-pulse"
                            >
                                {unreadCount}
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <Button
                                variant="subtle"
                                size="xs"
                                onClick={markAllAsRead}
                                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                            >
                                Mark all read
                            </Button>
                        )}
                        <ActionIcon
                            variant="subtle"
                            size="sm"
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                            <IconX size={16} />
                        </ActionIcon>
                    </div>
                </div>

                {/* Notifications List */}
                <ScrollArea h={400} className="px-2">
                    {notificationList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <IconBell size={48} className="text-slate-300 dark:text-slate-600 mb-3" />
                            <Text className="text-slate-500 dark:text-slate-400 font-medium">
                                No notifications yet
                            </Text>
                            <Text size="sm" className="text-slate-400 dark:text-slate-500 mt-1">
                                We'll notify you when something important happens
                            </Text>
                        </div>
                    ) : (
                        <div className="py-2">
                            {notificationList.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`group relative p-3 mx-2 mb-2 rounded-xl transition-all duration-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!notification.isRead
                                            ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-200/50 dark:border-indigo-700/50'
                                            : 'bg-transparent hover:scale-[1.02]'
                                        }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Avatar or Icon */}
                                        <div className="flex-shrink-0">
                                            {notification.avatar ? (
                                                <Avatar
                                                    src={notification.avatar}
                                                    size="sm"
                                                    radius="lg"
                                                    className="ring-2 ring-slate-200 dark:ring-slate-600"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className={`text-sm font-semibold truncate ${!notification.isRead
                                                        ? 'text-slate-900 dark:text-slate-100'
                                                        : 'text-slate-700 dark:text-slate-300'
                                                    }`}>
                                                    {notification.title}
                                                </h4>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Badge
                                                        size="xs"
                                                        variant="light"
                                                        color={getPriorityColor(notification.priority)}
                                                        className="opacity-70"
                                                    >
                                                        {notification.priority}
                                                    </Badge>
                                                    <Menu position="bottom-end" shadow="md">
                                                        <Menu.Target>
                                                            <ActionIcon
                                                                variant="subtle"
                                                                size="xs"
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <IconDots size={12} />
                                                            </ActionIcon>
                                                        </Menu.Target>
                                                        <Menu.Dropdown>
                                                            {!notification.isRead && (
                                                                <Menu.Item
                                                                    leftSection={<IconCheck size={14} />}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        markAsRead(notification.id);
                                                                    }}
                                                                >
                                                                    Mark as read
                                                                </Menu.Item>
                                                            )}
                                                            <Menu.Item
                                                                leftSection={<IconTrash size={14} />}
                                                                color="red"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteNotification(notification.id);
                                                                }}
                                                            >
                                                                Delete
                                                            </Menu.Item>
                                                        </Menu.Dropdown>
                                                    </Menu>
                                                </div>
                                            </div>

                                            <p className={`text-sm mt-1 line-clamp-2 ${!notification.isRead
                                                    ? 'text-slate-600 dark:text-slate-400'
                                                    : 'text-slate-500 dark:text-slate-500'
                                                }`}>
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center gap-2 mt-2">
                                                <IconClock size={12} className="text-slate-400" />
                                                <span className="text-xs text-slate-400">
                                                    {formatTimestamp(notification.timestamp)}
                                                </span>
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse ml-auto" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {/* Footer */}
                {notificationList.length > 0 && (
                    <div className="border-t border-slate-200 dark:border-slate-700 p-3">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="subtle"
                                size="sm"
                                onClick={clearAll}
                                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                Clear all
                            </Button>
                            <Button
                                variant="subtle"
                                size="sm"
                                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                            >
                                View all notifications
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPanel;
