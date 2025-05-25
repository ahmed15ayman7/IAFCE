"use client"
import React from 'react';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';

export default function InstructorDashboard() {

    const activeCourses = [
        {
            id: 1,
            title: 'البرمجة بلغة Python',
            students: 25,
            completionRate: 80,
        },
        {
            id: 2,
            title: 'تطوير تطبيقات الويب',
            students: 30,
            completionRate: 65,
        },
        {
            id: 3,
            title: 'تطوير تطبيقات الويب',
            students: 20,
            completionRate: 75,
        },
        {
            id: 4,
            title: 'تطوير تطبيقات الويب',
            students: 22,
            completionRate: 95,
        },
    ];

    const recentStudents = [
        {
            id: 1,
            name: 'أحمد محمد',
            course: 'البرمجة بلغة Python',
            lastActivity: '2024-04-25',
            progress: 75,
        },
        {
            id: 2,
            name: 'سارة أحمد',
            course: 'تطوير تطبيقات الويب',
            lastActivity: '2024-04-24',
            progress: 90,
        },
        {
            id: 3,
            name: 'سارة أحمد',
            course: 'تطوير تطبيقات الويب',
            lastActivity: '2024-04-24',
            progress: 90,
        },
        {
            id: 4,
            name: 'سارة أحمد',
            course: 'تطوير تطبيقات الويب',
            lastActivity: '2024-04-24',
            progress: 90,
        },
    ];

    const columns = [
        { field: 'name', headerName: ('اسم الطالب'), width: 150 },
        { field: 'course', headerName: ('المادة'), width: 150 },
        { field: 'lastActivity', headerName: ('آخر نشاط'), width: 150 },
        { field: 'progress', headerName: ('التقدم'), width: 100 },
    ];
    let course = {
        title: 'البرمجة بلغة Python',
        students: 25,
        completionRate: 80,
    }
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1 className="text-3xl font-bold mb-8">{('لوحة تحكم المعلم')}</h1> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card
                    title='الكورسات النشطة'
                // description='عدد الكورسات التي تدرسها حالياً'
                // variant="course"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                عدد الطلاب: {course.students}
                            </p>
                        </div>
                        <div className="w-24">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div
                                    className="h-2 bg-primary-main rounded-full"
                                    style={{ width: `${course.completionRate}%` }}
                                />
                            </div>
                            <p className="text-sm text-right mt-1">{course.completionRate}%</p>
                        </div>
                    </div>
                </Card>

                <Card
                    title='إجمالي الطلاب'
                // description='عدد الطلاب في جميع الكورسات'
                // variant="course"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                عدد الطلاب: {course.students}
                            </p>
                        </div>
                        <div className="w-24">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div
                                    className="h-2 bg-primary-main rounded-full"
                                    style={{ width: `${course.completionRate}%` }}
                                />
                            </div>
                            <p className="text-sm text-right mt-1">{course.completionRate}%</p>
                        </div>
                    </div>
                </Card>

                <Card
                    title='معدل الإنجاز'
                // description='متوسط إنجاز الطلاب'
                // variant="course"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                عدد الطلاب: {course.students}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">الكورسات النشطة</h2>
                    <div className="space-y-4">
                        {activeCourses.map((course) => (
                            <div key={course.id} className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{course.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        عدد الطلاب: {course.students}
                                    </p>
                                </div>
                                <div className="w-24">
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div
                                            className="h-2 bg-primary-main rounded-full"
                                            style={{ width: `${course.completionRate}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-right mt-1">{course.completionRate}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">{('آخر نشاطات الطلاب')}</h2>
                    <DataGrid
                        columns={columns}
                        rows={recentStudents}
                        pageSize={5}
                        checkboxSelection={false}
                    />
                </div>
            </div>
        </div>
    );
}