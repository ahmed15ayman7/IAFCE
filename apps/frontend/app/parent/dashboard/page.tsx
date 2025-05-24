import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function ParentDashboard() {
    const { t } = useTranslation();

    const children = [
        {
            id: 1,
            name: 'أحمد محمد',
            grade: 'الصف الثالث',
            attendance: '95%',
            performance: 'ممتاز',
            lastActivity: '2024-04-25',
            nextExam: 'اختبار الرياضيات - 2024-05-01',
        },
        {
            id: 2,
            name: 'سارة محمد',
            grade: 'الصف الأول',
            attendance: '90%',
            performance: 'جيد جداً',
            lastActivity: '2024-04-24',
            nextExam: 'اختبار العلوم - 2024-05-02',
        },
    ];

    const recentActivities = [
        {
            id: 1,
            child: 'أحمد محمد',
            activity: 'تم تسليم واجب الرياضيات',
            date: '2024-04-25',
            status: 'مكتمل',
        },
        {
            id: 2,
            child: 'سارة محمد',
            activity: 'غياب عن الحصة',
            date: '2024-04-24',
            status: 'غير مكتمل',
        },
        {
            id: 3,
            child: 'أحمد محمد',
            activity: 'حضور اختبار اللغة العربية',
            date: '2024-04-23',
            status: 'مكتمل',
        },
    ];

    const columns = [
        { field: 'child', headerName: t('الابن/الابنة'), width: 200 },
        { field: 'activity', headerName: t('النشاط'), width: 300 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('لوحة التحكم')}</h1>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    {t('تواصل مع الإدارة')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('عدد الأبناء')}</h3>
                    <div className="text-4xl font-bold">{children.length}</div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('متوسط الحضور')}</h3>
                    <div className="text-4xl font-bold">
                        {Math.round(
                            children.reduce(
                                (acc, child) => acc + parseInt(child.attendance),
                                0
                            ) / children.length
                        )}
                        %
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('الإشعارات غير المقروءة')}</h3>
                    <div className="text-4xl font-bold">3</div>
                </Card>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('متابعة الأبناء')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {children.map(child => (
                        <Card key={child.id}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{child.name}</h3>
                                    <p className="text-gray-600">{child.grade}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-600">{child.attendance} {t('حضور')}</p>
                                    <p className="text-blue-600">{child.performance}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">{t('آخر نشاط')}:</span>{' '}
                                    {child.lastActivity}
                                </p>
                                <p>
                                    <span className="font-medium">{t('الاختبار القادم')}:</span>{' '}
                                    {child.nextExam}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{t('آخر الأنشطة')}</h2>
                <DataGrid
                    columns={columns}
                    rows={recentActivities}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>
        </div>
    );
} 