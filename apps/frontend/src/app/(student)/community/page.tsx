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
    Modal,
    Input,
    Textarea,
    Select
} from '@/components/common';
import { communityApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { FaSearch, FaPlus, FaComments, FaUsers, FaTrophy, FaVideo, FaThumbsUp, FaComment } from 'react-icons/fa';

export default function StudentCommunity() {
    const [activeTab, setActiveTab] = useState('discussions');
    const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        subject: '',
        type: '',
        year: '',
        participant: ''
    });

    // استعلامات البيانات
    const { data: discussions, isLoading: isLoadingDiscussions } = useQuery({
        queryKey: ['discussions'],
        queryFn: () => communityApi.getDiscussions(),
    });

    const { data: groups, isLoading: isLoadingGroups } = useQuery({
        queryKey: ['groups'],
        queryFn: () => communityApi.getGroups(),
    });

    const { data: myPosts, isLoading: isLoadingMyPosts } = useQuery({
        queryKey: ['myPosts'],
        queryFn: () => communityApi.getMyPosts(),
    });

    const { data: leaderboard, isLoading: isLoadingLeaderboard } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: () => communityApi.getLeaderboard(),
    });

    const { data: liveRooms, isLoading: isLoadingLiveRooms } = useQuery({
        queryKey: ['liveRooms'],
        queryFn: () => communityApi.getLiveRooms(),
    });

    if (isLoadingDiscussions || isLoadingGroups || isLoadingMyPosts || isLoadingLeaderboard || isLoadingLiveRooms) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} height={200} />
                    ))}
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
            {/* العنوان */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">المجتمع التعليمي 💬</h1>
                    <p className="text-gray-600">
                        تواصل مع زملائك ومعلميك وشارك في المناقشات
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setShowNewQuestionModal(true)}
                >
                    <FaPlus className="ml-2" />
                    اسأل سؤال جديد
                </Button>
            </div>

            {/* البحث والفلترة */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Input
                        placeholder="ابحث عن مناقشة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<FaSearch />}
                    />
                    <Select
                        placeholder="المادة"
                        value={filters.subject}
                        onChange={(value) => setFilters({ ...filters, subject: value })}
                        options={[
                            { value: 'math', label: 'الرياضيات' },
                            { value: 'physics', label: 'الفيزياء' },
                            { value: 'chemistry', label: 'الكيمياء' },
                        ]}
                    />
                    <Select
                        placeholder="النوع"
                        value={filters.type}
                        onChange={(value) => setFilters({ ...filters, type: value })}
                        options={[
                            { value: 'question', label: 'سؤال' },
                            { value: 'discussion', label: 'مناقشة' },
                            { value: 'resource', label: 'مصدر' },
                        ]}
                    />
                    <Select
                        placeholder="السنة"
                        value={filters.year}
                        onChange={(value) => setFilters({ ...filters, year: value })}
                        options={[
                            { value: '2024', label: '2024' },
                            { value: '2023', label: '2023' },
                            { value: '2022', label: '2022' },
                        ]}
                    />
                    <Select
                        placeholder="المشارك"
                        value={filters.participant}
                        onChange={(value) => setFilters({ ...filters, participant: value })}
                        options={[
                            { value: 'teacher', label: 'المعلم' },
                            { value: 'student', label: 'الطالب' },
                        ]}
                    />
                </div>
            </Card>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                    { value: 'discussions', label: 'المناقشات' },
                    { value: 'groups', label: 'المجموعات' },
                    { value: 'myPosts', label: 'مشاركاتي' },
                    { value: 'leaderboard', label: 'قائمة المتصدرين' },
                    { value: 'liveRooms', label: 'الغرف الحية' },
                ]}
            />

            {/* محتوى التبويبات */}
            {activeTab === 'discussions' && (
                <div className="space-y-4">
                    {discussions?.map((discussion, index) => (
                        <motion.div
                            key={discussion.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card>
                                <div className="flex items-start space-x-4">
                                    <Avatar src={discussion.author.avatar} size="lg" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold">{discussion.title}</h3>
                                            <Badge variant={discussion.type === 'question' ? 'primary' : 'info'}>
                                                {discussion.type === 'question' ? 'سؤال' : 'مناقشة'}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 mt-2">{discussion.content}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm text-gray-500">
                                                    {discussion.author.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(discussion.createdAt), 'd MMMM yyyy', { locale: ar })}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <Button variant="ghost" size="sm">
                                                    <FaThumbsUp className="ml-2" />
                                                    {discussion.likes}
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <FaComment className="ml-2" />
                                                    {discussion.comments}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'groups' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups?.map((group, index) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <div className="flex items-center space-x-4 mb-4">
                                    <Avatar src={group.image} size="lg" />
                                    <div>
                                        <h3 className="text-lg font-bold">{group.name}</h3>
                                        <p className="text-sm text-gray-600">{group.subject}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Badge variant={
                                        group.status === 'new' ? 'info' :
                                            group.status === 'active' ? 'success' :
                                                'warning'
                                    }>
                                        {group.status === 'new' ? 'جديدة' :
                                            group.status === 'active' ? 'نشطة' :
                                                'بها مناقشات'}
                                    </Badge>
                                    <div className="flex items-center space-x-2">
                                        <FaUsers className="text-gray-500" />
                                        <span className="text-sm text-gray-600">{group.members} عضو</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'myPosts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">إحصائيات مشاركاتي</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{myPosts?.questions}</p>
                                <p className="text-gray-600">أسئلة</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{myPosts?.answers}</p>
                                <p className="text-gray-600">إجابات</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{myPosts?.likes}</p>
                                <p className="text-gray-600">إعجابات</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-bold mb-4">آخر مشاركاتي</h2>
                        <div className="space-y-4">
                            {myPosts?.recent.map((post, index) => (
                                <Alert key={index} variant="info">
                                    <p className="font-medium">{post.title}</p>
                                    <p className="text-sm text-gray-600">
                                        {format(new Date(post.createdAt), 'd MMMM yyyy', { locale: ar })}
                                    </p>
                                </Alert>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'leaderboard' && (
                <Card>
                    <h2 className="text-xl font-bold mb-4">قائمة المتصدرين</h2>
                    <div className="space-y-4">
                        {leaderboard?.map((student, index) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <Avatar src={student.avatar} size="lg" />
                                        <div>
                                            <h3 className="font-bold">{student.name}</h3>
                                            <p className="text-sm text-gray-600">{student.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Badge variant="primary">
                                            {student.points} نقطة
                                        </Badge>
                                        {student.badge && (
                                            <Tooltip content={student.badge.description}>
                                                <FaTrophy className="text-yellow-500" />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            )}

            {activeTab === 'liveRooms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveRooms?.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <div className="flex items-center space-x-4 mb-4">
                                    <FaVideo className="text-primary-500 text-2xl" />
                                    <div>
                                        <h3 className="text-lg font-bold">{room.title}</h3>
                                        <p className="text-sm text-gray-600">{room.topic}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaUsers className="text-gray-500" />
                                        <span className="text-sm text-gray-600">{room.participants} مشارك</span>
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={() => communityApi.joinRoom(room.id)}
                                    >
                                        انضم الآن
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* نافذة السؤال الجديد */}
            {showNewQuestionModal && (
                <Modal
                    isOpen={showNewQuestionModal}
                    onClose={() => setShowNewQuestionModal(false)}
                    title="سؤال جديد"
                >
                    <div className="space-y-4">
                        <Input
                            label="عنوان السؤال"
                            placeholder="اكتب عنواناً واضحاً لسؤالك"
                            required
                        />
                        <Select
                            label="المادة"
                            placeholder="اختر المادة"
                            options={[
                                { value: 'math', label: 'الرياضيات' },
                                { value: 'physics', label: 'الفيزياء' },
                                { value: 'chemistry', label: 'الكيمياء' },
                            ]}
                            required
                        />
                        <Textarea
                            label="تفاصيل السؤال"
                            placeholder="اكتب تفاصيل سؤالك هنا..."
                            rows={5}
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                onClick={() => setShowNewQuestionModal(false)}
                            >
                                إلغاء
                            </Button>
                            <Button variant="primary">
                                نشر السؤال
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </motion.div>
    );
} 