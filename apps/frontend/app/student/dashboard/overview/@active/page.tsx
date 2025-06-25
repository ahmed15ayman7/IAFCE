// Parallel Route: الكورسات النشطة
'use client';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import { courseApi } from '@/lib/api';
import { Course, Instructor, Lesson, Quiz, User, File as FileModel } from '@shared/prisma';

const Card = dynamic(() => import('@/components/common/Card'), { loading: () => <div /> });

// جلب بيانات الكورسات النشطة
let getCoursesData = async (id: string) => {
  const response = await courseApi.getByStudentId(id);
  return response.data;
};

export default function ActiveCoursesTab() {
  let { user } = useUser();
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCoursesData(user?.id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: [],
  });

  // تصفية الكورسات النشطة فقط
  const activeCourses = Array.isArray(courses)
    ? courses.filter((course) => course.status === 'ACTIVE')
    : [];
    let progress = 0;
    let nextLesson = '';
    if(Array.isArray(courses) && courses.length > 0){
        progress = courses.reduce((acc, course) => acc + course.lessons.filter((lesson:Lesson) => lesson.status === 'COMPLETED').length, 0);
        nextLesson = courses.find((course) => course.lessons.find((lesson:Lesson) => lesson.status === 'NOT_STARTED'))?.lessons[0].title ?? '';
    }
  return (
    <div className="space-y-4">
      {activeCourses.length === 0 ? (
        <div className="text-center text-gray-400">لا توجد كورسات نشطة حالياً</div>
      ) : (
        activeCourses.map((course) => (
            <Card
            key={course.id}
            title={course.title}
            description={`المحاضر: ${course.instructors[0].user.firstName} ${course.instructors[0].user.lastName}`}
            className="h-full"
        >
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        التقدم
                    </span>
                    <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-primary-main h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {/* <div className="text-sm text-gray-600 dark:text-gray-400">
                    آخر دخول: {course.lastAccessed}
                </div> */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    الدرس التالي: {nextLesson}
                </div>
            </div>
        </Card>
        ))
      )}
    </div>
  );
} 