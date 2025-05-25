'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/common/Card';
import Progress from '@/components/common/Progress';
import DataGrid from '@/components/common/DataGrid';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import Skeleton from '@/components/common/Skeleton';
import Tooltip from '@/components/common/Tooltip';
import { userApi, courseApi, notificationApi, achievementApi, enrollmentApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { Achievement, Course, Enrollment, Notification, Quiz, User } from '@shared/prisma';
import { Home, Book, Notifications } from '@mui/icons-material';
let getUser = async (id: string): Promise<User> => {
    let user = await userApi.getProfile(id);
    return user.data;
}
let getCourses = async (userId: string): Promise<(Enrollment & { course: Course & { quizzes: Quiz[] } })[]> => {
    let enrollments = await enrollmentApi.getByUser(userId);
    return enrollments.data;
}
let getNotifications = async (id: string): Promise<Notification[]> => {
    let notifications = await userApi.getNotifications(id);
    return notifications.data;
}
let getAchievements = async (id: string): Promise<Achievement[]> => {
    let achievements = await achievementApi.getByUser(id);
    return achievements.data;
}
export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<number>(0);
    let { user, status } = useUser();

    // استعلامات البيانات
    const { data: profile, isLoading: isLoadingProfile } = useQuery<User>({
        queryKey: ['profile'],
        queryFn: () => getUser(user?.id || ''),
    });

    const { data: courses, isLoading: isLoadingCourses } = useQuery<(Enrollment & { course: Course & { quizzes: Quiz[] } })[]>({
        queryKey: ['courses'],
        queryFn: () => getCourses(user?.id || ''),
    });

    const { data: notifications, isLoading: isLoadingNotifications } = useQuery<Notification[]>({
        queryKey: ['notifications'],
        queryFn: () => getNotifications(user?.id || ''),
    });

    const { data: achievements, isLoading: isLoadingAchievements } = useQuery<Achievement[]>({
        queryKey: ['achievements'],
        queryFn: () => getAchievements(user?.id || ''),
    });

    if (status === 'loading' || isLoadingProfile || isLoadingCourses || isLoadingNotifications || isLoadingAchievements) {
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
                    <h1 className="text-2xl font-bold">مرحباً بك، {profile?.firstName} {profile?.lastName} 👋</h1>
                    <p className="text-gray-600">
                        هذه نظرة عامة على تقدمك الدراسي
                    </p>
                </div>
                <Button variant="contained" size="large">
                    تحديث الملف الشخصي
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={(value: number) => setActiveTab(value)}
                tabs={[
                    { value: 0, label: 'نظرة عامة', icon: <Home />, content: <div>نظرة عامة</div> },
                    { value: 1, label: 'دوراتي', icon: <Book />, content: <div>دوراتي</div> },
                    { value: 2, label: 'إنجازاتي', icon: <Notifications />, content: <div>إنجازاتي</div> },
                    { value: 3, label: 'إشعاراتي', icon: <Notifications />, content: <div>إشعاراتي</div> },
                ]}
            />

            {/* إحصائيات الأداء */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card title="الدورات المسجلة" className="bg-primary-50">
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
                    <Card title="المهام المكتملة" className="bg-success-50">
                        <p className="text-2xl font-bold">{courses?.reduce((acc, c) => acc + c.course.quizzes.reduce((acc, q) => acc + (q.isCompleted ? 1 : 0), 0), 0) || 0}</p>
                        <Progress
                            value={courses?.reduce((acc, c) => acc + c.course.quizzes.reduce((acc, q) => acc + (q.isCompleted ? 1 : 0), 0), 0) || 0}
                            max={courses?.reduce((acc, c) => acc + c.course.quizzes.length, 0) || 1}
                            showLabel
                            label={`${Math.round((courses?.reduce((acc, c) => acc + c.course.quizzes.reduce((acc, q) => acc + (q.isCompleted ? 1 : 0), 0), 0) || 0) / (courses?.reduce((acc, c) => acc + c.course.quizzes.length, 0) || 1) * 100)}% مكتملة`}
                        />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card title="الإنجازات" className="bg-warning-50">
                        <p className="text-2xl font-bold">{achievements?.length || 0}</p>
                        <div className="flex items-center space-x-2">
                            <Badge variant="dot" title={`${achievements?.filter(a => a.isNew).length || 0} جديد`}>
                                {/* <span className="text-warning-600">آخر 7 أيام</span> */}
                                <></>
                            </Badge>
                            <Tooltip title="الإنجازات التي حصلت عليها مؤخراً">
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
                    <Card title="الإشعارات غير المقروءة" className="bg-info-50">
                        <p className="text-2xl font-bold">{notifications?.length || 0}</p>
                        <div className="flex items-center space-x-2">
                            <Badge variant="dot" title={`${notifications?.filter(n => !n.read).length || 0} جديد`}>
                                {/* <span className="text-info-600">آخر 7 أيام</span> */}
                                <></>
                            </Badge>
                            <Tooltip title="الإشعارات التي حصلت عليها مؤخراً">
                                <span className="text-info-600">آخر 7 أيام</span>
                            </Tooltip>
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
                    <Card title="دوراتي الحالية">
                        {/* <h2 className="text-xl font-bold mb-4">دوراتي الحالية</h2> */}
                        <DataGrid
                            rows={courses?.filter(c => c.progress < 100) || []}
                            columns={[
                                {
                                    field: 'title',
                                    headerName: 'اسم الدورة',
                                    renderCell: (row: any) => (
                                        <div className="flex items-center space-x-2">
                                            {/* <Avatar src={row.course.image} size="sm" /> */}
                                            <span>{row.course.title}</span>
                                        </div>
                                    )
                                },
                                {
                                    field: 'progress',
                                    headerName: 'التقدم',

                                    renderCell: (row: any) => (
                                        <Progress
                                            value={row.progress}
                                            max={100}
                                            size="small"
                                            showLabel
                                        />
                                    )
                                },
                                {
                                    field: 'actions',
                                    headerName: 'الإجراءات',
                                    renderCell: (row: any) => (
                                        <Button
                                            variant="text"
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
                    <Card title="المهام القادمة">
                        {/* <h2 className="text-xl font-bold mb-4">المهام القادمة</h2> */}
                        <div className="space-y-4">
                            {courses?.flatMap(c => c.course.quizzes.filter(q => q.upComing) || [])
                                .sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
                                .slice(0, 5)
                                .map((assignment, index) => (
                                    <motion.div
                                        key={assignment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                    >
                                        <Alert title={assignment.title} message={assignment.description || ''} variant="standard">
                                            {/* <div className="flex items-center justify-between">
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
                                            </div> */}
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
                <Card title="آخر الإشعارات" >
                    {/* <h2 className="text-xl font-bold mb-4">آخر الإشعارات</h2> */}
                    <div className="space-y-4">
                        {notifications?.slice(0, 3).map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                            >
                                <Alert title={notification.title} message={notification.message} variant="standard" className="bg-white">
                                    {/* <div className="flex items-center justify-between">
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
                                    </div> */}
                                </Alert>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
} 