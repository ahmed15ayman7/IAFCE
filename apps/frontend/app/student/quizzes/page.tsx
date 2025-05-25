'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import Skeleton from '@/components/common/Skeleton';
import Tooltip from '@/components/common/Tooltip';
import Modal from '@/components/common/Modal';
import Avatar from '@/components/common/Avatar';
import EmptyState from '@/components/common/EmptyState';
import Progress from '@/components/common/Progress';
import DataGrid from '@/components/common/DataGrid';
import { quizApi, assignmentApi, courseApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Alert } from '@mui/material';
import { FaCalendar, FaList, FaHistory, FaChartLine } from 'react-icons/fa';
import { Quiz } from '@shared/prisma';
interface IQuiz {
    activeQuiz: Quiz,
    quizzes: Quiz[],
    assignments: {
        id: string;
        title: string;
        description: string;
        courseId: string;
        courseTitle: string;
        courseImage: string;
        questionsCount: number;
    }[],
    performance: {
        strengths: {
            title: string;
            description: string;
        }[],
        improvements: {
            title: string;
            description: string;
        }[]
    }
}
let initialData: IQuiz = {
    activeQuiz: {
        id: '',
        title: 'امتحان في html',
        description: 'امتحان في html علي جزئية التصميم',
        lessonId: '',
        timeLimit: 10,
        passingScore: 50,
        upComing: false,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    quizzes: [
        {
            id: '',
            title: 'امتحان في css',
            description: 'امتحان في css علي جزئية التصميم',
            lessonId: '',
            timeLimit: 10,
            passingScore: 50,
            upComing: false,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '',
            title: 'امتحان في js',
            description: 'امتحان في js علي جزئية التصميم',
            lessonId: '',
            timeLimit: 10,
            passingScore: 50,
            upComing: false,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '',
            title: 'امتحان في react',
            description: 'امتحان في react علي جزئية التصميم',
            lessonId: '',
            timeLimit: 10,
            passingScore: 50,
            upComing: false,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
    assignments: [
        {
            id: '',
            title: 'واجب في html',
            description: 'واجب في html علي جزئية التصميم',
            courseId: '',
            courseTitle: '',
            courseImage: '',
            questionsCount: 10,
        },
        {
            id: '',
            title: 'واجب في css',
            description: 'واجب في css علي جزئية التصميم',
            courseId: '',
            courseTitle: '',
            courseImage: '',
            questionsCount: 20,
        },
        {
            id: '',
            title: 'واجب في js',
            description: 'واجب في js علي جزئية التصميم',
            courseId: '',
            courseTitle: '',
            courseImage: '',
            questionsCount: 30,
        }
    ],
    performance: {
        strengths: [
            {
                title: 'قوة 1',
                description: 'وصف قوة 1',
            },

            {

                title: 'قوة 1',
                description: 'وصف قوة 1',
            },
        ],
        improvements: [
            {
                title: 'تحسين 1',
                description: 'وصف تحسين 1',
            },
            {
                title: 'تحسين 2',
                description: 'وصف تحسين 2',
            },
        ]
    }
}
let getActiveQuizData = async () => {
    let { success, data } = await quizApi.getActive();
    if (success) {
        return data;
    }
    return null;
}
let getQuizzesData = async () => {
    let { success, data } = await quizApi.getByStudent();
    if (success) {
        return data;
    }
    return null;
}
let getAssignmentsData = async () => {
    let { success, data } = await assignmentApi.getByStudent();
    if (success) {
        return data;
    }
    return null;
}
let getPerformanceData = async () => {
    let { success, data } = await quizApi.getPerformance();
    if (success) {
        return data;
    }
    return null;
}

export default function StudentQuizzes() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedQuiz1, setSelectedQuiz] = useState(null);

    // استعلامات البيانات
    const { data: activeQuiz, isLoading: isLoadingActiveQuiz } = useQuery({
        queryKey: ['activeQuiz'],
        queryFn: () => getActiveQuizData(),
    });

    const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
        queryKey: ['quizzes'],
        queryFn: () => getQuizzesData(),
    });

    const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
        queryKey: ['assignments'],
        queryFn: () => getAssignmentsData(),
    });

    const { data: performance, isLoading: isLoadingPerformance } = useQuery({
        queryKey: ['performance'],
        queryFn: () => getPerformanceData(),
    });

    if (isLoadingActiveQuiz || isLoadingQuizzes || isLoadingAssignments || isLoadingPerformance) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton height={400} />
                    <Skeleton height={400} />
                </div>
            </div>
        );
    }

    // دمج الكويزات والواجبات
    const allTasks = [
        ...(quizzes?.map((q: any) => ({ ...q, type: 'quiz' })) || []),
        ...(assignments?.map((a: any) => ({ ...a, type: 'assignment' })) || [])
    ].sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    // تصفية المهام حسب التاريخ المحدد
    const tasksForSelectedDate = allTasks.filter(task =>
        format(new Date(task.dueDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
    let selectedQuiz = initialData.activeQuiz || selectedQuiz1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* العنوان */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">كويزاتي وواجباتي 📚</h1>
                    <p className="text-gray-600">
                        تابع تقدمك في الاختبارات والواجبات
                    </p>
                </div>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { value: 0, label: 'التقويم', icon: <FaCalendar />, content: <></> },
                    { value: 1, label: 'القائمة', icon: <FaList />, content: <></> },
                    { value: 2, label: 'السجل', icon: <FaHistory />, content: <></> },
                    { value: 3, label: 'التحليل', icon: <FaChartLine />, content: <></> },
                ]}
            />

            {/* الكويز النشط */}
            {activeQuiz && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-primary-50" title="كويز نشط حالياً">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">{activeQuiz.title}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant="dot" color="success">
                                        <span>مفتوح</span>
                                    </Badge>
                                    <span className="text-sm text-gray-600">
                                        {activeQuiz.questionsCount} سؤال
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {activeQuiz.timeLimit} دقيقة
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <Progress
                                    value={activeQuiz.remainingTime}
                                    max={activeQuiz.timeLimit}
                                    showLabel
                                    label={`${activeQuiz.remainingTime} دقيقة متبقية`}
                                />
                                <Button
                                    variant="contained"
                                    className="mt-4"
                                    onClick={() => setSelectedQuiz(activeQuiz)}
                                >
                                    مواصلة الحل
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* محتوى التبويبات */}
            {activeTab === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* التقويم */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card title="تقويم المهام">
                            <div className="grid grid-cols-7 gap-2">
                                {Array.from({ length: 30 }, (_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + i);
                                    const tasks = allTasks.filter(task =>
                                        format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                                    );
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: i * 0.02 }}
                                            className={`p-2 rounded-lg cursor-pointer ${format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                                ? 'bg-primary-100'
                                                : 'hover:bg-gray-100'
                                                }`}
                                            onClick={() => setSelectedDate(date)}
                                        >
                                            <p className="text-sm text-center">
                                                {format(date, 'd', { locale: ar })}
                                            </p>
                                            {tasks.length > 0 && (
                                                <div className="flex justify-center mt-2">
                                                    <Badge variant={tasks.some((t: any) => t.status === 'pending') ? 'dot' : 'dot'} color={tasks.some((t: any) => t.status === 'pending') ? 'warning' : 'success'}>
                                                        <span>{tasks.length}</span>
                                                    </Badge>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </Card>
                    </motion.div>

                    {/* مهام اليوم المحدد */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card title={`مهام ${format(selectedDate, 'd MMMM yyyy', { locale: ar })}`}>
                            <div className="space-y-4">
                                {tasksForSelectedDate.length > 0 ? (
                                    tasksForSelectedDate.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        >
                                            <Alert variant={task.status === 'pending' ? 'outlined' : 'filled'} color={task.status === 'pending' ? 'warning' : 'success'}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{task.title}</p>
                                                        <p className="text-sm text-gray-600">{task.courseTitle}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge variant={task.type === 'quiz' ? 'standard' : 'dot'} color={task.type === 'quiz' ? 'primary' : 'info'}>
                                                            <span>{task.type === 'quiz' ? 'كويز' : 'واجب'}</span>
                                                        </Badge>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() => setSelectedQuiz(task)}
                                                        >
                                                            {task.status === 'pending' ? 'حل' : 'مراجعة'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Alert>
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        title="لا توجد مهام في هذا اليوم"
                                        description="يمكنك اختيار يوم آخر لعرض المهام"
                                    />
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            )}

            {activeTab === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card title="قائمة المهام">
                        <DataGrid
                            rows={allTasks}
                            columns={[
                                {
                                    field: 'title',
                                    headerName: 'اسم المهمة',
                                    renderCell: (row: any) => (
                                        <div className="flex items-center space-x-2">
                                            <Avatar src={row.courseImage} size="sm" />
                                            <span>{row.title}</span>
                                        </div>
                                    )
                                },
                                {
                                    field: 'type',
                                    headerName: 'النوع',
                                    renderCell: (row: any) => (
                                        <Badge variant={row.type === 'quiz' ? 'standard' : 'dot'} color={row.type === 'quiz' ? 'primary' : 'info'}>
                                            <span>{row.type === 'quiz' ? 'كويز' : 'واجب'}</span>
                                        </Badge>
                                    )
                                },
                                {
                                    field: 'dueDate',
                                    headerName: 'موعد التسليم',
                                    renderCell: (row: any) => (
                                        <span>
                                            {format(new Date(row.dueDate), 'd MMMM yyyy', { locale: ar })}
                                        </span>
                                    )
                                },
                                {
                                    field: 'status',
                                    headerName: 'الحالة',
                                    renderCell: (row: any) => (
                                        <Badge
                                            variant={
                                                row.status === 'pending' ? 'dot' :
                                                    row.status === 'completed' ? 'dot' :
                                                        row.status === 'late' ? 'dot' :
                                                            'dot'
                                            }
                                            color={(row.status === 'pending' ? 'warning' :
                                                row.status === 'completed' ? 'success' :
                                                    row.status === 'late' ? 'error' :
                                                        'default') as any}
                                        >
                                            <span>{row.status === 'pending' ? 'قيد الانتظار' :
                                                row.status === 'completed' ? 'مكتمل' :
                                                    row.status === 'late' ? 'متأخر' :
                                                        'قيد التصحيح'}</span>
                                        </Badge>
                                    )
                                },
                                {
                                    field: 'score',
                                    headerName: 'الدرجة',
                                    renderCell: (row: any) => (
                                        row.score ? (
                                            <span className="font-bold">{row.score}%</span>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )
                                    )
                                },
                                {
                                    field: 'actions',
                                    headerName: 'الإجراءات',
                                    renderCell: (row: any) => (
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => setSelectedQuiz(row)}
                                            >
                                                {row.status === 'pending' ? 'حل' : 'مراجعة'}
                                            </Button>
                                            {row.status === 'completed' && (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {/* طلب إعادة تصحيح */ }}
                                                >
                                                    إعادة تصحيح
                                                </Button>
                                            )}
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </motion.div>
            )}

            {activeTab === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card title="سجل النتائج">
                        <DataGrid
                            rows={allTasks.filter((t: any) => t.status === 'completed')}
                            columns={[
                                {
                                    field: 'title',
                                    headerName: 'اسم المهمة',
                                    renderCell: (row: any) => (
                                        <div className="flex items-center space-x-2">
                                            <Avatar src={row.courseImage} size="sm" />
                                            <span>{row.title}</span>
                                        </div>
                                    )
                                },
                                {
                                    field: 'completedAt',
                                    headerName: 'تاريخ الإنجاز',
                                    renderCell: (row: any) => (
                                        <span>
                                            {format(new Date(row.completedAt), 'd MMMM yyyy', { locale: ar })}
                                        </span>
                                    )
                                },
                                {
                                    field: 'score',
                                    headerName: 'الدرجة',
                                    renderCell: (row: any) => (
                                        <span className="font-bold">{row.score}%</span>
                                    )
                                },
                                {
                                    field: 'feedback',
                                    headerName: 'ملاحظات',
                                    renderCell: (row: any) => (
                                        <Tooltip title={row.feedback}>
                                            <span className="text-gray-600">عرض الملاحظات</span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    field: 'actions',
                                    headerName: 'الإجراءات',
                                    renderCell: (row: any) => (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setSelectedQuiz(row)}
                                        >
                                            استعراض الحل
                                        </Button>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </motion.div>
            )}

            {activeTab === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card title="تحليل الأداء">
                            <div className="space-y-6">
                                {(performance?.strengths || initialData.performance.strengths).map((strength: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Alert variant="filled" color="success">
                                            <p className="font-medium">{strength.title}</p>
                                            <p className="text-sm text-gray-600">{strength.description}</p>
                                        </Alert>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card title="نقاط التحسين">
                            <div className="space-y-6">
                                {(performance?.improvements || initialData.performance.improvements).map((improvement: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    >
                                        <Alert variant="filled" color="warning">
                                            <p className="font-medium">{improvement.title}</p>
                                            <p className="text-sm text-gray-600">{improvement.description}</p>
                                            <div className="mt-2">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {/* عرض تمارين مقترحة */ }}
                                                >
                                                    عرض تمارين مقترحة
                                                </Button>
                                            </div>
                                        </Alert>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            )}

            {/* نافذة الكويز/الواجب */}
            {selectedQuiz && (
                <Modal
                    open={!!selectedQuiz}
                    onClose={() => setSelectedQuiz(null)}
                    title={selectedQuiz.title}
                    maxWidth="lg"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">{selectedQuiz.courseTitle}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant={selectedQuiz.type === 'quiz' ? 'standard' : 'dot'} color={selectedQuiz.type === 'quiz' ? 'primary' : 'info'}>
                                        <span>{selectedQuiz.type === 'quiz' ? 'كويز' : 'واجب'}</span>
                                    </Badge>
                                    <span className="text-sm text-gray-600">
                                        {selectedQuiz.questionsCount} سؤال
                                    </span>
                                    {selectedQuiz.timeLimit && (
                                        <span className="text-sm text-gray-600">
                                            {selectedQuiz.timeLimit} دقيقة
                                        </span>
                                    )}
                                </div>
                            </div>
                            {selectedQuiz.status === 'pending' && (
                                <Button variant="contained">
                                    {selectedQuiz.type === 'quiz' ? 'بدء الكويز' : 'بدء الحل'}
                                </Button>
                            )}
                        </div>

                        {selectedQuiz.status !== 'pending' && (
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-primary-50" title="الدرجة">
                                    <p className="text-2xl font-bold">{selectedQuiz.score}%</p>
                                </Card>
                                <Card className="bg-success-50" title="الوقت المستغرق">
                                    <p className="text-2xl font-bold">{selectedQuiz.timeSpent} دقيقة</p>
                                </Card>
                            </div>
                        )}

                        {selectedQuiz.feedback && (
                            <Alert variant="filled" color="info">
                                <h3 className="font-bold mb-2">ملاحظات المدرس</h3>
                                <p className="text-gray-600">{selectedQuiz.feedback}</p>
                            </Alert>
                        )}

                        {selectedQuiz.aiSuggestions && (
                            <Alert variant="filled" color="warning">
                                <h3 className="font-bold mb-2">اقتراحات ذكية</h3>
                                <p className="text-gray-600">{selectedQuiz.aiSuggestions}</p>
                            </Alert>
                        )}
                    </div>
                </Modal>
            )}
        </motion.div>
    );
} 