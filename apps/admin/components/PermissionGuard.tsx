import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { AdminRoleType, Permission } from '@shared/prisma';

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

    if (!userPermissions && session?.user?.roles?.some((role) => role.name !== AdminRoleType.SUPER_ADMIN)) {
        return fallback;
    }

    const hasPermission = requireAll
        ? requiredPermissions.every((permission) => userPermissions?.some((p) => p.name === permission && p.isActive))
        : requiredPermissions.some((permission) => userPermissions?.some((p) => p.name === permission && p.isActive));

    return hasPermission || session?.user?.roles?.some((role) => role.name === AdminRoleType.SUPER_ADMIN) ? <>{children}</> : <>{fallback}</>;
} 