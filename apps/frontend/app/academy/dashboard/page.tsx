import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function AcademyDashboard() {
    const { t } = useTranslation();

    const stats = [
        {
            id: 1,
            title: t('إجمالي المدارس'),
            value: '25',
            change: '+3',
            trend: 'up',
        },
        {
            id: 2,
            title: t('إجمالي الفرق'),
            value: '120',
            change: '+15',
            trend: 'up',
        },
        {
            id: 3,
            title: t('الأحداث القادمة'),
            value: '8',
            change: '+2',
            trend: 'up',
        },
        {
            id: 4,
            title: t('التقارير المعلقة'),
            value: '12',
            change: '-5',
            trend: 'down',
        },
    ];

    const teams = [
        {
            id: 1,
            name: t('فريق الرياض'),
            school: t('مدرسة الرياض النموذجية'),
            members: '15',
            status: t('نشط'),
            lastActivity: '2024-04-25',
        },
        {
            id: 2,
            name: t('فريق جدة'),
            school: t('مدرسة جدة الدولية'),
            members: '12',
            status: t('نشط'),
            lastActivity: '2024-04-24',
        },
        {
            id: 3,
            name: t('فريق الدمام'),
            school: t('مدرسة الدمام الأهلية'),
            members: '10',
            status: t('غير نشط'),
            lastActivity: '2024-04-20',
        },
    ];

    const events = [
        {
            id: 1,
            title: t('مسابقة البرمجة'),
            date: '2024-05-15',
            location: t('مدرسة الرياض النموذجية'),
            status: t('قادم'),
            participants: '50',
        },
        {
            id: 2,
            title: t('ورشة عمل الروبوتات'),
            date: '2024-05-20',
            location: t('مدرسة جدة الدولية'),
            status: t('قادم'),
            participants: '30',
        },
        {
            id: 3,
            title: t('معرض المشاريع'),
            date: '2024-05-25',
            location: t('مدرسة الدمام الأهلية'),
            status: t('قادم'),
            participants: '40',
        },
    ];

    const reports = [
        {
            id: 1,
            school: t('مدرسة الرياض النموذجية'),
            type: t('أداء الفرق'),
            date: '2024-04-25',
            status: t('مكتمل'),
            actions: t('عرض'),
        },
        {
            id: 2,
            school: t('مدرسة جدة الدولية'),
            type: t('تقييم الأحداث'),
            date: '2024-04-24',
            status: t('مكتمل'),
            actions: t('عرض'),
        },
        {
            id: 3,
            school: t('مدرسة الدمام الأهلية'),
            type: t('تقرير الميزانية'),
            date: '2024-04-23',
            status: t('معلق'),
            actions: t('مراجعة'),
        },
    ];

    const teamColumns = [
        { field: 'name', headerName: t('اسم الفريق'), width: 200 },
        { field: 'school', headerName: t('المدرسة'), width: 200 },
        { field: 'members', headerName: t('عدد الأعضاء'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 150 },
        { field: 'lastActivity', headerName: t('آخر نشاط'), width: 150 },
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
                        {t('تعديل')}
                    </button>
                </div>
            ),
        },
    ];

    const eventColumns = [
        { field: 'title', headerName: t('العنوان'), width: 200 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'location', headerName: t('المكان'), width: 200 },
        { field: 'status', headerName: t('الحالة'), width: 150 },
        { field: 'participants', headerName: t('عدد المشاركين'), width: 150 },
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
                        {t('تعديل')}
                    </button>
                </div>
            ),
        },
    ];

    const reportColumns = [
        { field: 'school', headerName: t('المدرسة'), width: 200 },
        { field: 'type', headerName: t('نوع التقرير'), width: 200 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'status', headerName: t('الحالة'), width: 150 },
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
                        {t('تحميل')}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('لوحة تحكم الأكاديمية')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('فريق جديد')}
                    </button>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('حدث جديد')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map(stat => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">{t('الفرق')}</h2>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                            {t('إضافة فريق')}
                        </button>
                    </div>
                    <DataGrid
                        columns={teamColumns}
                        rows={teams}
                        pageSize={5}
                        checkboxSelection={true}
                    />
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">{t('الأحداث القادمة')}</h2>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                            {t('إضافة حدث')}
                        </button>
                    </div>
                    <DataGrid
                        columns={eventColumns}
                        rows={events}
                        pageSize={5}
                        checkboxSelection={true}
                    />
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('تقارير المدارس')}</h2>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                            {t('تقرير جديد')}
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                            {t('تصدير الكل')}
                        </button>
                    </div>
                </div>
                <DataGrid
                    columns={reportColumns}
                    rows={reports}
                    pageSize={5}
                    checkboxSelection={true}
                />
            </Card>
        </div>
    );
} 