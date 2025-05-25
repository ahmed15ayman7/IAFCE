'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/common/Card';
import DataGrid from '@/components/common/DataGrid';
import Modal from '@/components/common/Modal';
import Tabs from '@/components/common/Tabs';
import Progress from '@/components/common/Progress';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Stepper from '@/components/common/Stepper';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';
import Tooltip from '@/components/common/Tooltip';
import { userApi, courseApi, pathApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { Alert, Badge as MuiBadge } from '@mui/material';
import { Course, Milestone, Path, User } from '@shared/prisma';
let getPathsData = async () => {
    let { success, data } = await pathApi.getAll();
    if (success) {
        return data;
    }
    return null;
}
let getCoursesData = async () => {
    let { success, data } = await courseApi.getAll();
    if (success) {
        return data;
    }
    return null;
}
let initialPaths: (Path & { courses: Course[], milestones: Milestone[], peers: User[] })[] = [
    {
        id: '1',
        title: 'مسار تعلم deep Learning ',
        description: 'مسار التعلم',
        level: '1',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: 'كورس python',
                description: ' كورس python هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '2',
                title: 'كورس Machine Learning',
                description: ' كورس Machine Learning هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '3',
                title: 'كورس Data Science',
                description: ' كورس Data Science هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'المهمة الأولى',
                description: 'المهمة الأولى',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
            {
                id: '2',
                title: 'المهمة الثانية',
                description: 'المهمة الثانية',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
            {
                id: '2',
                firstName: 'محمد',
                lastName: 'كريم',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '2',
        title: 'مسار تعلم frontend',
        description: 'مسار تعلم frontend',
        level: '2',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: ' كورس html',
                description: ' كورس html هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                title: ' كورس css',
                description: ' كورس css هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                title: ' كورس js',
                description: ' كورس js هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'مسار تعلم backend',
                description: 'مسار تعلم backend',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '2',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '1',
        title: 'مسار التعلم',
        description: 'مسار التعلم',
        level: '1',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: 'كورس python',
                description: ' كورس python هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '2',
                title: 'كورس Machine Learning',
                description: ' كورس Machine Learning هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '3',
                title: 'كورس Data Science',
                description: ' كورس Data Science هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'المهمة الأولى',
                description: 'المهمة الأولى',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
            {
                id: '2',
                title: 'المهمة الثانية',
                description: 'المهمة الثانية',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
            {
                id: '2',
                firstName: 'محمد',
                lastName: 'كريم',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '2',
        title: 'مسار تعلم fullstack',
        description: 'مسار تعلم fullstack',
        level: '2',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: ' كورس html',
                description: ' كورس html هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                title: ' كورس css',
                description: ' كورس css هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                title: ' كورس js',
                description: ' كورس js هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'مسار تعلم fullstack',
                description: 'مسار تعلم fullstack',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '2',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '1',
        title: 'مسار التعلم',
        description: 'مسار التعلم',
        level: '1',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: 'كورس python',
                description: ' كورس python هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '2',
                title: 'كورس Machine Learning',
                description: ' كورس Machine Learning هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '3',
                title: 'كورس Data Science',
                description: ' كورس Data Science هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'المهمة الأولى',
                description: 'المهمة الأولى',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
            {
                id: '2',
                title: 'المهمة الثانية',
                description: 'المهمة الثانية',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
            {
                id: '2',
                firstName: 'محمد',
                lastName: 'كريم',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '2',
        title: 'مسار تعلم fullstack',
        description: 'مسار تعلم fullstack',
        level: '2',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: ' كورس html',
                description: ' كورس html هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                title: ' كورس css',
                description: ' كورس css هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                title: ' كورس js',
                description: ' كورس js هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'مسار تعلم fullstack',
                description: 'مسار تعلم fullstack',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '2',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '1',
        title: 'مسار التعلم',
        description: 'مسار التعلم',
        level: '1',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: 'كورس python',
                description: ' كورس python هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '2',
                title: 'كورس Machine Learning',
                description: ' كورس Machine Learning هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
            {
                id: '3',
                title: 'كورس Data Science',
                description: ' كورس Data Science هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1'
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'المهمة الأولى',
                description: 'المهمة الأولى',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
            {
                id: '2',
                title: 'المهمة الثانية',
                description: 'المهمة الثانية',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '1',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
            {
                id: '2',
                firstName: 'محمد',
                lastName: 'كريم',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
    {
        id: '2',
        title: 'مسار تعلم fullstack',
        description: 'مسار تعلم fullstack',
        level: '2',
        progress: 50,
        completedTasks: 10,
        remainingTime: 10,
        studyTime: 10,
        totalTasks: 10,
        engagement: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [
            {
                id: '1',
                title: ' كورس html',
                description: ' كورس html هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                title: ' كورس css',
                description: ' كورس css هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                title: ' كورس js',
                description: ' كورس js هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        milestones: [
            {
                id: '1',
                title: 'مسار تعلم fullstack',
                description: 'مسار تعلم fullstack',
                status: 'COMPLETED',
                createdAt: new Date(),
                pathId: '2',
            },
        ],
        peers: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'المحمدي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'test@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
        ],
    },
]
export default function StudentPaths() {
    const [selectedPath, setSelectedPath] = useState<Path & { courses: Course[], milestones: Milestone[], peers: User[] } | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    // استعلامات البيانات
    const { data: paths, isLoading: isLoadingPaths } = useQuery({
        queryKey: ['paths'],
        queryFn: () => getPathsData(),
    });

    const { data: courses, isLoading: isLoadingCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCoursesData(),
    });

    // تصفية المسارات حسب التبويب النشط
    const filteredPaths = (paths || initialPaths)?.filter(path => {
        if (activeTab === 0) return true;
        return path.level === activeTab.toString();
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
                action={{
                    label: 'انضم لمسار جديد',
                    onClick: () => {
                        console.log('انضم لمسار جديد');
                    },
                    icon: <FaPlus />,
                }}
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
                <Button variant="contained" size="large">
                    انضم لمسار جديد
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { value: 0, label: 'الكل', content: <></> },
                    { value: 1, label: 'مبتدئ', content: <></> },
                    { value: 2, label: 'متوسط', content: <></> },
                    { value: 3, label: 'متقدم', content: <></> },
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
                        <Card title={path.title}
                            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => setSelectedPath(path)}
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        {/* <h3 className="font-bold text-lg">{path.title}</h3> */}
                                        <p className="text-gray-600 mt-1">{path.description}</p>
                                    </div>
                                    <Badge variant={path.level === '3' ? 'dot' : 'standard'} color={path.level === '3' ? 'error' : 'success'}>
                                        <span className="text-xs">{path.level}</span>
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
                                    <Tooltip title="وقت الدراسة المتبقي">
                                        <span className="text-primary-600">{path.remainingTime} ساعة</span>
                                    </Tooltip>
                                </div>

                                <Button
                                    variant="contained"
                                    className="w-full"
                                    onClick={() => setSelectedPath(path)}
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
                    open={!!selectedPath}
                    onClose={() => setSelectedPath(null)}
                    title={selectedPath.title}
                    maxWidth="lg"
                >
                    <div className="space-y-6">
                        {/* وصف المسار */}
                        <Alert variant="outlined" severity="info">
                            <p className="text-gray-600">{selectedPath.description}</p>
                        </Alert>

                        {/* Timeline */}
                        <div>
                            <h3 className="font-bold mb-4">رحلة التعلم</h3>
                            <Stepper
                                steps={selectedPath.milestones.map((milestone, index) => ({
                                    label: milestone.title || '',
                                    description: milestone.description || '',
                                    completed: milestone.status === 'COMPLETED',
                                }))}
                            />
                        </div>

                        {/* إحصائيات المسار */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card title="عدد الكورسات" className="bg-primary-50">
                                <p className="text-2xl font-bold">{selectedPath.courses.length}</p>
                            </Card>
                            <Card title="وقت الدراسة" className="bg-success-50">
                                <p className="text-gray-600">وقت الدراسة</p>
                                <p className="text-2xl font-bold">{selectedPath.studyTime} ساعة</p>
                            </Card>
                            {/* <Card title="الدروس المكتملة" className="bg-warning-50">
                                <p className="text-2xl font-bold">{selectedPath.completedLessons}</p>
                            </Card> */}
                            <Card title="نسبة التفاعل" className="bg-info-50">
                                <p className="text-2xl font-bold">{selectedPath.engagement}%</p>
                            </Card>
                        </div>

                        {/* الدورات */}
                        <div>
                            <h3 className="font-bold mb-4">الدورات</h3>
                            <DataGrid
                                rows={selectedPath.courses}
                                columns={[
                                    {
                                        field: 'title',
                                        headerName: 'اسم الدورة',
                                        renderCell: (row: any) => (
                                            <div className="flex items-center space-x-2">
                                                <Avatar src={row.image || ''} size="sm" />
                                                <span>{row.title}</span>
                                            </div>
                                        )
                                    },
                                    { field: 'lessonsCount', headerName: 'عدد الدروس' },
                                    {
                                        field: 'progress',
                                        headerName: 'نسبة الإنجاز',
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
                                        renderCell: () => (
                                            <Button variant="text">
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
                                            variant={peer.isOnline ? 'standard' : 'dot'}
                                            color={peer.isOnline ? 'success' : 'error'}
                                            className="absolute top-0 right-0"
                                            overlap="circular"
                                        >
                                            <span className="text-xs">
                                                {peer.isOnline ? 'متصل' : 'غير متصل'}
                                            </span>
                                        </Badge>
                                        <Avatar
                                            src={peer.avatar || ''}
                                            size="lg"
                                            className="mb-2"
                                        />
                                        <p className="text-sm font-medium">{peer.firstName} {peer.lastName}</p>
                                        <Button
                                            variant="text"
                                            size="small"
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