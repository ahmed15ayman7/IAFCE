export const languages = ['ar', 'en'] as const;
export type Language = typeof languages[number];

export const defaultLanguage = 'ar' as const;

export const languageNames = {
    ar: 'العربية',
    en: 'English',
} as const; 