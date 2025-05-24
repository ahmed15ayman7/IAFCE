import { communityApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Tooltip from '@/components/common/Tooltip';
import Badge from '@/components/common/Badge';
import { FaDownload, FaLinkedin, FaQrcode, FaUserPlus } from 'react-icons/fa';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/common/Avatar';
import { motion } from 'framer-motion';
import SearchBar from '@/components/ui/SearchBar';
import { Skeleton } from '@mui/material';

export default function StudentCommunitiesPage() {
    const router = useRouter();
    const { data: communities, isLoading: isLoadingCommunities } = useQuery({
        queryKey: ['communities'],
        queryFn: () => communityApi.getAll(),
    });
    const [searchQuery, setSearchQuery] = useState('');
    const filteredCommunities = communities?.filter((community) => {
        return community.name.toLowerCase().includes(searchQuery.toLowerCase())
    });
    if (isLoadingCommunities) {
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
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
    >
        <div className="flex items-center justify-between">
            <SearchBar placeholder="ابحث عن مجتمع" setSearch={setSearchQuery} />
        </div>
        {filteredCommunities?.map((community) => (
            <Card title={community.name} className="h-full cursor-pointer" onClick={() => router.push(`/student/community/${community.id}`)}>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                        src={community.image || ''}
                        alt={community.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-lg font-bold mb-2">{community.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                    {format(new Date(community.createdAt), 'd MMMM yyyy', { locale: ar })}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <Tooltip title="الانضمام">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => { }}
                            >
                                <FaUserPlus />
                            </Button>
                        </Tooltip>
                        <Tooltip title="مشاركة على LinkedIn">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => { }}
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
                        <span className="text-sm">{community.type}</span>
                    </Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        {community.participants.slice(0, 3).map((participant, i) => (
                            <Tooltip title={`${participant.firstName} ${participant.lastName}`}>
                                <Avatar src={participant.avatar || ''} className={`w-10 h-10 border-2 border-white ${i === 0 ? '' : '-ml-2'}`} />
                            </Tooltip>
                        ))}
                    </div>

                </div>
            </Card>
        ))}
    </motion.div>;
}