'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    Card,
    Badge,
    Alert,
    Button,
    Tabs,
    Skeleton,
    EmptyState,
    Tooltip,
    Modal,
    Switch,
    Checkbox
} from '@/components/common';
import { notificationsApi } from '@/lib/api';
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
    FaArrowRight
} from 'react-icons/fa';

export default function StudentNotifications() {
    const [activeTab, setActiveTab] = useState('all');
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
        assignments: true,
        grades: true,
        messages: true,
        achievements: true,
        urgent: true,
        email: false,
        push: true
    });

    // استعلامات البيانات
    const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationsApi.getByStudent(),
    });

    // طلب تحديث حالة الإشعار
    const { mutate: markAsRead } = useMutation({
        mutationFn: (id) => notificationsApi.markAsRead(id),
    });

    // طلب تحديث الإعدادات
    const { mutate: updateSettings } = useMutation({
        mutationFn: (data) => notificationsApi.updateSettings(data),
        onSuccess: () => setShowSettings(false)
    });

    if (isLoadingNotifications) {
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
    const filteredNotifications = notifications?.filter(notification => {
        switch (activeTab) {
            case 'unread':
                return !notification.read;
            case 'read':
                return notification.read;
            case 'important':
                return notification.important;
            default:
                return true;
        }
    });

    // الحصول على الإشعار العاجل
    const urgentNotification = notifications?.find(n => n.urgent && !n.read);

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
                    variant="ghost"
                    onClick={() => setShowSettings(true)}
                >
                    <FaCog className="ml-2" />
                    إعدادات الإشعارات
                </Button>
            </div>

            {/* الإشعار العاجل */}
            {urgentNotification && (
                <Alert variant="warning">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <FaExclamationTriangle className="text-yellow-500 text-xl" />
                            <div>
                                <p className="font-medium">{urgentNotification.title}</p>
                                <p className="text-sm text-gray-600">{urgentNotification.content}</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
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
                items={[
                    { value: 'all', label: 'كل الإشعارات' },
                    { value: 'unread', label: 'غير مقروء' },
                    { value: 'read', label: 'تم القراءة' },
                    { value: 'important', label: 'مهم' },
                ]}
            />

            {/* قائمة الإشعارات */}
            <div className="space-y-4">
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
                            <Card className={`${!notification.read ? 'border-l-4 border-primary-500' : ''}`}>
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-full ${notification.type === 'assignment' ? 'bg-blue-100' :
                                            notification.type === 'grade' ? 'bg-green-100' :
                                                notification.type === 'message' ? 'bg-purple-100' :
                                                    'bg-yellow-100'
                                        }`}>
                                        {notification.type === 'assignment' ? <FaExclamationTriangle className="text-blue-500" /> :
                                            notification.type === 'grade' ? <FaTrophy className="text-green-500" /> :
                                                notification.type === 'message' ? <FaEnvelope className="text-purple-500" /> :
                                                    <FaBell className="text-yellow-500" />
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold">{notification.title}</h3>
                                            {!notification.read && (
                                                <Badge variant="primary">جديد</Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mt-2">{notification.content}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-gray-500">
                                                {format(new Date(notification.createdAt), 'd MMMM yyyy - h:mm a', { locale: ar })}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <FaCheck className="ml-2" />
                                                        تم
                                                    </Button>
                                                )}
                                                {notification.actionUrl && (
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => window.location.href = notification.actionUrl}
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
            </div>

            {/* إعدادات الإشعارات */}
            {showSettings && (
                <Modal
                    isOpen={showSettings}
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
                                        onChange={(checked) => setSettings({ ...settings, assignments: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الدرجات والنتائج</span>
                                    <Switch
                                        checked={settings.grades}
                                        onChange={(checked) => setSettings({ ...settings, grades: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الرسائل الإدارية</span>
                                    <Switch
                                        checked={settings.messages}
                                        onChange={(checked) => setSettings({ ...settings, messages: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الإنجازات والشارات</span>
                                    <Switch
                                        checked={settings.achievements}
                                        onChange={(checked) => setSettings({ ...settings, achievements: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>الإشعارات العاجلة</span>
                                    <Switch
                                        checked={settings.urgent}
                                        onChange={(checked) => setSettings({ ...settings, urgent: checked })}
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
                                        onChange={(checked) => setSettings({ ...settings, email: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>إشعارات التطبيق</span>
                                    <Switch
                                        checked={settings.push}
                                        onChange={(checked) => setSettings({ ...settings, push: checked })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                onClick={() => setShowSettings(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                variant="primary"
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