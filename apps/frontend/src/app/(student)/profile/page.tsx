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
    Input,
    Select,
    Switch,
    Avatar,
    QRCode
} from '@/components/common';
import { profileApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FaUser, FaLock, FaShieldAlt, FaCog, FaQrcode, FaCheck, FaTimes, FaUpload, FaGlobe, FaMoon, FaSun } from 'react-icons/fa';

export default function StudentProfile() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('general');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [theme, setTheme] = useState('light');
    const [showNightModeTrial, setShowNightModeTrial] = useState(false);

    // استعلامات البيانات
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileApi.getProfile(),
    });

    // طلب تحديث البيانات
    const { mutate: updateProfile } = useMutation({
        mutationFn: (data) => profileApi.updateProfile(data),
    });

    // طلب تغيير كلمة المرور
    const { mutate: changePassword } = useMutation({
        mutationFn: (data) => profileApi.changePassword(data),
        onSuccess: () => setShowPasswordModal(false)
    });

    // طلب تحديث التحقق الثنائي
    const { mutate: update2FA } = useMutation({
        mutationFn: (data) => profileApi.update2FA(data),
        onSuccess: () => setShow2FAModal(false)
    });

    if (isLoadingProfile) {
        return (
            <div className="space-y-6">
                <Skeleton height={200} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {/* ملخص الحساب */}
            <Card>
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <Avatar src={profile?.avatar} size="xl" />
                        <Badge
                            variant={profile?.active ? 'success' : 'warning'}
                            className="absolute -bottom-2 -right-2"
                        >
                            {profile?.active ? 'نشط' : 'غير نشط'}
                        </Badge>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold">
                                {profile?.name}
                                {profile?.nickname && (
                                    <span className="text-gray-500 text-lg">
                                        ({profile.nickname})
                                    </span>
                                )}
                            </h1>
                            {profile?.verified && (
                                <Tooltip content="حساب موثق">
                                    <Badge variant="success">
                                        <FaCheck className="ml-2" />
                                        موثق
                                    </Badge>
                                </Tooltip>
                            )}
                        </div>
                        <p className="text-gray-600 mt-2">
                            رقم الطالب: {profile?.academicId}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <QRCode value={profile?.academicId} size={100} />
                        <Button variant="ghost" size="sm">
                            <FaQrcode className="ml-2" />
                            تحميل
                        </Button>
                    </div>
                </div>
            </Card>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                    { value: 'general', label: 'البيانات الشخصية', icon: <FaUser /> },
                    { value: 'security', label: 'الأمان', icon: <FaLock /> },
                    { value: 'preferences', label: 'التفضيلات', icon: <FaCog /> },
                ]}
            />

            {/* محتوى التبويبات */}
            {activeTab === 'general' && (
                <Card>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="الاسم الكامل"
                                value={profile?.name}
                                onChange={(e) => updateProfile({ name: e.target.value })}
                                required
                            />
                            <Input
                                label="اسم الشهرة"
                                value={profile?.nickname}
                                onChange={(e) => updateProfile({ nickname: e.target.value })}
                            />
                            <Input
                                label="البريد الإلكتروني"
                                value={profile?.email}
                                onChange={(e) => updateProfile({ email: e.target.value })}
                                required
                                type="email"
                            />
                            <Input
                                label="رقم الهاتف"
                                value={profile?.phone}
                                onChange={(e) => updateProfile({ phone: e.target.value })}
                                type="tel"
                            />
                            <Input
                                label="العمر"
                                value={profile?.age}
                                onChange={(e) => updateProfile({ age: e.target.value })}
                                type="number"
                            />
                            <Select
                                label="الفئة/الصف"
                                value={profile?.grade}
                                onChange={(value) => updateProfile({ grade: value })}
                                options={[
                                    { value: '1', label: 'الصف الأول' },
                                    { value: '2', label: 'الصف الثاني' },
                                    { value: '3', label: 'الصف الثالث' },
                                ]}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button variant="primary" size="lg">
                                حفظ التغييرات
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {activeTab === 'security' && (
                <div className="space-y-6">
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">كلمة المرور</h3>
                                <p className="text-gray-600">قم بتغيير كلمة المرور الخاصة بك</p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => setShowPasswordModal(true)}
                            >
                                تغيير كلمة المرور
                            </Button>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">التحقق الثنائي</h3>
                                <p className="text-gray-600">قم بتفعيل التحقق الثنائي لحماية حسابك</p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => setShow2FAModal(true)}
                            >
                                إعداد التحقق الثنائي
                            </Button>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold mb-4">سجل الدخول</h3>
                        <div className="space-y-4">
                            {profile?.loginHistory?.map((login, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">{login.ip}</p>
                                        <p className="text-sm text-gray-600">{login.date}</p>
                                    </div>
                                    <Badge variant={login.success ? 'success' : 'danger'}>
                                        {login.success ? 'ناجح' : 'فاشل'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'preferences' && (
                <div className="space-y-6">
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">اللغة</h3>
                                <p className="text-gray-600">اختر لغة واجهة التطبيق</p>
                            </div>
                            <Select
                                value={i18n.language}
                                onChange={(value) => i18n.changeLanguage(value)}
                                options={[
                                    { value: 'ar', label: 'العربية' },
                                    { value: 'en', label: 'English' },
                                ]}
                            />
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">المظهر</h3>
                                <p className="text-gray-600">اختر مظهر واجهة التطبيق</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant={theme === 'light' ? 'primary' : 'ghost'}
                                    onClick={() => setTheme('light')}
                                >
                                    <FaSun className="ml-2" />
                                    فاتح
                                </Button>
                                <Button
                                    variant={theme === 'dark' ? 'primary' : 'ghost'}
                                    onClick={() => setTheme('dark')}
                                >
                                    <FaMoon className="ml-2" />
                                    داكن
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowNightModeTrial(true)}
                                >
                                    تجربة الوضع الليلي
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* نافذة تغيير كلمة المرور */}
            {showPasswordModal && (
                <Modal
                    isOpen={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    title="تغيير كلمة المرور"
                >
                    <div className="space-y-4">
                        <Input
                            label="كلمة المرور الحالية"
                            type="password"
                            required
                        />
                        <Input
                            label="كلمة المرور الجديدة"
                            type="password"
                            required
                        />
                        <Input
                            label="تأكيد كلمة المرور الجديدة"
                            type="password"
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                onClick={() => setShowPasswordModal(false)}
                            >
                                إلغاء
                            </Button>
                            <Button variant="primary">
                                حفظ التغييرات
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* نافذة التحقق الثنائي */}
            {show2FAModal && (
                <Modal
                    isOpen={show2FAModal}
                    onClose={() => setShow2FAModal(false)}
                    title="إعداد التحقق الثنائي"
                >
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>البريد الإلكتروني</span>
                                <Switch
                                    checked={profile?.twoFactor?.email}
                                    onChange={(checked) => update2FA({ email: checked })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span>رسالة SMS</span>
                                <Switch
                                    checked={profile?.twoFactor?.sms}
                                    onChange={(checked) => update2FA({ sms: checked })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Google Authenticator</span>
                                <Switch
                                    checked={profile?.twoFactor?.authenticator}
                                    onChange={(checked) => update2FA({ authenticator: checked })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                onClick={() => setShow2FAModal(false)}
                            >
                                إلغاء
                            </Button>
                            <Button variant="primary">
                                حفظ التغييرات
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* تجربة الوضع الليلي */}
            {showNightModeTrial && (
                <Alert variant="info">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <FaMoon className="text-primary-500 text-xl" />
                            <div>
                                <p className="font-medium">تجربة الوضع الليلي</p>
                                <p className="text-sm text-gray-600">
                                    سيتم إعادة الوضع السابق بعد 30 ثانية
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowNightModeTrial(false)}
                        >
                            إلغاء التجربة
                        </Button>
                    </div>
                </Alert>
            )}
        </motion.div>
    );
} 