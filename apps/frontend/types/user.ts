export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'PARENT' | 'ADMIN' | 'ACADEMY';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    notifications?: number;
    lastLogin?: Date;
}

export interface NavbarLink {
    label: string;
    href: string;
    icon?: string;
    badge?: number;
    children?: NavbarLink[];
}

export interface FooterLink {
    label: string;
    href: string;
    children?: FooterLink[];
}

export interface LayoutConfig {
    navbarLinks: NavbarLink[];
    footerLinks: {
        quickLinks: {
            label: string;
            links: FooterLink[];
        };
        support: {
            label: string;
            links: FooterLink[];
        };
    };
    showNotifications?: boolean;
    showProfile?: boolean;
    showSearch?: boolean;
    showLanguageSwitcher?: boolean;
    showThemeSwitcher?: boolean;
}

export interface UserLayoutConfig {
    [key: string]: LayoutConfig;
} 