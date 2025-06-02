import React, { useState } from 'react';
import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelSummary as MuiExpansionPanelSummary,
    ExpansionPanelDetails as MuiExpansionPanelDetails,
    Typography,
    useTheme,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface ExpansionPanelItem {
    id: string;
    title: string;
    description?: string;
    content: React.ReactNode;
    icon?: React.ReactElement;
    disabled?: boolean;
    defaultExpanded?: boolean;
}

interface ExpansionPanelProps {
    items: ExpansionPanelItem[];
    expanded?: string[];
    onChange?: (expanded: string[]) => void;
    variant?: 'default' | 'outlined';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    className?: string;
}

const ExpansionPanel: React.FC<ExpansionPanelProps> = ({
    items,
    expanded: controlledExpanded,
    onChange,
    variant = 'default',
    color = 'primary',
    className = '',
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState<string[]>(
        items.filter((item) => item.defaultExpanded).map((item) => item.id)
    );
    const expanded = controlledExpanded ?? uncontrolledExpanded;

    const handleChange = (id: string) => {
        const newExpanded = expanded.includes(id)
            ? expanded.filter((item) => item !== id)
            : [...expanded, id];

        if (onChange) {
            onChange(newExpanded);
        } else {
            setUncontrolledExpanded(newExpanded);
        }
    };

    const getColorClass = () => {
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

    return (
        <div className={className}>
            {items.map((item) => (
                <MuiExpansionPanel
                    key={item.id}
                    expanded={expanded.includes(item.id)}
                    onChange={() => handleChange(item.id)}
                    disabled={item.disabled}
                    className={`
            ${variant === 'outlined' ? 'border border-gray-200 dark:border-gray-700' : ''}
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            mb-2
            rounded-lg
            shadow-sm
            bg-white
            dark:bg-gray-800
            [&_.MuiExpansionPanelSummary-root]:min-h-[56px]
            [&_.MuiExpansionPanelSummary-root]:px-4
            [&_.MuiExpansionPanelSummary-root]:py-2
            [&_.MuiExpansionPanelSummary-content]:my-2
            [&_.MuiExpansionPanelDetails-root]:px-4
            [&_.MuiExpansionPanelDetails-root]:py-3
            [&_.MuiExpansionPanelDetails-root]:bg-gray-50
            [&_.MuiExpansionPanelDetails-root]:dark:bg-gray-700
            [&_.MuiExpansionPanelDetails-root]:rounded-b-lg
          `}
                >
                    <MuiExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon className={getColorClass()} />}
                        className={`
              ${expanded.includes(item.id) ? 'bg-gray-50 dark:bg-gray-700' : ''}
            `}
                    >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            {item.icon && (
                                <div className={getColorClass()}>
                                    {item.icon}
                                </div>
                            )}
                            <div>
                                <Typography
                                    variant="subtitle1"
                                    className={`
                    font-medium
                    text-gray-900
                    dark:text-gray-100
                  `}
                                >
                                    {t(item.title)}
                                </Typography>
                                {item.description && (
                                    <Typography
                                        variant="body2"
                                        className={`
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                    `}
                                    >
                                        {t(item.description)}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails>
                        {item.content}
                    </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            ))}
        </div>
    );
};

export default ExpansionPanel; 