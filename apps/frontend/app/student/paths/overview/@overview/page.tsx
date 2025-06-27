'use client';

import React, { Suspense, useState } from 'react';
import {  useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { pathApi } from '@/lib/api';
import { Path, Course, Milestone, User } from '@shared/prisma';

const Card = dynamic(() => import('@/components/common/Card'), { loading: () => <div className="h-[200px] w-[200px] bg-gray-200 rounded-2xl animate-pulse"></div> });
const Progress = dynamic(() => import('@/components/common/Progress'), { loading: () => <div></div> });
const Badge = dynamic(() => import('@/components/common/Badge'), { loading: () => <div></div> });
const Button = dynamic(() => import('@/components/common/Button'), { loading: () => <div></div> });
const Skeleton = dynamic(() => import('@/components/common/Skeleton'), { loading: () => <div className="h-[200px] w-[200px] bg-gray-200 rounded-2xl animate-pulse"></div> });
const EmptyState = dynamic(() => import('@/components/common/EmptyState'), { loading: () => <div></div> });
const Tooltip = dynamic(() => import('@/components/common/Tooltip'), { loading: () => <div></div> });

let getPathsData = async () => {
    let { success, data } = await pathApi.getAll();
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
                academyId: '1',
                level: '1',
                status: 'COMPLETED',
            },
            {
                id: '2',
                title: 'كورس Machine Learning',
                description: ' كورس Machine Learning هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                level: '1',
                status: 'COMPLETED',
            },
            {
                id: '3',
                title: 'كورس Data Science',
                description: ' كورس Data Science هو كورس يعلمك كيفية التعلم الآلي',
                image: 'https://via.placeholder.com/150',
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                level: '1',
                status: 'COMPLETED',
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
                level: '1',
                status: 'COMPLETED',
            },
            {
                id: '2',
                title: ' كورس css',
                description: ' كورس css هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
                level: '1',
                status: 'COMPLETED',
            },
            {
                id: '3',
                title: ' كورس js',
                description: ' كورس js هو كورس يعلمك كيفية البرمجة بلغة البايثون',
                image: 'https://via.placeholder.com/150',
                academyId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
                level: '1',
                status: 'COMPLETED',
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
];

export default function PathsOverviewPage() {
    const [activeTab, setActiveTab] = useState(0);

    // استعلامات البيانات مع خيارات التخزين المؤقت
    const { data: paths, isLoading: isLoadingPaths } = useQuery({
        queryKey: ['paths'],
        queryFn: () => getPathsData(),
        staleTime: 5 * 60 * 1000, // 5 دقائق
        gcTime: 10 * 60 * 1000, // 10 دقائق
        // placeholderData: keepPreviousData,
    });

    // تصفية المسارات حسب التبويب النشط
    const filteredPaths = (paths || initialPaths)?.filter(path => {
        if (activeTab === 0) return true;
        return path.level === activeTab.toString();
    }) || [];

    if (isLoadingPaths) {
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
            {/* التبويبات حسب المستوى */}
            <div className="flex space-x-2 space-x-reverse">
                {[
                    { value: 0, label: 'الكل' },
                    { value: 1, label: 'مبتدئ' },
                    { value: 2, label: 'متوسط' },
                    { value: 3, label: 'متقدم' },
                ].map((tab) => (
                    <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab(tab.value)}
                        size="small"
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

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
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
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
                                >
                                    تفاصيل المسار
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
} 