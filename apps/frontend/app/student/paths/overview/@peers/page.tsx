'use client';

import React, { Suspense, useState } from 'react';
import {  useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { pathApi } from '@/lib/api';
import { Path, Course, Milestone, User } from '@shared/prisma';

const Card = dynamic(() => import('@/components/common/Card'), { loading: () => <div className="h-[200px] w-[200px] bg-gray-200 rounded-2xl animate-pulse"></div> });
const Avatar = dynamic(() => import('@/components/common/Avatar'), { loading: () => <div></div> });
const Badge = dynamic(() => import('@/components/common/Badge'), { loading: () => <div></div> });
const Button = dynamic(() => import('@/components/common/Button'), { loading: () => <div></div> });
const Skeleton = dynamic(() => import('@/components/common/Skeleton'), { loading: () => <div className="h-[200px] w-[200px] bg-gray-200 rounded-2xl animate-pulse"></div>});
const EmptyState = dynamic(() => import('@/components/common/EmptyState'), { loading: () => <div></div> });
const Progress = dynamic(() => import('@/components/common/Progress'), { loading: () => <div></div> });

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
        progress: 75,
        completedTasks: 15,
        remainingTime: 8,
        studyTime: 25,
        totalTasks: 20,
        engagement: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [],
        milestones: [],
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
                email: 'mohamed@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 20,
            },
            {
                id: '2',
                firstName: 'أحمد',
                lastName: 'كريم',
                avatar: 'https://via.placeholder.com/150',
                isOnline: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'ahmed@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 22,
            },
            {
                id: '3',
                firstName: 'فاطمة',
                lastName: 'علي',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'fatima@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 19,
            },
        ],
    },
    {
        id: '2',
        title: 'مسار تعلم frontend',
        description: 'مسار تعلم frontend',
        level: '2',
        progress: 45,
        completedTasks: 8,
        remainingTime: 15,
        studyTime: 18,
        totalTasks: 18,
        engagement: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
        courses: [],
        milestones: [],
        peers: [
            {
                id: '4',
                firstName: 'علي',
                lastName: 'حسن',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'ali@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 21,
            },
            {
                id: '5',
                firstName: 'سارة',
                lastName: 'محمد',
                avatar: 'https://via.placeholder.com/150',
                isOnline: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                academyId: '1',
                email: 'sara@test.com',
                password: '123456',
                phone: '123456',
                role: 'STUDENT',
                subRole: 'STUDENT',
                isVerified: true,
                age: 23,
            },
        ],
    },
];

export default function PathsPeersPage() {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    // استعلامات البيانات مع خيارات التخزين المؤقت
    const { data: paths, isLoading: isLoadingPaths } = useQuery({
        queryKey: ['paths'],
        queryFn: () => getPathsData(),
        staleTime: 5 * 60 * 1000, // 5 دقائق
        gcTime: 10 * 60 * 1000, // 10 دقائق
        // placeholderData: keepPreviousData,
    });

    const pathsData = paths || initialPaths;

    // تجميع جميع الزملاء من جميع المسارات
    const allPeers = pathsData.flatMap(path => 
        path.peers.map(peer => ({
            ...peer,
            pathTitle: path.title,
            pathLevel: path.level,
            pathProgress: path.progress,
        }))
    );

    // إزالة التكرار بناءً على معرف المستخدم
    const uniquePeers = allPeers.filter((peer, index, self) => 
        index === self.findIndex(p => p.id === peer.id)
    );

    // تصفية الزملاء حسب المسار المحدد
    const filteredPeers = selectedPath 
        ? allPeers.filter(peer => peer.pathTitle === selectedPath)
        : uniquePeers;

    if (isLoadingPaths) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} height={120} />
                    ))}
                </div>
            </div>
        );
    }

    if (!allPeers.length) {
        return (
            <EmptyState
                title="لا يوجد زملاء حالياً"
                description="لم يتم العثور على زملاء في المسارات"
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
            {/* العنوان */}
            <div>
                <h2 className="text-xl font-bold mb-2">زملاؤك في المسارات</h2>
                <p className="text-gray-600">
                    تعرف على زملائك في المسارات المختلفة وتواصل معهم
                </p>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="إجمالي الزملاء" className="bg-primary-50">
                    <p className="text-2xl font-bold">{uniquePeers.length}</p>
                </Card>
                <Card title="الزملاء المتصلون" className="bg-success-50">
                    <p className="text-2xl font-bold">
                        {uniquePeers.filter(peer => peer.isOnline).length}
                    </p>
                </Card>
                <Card title="المسارات المشتركة" className="bg-info-50">
                    <p className="text-2xl font-bold">{pathsData.length}</p>
                </Card>
            </div>

            {/* فلتر المسارات */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedPath === null ? 'contained' : 'outlined'}
                    onClick={() => setSelectedPath(null)}
                    size="small"
                >
                    جميع المسارات
                </Button>
                {pathsData.map((path) => (
                    <Button
                        key={path.id}
                        variant={selectedPath === path.title ? 'contained' : 'outlined'}
                        onClick={() => setSelectedPath(path.title)}
                        size="small"
                    >
                        {path.title}
                    </Button>
                ))}
            </div>

            {/* قائمة الزملاء */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPeers.map((peer, index) => (
                    <motion.div
                        key={`${peer.id}-${peer.pathTitle}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card title={peer.pathTitle} className="bg-primary-50">
                            <div className="text-center space-y-4">
                                {/* صورة المستخدم وحالة الاتصال */}
                                <div className="relative inline-block">
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
                                </div>

                                {/* معلومات المستخدم */}
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {peer.firstName} {peer.lastName}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{peer.email}</p>
                                </div>

                                {/* معلومات المسار */}
                                <div className="space-y-2">
                                    <Badge variant="standard" color="primary">
                                        <span className="text-xs">
                                            {peer.pathTitle || ''}
                                        </span>
                                    </Badge>
                                    <div className="text-sm">
                                        <span className="text-gray-600">مستوى:</span>
                                        <span className="font-medium"> {peer.pathLevel}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-600">التقدم:</span>
                                        <span className="font-medium"> {peer.pathProgress}%</span>
                                    </div>
                                </div>

                                {/* شريط التقدم */}
                                <Progress
                                    value={peer.pathProgress}
                                    max={100}
                                    size="small"
                                    showLabel
                                />

                                {/* أزرار الإجراءات */}
                                <div className="flex space-x-2 space-x-reverse justify-center">
                                    <Button variant="text" size="small">
                                        عرض الملف الشخصي
                                    </Button>
                                    <Button variant="contained" size="small">
                                        إرسال رسالة
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* رسالة إذا لم يتم العثور على زملاء في المسار المحدد */}
            {selectedPath && filteredPeers.length === 0 && (
                <EmptyState
                    title="لا يوجد زملاء في هذا المسار"
                    description={`لم يتم العثور على زملاء في مسار "${selectedPath}"`}
                />
            )}
        </motion.div>
    );
} 