'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';

// تعريف مخطط التحقق من صحة البيانات
const newsEventSchema = z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    content: z.string().min(1, 'المحتوى مطلوب'),
    date: z.date(),
    type: z.enum(['NEWS', 'EVENT', 'SUCCESS_STORY']),
    image: z.string().optional(),
});

type NewsEventFormData = z.infer<typeof newsEventSchema>;

interface NewsEventFormProps {
    initialData?: any;
    onSubmit: (data: NewsEventFormData) => void;
    onCancel: () => void;
}

export default function NewsEventForm({
    initialData,
    onSubmit,
    onCancel,
}: NewsEventFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewsEventFormData>({
        resolver: zodResolver(newsEventSchema),
        defaultValues: initialData || {
            title: '',
            content: '',
            date: new Date(),
            type: 'NEWS',
            image: '',
        },
    });

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <TextField
                fullWidth
                label="العنوان"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
            />

            <TextField
                fullWidth
                select
                label="النوع"
                {...register('type')}
                error={!!errors.type}
                helperText={errors.type?.message}
            >
                <MenuItem value="NEWS">خبر</MenuItem>
                <MenuItem value="EVENT">فعالية</MenuItem>
                <MenuItem value="SUCCESS_STORY">قصة نجاح</MenuItem>
            </TextField>

            <TextField
                fullWidth
                multiline
                rows={4}
                label="المحتوى"
                {...register('content')}
                error={!!errors.content}
                helperText={errors.content?.message}
            />

            <TextField
                fullWidth
                type="date"
                label="التاريخ"
                {...register('date')}
                error={!!errors.date}
                helperText={errors.date?.message}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                fullWidth
                label="رابط الصورة"
                {...register('image')}
                error={!!errors.image}
                helperText={errors.image?.message}
            />

            <Box className="flex justify-end space-x-2">
                <Button variant="outlined" onClick={onCancel}>
                    إلغاء
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    {initialData ? 'تحديث' : 'إنشاء'}
                </Button>
            </Box>
        </motion.form>
    );
}