'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Collapse,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
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
import { useUser } from '@/hooks/useUser';

const drawerWidth = 240;

const menuItems = [
    {
        title: 'المحاسبة',
        path: '/admin/finance',
        icon: <FinanceIcon />,
        permissions: ['viewFinance'],
        subItems: [
            {
                title: 'المدفوعات',
                path: '/admin/finance/payments',
                permissions: ['viewPayments'],
            },
            {
                title: 'الأقساط',
                path: '/admin/finance/installments',
                permissions: ['viewInstallments'],
            },
            {
                title: 'المصروفات',
                path: '/admin/finance/expenses',
                permissions: ['viewExpenses'],
            },
            {
                title: 'الفروع',
                path: '/admin/finance/branches',
                permissions: ['viewBranches'],
            },
            {
                title: 'التقارير',
                path: '/admin/finance/reports',
                permissions: ['viewFinanceReports'],
            },
        ],
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
        title: 'العلاقات العامة',
        path: '/admin/public-relations',
        icon: <PublicIcon />,
        permissions: ['viewPublicRelations'],
        subItems: [
            {
                title: 'الأخبار والفعاليات',
                path: '/admin/public-relations/media-center',
                permissions: ['viewNewsEvents'],
            },
            {
                title: 'الأخبار والفعاليات',
                path: '/admin/public-relations/about',
                permissions: ['viewAbout'],
            },
            {
                title: 'الرسائل',
                path: '/admin/public-relations/contact',
                permissions: ['viewContact'],
            },
            {
                title: 'الأسئلة الشائعة',
                path: '/admin/public-relations/faq',
                permissions: ['viewFaq'],
            },
            {
                title: 'التعليقات',
                path: '/admin/public-relations/testimonials',
                permissions: ['viewTestimonials'],
            }
        ],
    },
];

export function AdminSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        // تعيين القائمة المفتوحة للمحاسبة إذا كان المستخدم محاسب
        if (user?.role === 'ACCOUNTANT') {
            setOpenMenus(prev => ({
                ...prev,
                'المحاسبة': true
            }));
        }
    }, [user]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (title: string) => {
        setOpenMenus(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const drawer = (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {menuItems.map((item) => (
                    <PermissionGuard
                        key={item.path}
                        requiredPermissions={item.permissions}
                        requireAll={false}
                    >
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    if (item.subItems) {
                                        handleMenuClick(item.title);
                                    } else {
                                        router.push(item.path);
                                    }
                                }}
                                selected={pathname === item.path}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                                {item.subItems && (
                                    openMenus[item.title] ? <ExpandLess /> : <ExpandMore />
                                )}
                            </ListItemButton>
                        </ListItem>
                        {item.subItems && (
                            <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subItems.map((subItem) => (
                                        <PermissionGuard
                                            key={subItem.path}
                                            requiredPermissions={subItem.permissions}
                                            requireAll={false}
                                        >
                                            <ListItemButton
                                                sx={{ pl: 4 }}
                                                onClick={() => router.push(subItem.path)}
                                                selected={pathname === subItem.path}
                                            >
                                                <ListItemText primary={subItem.title} />
                                            </ListItemButton>
                                        </PermissionGuard>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </PermissionGuard>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
} 