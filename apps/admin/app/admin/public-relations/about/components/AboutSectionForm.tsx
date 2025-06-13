'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, MenuItem, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const aboutSectionSchema = z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    content: z.string().min(1, 'المحتوى مطلوب'),
    image: z.string().optional(),
    type: z.string().min(1, 'النوع مطلوب'),
});

type AboutSectionFormData = z.infer<typeof aboutSectionSchema>;

const sectionTypes = [
    { value: 'vision', label: 'الرؤية' },
    { value: 'mission', label: 'الرسالة' },
    { value: 'values', label: 'القيم' },
    { value: 'history', label: 'تاريخ الأكاديمية' },
    { value: 'accreditations', label: 'الاعتمادات' },
    { value: 'structure', label: 'الهيكل التنظيمي' },
    { value: 'awards', label: 'الجوائز' },
    { value: 'certificates', label: 'الشهادات' },
];

interface AboutSectionFormProps {
    onSubmit: (data: AboutSectionFormData) => void;
    initialData?: any;
    onCancel: () => void;
}

export function AboutSectionForm({ onSubmit, initialData, onCancel }: AboutSectionFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AboutSectionFormData>({
        resolver: zodResolver(aboutSectionSchema),
        defaultValues: {
            title: '',
            content: '',
            image: '',
            type: '',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="العنوان"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        className="rtl"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="النوع"
                        {...register('type')}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        className="rtl"
                    >
                        {sectionTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="المحتوى"
                        {...register('content')}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        className="rtl"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="رابط الصورة"
                        {...register('image')}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                        className="rtl"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box className="flex justify-end gap-2">
                        <Button variant="outlined" onClick={onCancel}>
                            إلغاء
                        </Button>
                        <Button type="submit" variant="contained" className="bg-primary hover:bg-primary/90">
                            {initialData ? 'تحديث' : 'إنشاء'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </motion.form>
    );
}