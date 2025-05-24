import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function AdminUsers() {
    const { t } = useTranslation();

    const users = [
        {
            id: 1,
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            role: 'طالب',
            grade: 'الصف الثالث',
            status: 'نشط',
            joinDate: '2024-01-15',
        },
        {
            id: 2,
            name: 'أ. سارة خالد',
            email: 'sara@example.com',
            role: 'معلم',
            subject: 'اللغة العربية',
            status: 'نشط',
            joinDate: '2023-09-01',
        },
        {
            id: 3,
            name: 'محمد أحمد',
            email: 'mohamed@example.com',
            role: 'ولي أمر',
            children: '2',
            status: 'نشط',
            joinDate: '2024-02-20',
        },
    ];

    const columns = [
        { field: 'name', headerName: t('الاسم'), width: 150 },
        { field: 'email', headerName: t('البريد الإلكتروني'), width: 200 },
        { field: 'role', headerName: t('الدور'), width: 100 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
        { field: 'joinDate', headerName: t('تاريخ الانضمام'), width: 150 },
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
                <h1 className="text-3xl font-bold">{t('إدارة المستخدمين')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('إضافة مستخدم')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {t('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('إجمالي المستخدمين')}</h3>
                    <div className="text-4xl font-bold">1,250</div>
                    <p className="text-green-500">+5% عن الشهر الماضي</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('المستخدمين النشطين')}</h3>
                    <div className="text-4xl font-bold">1,100</div>
                    <p className="text-green-500">+3% عن الشهر الماضي</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('طلبات التسجيل الجديدة')}</h3>
                    <div className="text-4xl font-bold">25</div>
                    <p className="text-blue-500">5 طلبات في الانتظار</p>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('قائمة المستخدمين')}</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t('بحث...')}
                            className="px-4 py-2 border rounded-md"
                        />
                        <select className="px-4 py-2 border rounded-md">
                            <option value="">{t('جميع الأدوار')}</option>
                            <option value="student">{t('طلاب')}</option>
                            <option value="teacher">{t('معلمون')}</option>
                            <option value="parent">{t('أولياء أمور')}</option>
                        </select>
                    </div>
                </div>
                <DataGrid
                    columns={columns}
                    rows={users}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </Card>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{t('إحصائيات المستخدمين')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h3 className="text-lg font-medium mb-4">{t('توزيع المستخدمين حسب الدور')}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>{t('طلاب')}</span>
                                <span className="font-medium">60%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('معلمون')}</span>
                                <span className="font-medium">20%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('أولياء أمور')}</span>
                                <span className="font-medium">20%</span>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-medium mb-4">{t('نشاط المستخدمين')}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>{t('مستخدمون نشطون اليوم')}</span>
                                <span className="font-medium">850</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('مستخدمون جدد هذا الشهر')}</span>
                                <span className="font-medium">125</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('مستخدمون غير نشطين')}</span>
                                <span className="font-medium">150</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
} 