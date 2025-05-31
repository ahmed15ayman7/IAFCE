import { z } from 'zod';

const phoneRegex = /^01[0125][0-9]{8}$/;

export const signInSchema = z.object({
    identifier: z.string().refine((val) => {
        if (val.includes('@')) {
            return z.string().email().safeParse(val).success;
        }
        return phoneRegex.test(val);
    }, 'يجب إدخال بريد إلكتروني صالح أو رقم هاتف مصري صالح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const signUpSchema = z.object({
    identifier: z.string().refine((val) => {
        if (val.includes('@')) {
            return z.string().email().safeParse(val).success;
        }
        return phoneRegex.test(val);
    }, 'يجب إدخال بريد إلكتروني صالح أو رقم هاتف مصري صالح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    firstName: z.string().min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
    lastName: z.string().min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل'),
});

export const forgotPasswordSchema = z.object({
    identifier: z.string().refine((val) => {
        if (val.includes('@')) {
            return z.string().email().safeParse(val).success;
        }
        return phoneRegex.test(val);
    }, 'يجب إدخال بريد إلكتروني صالح أو رقم هاتف مصري صالح'),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>; 