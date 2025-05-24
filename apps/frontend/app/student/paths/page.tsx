'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    DataGrid,
    Modal,
    Tabs,
    Progress,
    Avatar,
    Badge,
    Alert,
    Button,
    Stepper,
    Skeleton,
    EmptyState,
    Tooltip
} from '@/components/common';
import { userApi, courseApi, pathApi } from '@/lib/api';
import { motion } from 'framer-motion';

export default function StudentPaths() {
    const [selectedPath, setSelectedPath] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    // استعلامات البيانات
    const { data: paths, isLoading: isLoadingPaths } = useQuery({
        queryKey: ['paths'],
        queryFn: () => pathApi.getByUser(),
    });

    const { data: courses, isLoading: isLoadingCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: () => courseApi.getEnrolledCourses(),
    });

    // تصفية المسارات حسب التبويب النشط
    const filteredPaths = paths?.filter(path => {
        if (activeTab === 'all') return true;
        return path.level === activeTab;
    }) || [];

    if (isLoadingPaths || isLoadingCourses) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height={200} />
                    ))}
                </div>
            </div>
        );
    }

    if (!filteredPaths.length) {
        return (
            <EmptyState
                title="لا توجد مسارات حالية"
                description="يمكنك الانضمام لمسار جديد لتبدأ رحلة التعلم"
                action={
                    <Button variant="primary">
                        انضم لمسار جديد
                    </Button>
                }
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* العنوان والبحث */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">مساراتك الحالية 👋</h1>
                    <p className="text-gray-600">
                        تقدر تبدأ أو تتابع أي مسار تعلم يناسبك
                    </p>
                </div>
                <Button variant="primary" size="lg">
                    انضم لمسار جديد
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                    { value: 'all', label: 'الكل' },
                    { value: 'beginner', label: 'مبتدئ' },
                    { value: 'intermediate', label: 'متوسط' },
                    { value: 'advanced', label: 'متقدم' },
                ]}
            />

            {/* قائمة المسارات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPaths.map((path, index) => (
                    <motion.div
                        key={path.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card
                            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => setSelectedPath(path)}
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{path.title}</h3>
                                        <p className="text-gray-600 mt-1">{path.description}</p>
                                    </div>
                                    <Badge variant={path.level === 'advanced' ? 'danger' : 'success'}>
                                        {path.level}
                                    </Badge>
                                </div>

                                <Progress
                                    value={path.progress}
                                    max={100}
                                    showLabel
                                    label={`${path.progress}%`}
                                />

                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">المهام المكتملة:</span>
                                        <span className="font-bold">{path.completedTasks}</span>
                                    </div>
                                    <Tooltip content="وقت الدراسة المتبقي">
                                        <span className="text-primary-600">{path.remainingTime} ساعة</span>
                                    </Tooltip>
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPath(path);
                                    }}
                                >
                                    تفاصيل المسار
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* تفاصيل المسار */}
            {selectedPath && (
                <Modal
                    isOpen={!!selectedPath}
                    onClose={() => setSelectedPath(null)}
                    title={selectedPath.title}
                    size="lg"
                >
                    <div className="space-y-6">
                        {/* وصف المسار */}
                        <Alert variant="info">
                            <p className="text-gray-600">{selectedPath.description}</p>
                        </Alert>

                        {/* Timeline */}
                        <div>
                            <h3 className="font-bold mb-4">رحلة التعلم</h3>
                            <Stepper
                                steps={selectedPath.milestones.map((milestone, index) => ({
                                    title: milestone.title,
                                    description: milestone.description,
                                    status: milestone.status,
                                }))}
                            />
                        </div>

                        {/* إحصائيات المسار */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-primary-50">
                                <p className="text-gray-600">عدد الكورسات</p>
                                <p className="text-2xl font-bold">{selectedPath.coursesCount}</p>
                            </Card>
                            <Card className="bg-success-50">
                                <p className="text-gray-600">وقت الدراسة</p>
                                <p className="text-2xl font-bold">{selectedPath.studyTime} ساعة</p>
                            </Card>
                            <Card className="bg-warning-50">
                                <p className="text-gray-600">الدروس المكتملة</p>
                                <p className="text-2xl font-bold">{selectedPath.completedLessons}</p>
                            </Card>
                            <Card className="bg-info-50">
                                <p className="text-gray-600">نسبة التفاعل</p>
                                <p className="text-2xl font-bold">{selectedPath.engagement}%</p>
                            </Card>
                        </div>

                        {/* الدورات */}
                        <div>
                            <h3 className="font-bold mb-4">الدورات</h3>
                            <DataGrid
                                data={selectedPath.courses}
                                columns={[
                                    {
                                        field: 'title',
                                        headerName: 'اسم الدورة',
                                        renderCell: (row) => (
                                            <div className="flex items-center space-x-2">
                                                <Avatar src={row.image} size="sm" />
                                                <span>{row.title}</span>
                                            </div>
                                        )
                                    },
                                    { field: 'lessonsCount', headerName: 'عدد الدروس' },
                                    {
                                        field: 'progress',
                                        headerName: 'نسبة الإنجاز',
                                        renderCell: (row) => (
                                            <Progress
                                                value={row.progress}
                                                max={100}
                                                size="sm"
                                                showLabel
                                            />
                                        )
                                    },
                                    {
                                        field: 'actions',
                                        headerName: 'الإجراءات',
                                        renderCell: () => (
                                            <Button variant="link">
                                                ابدأ الآن
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                        </div>

                        {/* الزملاء */}
                        <div>
                            <h3 className="font-bold mb-4">زملاؤك في المسار</h3>
                            <div className="flex flex-wrap gap-4">
                                {selectedPath.peers.map((peer) => (
                                    <div key={peer.id} className="text-center">
                                        <Badge
                                            variant={peer.isOnline ? 'success' : 'default'}
                                            className="absolute top-0 right-0"
                                        >
                                            {peer.isOnline ? 'متصل' : 'غير متصل'}
                                        </Badge>
                                        <Avatar
                                            src={peer.avatar}
                                            size="lg"
                                            className="mb-2"
                                        />
                                        <p className="text-sm font-medium">{peer.name}</p>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => {/* إرسال رسالة */ }}
                                        >
                                            إرسال رسالة
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </motion.div>
    );
} 