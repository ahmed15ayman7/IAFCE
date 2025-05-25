"use client" 
import React from 'react';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';

export default function InstructorQuizzes() {

    const quizzes = [
        {
            id: 1,
            title: 'اختبار نهائي - البرمجة بلغة Python',
            course: 'البرمجة بلغة Python',
            questions: 20,
            duration: 60,
            passingGrade: 60,
            status: 'نشط',
            students: 45,
            averageGrade: '75%',
        },
        {
            id: 2,
            title: 'اختبار الوحدة الأولى - تطوير الويب',
            course: 'تطوير تطبيقات الويب',
            questions: 15,
            duration: 45,
            passingGrade: 70,
            status: 'معلق',
            students: 30,
            averageGrade: '-',
        },
        {
            id: 3,
            title: 'اختبار HTML الأساسي',
            course: 'أساسيات HTML',
            questions: 10,
            duration: 30,
            passingGrade: 65,
            status: 'مكتمل',
            students: 50,
            averageGrade: '85%',
        },
    ];

    const columns = [
        { field: 'title', headerName: ('عنوان الاختبار'), width: 250 },
        { field: 'course', headerName: ('الدورة'), width: 200 },
        { field: 'questions', headerName: ('عدد الأسئلة'), width: 100 },
        { field: 'duration', headerName: ('المدة (دقيقة)'), width: 100 },
        { field: 'passingGrade', headerName: ('درجة النجاح'), width: 100 },
        { field: 'status', headerName: ('الحالة'), width: 100 },
        { field: 'students', headerName: ('عدد الطلاب'), width: 100 },
        { field: 'averageGrade', headerName: ('متوسط الدرجات'), width: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{('إدارة الاختبارات')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-main text-white rounded-md hover:bg-primary-600">
                        {('إنشاء اختبار جديد')}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        {('استيراد أسئلة')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card title={('إجمالي الاختبارات')}>
                    <div className="text-4xl font-bold">{quizzes.length}</div>
                </Card>
                <Card title={('الاختبارات النشطة')}>
                    <div className="text-4xl font-bold">
                        {quizzes.filter(q => q.status === 'نشط').length}
                    </div>
                </Card>
                <Card title={('متوسط الدرجات')}>
                    <div className="text-4xl font-bold">
                        {Math.round(
                            quizzes
                                .filter(q => q.averageGrade !== '-')
                                .reduce((acc, quiz) => acc + parseInt(quiz.averageGrade), 0) /
                            quizzes.filter(q => q.averageGrade !== '-').length
                        )}
                        %
                    </div>
                </Card>
            </div>

            <DataGrid
                columns={columns}
                rows={quizzes}
                pageSize={10}
                checkboxSelection={true}
            />
        </div>
    );
} 