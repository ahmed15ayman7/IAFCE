'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Alert from '@/components/common/Alert';
import { Alert as MuiAlert } from '@mui/material';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';
import Tooltip from '@/components/common/Tooltip';
import Input from '@/components/common/Input';
import { certificateApi, badgeApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { FaLinkedin, FaDownload, FaQrcode, FaMedal, FaTrophy } from 'react-icons/fa';
import { Description, History } from '@mui/icons-material';
import Modal from '@/components/common/Modal';
import { TextareaAutosize } from '@mui/material';
import { Certificate } from '@shared/prisma';

let initialCertificates: Certificate[] = [
    {
        id: '1',
        title: 'شهادة المؤهل العلمي',
        description: 'شهادة المؤهل العلمي',
        image: 'https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg',
        earnedAt: new Date('2021-01-01'),
        createdAt: new Date('2021-01-01'),
        name: 'محمد علي',
        address: 'الرياض',
        phone: '0599999999',
        notes: 'شهادة المؤهل العلمي',
        userId: '1',
        type: 'certificate',
        url: 'https://via.placeholder.com/150',
        points: 100,
    },
    {
        id: '2',
        title: 'شهادة المؤهل العلمي',
        description: 'شهادة المؤهل العلمي',
        image: 'https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg',
        earnedAt: new Date('2021-01-01'),
        createdAt: new Date('2021-01-01'),
        name: 'محمد علي',
        address: 'الرياض',
        phone: '0599999999',
        notes: 'شهادة المؤهل العلمي',
        userId: '1',
        type: 'certificate',
        url: 'https://via.placeholder.com/150',
        points: 100,
    },

];

export default function StudentCertificates() {
    const [activeTab, setActiveTab] = useState(0);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestData, setRequestData] = useState({
        name: '',
        address: '',
        phone: '',
        notes: '',
        userId: '',
        title: '',
        description: '',
        points: 0,
        type: '',
        earnedAt: '',
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
    const { mutate: requestCertificate, isPending: isRequesting } = useMutation({
        mutationFn: (data: {
            name: string;
            address: string;
            phone: string;
            notes: string;
            userId: string;
            title: string;
            description?: string;
            url?: string;
            image?: string;
            points: number;
            type: string;
            earnedAt: string;
        }) => certificateApi.create(data),
        onSuccess: () => {
            setShowRequestForm(false);
            setRequestData({ name: '', address: '', phone: '', notes: '', userId: '', title: '', description: '', points: 0, type: '', earnedAt: '' });
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
                    variant="contained"
                    onClick={() => setShowRequestForm(true)}
                >
                    طلب شهادة مطبوعة
                </Button>
            </div>

            {/* التبويبات */}
            <Tabs
                value={activeTab}
                onChange={(value) => setActiveTab(value)}
                tabs={[
                    {
                        value: 0, label: 'الشهادات', icon: <Description />, content: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(certificates ?? initialCertificates)?.map((certificate, index) => (
                                <motion.div
                                    key={certificate.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card title={certificate.title} className="h-full">
                                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                            <img
                                                src={certificate.image || ''}
                                                alt={certificate.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{certificate.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {format(new Date(certificate.earnedAt), 'd MMMM yyyy', { locale: ar })}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-2">
                                                <Tooltip title="تحميل PDF">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => certificateApi.download(certificate.id)}
                                                    >
                                                        <FaDownload />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="مشاركة على LinkedIn">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => certificateApi.share(certificate.id, 'linkedin')}
                                                    >
                                                        <FaLinkedin />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="رمز التحقق">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {/* عرض رمز التحقق */ }}
                                                    >
                                                        <FaQrcode />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <Badge variant="standard" className="text-sm">
                                                <span className="text-sm">صادرة</span>
                                            </Badge>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    },
                    {
                        value: 1, label: 'الشارات', icon: <Description />, content: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {badges?.map((badge, index) => (
                                <motion.div
                                    key={badge.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card title={badge.title} className="h-full text-center">
                                        <div className="w-20 h-20 mx-auto mb-4">
                                            {badge.type === 'medal' ? (
                                                <FaMedal className="w-full h-full text-yellow-500" />
                                            ) : badge.type === 'trophy' ? (
                                                <FaTrophy className="w-full h-full text-amber-500" />
                                            ) : (
                                                <Badge variant="standard" className="w-full h-full">
                                                    <span className="text-sm">{badge.points}</span>
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
                    },
                    {
                        value: 2, label: 'السجل', icon: <History />, content: <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card title="سجل الإنجازات">
                                <div className="space-y-4">
                                    {[...(certificates || []), ...(badges || [])]
                                        .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
                                        .map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <MuiAlert variant="standard">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">{item.title}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">
                                                                {format(
                                                                    new Date(item.earnedAt),
                                                                    'd MMMM yyyy',
                                                                    { locale: ar }
                                                                )}
                                                            </p>
                                                            <Badge variant={item.type === 'certificate' ? 'standard' : 'dot'}>
                                                                <span className="text-sm">
                                                                    {item.type === 'certificate' ? 'شهادة' : 'شارة'}
                                                                </span>
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </MuiAlert>
                                            </motion.div>
                                        ))}
                                </div>
                            </Card>
                        </motion.div>
                    },
                ]}
            />

            {/* محتوى التبويبات */}
            {/* {activeTab === 0 && (
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
                                                onClick={() => {}}
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
            )} */}

            {/* {activeTab === 1 && (
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
            )} */}

            {/* <h2 className="text-xl font-bold mb-4">سجل الإنجازات</h2> */}
            {/* {activeTab === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card title="سجل الإنجازات">
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
            )} */}

            {/* نموذج طلب شهادة مطبوعة */}
            {showRequestForm && (
                <Modal
                    open={true}
                    onClose={() => setShowRequestForm(false)}
                    title="طلب شهادة مطبوعة"
                >
                    <div className="space-y-4 flex flex-col gap-4 items-center">
                        <Input
                            label="الاسم الكامل"
                            className="w-full"
                            value={requestData.name}
                            onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                            required
                        />
                        <Input
                            className="w-full"
                            label="رقم الهاتف"
                            value={requestData.phone}
                            onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                            required
                        />
                        <Input
                            className="w-full"
                            label="ملاحظات إضافية"
                            value={requestData.notes}
                            onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                        />
                        <Input
                            className="w-full"
                            label="العنوان"
                            value={requestData.title}
                            onChange={(e) => setRequestData({ ...requestData, title: e.target.value })}
                            required
                        />
                        <Input
                            label="الوصف"
                            value={requestData.description}
                            className="w-full"
                            onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                            required
                        />
                        <Input
                            label="تاريخ الإنجاز"
                            className="w-full"
                            value={requestData.earnedAt}
                            onChange={(e) => setRequestData({ ...requestData, earnedAt: e.target.value })}
                            required
                        />
                        <div className="flex justify-end gap-8 w-full">
                            <Button
                                variant="outlined"
                                onClick={() => setShowRequestForm(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => requestCertificate(requestData)}
                                loading={isRequesting}
                            >
                                إرسال الطلب
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
            }
        </motion.div >
    );
} 