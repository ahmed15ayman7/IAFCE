import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function AdminNotifications() {
    const { t } = useTranslation();
    const [showNewNotificationForm, setShowNewNotificationForm] = useState(false);

    const notificationStats = [
        {
            id: 1,
            title: t('إجمالي الإشعارات'),
            value: '1,250',
            change: '+15%',
            trend: 'up',
        },
        {
            id: 2,
            title: t('الإشعارات النشطة'),
            value: '850',
            change: '+8%',
            trend: 'up',
        },
        {
            id: 3,
            title: t('الإشعارات المقرؤة'),
            value: '1,000',
            change: '+12%',
            trend: 'up',
        },
        {
            id: 4,
            title: t('الإشعارات المهمة'),
            value: '50',
            change: '+5%',
            trend: 'up',
        },
    ];

    const notifications = [
        {
            id: 1,
            title: t('تذكير بدفع الرسوم'),
            content: t('يرجى دفع رسوم الفصل الدراسي الثاني قبل نهاية الشهر'),
            type: 'مهم',
            target: 'طلاب',
            date: '2024-04-25',
            status: 'نشط',
            readCount: '850',
        },
        {
            id: 2,
            title: t('اجتماع أولياء الأمور'),
            content: t('سيتم عقد اجتماع أولياء الأمور يوم السبت القادم'),
            type: 'معلومة',
            target: 'أولياء أمور',
            date: '2024-04-24',
            status: 'نشط',
            readCount: '650',
        },
        {
            id: 3,
            title: t('تحديث المنهج'),
            content: t('تم تحديث منهج الرياضيات للصف الثالث'),
            type: 'تحديث',
            target: 'معلمون',
            date: '2024-04-23',
            status: 'مكتمل',
            readCount: '120',
        },
    ];

    const columns = [
        { field: 'title', headerName: t('العنوان'), width: 200 },
        { field: 'type', headerName: t('النوع'), width: 100 },
        { field: 'target', headerName: t('المستهدف'), width: 120 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
        { field: 'readCount', headerName: t('عدد القراءات'), width: 120 },
        {
            field: 'actions',
            headerName: t('الإجراءات'),
            width: 200,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        {t('تعديل')}
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                        {t('حذف')}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('الإشعارات العامة')}</h1>
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                        onClick={() => setShowNewNotificationForm(true)}
                    >
                        {t('إشعار جديد')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {t('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {notificationStats.map(stat => (
                    <Card key={stat.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className={`text-${stat.trend === 'up' ? 'green' : 'red'}-500`}>
                                {stat.change}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('توزيع الإشعارات حسب النوع')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('مهم')}</span>
                            <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('معلومة')}</span>
                            <span className="font-medium">50%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('تحديث')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('توزيع الإشعارات حسب المستهدف')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('طلاب')}</span>
                            <span className="font-medium">40%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('معلمون')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('أولياء أمور')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('إحصائيات القراءة')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('متوسط وقت القراءة')}</span>
                            <span className="font-medium">2.5 دقيقة</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('نسبة القراءة')}</span>
                            <span className="font-medium">85%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('أعلى إشعار قراءة')}</span>
                            <span className="font-medium">تذكير بدفع الرسوم</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('قائمة الإشعارات')}</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t('بحث...')}
                            className="px-4 py-2 border rounded-md"
                        />
                        <select className="px-4 py-2 border rounded-md">
                            <option value="">{t('جميع الأنواع')}</option>
                            <option value="important">{t('مهم')}</option>
                            <option value="info">{t('معلومة')}</option>
                            <option value="update">{t('تحديث')}</option>
                        </select>
                    </div>
                </div>
                <DataGrid
                    columns={columns}
                    rows={notifications}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </Card>

            {showNewNotificationForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">{t('إشعار جديد')}</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block mb-2">{t('العنوان')}</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder={t('أدخل عنوان الإشعار')}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">{t('المحتوى')}</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-md"
                                    rows={4}
                                    placeholder={t('أدخل محتوى الإشعار')}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">{t('النوع')}</label>
                                <select className="w-full px-4 py-2 border rounded-md">
                                    <option value="important">{t('مهم')}</option>
                                    <option value="info">{t('معلومة')}</option>
                                    <option value="update">{t('تحديث')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">{t('المستهدف')}</label>
                                <select className="w-full px-4 py-2 border rounded-md">
                                    <option value="students">{t('طلاب')}</option>
                                    <option value="teachers">{t('معلمون')}</option>
                                    <option value="parents">{t('أولياء أمور')}</option>
                                    <option value="all">{t('الجميع')}</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={() => setShowNewNotificationForm(false)}
                                >
                                    {t('إلغاء')}
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                                >
                                    {t('إرسال')}
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
} 