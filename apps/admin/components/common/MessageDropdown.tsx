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
    Avatar,
    useTheme,
} from '@mui/material';
import {
    Chat as ChatIcon,
    Send as SendIcon,
    Check as CheckIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface Message {
    id: string;
    sender: {
        id: string;
        name: string;
        avatar?: string;
    };
    content: string;
    timestamp: string;
    read: boolean;
    type: 'text' | 'image' | 'file';
    attachment?: {
        url: string;
        name?: string;
        size?: string;
    };
}

interface MessageDropdownProps {
    messages: Message[];
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
    onViewAll?: () => void;
    className?: string;
}

const MessageDropdown: React.FC<MessageDropdownProps> = ({
    messages,
    onMarkAsRead,
    onMarkAllAsRead,
    onClearAll,
    onViewAll,
    className = '',
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const unreadCount = messages.filter((m) => !m.read).length;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Box className={className}>
            <IconButton
                onClick={handleClick}
                className="relative"
                aria-label="show messages"
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    className="text-gray-600 dark:text-gray-300"
                >
                    <ChatIcon />
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
                            {t('messages.title')}
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
                                {t('messages.markAllAsRead')}
                            </Button>
                        )}
                    </Box>

                    {messages.length === 0 ? (
                        <Typography
                            variant="body2"
                            className="text-gray-500 dark:text-gray-400 text-center py-4"
                        >
                            {t('messages.empty')}
                        </Typography>
                    ) : (
                        <Box className="space-y-2">
                            {messages.map((message) => (
                                <MenuItem
                                    key={message.id}
                                    onClick={() => {
                                        if (!message.read && onMarkAsRead) {
                                            onMarkAsRead(message.id);
                                        }
                                        handleClose();
                                    }}
                                    className={`
                    ${!message.read ? 'bg-gray-50 dark:bg-gray-700' : ''}
                    p-3
                    rounded-lg
                    mb-2
                  `}
                                >
                                    <Box className="flex items-start space-x-3 rtl:space-x-reverse">
                                        <Avatar
                                            src={message.sender.avatar}
                                            alt={message.sender.name}
                                            className="w-10 h-10"
                                        >
                                            {message.sender.name.charAt(0)}
                                        </Avatar>
                                        <Box className="flex-1 min-w-0">
                                            <Box className="flex items-center justify-between mb-1">
                                                <Typography
                                                    variant="subtitle2"
                                                    className="font-medium"
                                                >
                                                    {message.sender.name}
                                                </Typography>
                                                <Box className="flex items-center space-x-1 rtl:space-x-reverse">
                                                    <Typography
                                                        variant="caption"
                                                        className="text-gray-500 dark:text-gray-500"
                                                    >
                                                        {formatTime(message.timestamp)}
                                                    </Typography>
                                                    {message.read ? (
                                                        <CheckCircleIcon
                                                            className="text-primary-main"
                                                            fontSize="small"
                                                        />
                                                    ) : (
                                                        <CheckIcon
                                                            className="text-gray-400"
                                                            fontSize="small"
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                className="text-gray-600 dark:text-gray-400 mb-1 line-clamp-2"
                                            >
                                                {message.content}
                                            </Typography>
                                            {message.attachment && (
                                                <Box className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                                                    <SendIcon
                                                        className="text-gray-400"
                                                        fontSize="small"
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        className="text-gray-500 dark:text-gray-500"
                                                    >
                                                        {message.attachment.name || t('messages.attachment')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Box>
                    )}

                    {(messages.length > 0 || onViewAll) && (
                        <>
                            <Divider className="my-2" />
                            <Box className="flex items-center justify-between">
                                {messages.length > 0 && onClearAll && (
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            onClearAll();
                                            handleClose();
                                        }}
                                        className="text-gray-600 dark:text-gray-400"
                                    >
                                        {t('messages.clearAll')}
                                    </Button>
                                )}
                                {onViewAll && (
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            onViewAll();
                                            handleClose();
                                        }}
                                        className="text-primary-main"
                                    >
                                        {t('messages.viewAll')}
                                    </Button>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Menu>
        </Box>
    );
};

export default MessageDropdown; 