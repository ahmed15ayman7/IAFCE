import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function InstructorAttendance() {
    const { t } = useTranslation();

    const attendanceRecords = [
        {
            id: 1,
            date: '2024-04-25',
            course: 'البرمجة بلغة Python',
            totalStudents: 45,
            present: 40,
            absent: 5,
            late: 2,
            percentage: '89%',
        },
        {
            id: 2,
            date: '2024-04-24',
            course: 'تطوير تطبيقات الويب',
            totalStudents: 30,
            present: 28,
            absent: 2,
            late: 1,
            percentage: '93%',
        },
        {
            id: 3,
            date: '2024-04-23',
            course: 'أساسيات HTML',
            totalStudents: 50,
            present: 45,
            absent: 5,
            late: 3,
            percentage: '90%',
        },
    ];

    const studentAttendance = [
        {
            id: 1,
            name: 'أحمد محمد',
            course: 'البرمجة بلغة Python',
            attendance: 'حاضر',
            date: '2024-04-25',
            time: '09:00',
            status: 'في الوقت',
        },
        {
            id: 2,
            name: 'سارة أحمد',
            course: 'تطوير تطبيقات الويب',
            attendance: 'حاضر',
            date: '2024-04-24',
            time: '09:15',
            status: 'متأخر',
        },
        {
            id: 3,
            name: 'محمد علي',
            course: 'أساسيات HTML',
            attendance: 'غائب',
            date: '2024-04-23',
            time: '-',
            status: 'غير مسجل',
        },
    ];

    const columns = [
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'course', headerName: t('الدورة'), width: 200 },
        { field: 'totalStudents', headerName: t('إجمالي الطلاب'), width: 100 },
        { field: 'present', headerName: t('حاضر'), width: 100 },
        { field: 'absent', headerName: t('غائب'), width: 100 },
        { field: 'late', headerName: t('متأخر'), width: 100 },
        { field: 'percentage', headerName: t('نسبة الحضور'), width: 100 },
    ];

    const studentColumns = [
        { field: 'name', headerName: t('اسم الطالب'), width: 200 },
        { field: 'course', headerName: t('الدورة'), width: 200 },
        { field: 'attendance', headerName: t('الحضور'), width: 100 },
        { field: 'date', headerName: t('التاريخ'), width: 150 },
        { field: 'time', headerName: t('الوقت'), width: 100 },
        { field: 'status', headerName: t('الحالة'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('تتبع الحضور')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('تسجيل حضور جديد')}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('متوسط نسبة الحضور')}</h3>
                    <div className="text-4xl font-bold">
                        {Math.round(
                            attendanceRecords.reduce(
                                (acc, record) => acc + parseInt(record.percentage),
                                0
                            ) / attendanceRecords.length
                        )}
                        %
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('إجمالي الطلاب')}</h3>
                    <div className="text-4xl font-bold">
                        {attendanceRecords.reduce(
                            (acc, record) => acc + record.totalStudents,
                            0
                        )}
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('أعلى نسبة حضور')}</h3>
                    <div className="text-4xl font-bold">
                        {Math.max(
                            ...attendanceRecords.map(record =>
                                parseInt(record.percentage)
                            )
                        )}
                        %
                    </div>
                </Card>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('سجلات الحضور')}</h2>
                <DataGrid
                    columns={columns}
                    rows={attendanceRecords}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{t('حضور الطلاب')}</h2>
                <DataGrid
                    columns={studentColumns}
                    rows={studentAttendance}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>
        </div>
    );
} 