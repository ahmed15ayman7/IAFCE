'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    DataGrid,
    Progress,
    Avatar,
    Badge,
    Alert,
    Button,
    Tabs,
    Skeleton,
    EmptyState,
    Tooltip,
    Stepper,
    Modal
} from '@/components/common';
import { quizApi, assignmentApi, courseApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function StudentQuizzes() {
    const [activeTab, setActiveTab] = useState('calendar');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    // استعلامات البيانات
    const { data: activeQuiz, isLoading: isLoadingActiveQuiz } = useQuery({
        queryKey: ['activeQuiz'],
        queryFn: () => quizApi.getActive(),
    });

    const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
        queryKey: ['quizzes'],
        queryFn: () => quizApi.getByStudent(),
    });

    const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
        queryKey: ['assignments'],
        queryFn: () => assignmentApi.getByStudent(),
    });

    const { data: performance, isLoading: isLoadingPerformance } = useQuery({
        queryKey: ['performance'],
        queryFn: () => quizApi.getPerformance(),
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
        ...(quizzes?.map(q => ({ ...q, type: 'quiz' })) || []),
        ...(assignments?.map(a => ({ ...a, type: 'assignment' })) || [])
    ].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // تصفية المهام حسب التاريخ المحدد
    const tasksForSelectedDate = allTasks.filter(task =>
        format(new Date(task.dueDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

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
                items={[
                    { value: 'calendar', label: 'التقويم' },
                    { value: 'list', label: 'القائمة' },
                    { value: 'history', label: 'السجل' },
                    { value: 'analytics', label: 'التحليل' },
                ]}
            />

            {/* الكويز النشط */}
            {activeQuiz && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-primary-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">كويز نشط حالياً</h2>
                                <p className="text-gray-600">{activeQuiz.title}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant="success">مفتوح</Badge>
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
                                    variant="primary"
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
            {activeTab === 'calendar' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* التقويم */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card>
                            <h2 className="text-xl font-bold mb-4">تقويم المهام</h2>
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
                                                    <Badge variant={tasks.some(t => t.status === 'pending') ? 'warning' : 'success'}>
                                                        {tasks.length}
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
                        <Card>
                            <h2 className="text-xl font-bold mb-4">
                                مهام {format(selectedDate, 'd MMMM yyyy', { locale: ar })}
                            </h2>
                            <div className="space-y-4">
                                {tasksForSelectedDate.length > 0 ? (
                                    tasksForSelectedDate.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        >
                                            <Alert variant={task.status === 'pending' ? 'warning' : 'success'}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{task.title}</p>
                                                        <p className="text-sm text-gray-600">{task.courseTitle}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge variant={task.type === 'quiz' ? 'primary' : 'info'}>
                                                            {task.type === 'quiz' ? 'كويز' : 'واجب'}
                                                        </Badge>
                                                        <Button
                                                            variant="link"
                                                            size="sm"
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

            {activeTab === 'list' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <h2 className="text-xl font-bold mb-4">قائمة المهام</h2>
                        <DataGrid
                            data={allTasks}
                            columns={[
                                {
                                    field: 'title',
                                    headerName: 'اسم المهمة',
                                    renderCell: (row) => (
                                        <div className="flex items-center space-x-2">
                                            <Avatar src={row.courseImage} size="sm" />
                                            <span>{row.title}</span>
                                        </div>
                                    )
                                },
                                {
                                    field: 'type',
                                    headerName: 'النوع',
                                    renderCell: (row) => (
                                        <Badge variant={row.type === 'quiz' ? 'primary' : 'info'}>
                                            {row.type === 'quiz' ? 'كويز' : 'واجب'}
                                        </Badge>
                                    )
                                },
                                {
                                    field: 'dueDate',
                                    headerName: 'موعد التسليم',
                                    renderCell: (row) => (
                                        <span>
                                            {format(new Date(row.dueDate), 'd MMMM yyyy', { locale: ar })}
                                        </span>
                                    )
                                },
                                {
                                    field: 'status',
                                    headerName: 'الحالة',
                                    renderCell: (row) => (
                                        <Badge
                                            variant={
                                                row.status === 'pending' ? 'warning' :
                                                    row.status === 'completed' ? 'success' :
                                                        row.status === 'late' ? 'danger' :
                                                            'default'
                                            }
                                        >
                                            {row.status === 'pending' ? 'قيد الانتظار' :
                                                row.status === 'completed' ? 'مكتمل' :
                                                    row.status === 'late' ? 'متأخر' :
                                                        'قيد التصحيح'}
                                        </Badge>
                                    )
                                },
                                {
                                    field: 'score',
                                    headerName: 'الدرجة',
                                    renderCell: (row) => (
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
                                    renderCell: (row) => (
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => setSelectedQuiz(row)}
                                            >
                                                {row.status === 'pending' ? 'حل' : 'مراجعة'}
                                            </Button>
                                            {row.status === 'completed' && (
                                                <Button
                                                    variant="link"
                                                    size="sm"
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

            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <h2 className="text-xl font-bold mb-4">سجل النتائج</h2>
                        <DataGrid
                            data={allTasks.filter(t => t.status === 'completed')}
                            columns={[
                                {
                                    field: 'title',
                                    headerName: 'اسم المهمة',
                                    renderCell: (row) => (
                                        <div className="flex items-center space-x-2">
                                            <Avatar src={row.courseImage} size="sm" />
                                            <span>{row.title}</span>
                                        </div>
                                    )
                                },
                                {
                                    field: 'completedAt',
                                    headerName: 'تاريخ الإنجاز',
                                    renderCell: (row) => (
                                        <span>
                                            {format(new Date(row.completedAt), 'd MMMM yyyy', { locale: ar })}
                                        </span>
                                    )
                                },
                                {
                                    field: 'score',
                                    headerName: 'الدرجة',
                                    renderCell: (row) => (
                                        <span className="font-bold">{row.score}%</span>
                                    )
                                },
                                {
                                    field: 'feedback',
                                    headerName: 'ملاحظات',
                                    renderCell: (row) => (
                                        <Tooltip content={row.feedback}>
                                            <span className="text-gray-600">عرض الملاحظات</span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    field: 'actions',
                                    headerName: 'الإجراءات',
                                    renderCell: (row) => (
                                        <Button
                                            variant="link"
                                            size="sm"
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

            {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card>
                            <h2 className="text-xl font-bold mb-4">تحليل الأداء</h2>
                            <div className="space-y-6">
                                {performance?.strengths.map((strength, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Alert variant="success">
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
                        <Card>
                            <h2 className="text-xl font-bold mb-4">نقاط التحسين</h2>
                            <div className="space-y-6">
                                {performance?.improvements.map((improvement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    >
                                        <Alert variant="warning">
                                            <p className="font-medium">{improvement.title}</p>
                                            <p className="text-sm text-gray-600">{improvement.description}</p>
                                            <div className="mt-2">
                                                <Button
                                                    variant="link"
                                                    size="sm"
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
                    isOpen={!!selectedQuiz}
                    onClose={() => setSelectedQuiz(null)}
                    title={selectedQuiz.title}
                    size="lg"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">{selectedQuiz.courseTitle}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant={selectedQuiz.type === 'quiz' ? 'primary' : 'info'}>
                                        {selectedQuiz.type === 'quiz' ? 'كويز' : 'واجب'}
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
                                <Button variant="primary">
                                    {selectedQuiz.type === 'quiz' ? 'بدء الكويز' : 'بدء الحل'}
                                </Button>
                            )}
                        </div>

                        {selectedQuiz.status !== 'pending' && (
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-primary-50">
                                    <p className="text-gray-600">الدرجة</p>
                                    <p className="text-2xl font-bold">{selectedQuiz.score}%</p>
                                </Card>
                                <Card className="bg-success-50">
                                    <p className="text-gray-600">الوقت المستغرق</p>
                                    <p className="text-2xl font-bold">{selectedQuiz.timeSpent} دقيقة</p>
                                </Card>
                            </div>
                        )}

                        {selectedQuiz.feedback && (
                            <Alert variant="info">
                                <h3 className="font-bold mb-2">ملاحظات المدرس</h3>
                                <p className="text-gray-600">{selectedQuiz.feedback}</p>
                            </Alert>
                        )}

                        {selectedQuiz.aiSuggestions && (
                            <Alert variant="warning">
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