import React from 'react';
import {
    Box,
    Typography,
    Button,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    image?: string;
    className?: string;
    variant?: 'default' | 'minimal' | 'illustration';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    action,
    image,
    className = '',
    variant = 'default',
    color = 'primary',
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const getColorClasses = () => {
        switch (color) {
            case 'primary':
                return 'text-primary-main';
            case 'secondary':
                return 'text-secondary-main';
            case 'success':
                return 'text-success-main';
            case 'error':
                return 'text-error-main';
            case 'warning':
                return 'text-warning-main';
            case 'info':
                return 'text-info-main';
            default:
                return '';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'minimal':
                return 'p-4';
            case 'illustration':
                return 'p-8';
            default:
                return 'p-6';
        }
    };

    return (
        <Box
            className={`
        flex
        flex-col
        items-center
        justify-center
        text-center
        ${getVariantClasses()}
        ${className}
        rounded-lg
        bg-gray-50
        dark:bg-gray-800
      `}
        >
            {image && (
                <Box className="mb-4">
                    <img
                        src={image}
                        alt="Empty state illustration"
                        className="w-48 h-48 object-contain"
                    />
                </Box>
            )}

            {icon && !image && (
                <Box
                    className={`
            mb-4
            ${getColorClasses()}
            text-4xl
          `}
                >
                    {icon}
                </Box>
            )}

            {title && (
                <Typography
                    variant="h5"
                    className={`
            mb-2
            font-medium
            ${getColorClasses()}
          `}
                >
                    {title}
                </Typography>
            )}

            {description && (
                <Typography
                    variant="body1"
                    className="mb-4 text-gray-600 dark:text-gray-400"
                >
                    {description}
                </Typography>
            )}

            {action && (
                <Button
                    variant="contained"
                    color={color}
                    onClick={action.onClick}
                    startIcon={action.icon}
                    className="mt-4"
                >
                    {action.label}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState; 