import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function InstructorCourses() {
    const { t } = useTranslation();

    const activeCourses = [
        {
            id: 1,
            title: 'البرمجة بلغة Python',
            students: 45,
            progress: 75,
            lastActivity: '2024-04-25',
            nextLesson: 'الوظائف والدوال',
        },
        {
            id: 2,
            title: 'تطوير تطبيقات الويب',
            students: 30,
            progress: 30,
            lastActivity: '2024-04-24',
            nextLesson: 'CSS المتقدم',
        },
    ];

    const completedCourses = [
        {
            id: 3,
            title: 'أساسيات HTML',
            students: 50,
            completionDate: '2024-03-15',
            averageGrade: '92%',
        },
        {
            id: 4,
            title: 'أساسيات CSS',
            students: 48,
            completionDate: '2024-03-30',
            averageGrade: '88%',
        },
    ];

    const activeColumns = [
        { field: 'title', headerName: t('عنوان الدورة'), width: 200 },
        { field: 'students', headerName: t('عدد الطلاب'), width: 150 },
        { field: 'progress', headerName: t('التقدم'), width: 100 },
        { field: 'lastActivity', headerName: t('آخر نشاط'), width: 150 },
        { field: 'nextLesson', headerName: t('الدرس التالي'), width: 200 },
    ];

    const completedColumns = [
        { field: 'title', headerName: t('عنوان الدورة'), width: 200 },
        { field: 'students', headerName: t('عدد الطلاب'), width: 150 },
        { field: 'completionDate', headerName: t('تاريخ الإكمال'), width: 150 },
        { field: 'averageGrade', headerName: t('المعدل العام'), width: 150 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('إدارة دوراتي')}</h1>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    {t('إضافة دورة جديدة')}
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('الدورات النشطة')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeCourses.map((course) => (
                        <Card
                            key={course.id}
                            title={course.title}
                            description={`${t('عدد الطلاب')}: ${course.students}`}
                            className="h-full"
                        >
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {t('التقدم')}
                                    </span>
                                    <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-primary-500 h-2 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('آخر نشاط')}: {course.lastActivity}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('الدرس التالي')}: {course.nextLesson}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{t('الدورات المكتملة')}</h2>
                <DataGrid
                    columns={completedColumns}
                    rows={completedCourses}
                    pageSize={5}
                    checkboxSelection={false}
                />
            </div>
        </div>
    );
} 