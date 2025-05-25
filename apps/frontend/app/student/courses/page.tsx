"use client"
import React from 'react';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';
import { GridRenderCellParams } from '@mui/x-data-grid';

export default function StudentCourses() {

    const activeCourses = [
        {
            id: 1,
            title: 'البرمجة بلغة Python',
            instructor: 'أحمد محمد',
            progress: 75,
            lastAccessed: '2024-04-25',
            nextLesson: 'الوظائف والدوال',
        },
        {
            id: 2,
            title: 'تطوير تطبيقات الويب',
            instructor: 'سارة أحمد',
            progress: 30,
            lastAccessed: '2024-04-24',
            nextLesson: 'CSS المتقدم',
        },
    ];

    const completedCourses = [
        {
            id: 3,
            title: 'أساسيات HTML',
            instructor: 'محمد علي',
            completionDate: '2024-03-15',
            grade: '95%',
            certificate: 'https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg',
        },
        {
            id: 4,
            title: 'أساسيات CSS',
            instructor: 'فاطمة حسن',
            completionDate: '2024-03-30',
            grade: '88%',
            certificate: 'https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg',
        },
    ];

    const activeColumns = [
        { field: 'title', headerName: 'عنوان الكورس', width: 200 },
        { field: 'instructor', headerName: 'المحاضر', width: 150 },
        { field: 'progress', headerName: 'التقدم', width: 100 },
        { field: 'lastAccessed', headerName: 'آخر دخول', width: 150 },
        { field: 'nextLesson', headerName: 'الدرس التالي', width: 200 },
    ];

    const completedColumns = [
        { field: 'title', headerName: 'عنوان الكورس', width: 200 },
        { field: 'instructor', headerName: 'المحاضر', width: 150 },
        { field: 'completionDate', headerName: 'تاريخ الإكمال', width: 150 },
        { field: 'grade', headerName: 'الدرجة', width: 100 },
        {
            field: 'certificate', headerName: 'الشهادة', width: 400, renderCell: (params: GridRenderCellParams) => {
                return <img src={params.row.certificate} alt="certificate" className="w-16 h-16 border border-primary-main p-1" onClick={()=>{}} />
            }
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">كورساتي</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">الكورسات النشطة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeCourses.map((course) => (
                        <Card
                            key={course.id}
                            title={course.title}
                            description={`المحاضر: ${course.instructor}`}
                            className="h-full"
                        >
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        التقدم
                                    </span>
                                    <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-primary-main h-2 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    آخر دخول: {course.lastAccessed}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    الدرس التالي: {course.nextLesson}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">الكورسات المكتملة</h2>
                <DataGrid
                    columns={completedColumns}
                    rows={completedCourses}
                    pageSize={5}
                    checkboxSelection={false}
                />
            </div>
        </div>
    );
} 