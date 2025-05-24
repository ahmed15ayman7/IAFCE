import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function AdminReports() {
    const { t } = useTranslation();
    const [showNewReportForm, setShowNewReportForm] = useState(false);

    const reportStats = [
        {
            id: 1,
            title: t('إجمالي التقارير'),
            value: '250',
            change: '+15%',
            trend: 'up',
        },
        {
            id: 2,
            title: t('تقارير هذا الشهر'),
            value: '45',
            change: '+8%',
            trend: 'up',
        },
        {
            id: 3,
            title: t('تقارير الطلاب'),
            value: '120',
            change: '+12%',
            trend: 'up',
        },
        {
            id: 4,
            title: t('تقارير المعلمين'),
            value: '85',
            change: '+5%',
            trend: 'up',
        },
    ];

    const reports = [
        {
            id: 1,
            title: t('تقرير أداء الطلاب'),
            type: 'أداء',
            target: 'طلاب',
            date: '2024-04-25',
            status: 'مكتمل',
            views: '850',
        },
        {
            id: 2,
            title: t('تقرير حضور المعلمين'),
            type: 'حضور',
            target: 'معلمون',
            date: '2024-04-24',
            status: 'مكتمل',
            views: '650',
        },
        {
            id: 3,
            title: t('تقرير المالية'),
            type: 'مالية',
            target: 'إدارة',
            date: '2024-04-23',
            status: 'مكتمل',
            views: '120',
        },
    ];

    const columns = [
        { field: 'title', headerName: t('العنوان'), width: 200 },
        { field: 'type', headerName: t('النوع'), width: 100 },
        { field: 'target', headerName: t('المستهدف'), width: 120 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
        { field: 'views', headerName: t('عدد المشاهدات'), width: 120 },
        {
            field: 'actions',
            headerName: t('الإجراءات'),
            width: 200,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        {t('عرض')}
                    </button>
                    <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                        {t('تصدير')}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('التقارير')}</h1>
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                        onClick={() => setShowNewReportForm(true)}
                    >
                        {t('تقرير جديد')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {t('تصدير الكل')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {reportStats.map(stat => (
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
                    <h2 className="text-2xl font-semibold mb-4">{t('توزيع التقارير حسب النوع')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('أداء')}</span>
                            <span className="font-medium">40%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('حضور')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('مالية')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('توزيع التقارير حسب المستهدف')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('طلاب')}</span>
                            <span className="font-medium">50%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('معلمون')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('إدارة')}</span>
                            <span className="font-medium">20%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('إحصائيات المشاهدة')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('متوسط المشاهدات')}</span>
                            <span className="font-medium">540</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('أعلى تقرير مشاهدة')}</span>
                            <span className="font-medium">تقرير أداء الطلاب</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('نسبة التصدير')}</span>
                            <span className="font-medium">75%</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('قائمة التقارير')}</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t('بحث...')}
                            className="px-4 py-2 border rounded-md"
                        />
                        <select className="px-4 py-2 border rounded-md">
                            <option value="">{t('جميع الأنواع')}</option>
                            <option value="performance">{t('أداء')}</option>
                            <option value="attendance">{t('حضور')}</option>
                            <option value="finance">{t('مالية')}</option>
                        </select>
                    </div>
                </div>
                <DataGrid
                    columns={columns}
                    rows={reports}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </Card>

            {showNewReportForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">{t('تقرير جديد')}</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block mb-2">{t('عنوان التقرير')}</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder={t('أدخل عنوان التقرير')}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">{t('نوع التقرير')}</label>
                                <select className="w-full px-4 py-2 border rounded-md">
                                    <option value="performance">{t('أداء')}</option>
                                    <option value="attendance">{t('حضور')}</option>
                                    <option value="finance">{t('مالية')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">{t('المستهدف')}</label>
                                <select className="w-full px-4 py-2 border rounded-md">
                                    <option value="students">{t('طلاب')}</option>
                                    <option value="teachers">{t('معلمون')}</option>
                                    <option value="admin">{t('إدارة')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">{t('الفترة الزمنية')}</label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    <span className="flex items-center">{t('إلى')}</span>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={() => setShowNewReportForm(false)}
                                >
                                    {t('إلغاء')}
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                                >
                                    {t('إنشاء')}
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
} 