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
    Stepper
} from '@/components/common';
import { userApi, courseApi, notificationApi, achievementApi } from '@/lib/api';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // استعلامات البيانات
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userApi.getProfile(),
    });

    const { data: courses, isLoading: isLoadingCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: () => courseApi.getEnrolledCourses(),
    });

    const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationApi.getUnread(),
    });

    const { data: achievements, isLoading: isLoadingAchievements } = useQuery({
        queryKey: ['achievements'],
        queryFn: () => achievementApi.getByUser(),
    });

    if (isLoadingProfile || isLoadingCourses || isLoadingNotifications || isLoadingAchievements) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} height={120} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton height={300} />
                    <Skeleton height={300} />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* العنوان والترحيب */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">مرحباً بك، {profile?.name} 👋</h1>
                    <p className="text-gray-600">
                        هذه نظرة عامة على تقدمك الدراسي
                    </p>
                </div>
                <Button variant="primary" size="lg">
                    تحديث الملف الشخصي
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                    { value: 'overview', label: 'نظرة عامة' },
                    { value: 'courses', label: 'دوراتي' },
                    { value: 'achievements', label: 'إنجازاتي' },
                    { value: 'notifications', label: 'إشعاراتي' },
                ]}
            />

            {/* إحصائيات الأداء */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-primary-50">
                        <p className="text-gray-600">الدورات المسجلة</p>
                        <p className="text-2xl font-bold">{courses?.length || 0}</p>
                        <Progress
                            value={courses?.filter(c => c.progress === 100).length || 0}
                            max={courses?.length || 1}
                            showLabel
                            label={`${Math.round((courses?.filter(c => c.progress === 100).length || 0) / (courses?.length || 1) * 100)}% مكتملة`}
                        />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-success-50">
                        <p className="text-gray-600">المهام المكتملة</p>
                        <p className="text-2xl font-bold">{courses?.reduce((acc, c) => acc + c.completedTasks, 0) || 0}</p>
                        <Progress
                            value={courses?.reduce((acc, c) => acc + c.completedTasks, 0) || 0}
                            max={courses?.reduce((acc, c) => acc + c.totalTasks, 0) || 1}
                            showLabel
                            label={`${Math.round((courses?.reduce((acc, c) => acc + c.completedTasks, 0) || 0) / (courses?.reduce((acc, c) => acc + c.totalTasks, 0) || 1) * 100)}% مكتملة`}
                        />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="bg-warning-50">
                        <p className="text-gray-600">الإنجازات</p>
                        <p className="text-2xl font-bold">{achievements?.length || 0}</p>
                        <div className="flex items-center space-x-2">
                            <Badge variant="success">+{achievements?.filter(a => a.isNew).length || 0} جديد</Badge>
                            <Tooltip content="الإنجازات التي حصلت عليها مؤخراً">
                                <span className="text-warning-600">آخر 7 أيام</span>
                            </Tooltip>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card className="bg-info-50">
                        <p className="text-gray-600">الإشعارات غير المقروءة</p>
                        <p className="text-2xl font-bold">{notifications?.length || 0}</p>
                        <div className="flex items-center space-x-2">
                            <Badge variant="danger">مهم</Badge>
                            <span className="text-info-600">{notifications?.filter(n => n.isImportant).length || 0} إشعار مهم</span>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* الدورات الحالية */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card>
                        <h2 className="text-xl font-bold mb-4">دوراتي الحالية</h2>
                        <DataGrid
                            data={courses?.filter(c => c.progress < 100) || []}
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
                                {
                                    field: 'progress',
                                    headerName: 'التقدم',
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
                                    renderCell: (row) => (
                                        <Button
                                            variant="link"
                                            onClick={() => {/* الانتقال للدورة */ }}
                                        >
                                            متابعة
                                        </Button>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </motion.div>

                {/* المهام القادمة */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Card>
                        <h2 className="text-xl font-bold mb-4">المهام القادمة</h2>
                        <div className="space-y-4">
                            {courses?.flatMap(c => c.upcomingAssignments || [])
                                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                                .slice(0, 5)
                                .map((assignment, index) => (
                                    <motion.div
                                        key={assignment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                    >
                                        <Alert variant={assignment.isImportant ? 'danger' : 'info'}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{assignment.title}</p>
                                                    <p className="text-sm text-gray-600">{assignment.courseTitle}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">
                                                        {new Date(assignment.dueDate).toLocaleDateString('ar-SA')}
                                                    </p>
                                                    <Badge variant={assignment.isImportant ? 'danger' : 'default'}>
                                                        {assignment.isImportant ? 'مهم' : 'عادي'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Alert>
                                    </motion.div>
                                ))}
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* الإشعارات */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <Card>
                    <h2 className="text-xl font-bold mb-4">آخر الإشعارات</h2>
                    <div className="space-y-4">
                        {notifications?.slice(0, 3).map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                            >
                                <Alert variant={notification.type}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{notification.title}</p>
                                            <p className="text-sm text-gray-600">{notification.content}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                {new Date(notification.createdAt).toLocaleDateString('ar-SA')}
                                            </p>
                                            {notification.isImportant && (
                                                <Badge variant="danger">مهم</Badge>
                                            )}
                                        </div>
                                    </div>
                                </Alert>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
} 