// Parallel Route: طلب شهادة
'use client';
import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { certificateApi } from '@/lib/api';

const Card = dynamic(() => import('@/components/common/Card'), { loading: () => <div /> });
const Button = dynamic(() => import('@/components/common/Button'), { loading: () => <div /> });
const Input = dynamic(() => import('@/components/common/Input'), { loading: () => <div /> });

export default function RequestCertificateTab() {
  const { user } = useUser();
  const [requestData, setRequestData] = useState({
    name: '',
    address: '',
    phone: '',
    notes: '',
    userId: user?.id || '',
    title: '',
    description: '',
    points: 0,
    type: '',
    earnedAt: '',
  });
  const { mutate: requestCertificate, isPending } = useMutation({
    mutationFn: (data: any) => certificateApi.create(data),
    onSuccess: () => setRequestData({ name: '', address: '', phone: '', notes: '', userId: user?.id || '', title: '', description: '', points: 0, type: '', earnedAt: '' }),
  });
  return (
    <Card title="طلب شهادة مطبوعة">
      <form
        className="space-y-4"
        onSubmit={e => {
          e.preventDefault();
          requestCertificate(requestData);
        }}
      >
        <Input label="الاسم" value={requestData.name} onChange={e => setRequestData({ ...requestData, name: e.target.value })} required />
        <Input label="العنوان" value={requestData.address} onChange={e => setRequestData({ ...requestData, address: e.target.value })} required />
        <Input label="رقم الهاتف" value={requestData.phone} onChange={e => setRequestData({ ...requestData, phone: e.target.value })} required />
        <Input label="ملاحظات" value={requestData.notes} onChange={e => setRequestData({ ...requestData, notes: e.target.value })} />
        <div className="flex justify-end">
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 