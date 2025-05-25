"use client" 
import React from 'react';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';

export default function ParentDailyTracking() {

    const children = [
        {
            id: 1,
            name: 'أحمد محمد',
            grade: 'الصف الثالث',
            todayStatus: 'حاضر',
            lastLogin: 'اليوم - 08:30 صباحاً',
            currentLesson: 'الرياضيات',
            nextLesson: 'اللغة العربية',
        },
        {
            id: 2,
            name: 'سارة محمد',
            grade: 'الصف الأول',
            todayStatus: 'حاضر',
            lastLogin: 'اليوم - 08:45 صباحاً',
            currentLesson: 'اللغة العربية',
            nextLesson: 'العلوم',
        },
    ];

    const dailySchedule = [
        {
            id: 1,
            child: 'أحمد محمد',
            subject: 'الرياضيات',
            time: '08:30 - 09:15',
            teacher: 'أ. محمد أحمد',
            status: 'مكتمل',
            homework: 'تم تسليم الواجب',
        },
        {
            id: 2,
            child: 'أحمد محمد',
            subject: 'اللغة العربية',
            time: '09:30 - 10:15',
            teacher: 'أ. سارة خالد',
            status: 'جاري',
            homework: 'لم يتم تسليمه بعد',
        },
        {
            id: 3,
            child: 'سارة محمد',
            subject: 'اللغة العربية',
            time: '08:45 - 09:30',
            teacher: 'أ. سارة خالد',
            status: 'مكتمل',
            homework: 'تم تسليم الواجب',
        },
    ];

    const columns = [
        { field: 'child', headerName: ('الابن/الابنة'), width: 150 },
        { field: 'subject', headerName: ('المادة'), width: 150 },
        { field: 'time', headerName: ('الوقت'), width: 150 },
        { field: 'teacher', headerName: ('المعلم'), width: 150 },
        { field: 'status', headerName: ('الحالة'), width: 100 },
        { field: 'homework', headerName: ('الواجب'), width: 200 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{('المتابعة اليومية')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {('إرسال رسالة للمعلم')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {('طلب اجتماع')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {children.map(child => (
                    <Card key={child.id} title={child.name}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-600">{child.grade}</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-${child.todayStatus === 'حاضر' ? 'green' : 'red'}-600`}>
                                    {child.todayStatus}
                                </p>
                                <p className="text-sm text-gray-500">{child.lastLogin}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium mb-1">{('الحصة الحالية')}</h3>
                                <p className="text-lg">{child.currentLesson}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">{('الحصة القادمة')}</h3>
                                <p className="text-lg">{child.nextLesson}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{('الجدول اليومي')}</h2>
                <DataGrid
                    columns={columns}
                    rows={dailySchedule}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>
        </div>
    );
} 