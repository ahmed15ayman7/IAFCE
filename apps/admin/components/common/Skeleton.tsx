import React from 'react';
import {
    Skeleton as MuiSkeleton,
    Box,
    useTheme,
} from '@mui/material';

interface SkeletonProps {
    variant?: 'text' | 'rectangular' | 'circular';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
    className?: string;
    count?: number;
    spacing?: number;
    direction?: 'row' | 'column';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    animation = 'wave',
    className = '',
    count = 1,
    spacing = 1,
    direction = 'column',
    color = 'primary',
}) => {
    const theme = useTheme();

    const getColorClasses = () => {
        switch (color) {
            case 'primary':
                return 'bg-primary-light dark:bg-primary-dark';
            case 'secondary':
                return 'bg-secondary-light dark:bg-secondary-dark';
            case 'success':
                return 'bg-success-light dark:bg-success-dark';
            case 'error':
                return 'bg-error-light dark:bg-error-dark';
            case 'warning':
                return 'bg-warning-light dark:bg-warning-dark';
            case 'info':
                return 'bg-info-light dark:bg-info-dark';
            default:
                return 'bg-gray-200 dark:bg-gray-700';
        }
    };

    const getSkeletonItems = () => {
        return Array.from({ length: count }, (_, index) => (
            <MuiSkeleton
                key={index}
                variant={variant}
                width={width}
                height={height}
                animation={animation}
                className={`
          ${getColorClasses()}
          ${className}
          rounded-lg
          opacity-70
        `}
            />
        ));
    };

    return (
        <Box
            className={`
        flex
        ${direction === 'column' ? 'flex-col' : 'flex-row'}
        gap-${spacing}
        rtl:space-x-reverse
      `}
        >
            {getSkeletonItems()}
        </Box>
    );
};

export default Skeleton; 