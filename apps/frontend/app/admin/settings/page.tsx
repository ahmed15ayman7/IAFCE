import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { useTranslation } from 'next-i18next';

export default function AdminSettings() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: t('عام') },
        { id: 'security', label: t('الأمان') },
        { id: 'notifications', label: t('الإشعارات') },
        { id: 'appearance', label: t('المظهر') },
        { id: 'integrations', label: t('التكاملات') },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('الإعدادات')}</h1>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    {t('حفظ التغييرات')}
                </button>
            </div>

            <div className="flex gap-4 mb-8 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 rounded-md ${activeTab === tab.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeTab === 'general' && (
                    <>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات المدرسة')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('اسم المدرسة')}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="المدرسة النموذجية"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('البريد الإلكتروني')}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="info@school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('رقم الهاتف')}</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="+966123456789"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('العنوان')}</label>
                                    <textarea
                                        className="w-full px-4 py-2 border rounded-md"
                                        rows={3}
                                        defaultValue="شارع الملك فهد، الرياض، المملكة العربية السعودية"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات النظام')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('اللغة الافتراضية')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="ar">العربية</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('التوقيت')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="+3">توقيت الرياض (UTC+3)</option>
                                        <option value="+2">توقيت القاهرة (UTC+2)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('تنسيق التاريخ')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                                        <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                                        <option value="yyyy/mm/dd">سنة/شهر/يوم</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('تنسيق العملة')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="SAR">ريال سعودي (SAR)</option>
                                        <option value="USD">دولار أمريكي (USD)</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === 'security' && (
                    <>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات الأمان')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('قوة كلمة المرور')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="low">منخفضة</option>
                                        <option value="medium">متوسطة</option>
                                        <option value="high">عالية</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('مدة صلاحية كلمة المرور')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="30">30 يوم</option>
                                        <option value="60">60 يوم</option>
                                        <option value="90">90 يوم</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('عدد محاولات تسجيل الدخول')}</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="3"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('مدة القفل')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="5">5 دقائق</option>
                                        <option value="15">15 دقيقة</option>
                                        <option value="30">30 دقيقة</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات النسخ الاحتياطي')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('تكرر النسخ الاحتياطي')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="daily">يومي</option>
                                        <option value="weekly">أسبوعي</option>
                                        <option value="monthly">شهري</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('وقت النسخ الاحتياطي')}</label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="02:00"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('عدد النسخ المحفوظة')}</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="7"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('موقع النسخ الاحتياطي')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="local">محلي</option>
                                        <option value="cloud">سحابي</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === 'notifications' && (
                    <>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات الإشعارات')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إشعارات البريد الإلكتروني')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إشعارات الهاتف')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إشعارات النظام')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('توقيت الإشعارات')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="immediate">فوري</option>
                                        <option value="daily">يومي</option>
                                        <option value="weekly">أسبوعي</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات البريد الإلكتروني')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('خادم SMTP')}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="smtp.school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('البريد الإلكتروني')}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="noreply@school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('كلمة المرور')}</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="********"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('المنفذ')}</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="587"
                                    />
                                </div>
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === 'appearance' && (
                    <>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات المظهر')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('السمة')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="light">فاتح</option>
                                        <option value="dark">داكن</option>
                                        <option value="system">نظام</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('اللون الرئيسي')}</label>
                                    <input
                                        type="color"
                                        className="w-full h-10 rounded-md"
                                        defaultValue="#3B82F6"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('حجم الخط')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="small">صغير</option>
                                        <option value="medium">متوسط</option>
                                        <option value="large">كبير</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('نمط الخط')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="normal">عادي</option>
                                        <option value="bold">غامق</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات الواجهة')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إظهار الشريط الجانبي')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إظهار الشريط العلوي')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('إظهار الشريط السفلي')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">{t('نمط القائمة')}</label>
                                    <select className="w-full px-4 py-2 border rounded-md">
                                        <option value="vertical">عمودي</option>
                                        <option value="horizontal">أفقي</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === 'integrations' && (
                    <>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات التكامل')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('تكامل Google Classroom')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('تكامل Microsoft Teams')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('تكامل Zoom')}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span>{t('تكامل نظام الدفع')}</span>
                                    </label>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">{t('إعدادات API')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">{t('مفتاح API')}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="sk_test_123456789"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('سر API')}</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="********"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('عنوان API')}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="https://api.school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">{t('معدل الحد')}</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md"
                                        defaultValue="100"
                                    />
                                </div>
                            </div>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
} 