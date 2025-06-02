'use client';

import { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    AccountBalance as FinanceIcon,
    Message as CommunicationsIcon,
    EventNote as SecretaryIcon,
    People as StaffIcon,
    Gavel as LegalIcon,
    ExpandLess,
    ExpandMore,
    Settings as PermissionsIcon,
    AdminPanelSettings as AdminIcon,
    School as SchoolIcon,
    Public as PublicIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { PermissionGuard } from './PermissionGuard';

const drawerWidth = 240;

const menuItems = [
    {
        title: 'المحاسبة',
        path: '/admin/finance',
        icon: <FinanceIcon />,
        permissions: ['viewFinance'],
    },
    {
        title: 'العلاقات العامة',
        path: '/admin/communications',
        icon: <CommunicationsIcon />,
        permissions: ['viewCommunications'],
    },
    {
        title: 'السكرتارية',
        path: '/admin/secretary',
        icon: <SecretaryIcon />,
        permissions: ['viewSecretary'],
    },
    {
        title: 'الإدارة العامة',
        path: '/admin/staff',
        icon: <StaffIcon />,
        permissions: ['viewStaff'],
    },
    {
        title: 'الشؤون القانونية',
        path: '/admin/legal',
        icon: <LegalIcon />,
        permissions: ['viewLegal'],
    },
    {
        title: 'الصلاحيات',
        path: '/admin/permissions',
        icon: <PermissionsIcon />,
        permissions: ['managePermissions'],
    },
    {
        title: 'الإدارة',
        path: '/admin/administration',
        icon: <AdminIcon />,
        permissions: ['manageAdministration'],
    },
    {
        title: 'الأكاديمية',
        path: '/admin/academic',
        icon: <SchoolIcon />,
        permissions: ['viewAcademic'],
    },
    {
        title: 'الإدارة العامة',
        path: '/admin/public-relations',
        icon: <PublicIcon />,
        permissions: ['viewPublicRelations'],
    },
];

export function AdminSidebar() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();
    const router = useRouter();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? open : true}
            onClose={handleDrawerToggle}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    mt: 8,
                    backgroundColor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <PermissionGuard
                        key={item.path}
                        requiredPermissions={item.permissions}
                        requireAll={false}
                    >
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={pathname === item.path}
                                onClick={() => router.push(item.path)}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: pathname === item.path ? 'primary.main' : 'inherit',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    sx={{
                                        color: pathname === item.path ? 'primary.main' : 'inherit',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </PermissionGuard>
                ))}
            </List>
        </Drawer>
    );
} 