// Parallel Route: شهاداتي
'use client';
import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { certificateApi } from '@/lib/api';
import { Certificate } from '@shared/prisma';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const Card = dynamic(() => import('@/components/common/Card'), { loading: () => <div /> });
const Skeleton = dynamic(() => import('@/components/common/Skeleton'), { loading: () => <div /> });

export default function MyCertificatesTab() {
  const { user } = useUser();
  const { data: certs = [], isLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const res = await certificateApi.getByStudent(user.id);
      return res?.data ?? [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={300} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certs.length === 0 ? (
        <div className="text-center text-gray-400 col-span-3">لا توجد شهادات بعد</div>
      ) : (
        certs.map((certificate: Certificate, index: number) => (
          <Card key={certificate.id} title={certificate.title} className="h-full">
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={certificate.image || ''}
                alt={certificate.title}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{certificate.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {format(new Date(certificate.earnedAt), 'd MMMM yyyy', { locale: ar })}
            </p>
            <p className="text-sm text-gray-500 mb-2">{certificate.description}</p>
          </Card>
        ))
      )}
    </div>
  );
} 