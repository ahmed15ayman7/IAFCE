import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function AdminFinance() {
    const { t } = useTranslation();

    const financialStats = [
        {
            id: 1,
            title: t('الإيرادات الشهرية'),
            value: '250,000 ريال',
            change: '+8%',
            trend: 'up',
        },
        {
            id: 2,
            title: t('المصروفات الشهرية'),
            value: '150,000 ريال',
            change: '+5%',
            trend: 'up',
        },
        {
            id: 3,
            title: t('صافي الربح'),
            value: '100,000 ريال',
            change: '+12%',
            trend: 'up',
        },
        {
            id: 4,
            title: t('المدفوعات المتأخرة'),
            value: '25,000 ريال',
            change: '-3%',
            trend: 'down',
        },
    ];

    const transactions = [
        {
            id: 1,
            date: '2024-04-25',
            type: 'إيراد',
            description: 'رسوم طالب - أحمد محمد',
            amount: '5,000 ريال',
            status: 'مكتمل',
            method: 'تحويل بنكي',
        },
        {
            id: 2,
            date: '2024-04-24',
            type: 'مصروف',
            description: 'رواتب المعلمين',
            amount: '75,000 ريال',
            status: 'مكتمل',
            method: 'تحويل بنكي',
        },
        {
            id: 3,
            date: '2024-04-23',
            type: 'إيراد',
            description: 'رسوم طالب - سارة أحمد',
            amount: '5,000 ريال',
            status: 'مكتمل',
            method: 'بطاقة ائتمان',
        },
    ];

    const columns = [
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'type', headerName: t('النوع'), width: 100 },
        { field: 'description', headerName: t('الوصف'), width: 200 },
        { field: 'amount', headerName: t('المبلغ'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
        { field: 'method', headerName: t('طريقة الدفع'), width: 150 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('الإدارة المالية')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('تقرير مالي')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {t('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {financialStats.map(stat => (
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
                    <h2 className="text-2xl font-semibold mb-4">{t('الإيرادات حسب المصدر')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('رسوم الطلاب')}</span>
                            <span className="font-medium">70%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('الأنشطة')}</span>
                            <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('مصادر أخرى')}</span>
                            <span className="font-medium">10%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('المصروفات حسب النوع')}</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{t('رواتب المعلمين')}</span>
                            <span className="font-medium">50%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('المصاريف التشغيلية')}</span>
                            <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('مصروفات أخرى')}</span>
                            <span className="font-medium">20%</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-2xl font-semibold mb-4">{t('المدفوعات المتأخرة')}</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-md">
                            <p className="font-medium">{t('5 طلاب متأخرين في السداد')}</p>
                            <p className="text-sm text-gray-600">{t('إجمالي المبلغ: 25,000 ريال')}</p>
                        </div>
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            {t('إرسال تذكير')}
                        </button>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('آخر المعاملات')}</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t('بحث...')}
                            className="px-4 py-2 border rounded-md"
                        />
                        <select className="px-4 py-2 border rounded-md">
                            <option value="">{t('جميع الأنواع')}</option>
                            <option value="income">{t('إيرادات')}</option>
                            <option value="expense">{t('مصروفات')}</option>
                        </select>
                    </div>
                </div>
                <DataGrid
                    columns={columns}
                    rows={transactions}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </Card>
        </div>
    );
} 