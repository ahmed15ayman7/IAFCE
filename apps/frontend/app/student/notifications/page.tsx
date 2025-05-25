'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';
import Tooltip from '@/components/common/Tooltip';
import Modal from '@/components/common/Modal';
import { Switch, Alert } from '@mui/material';


import { notificationApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
    FaBell,
    FaCheck,
    FaExclamationTriangle,
    FaTrophy,
    FaEnvelope,
    FaCog,
    FaArrowRight,
    FaExclamation
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Notification, NotificationSettings } from '@shared/prisma';
import { useUser } from '@/hooks/useUser';

let initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'الواجب الأول',
        message: 'الواجب الأول هو الواجب الأول',
        userId: '1',
        type: 'ASSIGNMENT',
        isImportant: false,
        urgent: false,
        read: false,
        createdAt: new Date(),
        actionUrl: null,
    },
    {
        id: '2',
        title: 'الواجب الثاني',
        message: 'الواجب الثاني هو الواجب الثاني',
        userId: '1',
        type: 'GRADE',
        isImportant: false,
        urgent: false,
        read: false,
        createdAt: new Date(),
        actionUrl: null,
    }
]

export default function StudentNotifications() {
    const [activeTab, setActiveTab] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<NotificationSettings>({
        id: '',
        userId: '',
        createdAt: new Date(),
        assignments: true,
        grades: true,
        messages: true,
        achievements: true,
        urgent: true,
        email: false,
        push: true
    });
    let router = useRouter();
    let { user, status } = useUser();

    // استعلامات البيانات
    const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationApi.getAllByUserId(user?.id || ''),
    });
    let { data: notificationsSettings, isLoading: isLoadingNotificationsSettings } = useQuery({
        queryKey: ['notificationsSettings'],
        queryFn: () => notificationApi.getSettingsByUserId(user?.id || ''),
    });

    // طلب تحديث حالة الإشعار
    const { mutate: markAsRead } = useMutation({
        mutationFn: (id: string) => notificationApi.markAsRead(id),
    });

    // طلب تحديث الإعدادات
    const { mutate: updateSettings } = useMutation({
        mutationFn: (data: NotificationSettings) => notificationsSettings ? notificationApi.updateSettings(data) : notificationApi.createSettings(data),
        onSuccess: () => setShowSettings(false)
    });
    useEffect(() => {
        if (notificationsSettings) {
            setSettings({
                id: notificationsSettings.id,
                userId: notificationsSettings.userId,
                createdAt: notificationsSettings.createdAt,
                assignments: notificationsSettings.assignments,
                grades: notificationsSettings.grades,
                messages: notificationsSettings.messages,
                achievements: notificationsSettings.achievements,
                urgent: notificationsSettings.urgent,
                email: notificationsSettings.email,
                push: notificationsSettings.push
            });
        } else {
            setSettings((prev) => ({
                ...prev,
                userId: user?.id || '',
            }));
        }
    }, [notificationsSettings, user?.id]);


    if (isLoadingNotifications || isLoadingNotificationsSettings || status === "loading") {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} height={100} />
                    ))}
                </div>
            </div>
        );
    }
   
    // تصفية الإشعارات حسب التبويب النشط
    const filteredNotifications = (notifications || initialNotifications)?.filter(notification => {
        switch (activeTab) {
            case 1:
                return !notification.read;
            case 2:
                return notification.read;
            case 3:
                return notification.isImportant;
            default:
                return true;
        }
    });

    // الحصول على الإشعار العاجل
    const urgentNotification = (notifications || initialNotifications)?.find(n => n.urgent && !n.read);
    let filteredNotificationsDesign = <div className="space-y-4">
        {filteredNotifications?.length === 0 ? (
            <EmptyState
                icon={<FaBell className="text-gray-400 text-4xl" />}
                title="لا توجد إشعارات"
                description="لا توجد إشعارات جديدة لعرضها"
            />
        ) : (
            filteredNotifications?.map((notification, index) => (
                <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card title={notification.title} className={`${!notification.read ? 'border-l-4 border-primary-500' : ''}`}>
                        <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-full ${notification.type === 'ASSIGNMENT' ? 'bg-blue-100' :
                                notification.type === 'GRADE' ? 'bg-green-100' :
                                    notification.type === 'MESSAGE' ? 'bg-purple-100' :
                                        'bg-yellow-100'
                                }`}>
                                {notification.type === 'ASSIGNMENT' ? <FaExclamationTriangle className="text-blue-500" /> :
                                    notification.type === 'GRADE' ? <FaTrophy className="text-green-500" /> :
                                        notification.type === 'MESSAGE' ? <FaEnvelope className="text-purple-500" /> :
                                            <FaBell className="text-yellow-500" />
                                }
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold">{notification.title}</h3>
                                    {!notification.read && (
                                        <Badge variant="dot">
                                            <span>جديد</span>
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-gray-600 mt-2">{notification.message}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm text-gray-500">
                                        {format(new Date(notification.createdAt), 'd MMMM yyyy - h:mm a', { locale: ar })}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {!notification.read && (
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <FaCheck className="ml-2" />
                                                تم
                                            </Button>
                                        )}
                                        {notification.actionUrl && (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => router.push(notification.actionUrl || '')}
                                            >
                                                اذهب للمهمة
                                                <FaArrowRight className="mr-2" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))
        )}
    </div>;
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
                    <h1 className="text-2xl font-bold">إشعاراتي 🔔</h1>
                    <p className="text-gray-600">
                        تابع آخر المستجدات والتنبيهات المهمة
                    </p>
                </div>
                <Button
                    variant="text"
                    onClick={() => setShowSettings(true)}
                >
                    <FaCog className="ml-2" />
                    إعدادات الإشعارات
                </Button>
            </div>

            {/* الإشعار العاجل */}
            {urgentNotification && (
                <Alert variant="filled" severity="warning">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <FaExclamationTriangle className="text-yellow-500 text-xl" />
                            <div>
                                <p className="font-medium">{urgentNotification.title}</p>
                                <p className="text-sm text-gray-600">{urgentNotification.message}</p>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => markAsRead(urgentNotification.id)}
                        >
                            تم
                        </Button>
                    </div>
                </Alert>
            )}

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { value: 0, label: 'كل الإشعارات', icon: <FaBell className="text-gray-400 text-4xl" />, content: filteredNotificationsDesign },
                    { value: 1, label: 'غير مقروء', icon: <FaExclamationTriangle className="text-gray-400 text-4xl" />, content: filteredNotificationsDesign },
                    { value: 2, label: 'تم القراءة', icon: <FaCheck className="text-gray-400 text-4xl" />, content: filteredNotificationsDesign },
                    { value: 3, label: 'مهم', icon: <FaExclamation className="text-gray-400 text-4xl" />, content: filteredNotificationsDesign },
                ]}
            />

            {/* قائمة الإشعارات */}


            {/* إعدادات الإشعارات */}
            {showSettings && (
                <Modal
                    open={showSettings}
                    onClose={() => setShowSettings(false)}
                    title="إعدادات الإشعارات"
                >
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-bold">أنواع الإشعارات</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>الواجبات والمواعيد النهائية</span>
                                    <Switch
                                        checked={settings.assignments}
                                        onChange={(checked) => setSettings({ ...settings, assignments: checked.target.checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الدرجات والنتائج</span>
                                    <Switch
                                        checked={settings.grades}
                                        onChange={(checked) => setSettings({ ...settings, grades: checked.target.checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الرسائل الإدارية</span>
                                    <Switch
                                        checked={settings.messages}
                                        onChange={(checked) => setSettings({ ...settings, messages: checked.target.checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الإنجازات والشارات</span>
                                    <Switch
                                        checked={settings.achievements}
                                        onChange={(checked) => setSettings({ ...settings, achievements: checked.target.checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الإشعارات العاجلة</span>
                                    <Switch
                                        checked={settings.urgent}
                                        onChange={(checked) => setSettings({ ...settings, urgent: checked.target.checked })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold">طرق الإرسال</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>البريد الإلكتروني</span>
                                    <Switch
                                        checked={settings.email}
                                        onChange={(checked) => setSettings({ ...settings, email: checked.target.checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>إشعارات التطبيق</span>
                                    <Switch
                                        checked={settings.push}
                                        onChange={(checked) => setSettings({ ...settings, push: checked.target.checked })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="text"
                                onClick={() => setShowSettings(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => updateSettings(settings)}
                            >
                                حفظ التغييرات
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </motion.div>
    );
} 