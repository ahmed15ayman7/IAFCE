import React from 'react';
import { Card } from '@/components/common/Card';
import { DataGrid } from '@/components/common/DataGrid';
import { useTranslation } from 'next-i18next';

export default function InstructorStudents() {
    const { t } = useTranslation();

    const students = [
        {
            id: 1,
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            course: 'البرمجة بلغة Python',
            progress: 75,
            lastActivity: '2024-04-25',
            grade: '92%',
        },
        {
            id: 2,
            name: 'سارة أحمد',
            email: 'sara@example.com',
            course: 'تطوير تطبيقات الويب',
            progress: 30,
            lastActivity: '2024-04-24',
            grade: '85%',
        },
        {
            id: 3,
            name: 'محمد علي',
            email: 'mohamed@example.com',
            course: 'أساسيات HTML',
            progress: 100,
            lastActivity: '2024-03-15',
            grade: '95%',
        },
    ];

    const columns = [
        { field: 'name', headerName: t('اسم الطالب'), width: 200 },
        { field: 'email', headerName: t('البريد الإلكتروني'), width: 200 },
        { field: 'course', headerName: t('الدورة'), width: 200 },
        { field: 'progress', headerName: t('التقدم'), width: 100 },
        { field: 'lastActivity', headerName: t('آخر نشاط'), width: 150 },
        { field: 'grade', headerName: t('الدرجة'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('الطلاب')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {t('إضافة طالب')}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('إجمالي الطلاب')}</h3>
                    <div className="text-4xl font-bold">{students.length}</div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('متوسط التقدم')}</h3>
                    <div className="text-4xl font-bold">
                        {Math.round(
                            students.reduce((acc, student) => acc + student.progress, 0) /
                            students.length
                        )}
                        %
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-medium mb-2">{t('متوسط الدرجات')}</h3>
                    <div className="text-4xl font-bold">
                        {Math.round(
                            students.reduce(
                                (acc, student) => acc + parseInt(student.grade),
                                0
                            ) / students.length
                        )}
                        %
                    </div>
                </Card>
            </div>

            <DataGrid
                columns={columns}
                rows={students}
                pageSize={10}
                checkboxSelection={true}
            />
        </div>
    );
} 