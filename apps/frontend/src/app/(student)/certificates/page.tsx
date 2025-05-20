'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
    Stepper,
    Modal,
    Input,
    Textarea
} from '@/components/common';
import { certificateApi, badgeApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { FaLinkedin, FaDownload, FaQrcode, FaMedal, FaTrophy } from 'react-icons/fa';

export default function StudentCertificates() {
    const [activeTab, setActiveTab] = useState('certificates');
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestData, setRequestData] = useState({
        name: '',
        address: '',
        phone: '',
        notes: ''
    });

    // استعلامات البيانات
    const { data: certificates, isLoading: isLoadingCertificates } = useQuery({
        queryKey: ['certificates'],
        queryFn: () => certificateApi.getByStudent(),
    });

    const { data: badges, isLoading: isLoadingBadges } = useQuery({
        queryKey: ['badges'],
        queryFn: () => badgeApi.getByStudent(),
    });

    // طلب شهادة مطبوعة
    const { mutate: requestCertificate, isLoading: isRequesting } = useMutation({
        mutationFn: (data) => certificateApi.requestPrint(data),
        onSuccess: () => {
            setShowRequestForm(false);
            setRequestData({ name: '', address: '', phone: '', notes: '' });
        }
    });

    if (isLoadingCertificates || isLoadingBadges) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} height={300} />
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
                    <h1 className="text-2xl font-bold">شهاداتي وإنجازاتي 🏆</h1>
                    <p className="text-gray-600">
                        عرض وإدارة شهاداتك الأكاديمية وإنجازاتك الرقمية
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setShowRequestForm(true)}
                >
                    طلب شهادة مطبوعة
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                    { value: 'certificates', label: 'الشهادات' },
                    { value: 'badges', label: 'الشارات' },
                    { value: 'history', label: 'السجل' },
                ]}
            />

            {/* محتوى التبويبات */}
            {activeTab === 'certificates' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates?.map((certificate, index) => (
                        <motion.div
                            key={certificate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    <img
                                        src={certificate.previewUrl}
                                        alt={certificate.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{certificate.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {format(new Date(certificate.issuedAt), 'd MMMM yyyy', { locale: ar })}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <Tooltip content="تحميل PDF">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => certificateApi.download(certificate.id)}
                                            >
                                                <FaDownload />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content="مشاركة على LinkedIn">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => certificateApi.share(certificate.id, 'linkedin')}
                                            >
                                                <FaLinkedin />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content="رمز التحقق">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {/* عرض رمز التحقق */ }}
                                            >
                                                <FaQrcode />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <Badge variant="success">صادرة</Badge>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'badges' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {badges?.map((badge, index) => (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full text-center">
                                <div className="w-20 h-20 mx-auto mb-4">
                                    {badge.type === 'medal' ? (
                                        <FaMedal className="w-full h-full text-yellow-500" />
                                    ) : badge.type === 'trophy' ? (
                                        <FaTrophy className="w-full h-full text-amber-500" />
                                    ) : (
                                        <Badge variant="primary" className="w-full h-full">
                                            {badge.points}
                                        </Badge>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                                <div className="text-sm text-gray-500">
                                    {format(new Date(badge.earnedAt), 'd MMMM yyyy', { locale: ar })}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card>
                        <h2 className="text-xl font-bold mb-4">سجل الإنجازات</h2>
                        <div className="space-y-4">
                            {[...(certificates || []), ...(badges || [])]
                                .sort((a, b) => new Date(b.earnedAt || b.issuedAt) - new Date(a.earnedAt || a.issuedAt))
                                .map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Alert variant="info">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {item.description || item.courseTitle}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">
                                                        {format(
                                                            new Date(item.earnedAt || item.issuedAt),
                                                            'd MMMM yyyy',
                                                            { locale: ar }
                                                        )}
                                                    </p>
                                                    <Badge variant={item.type === 'certificate' ? 'success' : 'primary'}>
                                                        {item.type === 'certificate' ? 'شهادة' : 'شارة'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Alert>
                                    </motion.div>
                                ))}
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* نموذج طلب شهادة مطبوعة */}
            {showRequestForm && (
                <Modal
                    isOpen={showRequestForm}
                    onClose={() => setShowRequestForm(false)}
                    title="طلب شهادة مطبوعة"
                >
                    <div className="space-y-4">
                        <Input
                            label="الاسم الكامل"
                            value={requestData.name}
                            onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                            required
                        />
                        <Textarea
                            label="العنوان"
                            value={requestData.address}
                            onChange={(e) => setRequestData({ ...requestData, address: e.target.value })}
                            required
                        />
                        <Input
                            label="رقم الهاتف"
                            value={requestData.phone}
                            onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                            required
                        />
                        <Textarea
                            label="ملاحظات إضافية"
                            value={requestData.notes}
                            onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                onClick={() => setShowRequestForm(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => requestCertificate(requestData)}
                                loading={isRequesting}
                            >
                                إرسال الطلب
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </motion.div>
    );
} 