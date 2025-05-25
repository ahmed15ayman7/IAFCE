"use client" 
import React from 'react';
import  Card  from '@/components/common/Card';
import DataGrid  from '@/components/common/DataGrid';

export default function ParentReports() {

    const children = [
        {
            id: 1,
            name: 'أحمد محمد',
            grade: 'الصف الثالث',
            overallPerformance: 'ممتاز',
            attendanceRate: '95%',
            homeworkCompletion: '100%',
            examAverage: '98%',
            behavior: 'ممتاز',
        },
        {
            id: 2,
            name: 'سارة محمد',
            grade: 'الصف الأول',
            overallPerformance: 'جيد جداً',
            attendanceRate: '90%',
            homeworkCompletion: '95%',
            examAverage: '92%',
            behavior: 'جيد جداً',
        },
    ];

    const examResults = [
        {
            id: 1,
            child: 'أحمد محمد',
            subject: 'الرياضيات',
            examDate: '2024-04-20',
            grade: '98%',
            rank: 'الأول',
            teacherComment: 'أداء ممتاز، مستوى عالي من الفهم',
        },
        {
            id: 2,
            child: 'أحمد محمد',
            subject: 'اللغة العربية',
            examDate: '2024-04-18',
            grade: '95%',
            rank: 'الثاني',
            teacherComment: 'متميز في القراءة والكتابة',
        },
        {
            id: 3,
            child: 'سارة محمد',
            subject: 'العلوم',
            examDate: '2024-04-19',
            grade: '90%',
            rank: 'الخامس',
            teacherComment: 'تحسن ملحوظ في الفهم',
        },
    ];

    const columns = [
        { field: 'child', headerName: ('الابن/الابنة'), width: 150 },
        { field: 'subject', headerName: ('المادة'), width: 150 },
        { field: 'examDate', headerName: ('تاريخ الاختبار'), width: 150 },
        { field: 'grade', headerName: ('الدرجة'), width: 100 },
        { field: 'rank', headerName: ('الترتيب'), width: 100 },
        { field: 'teacherComment', headerName: ('ملاحظات المعلم'), width: 300 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{('تقارير الأداء')}</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        {('تصدير التقارير')}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        {('طباعة')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {children.map(child => (
                    <Card key={child.id}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">{child.name}</h2>
                                <p className="text-gray-600">{child.grade}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-600">{child.overallPerformance}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium mb-1">{('نسبة الحضور')}</h3>
                                <p className="text-lg">{child.attendanceRate}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">{('إنجاز الواجبات')}</h3>
                                <p className="text-lg">{child.homeworkCompletion}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">{('متوسط الاختبارات')}</h3>
                                <p className="text-lg">{child.examAverage}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">{('السلوك')}</h3>
                                <p className="text-lg">{child.behavior}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{('نتائج الاختبارات')}</h2>
                <DataGrid
                    columns={columns}
                    rows={examResults}
                    pageSize={10}
                    checkboxSelection={true}
                />
            </div>
        </div>
    );
} 