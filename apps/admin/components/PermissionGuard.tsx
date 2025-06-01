import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Permission } from '@shared/prisma';

export interface EmployeePermissions {
    // المحاسبة
    viewFinance: boolean;
    manageFinance: boolean;

    // العلاقات العامة
    viewCommunications: boolean;
    manageCommunications: boolean;

    // السكرتارية
    viewSecretary: boolean;
    manageSecretary: boolean;

    // الإدارة العامة
    viewStaff: boolean;
    manageStaff: boolean;

    // الشؤون القانونية
    viewLegal: boolean;
    manageLegal: boolean;

    // العلاقات العامة
    viewPR: boolean;
    managePR: boolean;

    // الإدارة العامة
    viewAdministration: boolean;
    manageAdministration: boolean;

    // الأكاديمية
    viewAcademic: boolean;
    manageAcademic: boolean;
}

interface PermissionGuardProps {
    children: ReactNode;
    requiredPermissions: Array<Permission['name']>;
    requireAll?: boolean;
    fallback?: ReactNode;
}

export function PermissionGuard({
    children,
    requiredPermissions,
    requireAll = true,
    fallback = null,
}: PermissionGuardProps) {
    const { data: session } = useSession();
    const userPermissions = session?.user?.permissions as Permission[];

    if (!userPermissions) {
        return fallback;
    }

    const hasPermission = requireAll
        ? requiredPermissions.every((permission) => userPermissions.some((p) => p.name === permission && p.isActive))
        : requiredPermissions.some((permission) => userPermissions.some((p) => p.name === permission && p.isActive));

    return hasPermission ? <>{children}</> : <>{fallback}</>;
} 