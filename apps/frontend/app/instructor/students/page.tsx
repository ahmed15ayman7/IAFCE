"use client"
import React from 'react';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';

export default function InstructorStudents() {

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
        { field: 'name', headerName: ('اسم الطالب'), width: 200 },
        { field: 'email', headerName: ('البريد الإلكتروني'), width: 200 },
        { field: 'course', headerName: ('الدورة'), width: 200 },
        { field: 'progress', headerName: ('التقدم'), width: 100 },
        { field: 'lastActivity', headerName: ('آخر نشاط'), width: 150 },
        { field: 'grade', headerName: ('الدرجة'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{('الطلاب')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {('إضافة طالب')}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        {('تصدير البيانات')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card title={('إجمالي الطلاب')}>
                    <div className="text-4xl font-bold">{students.length}</div>
                </Card>
                <Card title={('متوسط التقدم')}>

                    <div className="text-4xl font-bold">
                        {Math.round(
                            students.reduce((acc, student) => acc + student.progress, 0) /
                            students.length
                        )}
                        %
                    </div>
                </Card>
                <Card title={('متوسط الدرجات')}>

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