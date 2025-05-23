"use client";
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    Avatar,
    Box,
    Typography,
    Button,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Message as MessageIcon,
    Language as LanguageIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface NavbarProps {
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        avatar?: string;
        role: string;
    };
    notifications?: Array<{
        id: string;
        title: string;
        message: string;
        read: boolean;
    }>;
    messages?: Array<{
        id: string;
        sender: string;
        message: string;
        read: boolean;
    }>;
    showNotifications: boolean;
    showProfile: boolean;
    showSearch: boolean;
    onToggleTheme: () => void;
    onToggleLanguage: () => void;
    isDarkMode: boolean;
    links: Array<{
        label: string;
        href: string;
    }>;
}

const Navbar: React.FC<NavbarProps> = ({
    user,
    notifications = [],
    showNotifications = false,
    showProfile = false,
    showSearch = false,
    messages = [],
    onToggleTheme,
    onToggleLanguage,
    isDarkMode,
    links,
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
    const [messagesAnchor, setMessagesAnchor] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationsAnchor(event.currentTarget);
    };

    const handleMessagesClick = (event: React.MouseEvent<HTMLElement>) => {
        setMessagesAnchor(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setNotificationsAnchor(null);
    };

    const handleCloseMessages = () => {
        setMessagesAnchor(null);
    };

    const handleLogout = () => {
        // Handle logout logic
        handleMenuClose();
    };

    const drawer = (
        <List>
            {links.map((link) => (
                <ListItem button component={Link} href={link.href}>
                    <ListItemText primary={link.label} />
                </ListItem>
            ))}
            {user && (
                <>
                    <ListItem button component={Link} href="/profile">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'profile'} />
                    </ListItem>
                    <ListItem button component={Link} href="/settings">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'settings'} />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'logout'} />
                    </ListItem>
                </>
            )}
        </List>
    );

    return (
        <AppBar position="sticky" className="bg-white text-primary-dark shadow-navbar">
            <Toolbar>
                {isMobile && <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className="md:hidden"
                >
                    <MenuIcon />
                </IconButton>
                }
                <Link href="/" className="flex items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="Logo"
                        className="h-20 w-auto mr-4"
                    />
                </Link>

                <Box className="hidden md:flex flex-1 justify-center gap-8 rtl:space-x-reverse">
                    {links.map((link) => (
                        <Link href={link.href} className={`text-secondary-dark hover:text-secondary-main border-b-2 border-transparent px-4 py-2 ${pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/') ? 'border-secondary-main' : ''}`}>
                            {link.label}
                        </Link>
                    ))}
                </Box>

                <Box className="flex items-center space-x-4">

                    {showNotifications && <IconButton
                        color="inherit"
                        onClick={handleNotificationsClick}
                        className="relative"
                    >
                        <Badge badgeContent={notifications.filter(n => !n.read).length} color="primary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    }
                    <IconButton
                        color="inherit"
                        onClick={handleMessagesClick}
                        className="relative"
                    >
                        <Badge badgeContent={messages.filter(m => !m.read).length} color="primary">
                            <MessageIcon />
                        </Badge>
                    </IconButton>

                    <IconButton color="inherit" onClick={onToggleLanguage}>
                        <LanguageIcon />
                    </IconButton>

                    <IconButton color="inherit" onClick={onToggleTheme}>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    {user ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <Avatar
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="h-8 w-8"
                            >
                                {user.firstName[0]}
                            </Avatar>
                        </IconButton>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href="/auth/login"
                        >
                            {'login'}
                        </Button>
                    )}
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        {'profile'}
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} href="/settings">
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        {'settings'}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        {'logout'}
                    </MenuItem>
                </Menu>

                <Menu
                    anchorEl={notificationsAnchor}
                    open={Boolean(notificationsAnchor)}
                    onClose={handleCloseNotifications}
                >
                    {notifications.map((notification) => (
                        <MenuItem key={notification.id} onClick={handleCloseNotifications}>
                            <ListItemText
                                primary={notification.title}
                                secondary={notification.message}
                                className={!notification.read ? 'font-bold' : ''}
                            />
                        </MenuItem>
                    ))}
                    {notifications.length === 0 && (
                        <MenuItem>
                            <ListItemText primary={"لا يوجد اشعارات"} />
                        </MenuItem>
                    )}
                </Menu>

                <Menu
                    anchorEl={messagesAnchor}
                    open={Boolean(messagesAnchor)}
                    onClose={handleCloseMessages}
                >
                    {messages.map((message) => (
                        <MenuItem key={message.id} onClick={handleCloseMessages}>
                            <ListItemText
                                primary={message.sender}
                                secondary={message.message}
                                className={!message.read ? 'font-bold' : ''}
                            />
                        </MenuItem>
                    ))}
                    {messages.length === 0 && (
                        <MenuItem>
                            <ListItemText primary={"لا يوجد رسائل"} />
                        </MenuItem>
                    )}
                </Menu>
            </Toolbar>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar; 