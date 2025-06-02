import { Box } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { motion } from 'framer-motion';

interface CustomPhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
}

export const CustomPhoneInput = ({
    value,
    onChange,
    error,
    helperText,
}: CustomPhoneInputProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ position: 'relative' }}>
                <PhoneInput
                    country={'eg'}
                    value={value}
                    onChange={onChange}
                    inputStyle={{
                        width: '100%',
                        height: '56px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: error ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                    }}
                    buttonStyle={{
                        border: error ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: '4px 0 0 4px',
                    }}
                    containerStyle={{
                        width: '100%',
                    }}
                />
                {error && helperText && (
                    <Box
                        sx={{
                            color: '#d32f2f',
                            fontSize: '0.75rem',
                            marginTop: '3px',
                            marginLeft: '14px',
                        }}
                    >
                        {helperText}
                    </Box>
                )}
            </Box>
        </motion.div>
    );
}; 