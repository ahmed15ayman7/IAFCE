import { ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    className?: string;
}

export interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    className?: string;
}

export interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
}

export interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    className?: string;
}

export interface SelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}

export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export interface AvatarProps {
    src?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export interface QRCodeProps {
    value: string;
    size: number;
    className?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export interface AlertProps {
    variant: 'info' | 'success' | 'warning' | 'danger';
    children: ReactNode;
}

export interface TooltipProps {
    content: string;
    children: ReactNode;
}

export interface SkeletonProps {
    height: number;
    width?: number;
    className?: string;
}

export interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface TabsProps {
    value: string;
    onChange: (value: string) => void;
    items: { value: string; label: string; icon?: ReactNode }[];
} 