import { TextField, TextFieldProps } from '@mui/material';
import { motion } from 'framer-motion';

interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
    error?: boolean;
    helperText?: string;
}

export const FormInput = ({ error, helperText, ...props }: FormInputProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <TextField
                fullWidth
                variant="outlined"
                error={error}
                helperText={helperText}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                }}
                {...props}
            />
        </motion.div>
    );
}; 