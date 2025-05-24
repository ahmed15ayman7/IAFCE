import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function InstructorDashboard() {
    const { t } = useTranslation();

    const activeCourses = [
        {
            id: 1,
            title: 'البرمجة بلغة Python',
            students: 25,
            completionRate: 80,
        },
        {
            id: 2,
            title: 'تطوير تطبيقات الويب',
            students: 30,
            completionRate: 65,
        },
    ];

    const recentStudents = [
        {
            id: 1,
            name: 'أحمد محمد',
            course: 'البرمجة بلغة Python',
            lastActivity: '2024-04-25',
            progress: 75,
        },
        {
            id: 2,
            name: 'سارة أحمد',
            course: 'تطوير تطبيقات الويب',
            lastActivity: '2024-04-24',
            progress: 90,
        },
    ];

    const columns = [
        { field: 'name', headerName: t('اسم الطالب'), width: 150 },
        { field: 'course', headerName: t('المادة'), width: 150 },
        { field: 'lastActivity', headerName: t('آخر نشاط'), width: 150 },
        { field: 'progress', headerName: t('التقدم'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('لوحة تحكم المعلم')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card
                    title={t('الكورسات النشطة')}
                    description={t('عدد الكورسات التي تدرسها حالياً')}
                    value="4"
                    icon="book"
                    color="primary"
                />

                <Card
                    title={t('إجمالي الطلاب')}
                    description={t('عدد الطلاب في جميع الكورسات')}
                    value="120"
                    icon="users"
                    color="info"
                />

                <Card
                    title={t('معدل الإنجاز')}
                    description={t('متوسط إنجاز الطلاب')}
                    value="75%"
                    icon="chart-line"
                    color="success"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">{t('الكورسات النشطة')}</h2>
                    <div className="space-y-4">
                        {activeCourses.map((course) => (
                            <div key={course.id} className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{course.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t('عدد الطلاب')}: {course.students}
                                    </p>
                                </div>
                                <div className="w-24">
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div
                                            className="h-2 bg-primary-500 rounded-full"
                                            style={{ width: `${course.completionRate}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-right mt-1">{course.completionRate}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">{t('آخر نشاطات الطلاب')}</h2>
                    <DataGrid
                        columns={columns}
                        rows={recentStudents}
                        pageSize={5}
                        checkboxSelection={false}
                    />
                </div>
            </div>
        </div>
    );
} 