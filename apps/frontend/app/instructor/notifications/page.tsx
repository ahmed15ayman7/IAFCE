import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function InstructorNotifications() {
    const { t } = useTranslation();

    const notifications = [
        {
            id: 1,
            title: 'طلب انضمام جديد',
            message: 'طلب أحمد محمد الانضمام إلى دورة البرمجة بلغة Python',
            type: 'success',
            date: '2024-04-25',
            time: '09:00',
            read: false,
            action: 'قبول',
        },
        {
            id: 2,
            title: 'تذكير بموعد الاختبار',
            message: 'اختبار الوحدة الأولى في دورة تطوير تطبيقات الويب غداً الساعة 10 صباحاً',
            type: 'warning',
            date: '2024-04-24',
            time: '15:30',
            read: true,
            action: 'عرض التفاصيل',
        },
        {
            id: 3,
            title: 'تقرير الحضور',
            message: 'تم رفع تقرير الحضور لليوم 2024-04-23',
            type: 'info',
            date: '2024-04-23',
            time: '16:45',
            read: true,
            action: 'عرض التقرير',
        },
        {
            id: 4,
            title: 'تنبيه مهم',
            message: 'تم تغيير موعد المحاضرة القادمة إلى يوم الخميس',
            type: 'error',
            date: '2024-04-22',
            time: '11:20',
            read: false,
            action: 'تأكيد',
        },
    ];

    const columns = [
        { field: 'title', headerName: t('العنوان'), width: 200 },
        { field: 'message', headerName: t('الرسالة'), width: 300 },
        { field: 'type', headerName: t('النوع'), width: 100 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'time', headerName: t('الوقت'), width: 100 },
        { field: 'read', headerName: t('تم القراءة'), width: 100 },
        { field: 'action', headerName: t('الإجراء'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('الإشعارات')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('تمييز الكل كمقروء')}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('حذف الكل')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('إجمالي الإشعارات')}</h3>
                    <div className="text-4xl font-bold">{notifications.length}</div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('الإشعارات غير المقروءة')}</h3>
                    <div className="text-4xl font-bold">
                        {notifications.filter(n => !n.read).length}
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('الإشعارات اليوم')}</h3>
                    <div className="text-4xl font-bold">
                        {notifications.filter(n => n.date === '2024-04-25').length}
                    </div>
                </Card>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('قائمة الإشعارات')}</h2>
                    <div className="flex gap-2">
                        <select className="px-3 py-2 border border-gray-300 rounded-md">
                            <option value="all">{t('جميع الإشعارات')}</option>
                            <option value="unread">{t('غير مقروء')}</option>
                            <option value="today">{t('اليوم')}</option>
                            <option value="week">{t('الأسبوع')}</option>
                            <option value="month">{t('الشهر')}</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-md">
                            <option value="all">{t('جميع الأنواع')}</option>
                            <option value="success">{t('نجاح')}</option>
                            <option value="warning">{t('تحذير')}</option>
                            <option value="info">{t('معلومات')}</option>
                            <option value="error">{t('خطأ')}</option>
                        </select>
                    </div>
                </div>
                <DataGrid
                    columns={columns}
                    rows={notifications}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>
        </div>
    );
} 