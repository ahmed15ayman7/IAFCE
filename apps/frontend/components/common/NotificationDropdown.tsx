import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Divider,
    Button,
    useTheme,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: string;
    read: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface NotificationDropdownProps {
    notifications: Notification[];
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
    className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead,
    onClearAll,
    className = '',
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTypeIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="text-success-main" />;
            case 'error':
                return <ErrorIcon className="text-error-main" />;
            case 'warning':
                return <WarningIcon className="text-warning-main" />;
            case 'info':
                return <InfoIcon className="text-info-main" />;
            default:
                return null;
        }
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'bg-success-light dark:bg-success-dark';
            case 'error':
                return 'bg-error-light dark:bg-error-dark';
            case 'warning':
                return 'bg-warning-light dark:bg-warning-dark';
            case 'info':
                return 'bg-info-light dark:bg-info-dark';
            default:
                return '';
        }
    };

    return (
        <Box className={className}>
            <IconButton
                onClick={handleClick}
                className="relative"
                aria-label="show notifications"
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    className="text-gray-600 dark:text-gray-300"
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="mt-2"
                PaperProps={{
                    className: `
            w-80
            max-h-96
            rounded-lg
            shadow-lg
            bg-white
            dark:bg-gray-800
          `,
                }}
            >
                <Box className="p-4">
                    <Box className="flex items-center justify-between mb-4">
                        <Typography variant="h6" className="font-medium">
                            {t('notifications.title')}
                        </Typography>
                        {unreadCount > 0 && onMarkAllAsRead && (
                            <Button
                                size="small"
                                onClick={() => {
                                    onMarkAllAsRead();
                                    handleClose();
                                }}
                                className="text-primary-main"
                            >
                                {t('notifications.markAllAsRead')}
                            </Button>
                        )}
                    </Box>

                    {notifications.length === 0 ? (
                        <Typography
                            variant="body2"
                            className="text-gray-500 dark:text-gray-400 text-center py-4"
                        >
                            {t('notifications.empty')}
                        </Typography>
                    ) : (
                        <Box className="space-y-2">
                            {notifications.map((notification) => (
                                <MenuItem
                                    key={notification.id}
                                    onClick={() => {
                                        if (!notification.read && onMarkAsRead) {
                                            onMarkAsRead(notification.id);
                                        }
                                        if (notification.action) {
                                            notification.action.onClick();
                                        }
                                        handleClose();
                                    }}
                                    className={`
                    ${!notification.read ? 'bg-gray-50 dark:bg-gray-700' : ''}
                    ${getTypeColor(notification.type)}
                    p-3
                    rounded-lg
                    mb-2
                  `}
                                >
                                    <Box className="flex items-start space-x-3 rtl:space-x-reverse">
                                        <Box className="flex-shrink-0 mt-1">
                                            {getTypeIcon(notification.type)}
                                        </Box>
                                        <Box className="flex-1 min-w-0">
                                            <Typography
                                                variant="subtitle2"
                                                className="font-medium mb-1"
                                            >
                                                {notification.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-gray-600 dark:text-gray-400 mb-1"
                                            >
                                                {notification.message}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                className="text-gray-500 dark:text-gray-500"
                                            >
                                                {notification.timestamp}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Box>
                    )}

                    {notifications.length > 0 && onClearAll && (
                        <>
                            <Divider className="my-2" />
                            <Button
                                fullWidth
                                onClick={() => {
                                    onClearAll();
                                    handleClose();
                                }}
                                className="text-gray-600 dark:text-gray-400"
                            >
                                {t('notifications.clearAll')}
                            </Button>
                        </>
                    )}
                </Box>
            </Menu>
        </Box>
    );
};

export default NotificationDropdown; 