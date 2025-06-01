import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

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
}

interface PermissionGuardProps {
    children: ReactNode;
    requiredPermissions: Array<keyof EmployeePermissions>;
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
    const userPermissions = session?.user?.permissions as EmployeePermissions;

    if (!userPermissions) {
        return fallback;
    }

    const hasPermission = requireAll
        ? requiredPermissions.every((permission) => userPermissions[permission])
        : requiredPermissions.some((permission) => userPermissions[permission]);

    return hasPermission ? <>{children}</> : <>{fallback}</>;
} 