import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatisticsCardProps {
    title: string;
    value: number;
    previousValue?: number;
    icon?: React.ReactNode;
    color?: string;
}

export function StatisticsCard({ title, value, previousValue, icon, color = '#1976d2' }: StatisticsCardProps) {
    const percentageChange = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
    const isPositive = percentageChange >= 0;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                            {value.toLocaleString('ar-SA')}
                        </Typography>
                        {previousValue && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {isPositive ? (
                                    <TrendingUp color="success" fontSize="small" />
                                ) : (
                                    <TrendingDown color="error" fontSize="small" />
                                )}
                                <Typography
                                    variant="body2"
                                    color={isPositive ? 'success.main' : 'error.main'}
                                >
                                    {Math.abs(percentageChange).toFixed(1)}%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {icon && (
                        <Box
                            sx={{
                                backgroundColor: `${color}15`,
                                borderRadius: '50%',
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
} 