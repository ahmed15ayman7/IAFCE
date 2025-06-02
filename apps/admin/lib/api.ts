import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import authService from './auth.service';
import { Achievement, Badge, Certificate, Community, Course, Discussion, Enrollment, File as FileModel, Group, Lesson, LiveRoom, LoginHistory, Milestone, Notification, NotificationSettings, Option, Path, Post, Question, Quiz, Submission, TwoFactor, User } from '@shared/prisma';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor للطلبات
api.interceptors.request.use(
    async (config) => {
        const accessToken = await authService.getAccessTokenFromCookie();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

// Interceptor للردود
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // إذا كان الخطأ 401 ولم نكن نحاول تجديد التوكن بالفعل
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await authService.refreshToken();
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken } = response.data;
                authService.setTokens(accessToken, refreshToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                // إذا فشل تجديد التوكن، نوجه المستخدم لصفحة تسجيل الدخول
                authService.logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth APIs
export const authApi = {
    login: async (credentials: { email: string; password: string }) => {
        try {

            const response = await api.post('/auth/login', credentials);
            const { access_token, refreshToken } = response.data;
            await authService.setTokens(access_token, refreshToken);

            return response.data;
        } catch (error) {
            console.log(error)
            return null
        }
    },

    signup: async (data: { email: string; password: string; name: string }) => {
        const response = await api.post('/auth/signup', data);
        const { accessToken, refreshToken } = response.data;

        authService.setTokens(accessToken, refreshToken);

        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            authService.logout();
        }
    },

    refreshToken: async ({ refreshToken }: { refreshToken: string }) => {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        const { access_Token } = response.data;
        authService.setTokens(access_Token, refreshToken);
        return access_Token;
    },

    register: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
        role: string;
        subRole: string;
    }) => api.post('/auth/register', data),
    forgotPassword: (email: string) =>
        api.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) =>
        api.post('/auth/reset-password', { token, password }),
};

// User APIs
export const userApi = {
    getProfile: (id: string): Promise<{ success: boolean, data: User & { loginHistory: LoginHistory[], twoFactor: TwoFactor, createdCourses: Course[], enrollments: Enrollment[], achievements: Achievement[], notifications: Notification[] } }> => api.get(`/users/${id}`),
    updateProfile: (data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        avatar?: string;
    }) => api.patch('/users/profile', data),
    changePassword: (data: {
        currentPassword: string;
        newPassword: string;
    }) => api.post('/users/change-password', data),
    getEnrolledCourses: () => api.get('/users/courses'),
    getAchievements: (id: string): Promise<{ success: boolean, data: Achievement[] }> => api.get(`/users/achievements/${id}`),
    getNotifications: (id: string): Promise<{ success: boolean, data: Notification[] }> => api.get(`/notifications/user/${id}`),
    getSubmissions: () => api.get('/users/submissions'),
    getAttendance: () => api.get('/users/attendance'),
    getTwoFactor: (id: string): Promise<{ success: boolean, data: TwoFactor }> => api.get(`/users/${id}/two-factor`),
    updateTwoFactor: (id: string, data: TwoFactor) => api.post(`/users/${id}/two-factor`, data),
    getLoginHistory: (id: string): Promise<{ success: boolean, data: LoginHistory[] }> => api.get(`/users/${id}/login-history`),
    getCreatedCourses: (id: string): Promise<{ success: boolean, data: Course[] }> => api.get(`/users/${id}/created-courses`),
    getEnrollments: (id: string): Promise<{ success: boolean, data: Enrollment[] }> => api.get(`/users/${id}/enrollments`),
};

// Course APIs
export const courseApi = {
    getAll: (): Promise<{ success: boolean, data: Course[] }> => api.get('/courses'),
    getById: (id: string): Promise<{ success: boolean, data: Course & { lessons: (Lesson & { files: FileModel[], quizzes: Quiz[] })[], quizzes: Quiz[], enrollments: (Enrollment & { user: User })[] } }> => api.get(`/courses/${id}`),
    create: (data: {
        title: string;
        description: string;
        academyId: string;
    }) => api.post('/courses', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
    }) => api.patch(`/courses/${id}`, data),
    delete: (id: string) => api.delete(`/courses/${id}`),
    enroll: (courseId: string) => api.post(`/courses/${courseId}/enroll`),
    unenroll: (courseId: string) => api.post(`/courses/${courseId}/unenroll`),
    addInstructor: (courseId: string, instructorId: string) => api.post(`/courses/${courseId}/add-instructor`, { instructorId }),
    removeInstructor: (courseId: string, instructorId: string) => api.post(`/courses/${courseId}/remove-instructor`, { instructorId }),
    getLessons: (courseId: string) => api.get(`/courses/${courseId}/lessons`),
    getQuizzes: (courseId: string) => api.get(`/courses/${courseId}/quizzes`),
    getStudents: (courseId: string) => api.get(`/courses/${courseId}/students`),
    getInstructors: (courseId: string) => api.get(`/courses/${courseId}/instructors`),
    getByStudentId: (studentId: string) => api.get(`/courses/by-student/${studentId}`),
    getByInstructorId: (instructorId: string) => api.get(`/courses/by-instructor/${instructorId}`),
    getByAcademyId: (academyId: string) => api.get(`/courses/by-academy/${academyId}`),
};

// Lesson APIs
export const lessonApi = {
    getByCourse: (courseId: string): Promise<{ success: boolean, data: (Lesson & { files: FileModel[], quizzes: (Quiz & { submissions: Submission[], questions: Question[] })[] })[] }> => api.get(`/lessons/course/${courseId}`),
    getById: (id: string): Promise<{ success: boolean, data: Lesson & { files: FileModel[], quizzes: (Quiz & { submissions: Submission[], questions: Question[] })[] } }> => api.get(`/lessons/${id}`),
    create: (data: {
        title: string;
        content: string;
        videoUrl?: string;
        courseId: string;
    }) => api.post('/lessons', data),
    update: (id: string, data: Lesson) => api.patch(`/lessons/${id}`, data),
    delete: (id: string) => api.delete(`/lessons/${id}`),
    getFiles: (lessonId: string) => api.get(`/lessons/${lessonId}/files`),
    getQuizzes: (lessonId: string) => api.get(`/lessons/${lessonId}/quizzes`),
    markAsCompleted: (lessonId: string) =>
        api.post(`/lessons/${lessonId}/complete`),
};

// Quiz APIs
export const quizApi = {
    getByLesson: (lessonId: string) => api.get(`/quizzes/lesson/${lessonId}`),
    getById: (id: string) => api.get(`/quizzes/${id}`),
    create: (data: Quiz & { questions: (Question & { options: Option[] })[] }) => api.post('/quizzes', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        questions?: Array<{
            text: string;
            type: string;
            options?: any;
            answer: any;
        }>;
    }) => api.patch(`/quizzes/${id}`, data),
    delete: (id: string) => api.delete(`/quizzes/${id}`),
    submit: (quizId: string, answers: any) =>
        api.post(`/quizzes/${quizId}/submit`, { answers }),
    getResults: (quizId: string) => api.get(`/quizzes/${quizId}/results`),
    getStudentResults: (quizId: string, studentId: string) =>
        api.get(`/quizzes/${quizId}/student/${studentId}/results`),
};

// Attendance APIs
export const attendanceApi = {
    track: (data: {
        lessonId: string;
        studentId: string;
        method: 'FACE_ID' | 'QR_CODE';
    }) => api.post('/attendance/track', data),
    getStudentStats: (studentId: string) =>
        api.get(`/attendance/student/${studentId}/stats`),
    getLessonAttendance: (lessonId: string) =>
        api.get(`/attendance/lesson/${lessonId}`),
    updateStatus: (id: string, status: 'PRESENT' | 'ABSENT' | 'LATE') =>
        api.patch(`/attendance/${id}/status`, { status }),
    getByDate: (date: string) => api.get(`/attendance/date/${date}`),
};

// Notification APIs
export const notificationApi = {
    getAll: (): Promise<{ success: boolean, data: Notification[] }> => api.get(`/notifications`),
    getAllByUserId: (userId: string): Promise<{ success: boolean, data: Notification[] }> => api.get(`/notifications/user/${userId}`),
    getUnread: () => api.get('/notifications/unread'),
    markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch('/notifications/read-all'),
    create: (data: {
        userId: string;
        type: string;
        message: string;
        actionUrl?: string;
        title?: string;
        urgent?: boolean;
        isImportant?: boolean;
    }) => api.post('/notifications', data),
    update: (id: string, data: {
        message?: string;
        actionUrl?: string;
        title?: string;
        urgent?: boolean;
        isImportant?: boolean;
    }) => api.patch(`/notifications/${id}`, data),
    delete: (id: string) => api.delete(`/notifications/${id}`),
    getSettings: () => api.get('/notifications/settings'),
    getSettingsByUserId: (userId: string): Promise<{ success: boolean, data: NotificationSettings }> => api.get(`/notifications/settings/user/${userId}`),
    updateSettings: (data: {
        assignments: boolean;
        grades: boolean;
        messages: boolean;
        achievements: boolean;
        urgent: boolean;
        email: boolean;
        push: boolean;
    }) => api.patch('/notifications/settings', data),
    createSettings: (data: {
        assignments: boolean;
        grades: boolean;
        messages: boolean;
        achievements: boolean;
        urgent: boolean;
        email: boolean;
        push: boolean;
    }) => api.post('/notifications/settings', data),
};

// File APIs
export const fileApi = {
    upload: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: (id: string) => api.delete(`/files/${id}`),
    getByLesson: (lessonId: string) => api.get(`/files/lesson/${lessonId}`),
    download: (id: string) => api.get(`/files/${id}/download`, {
        responseType: 'blob',
    }),
};

// Group APIs
export const groupApi = {
    getAll: () => api.get('/groups'),
    getById: (id: string) => api.get(`/groups/${id}`),
    create: (data: { name: string; members?: string[] }) => api.post('/groups', data),
    update: (id: string, data: { name?: string; members?: string[] }) =>
        api.patch(`/groups/${id}`, data),
    delete: (id: string) => api.delete(`/groups/${id}`),
    addMember: (groupId: string, userId: string) =>
        api.post(`/groups/${groupId}/members/${userId}`),
    removeMember: (groupId: string, userId: string) =>
        api.delete(`/groups/${groupId}/members/${userId}`),
};

// Channel APIs
export const channelApi = {
    getAll: () => api.get('/channels'),
    getById: (id: string) => api.get(`/channels/${id}`),
    create: (data: { name: string; members?: string[] }) => api.post('/channels', data),
    update: (id: string, data: { name?: string; members?: string[] }) =>
        api.patch(`/channels/${id}`, data),
    delete: (id: string) => api.delete(`/channels/${id}`),
    addMember: (channelId: string, userId: string) =>
        api.post(`/channels/${channelId}/members/${userId}`),
    removeMember: (channelId: string, userId: string) =>
        api.delete(`/channels/${channelId}/members/${userId}`),
};

// Message APIs
export const messageApi = {
    getByChannel: (channelId: string) => api.get(`/messages/channel/${channelId}`),
    create: (data: { content: string; channelId: string }) =>
        api.post('/messages', data),
    update: (id: string, content: string) =>
        api.patch(`/messages/${id}`, { content }),
    delete: (id: string) => api.delete(`/messages/${id}`),
};

// Post APIs
export const postApi = {
    getAll: () => api.get('/posts'),
    getById: (id: string) => api.get(`/posts/${id}`),
    create: (data: { content: string }) => api.post('/posts', data),
    update: (id: string, content: string) =>
        api.patch(`/posts/${id}`, { content }),
    delete: (id: string) => api.delete(`/posts/${id}`),
    like: (id: string) => api.post(`/posts/${id}/like`),
    unlike: (id: string) => api.delete(`/posts/${id}/like`),
};

// Bookmark APIs
export const bookmarkApi = {
    getAll: () => api.get('/bookmarks'),
    create: (data: { type: string; itemId: string }) =>
        api.post('/bookmarks', data),
    delete: (id: string) => api.delete(`/bookmarks/${id}`),
};

// Event APIs
export const eventApi = {
    getAll: () => api.get('/events'),
    getById: (id: string) => api.get(`/events/${id}`),
    create: (data: {
        title: string;
        description?: string;
        startTime: string;
        endTime: string;
        academyId: string;
    }) => api.post('/events', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        startTime?: string;
        endTime?: string;
    }) => api.patch(`/events/${id}`, data),
    delete: (id: string) => api.delete(`/events/${id}`),
};

// Academy APIs
export const academicApi = {
    getAll: async (academyId: string) => {
        const response = await fetch(`/api/academic?academyId=${academyId}`);
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`/api/academic/${id}`);
        return response.json();
    },
    create: async (data: {
        title: string;
        description: string;
        type: string;
        level: string;
        instructor: string;
        startDate: string;
        endDate: string;
        status: string;
        academyId: string;
        createdByAdminId: string;
    }) => {
        const response = await fetch('/api/academic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    update: async (
        id: string,
        data: {
            title?: string;
            description?: string;
            type?: string;
            level?: string;
            instructor?: string;
            startDate?: string;
            endDate?: string;
            status?: string;
            updatedByAdminId: string;
        }
    ) => {
        const response = await fetch(`/api/academic/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (id: string) => {
        const response = await fetch(`/api/academic/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};

// Achievement APIs
export const achievementApi = {
    getAll: () => api.get('/achievements'),
    getByUser: (userId: string): Promise<{ success: boolean, data: Achievement[] }> => api.get(`/achievements/user/${userId}`),
    create: (data: {
        userId: string;
        type: string;
        value: any;
    }) => api.post('/achievements', data),
    delete: (id: string) => api.delete(`/achievements/${id}`),
};

// Enrollment APIs
export const enrollmentApi = {
    getAll: (): Promise<{ success: boolean, data: (Enrollment & { course: Course & { quizzes: Quiz[] } })[] }> => api.get('/enrollments'),
    getByUser: (userId: string): Promise<{ success: boolean, data: (Enrollment & { course: Course & { quizzes: Quiz[] } })[] }> => api.get(`/enrollments/user/${userId}`),
    getByCourse: (courseId: string): Promise<{ success: boolean, data: (Enrollment & { course: Course & { quizzes: Quiz[] } })[] }> => api.get(`/enrollments/course/${courseId}`),
    create: (data: {
        userId: string;
        courseId: string;
    }) => api.post('/enrollments', data),
    update: (id: string, data: {
        progress?: number;
        status?: string;
    }) => api.patch(`/enrollments/${id}`, data),
    delete: (id: string) => api.delete(`/enrollments/${id}`),
};

// Question APIs
export const questionApi = {
    getByQuiz: (quizId: string) => api.get(`/questions/${quizId}/quiz`),
    getById: (id: string) => api.get(`/questions/${id}`),
    create: (data: {
        text: string;
        type: string;
        options?: any;
        answer: any;
        quizId: string;
    }) => api.post('/questions', data),
    update: (id: string, data: {
        text?: string;
        type?: string;
        options?: any;
        answer?: any;
    }) => api.patch(`/questions/${id}`, data),
    delete: (id: string) => api.delete(`/questions/${id}`),
    createOption: (data: Option) => api.post('/questions/option', data),
    updateOption: (id: string, data: Option) => api.patch(`/questions/option/${id}`, data),
    deleteOption: (id: string) => api.delete(`/questions/option/${id}`),
};

// Submission APIs
export const submissionApi = {
    getByQuiz: (quizId: string): Promise<{ success: boolean, data: (Submission & { user: User, quiz: Quiz & { questions: (Question & { options: Option[] })[] } })[] }> => api.get(`/submissions/quiz/${quizId}`),
    getByUser: (userId: string): Promise<{ success: boolean, data: (Submission & { user: User, quiz: Quiz & { questions: (Question & { options: Option[] })[] } })[] }> => api.get(`/submissions/user/${userId}`),
    create: (data: {
        userId: string;
        quizId: string;
        answers: any;
    }) => api.post('/submissions', data),
    update: (id: string, data: {
        answers?: any;
        score?: number;
    }) => api.patch(`/submissions/${id}`, data),
    delete: (id: string) => api.delete(`/submissions/${id}`),
};

// Profile APIs
export const profileApi = {
    getByUser: (userId: string) => api.get(`/profiles/user/${userId}`),
    update: (data: {
        bio?: string;
        phone?: string;
        address?: string;
        preferences?: any;
    }) => api.patch('/profiles', data),
};

// WebSocket APIs
export const websocketApi = {
    connect: () => {
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000'}/ws`);
        return ws;
    },
};

// Badge APIs
export const badgeApi = {
    getAll: (): Promise<{ success: boolean, data: (Badge & { user: User })[] }> => api.get('/badges'),
    getById: (id: string): Promise<{ success: boolean, data: (Badge & { user: User }) }> => api.get(`/badges/${id}`),
    getByStudent: (): Promise<{ success: boolean, data: (Badge & { user: User })[] }> => api.get('/badges/student'),
    create: (data: {
        userId: string;
        title: string;
        description?: string;
        image?: string;
        points: number;
        type: string;
        earnedAt: string;
    }) => api.post('/badges', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        image?: string;
        points?: number;
        type?: string;
        earnedAt?: string;
    }) => api.patch(`/badges/${id}`, data),
    delete: (id: string) => api.delete(`/badges/${id}`),
};

// Certificate APIs
export const certificateApi = {
    getAll: (): Promise<{ success: boolean, data: (Certificate & { user: User })[] }> => api.get('/certificates'),
    getById: (id: string): Promise<{ success: boolean, data: (Certificate & { user: User }) }> => api.get(`/certificates/${id}`),
    getByStudent: (): Promise<{ success: boolean, data: (Certificate & { user: User })[] }> => api.get('/certificates/student'),
    create: (data: {
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
    }) => api.post('/certificates', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        points?: number;
        type?: string;
        earnedAt?: string;
    }) => api.patch(`/certificates/${id}`, data),
    delete: (id: string) => api.delete(`/certificates/${id}`),
    download: (id: string) => api.get(`/certificates/${id}/download`, {
        responseType: 'blob',
    }),
    share: (id: string, platform: string) => api.post(`/certificates/${id}/share`, { platform }),
};

// Community APIs
export const communityApi = {
    getAll: (): Promise<{ success: boolean, data: (Community & { participants: User[] })[] }> => api.get('/communities'),
    getById: (id: string) => api.get(`/communities/${id}`),
    create: (data: { name: string; description?: string }) => api.post('/communities', data),
    update: (id: string, data: { name?: string; description?: string }) => api.patch(`/communities/${id}`, data),
    delete: (id: string) => api.delete(`/communities/${id}`),
    getDiscussions: (id: string): Promise<(Discussion & { post: Post & { author: User, comments: Comment[] } })[]> => api.get(`/communities/${id}/discussions`),
    getDiscussionsByCommunityId: (id: string) => api.get(`/communities/${id}/discussions/by-community-id`),
    getDiscussionById: (id: string) => api.get(`/communities/${id}/discussions/${id}`),
    createDiscussion: (id: string, data: { title: string; content: string }) => api.post(`/communities/${id}/discussions`, data),
    updateDiscussion: (id: string, discussionId: string, data: { title?: string; content?: string }) => api.patch(`/communities/${id}/discussions/${discussionId}`, data),
    deleteDiscussion: (id: string, discussionId: string) => api.delete(`/communities/${id}/discussions/${discussionId}`),
    getLiveRooms: (id: string): Promise<(LiveRoom & { community: Community })[]> => api.get(`/communities/${id}/live-rooms`),
    getLiveRoomById: (id: string, liveRoomId: string) => api.get(`/communities/${id}/live-rooms/${liveRoomId}`),
    createLiveRoom: (id: string, data: { title: string; description?: string }) => api.post(`/communities/${id}/live-rooms`, data),
    updateLiveRoom: (id: string, liveRoomId: string, data: { title?: string; description?: string }) => api.patch(`/communities/${id}/live-rooms/${liveRoomId}`, data),
    deleteLiveRoom: (id: string, liveRoomId: string) => api.delete(`/communities/${id}/live-rooms/${liveRoomId}`),
    getGroups: (id: string): Promise<(Group & { members: User[] })[]> => api.get(`/communities/${id}/groups`),
    getGroupById: (id: string, groupId: string) => api.get(`/communities/${id}/groups/${groupId}`),
    addGroup: (id: string, groupId: string) => api.post(`/communities/${id}/groups`, { groupId }),
    removeGroup: (id: string, groupId: string) => api.delete(`/communities/${id}/groups/${groupId}`),
    getGroup: (id: string, groupId: string) => api.get(`/communities/${id}/groups/${groupId}`),
    getPosts: (id: string): Promise<(Post & { author: User, comments: Comment[] })[]> => api.get(`/communities/${id}/posts`),
};

// Path APIs
export const pathApi = {
    getAll: (): Promise<{ success: boolean, data: (Path & { courses: Course[], milestones: Milestone[], peers: User[] })[] }> => api.get('/paths'),
    getById: (id: string): Promise<{ success: boolean, data: (Path & { courses: Course[], milestones: Milestone[], peers: User[] }) }> => api.get(`/paths/${id}`),
    getByCourse: (courseId: string): Promise<{ success: boolean, data: (Path & { courses: Course[], milestones: Milestone[], peers: User[] })[] }> => api.get(`/paths/course/${courseId}`),
    create: (data: Path) => api.post('/paths', data),
    update: (id: string, data: Path) => api.patch(`/paths/${id}`, data),
    delete: (id: string) => api.delete(`/paths/${id}`),
};

// Cases APIs
export const casesApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: any[] }> => api.get(`/cases?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: any }> => api.get(`/cases/${id}`),
    create: (data: {
        caseTitle: string;
        caseType: string;
        description: string;
        courtDate?: Date;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) => api.post('/cases', data),
    update: (id: string, data: {
        caseTitle?: string;
        caseType?: string;
        description?: string;
        courtDate?: Date;
        status?: string;
        assignedLawyerId?: string;
        relatedUserId?: string;
    }) => api.patch(`/cases/${id}`, data),
    delete: (id: string) => api.delete(`/cases/${id}`),
    getByType: (academyId: string, type: string): Promise<{ success: boolean, data: any[] }> => api.get(`/cases/type/${type}?academyId=${academyId}`),
    getByStatus: (academyId: string, status: string): Promise<{ success: boolean, data: any[] }> => api.get(`/cases/status/${status}?academyId=${academyId}`),
};

// Contracts APIs
export const contractsApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: any[] }> => api.get(`/contracts?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: any }> => api.get(`/contracts/${id}`),
    create: (data: {
        caseTitle: string;
        description: string;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) => api.post('/contracts', data),
    update: (id: string, data: {
        caseTitle?: string;
        description?: string;
        assignedLawyerId?: string;
        relatedUserId?: string;
    }) => api.patch(`/contracts/${id}`, data),
    delete: (id: string) => api.delete(`/contracts/${id}`),
    getByStatus: (academyId: string, status: string): Promise<{ success: boolean, data: any[] }> => api.get(`/contracts/status/${status}?academyId=${academyId}`),
};

// Permissions APIs
export const permissionsApi = {
    getAll: (): Promise<{ success: boolean, data: any[] }> => api.get('/permissions'),
    getById: (id: string): Promise<{ success: boolean, data: any }> => api.get(`/permissions/${id}`),
    create: (data: {
        name: string;
        description?: string;
        userId: string;
    }) => api.post('/permissions', data),
    update: (id: string, data: {
        name?: string;
        description?: string;
    }) => api.patch(`/permissions/${id}`, data),
    delete: (id: string) => api.delete(`/permissions/${id}`),
    assign: (data: {
        adminId: string;
        permissionId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) => api.post('/permissions/assign', data),
};

// Departments APIs
export const departmentsApi = {
    getAll: (): Promise<{ success: boolean, data: any[] }> => api.get('/departments'),
    getById: (id: string): Promise<{ success: boolean, data: any }> => api.get(`/departments/${id}`),
    create: (data: {
        name: string;
        description?: string;
        managerId: string;
        userId: string;
    }) => api.post('/departments', data),
    update: (id: string, data: {
        name?: string;
        description?: string;
        managerId?: string;
    }) => api.patch(`/departments/${id}`, data),
    delete: (id: string) => api.delete(`/departments/${id}`),
    assignManager: (data: {
        departmentId: string;
        managerId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) => api.post('/departments/assign-manager', data),
};

// Accounting APIs
export const accountingApi = {
    getAll: async (academyId: string) => {
        const response = await fetch(`/api/accounting?academyId=${academyId}`);
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`/api/accounting/${id}`);
        return response.json();
    },
    create: async (data: {
        type: string;
        amount: number;
        description: string;
        date: Date;
        createdByAdminId: string;
        academyId: string;
    }) => {
        const response = await fetch('/api/accounting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    update: async (
        id: string,
        data: {
            type?: string;
            amount?: number;
            description?: string;
            date?: Date;
        }
    ) => {
        const response = await fetch(`/api/accounting/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (id: string) => {
        const response = await fetch(`/api/accounting/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
    getMonthlyStats: async (academyId: string) => {
        const response = await fetch(`/api/accounting/stats/monthly?academyId=${academyId}`);
        return response.json();
    },
};

// Public Relations Models
export interface PRRecord {
    id: string;
    message: string;
    senderName: string;
    senderContact: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    handledByAdminId: string;
    academyId: string;
    responses: PRResponse[];
    events: Event[];
    posts: Post[];
    files: File[];
    channels: Channel[];
    createdAt: Date;
    updatedAt: Date;
}

export interface PRResponse {
    id: string;
    response: string;
    prRecordId: string;
    respondedByAdminId: string;
    createdAt: Date;
}

// Secretariat Models
export interface Meeting {
    id: string;
    meetingTitle: string;
    meetingDate: Date;
    location: string;
    notes?: string;
    createdByAdminId: string;
    academyId: string;
    participants: MeetingParticipant[];
    files: File[];
    reports: Report[];
    channels: Channel[];
    createdAt: Date;
    updatedAt: Date;
}

export interface MeetingParticipant {
    id: string;
    meetingId: string;
    userId: string;
    isAttended: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// General Administration Models
export interface AdminRole {
    id: string;
    name: 'DIRECTOR' | 'ACCOUNTANT' | 'SECRETARY' | 'LEGAL_ADVISOR' | 'HR_MANAGER' | 'IT_MANAGER' | 'GENERAL_MANAGER';
    description?: string;
    assignments: AdminAssignment[];
    reports: Report[];
    files: File[];
    events: Event[];
    channels: Channel[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminAssignment {
    id: string;
    adminId: string;
    roleId: string;
    startDate: Date;
    endDate?: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

// Legal Affairs Models
export interface LegalCase {
    id: string;
    caseTitle: string;
    caseType: 'CONTRACT' | 'DISPUTE' | 'INSURANCE' | 'EMPLOYMENT' | 'INTELLECTUAL_PROPERTY';
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'PENDING';
    description: string;
    courtDate?: Date;
    assignedLawyerId: string;
    academyId: string;
    relatedUserId?: string;
    files: File[];
    reports: Report[];
    events: Event[];
    channels: Channel[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Payment {
    id: string;
    userId: string;
    amount: number;
    legalCaseId?: string;
    createdAt: Date;
}

// Update API interfaces to use the new models
export const publicRelationsApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: PRRecord[] }> => api.get(`/public-relations?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: PRRecord }> => api.get(`/public-relations/${id}`),
    create: (data: Omit<PRRecord, 'id' | 'createdAt' | 'updatedAt' | 'responses' | 'events' | 'posts' | 'files' | 'channels'>) => api.post('/public-relations', data),
    update: (id: string, data: Partial<PRRecord>) => api.patch(`/public-relations/${id}`, data),
    delete: (id: string) => api.delete(`/public-relations/${id}`),
    getByStatus: (academyId: string, status: PRRecord['status']): Promise<{ success: boolean, data: PRRecord[] }> => api.get(`/public-relations/status/${status}?academyId=${academyId}`),
    addResponse: (id: string, data: Omit<PRResponse, 'id' | 'prRecordId' | 'createdAt'>) => api.post(`/public-relations/${id}/response`, data),
};

export const secretariatApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: Meeting[] }> => api.get(`/meetings?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: Meeting }> => api.get(`/meetings/${id}`),
    create: (data: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt' | 'participants' | 'files' | 'reports' | 'channels'> & { participants: string[] }) => api.post('/meetings', data),
    update: (id: string, data: Partial<Meeting>) => api.patch(`/meetings/${id}`, data),
    delete: (id: string) => api.delete(`/meetings/${id}`),
    getByDate: (academyId: string, date: string): Promise<{ success: boolean, data: Meeting[] }> => api.get(`/meetings/date/${date}?academyId=${academyId}`),
    addParticipant: (id: string, userId: string) => api.post(`/meetings/${id}/participants`, { userId }),
    removeParticipant: (id: string, userId: string) => api.delete(`/meetings/${id}/participants/${userId}`),
    markAttendance: (id: string, userId: string, isAttended: boolean) => api.patch(`/meetings/${id}/participants/${userId}/attendance`, { isAttended }),
};
export const paymentApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: Payment[] }> => api.get(`/payments?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: Payment }> => api.get(`/payments/${id}`),
    create: (data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/payments', data),
    update: (id: string, data: Partial<Payment>) => api.patch(`/payments/${id}`, data),
    delete: (id: string) => api.delete(`/payments/${id}`),
};
export const administrationApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: AdminAssignment[] }> => api.get(`/admin-assignments?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: AdminAssignment }> => api.get(`/admin-assignments/${id}`),
    create: (data: Omit<AdminAssignment, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/admin-assignments', data),
    update: (id: string, data: Partial<AdminAssignment>) => api.patch(`/admin-assignments/${id}`, data),
    delete: (id: string) => api.delete(`/administrations/${id}`),
};

export const adminRoleApi = {
    getAll: (): Promise<{ success: boolean, data: AdminRole[] }> => api.get('/admin-roles'),
    getById: (id: string): Promise<{ success: boolean, data: AdminRole }> => api.get(`/admin-roles/${id}`),
    create: (data: Omit<AdminRole, 'id' | 'createdAt' | 'updatedAt' | 'assignments' | 'reports' | 'files' | 'events' | 'channels'>) => api.post('/admin-roles', data),
    update: (id: string, data: Partial<AdminRole>) => api.patch(`/admin-roles/${id}`, data),
    delete: (id: string) => api.delete(`/admin-roles/${id}`),
    assignRole: (data: Omit<AdminAssignment, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/admin-roles/assign', data),
    removeRole: (id: string) => api.delete(`/admin-roles/assign/${id}`),
};

export const legalCaseApi = {
    getAll: (academyId: string): Promise<{ success: boolean, data: LegalCase[] }> => api.get(`/legal-cases?academyId=${academyId}`),
    getById: (id: string): Promise<{ success: boolean, data: LegalCase }> => api.get(`/legal-cases/${id}`),
    create: (data: Omit<LegalCase, 'id' | 'createdAt' | 'updatedAt' | 'files' | 'reports' | 'events' | 'channels' | 'payments'>) => api.post('/legal-cases', data),
    update: (id: string, data: Partial<LegalCase>) => api.patch(`/legal-cases/${id}`, data),
    delete: (id: string) => api.delete(`/legal-cases/${id}`),
    getByType: (academyId: string, type: LegalCase['caseType']): Promise<{ success: boolean, data: LegalCase[] }> => api.get(`/legal-cases/type/${type}?academyId=${academyId}`),
    getByStatus: (academyId: string, status: LegalCase['status']): Promise<{ success: boolean, data: LegalCase[] }> => api.get(`/legal-cases/status/${status}?academyId=${academyId}`),
    addPayment: (id: string, data: Omit<Payment, 'id' | 'createdAt'>) => api.post(`/legal-cases/${id}/payments`, data),
};

// Channel Model
export interface Channel {
    id: string;
    name: string;
    members: User[];
    ownerId: string;
    prRecordId?: string;
    meetingId?: string;
    adminRoleId?: string;
    legalCaseId?: string;
    createdAt: Date;
}

// Media Models
export interface Media {
    id: string;
    name: string;
    url: string;
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';
    size: number;
    mimeType: string;
    userId: string;
    createdAt: Date;
}

// Document Models
export interface Document {
    id: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    tags: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Role Models
export interface Role {
    id: string;
    name: string;
    description?: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Social Media Models
export interface SocialMediaPost {
    id: string;
    platform: 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN';
    content: string;
    mediaUrls?: string[];
    scheduledTime?: Date;
    status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
    analytics?: {
        likes: number;
        shares: number;
        comments: number;
        reach: number;
    };
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Calendar Models
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    type: 'MEETING' | 'TASK' | 'REMINDER' | 'EVENT';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    participants: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Media APIs
export const mediaApi = {
    getAll: (): Promise<{ success: boolean, data: Media[] }> => api.get('/media'),
    getById: (id: string): Promise<{ success: boolean, data: Media }> => api.get(`/media/${id}`),
    upload: (file: File): Promise<{ success: boolean, data: Media }> => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: (id: string) => api.delete(`/media/${id}`),
    getByType: (type: Media['type']): Promise<{ success: boolean, data: Media[] }> => api.get(`/media/type/${type}`),
};

// Document APIs
export const documentApi = {
    getAll: (): Promise<{ success: boolean, data: Document[] }> => api.get('/documents'),
    getById: (id: string): Promise<{ success: boolean, data: Document }> => api.get(`/documents/${id}`),
    create: (data: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/documents', data),
    update: (id: string, data: Partial<Document>) => api.patch(`/documents/${id}`, data),
    delete: (id: string) => api.delete(`/documents/${id}`),
    getByCategory: (category: string): Promise<{ success: boolean, data: Document[] }> => api.get(`/documents/category/${category}`),
    getByTag: (tag: string): Promise<{ success: boolean, data: Document[] }> => api.get(`/documents/tag/${tag}`),
    download: (id: string) => api.get(`/documents/${id}/download`, {
        responseType: 'blob',
    }),
};

// Role APIs
export const roleApi = {
    getAll: (): Promise<{ success: boolean, data: Role[] }> => api.get('/roles'),
    getById: (id: string): Promise<{ success: boolean, data: Role }> => api.get(`/roles/${id}`),
    create: (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/roles', data),
    update: (id: string, data: Partial<Role>) => api.patch(`/roles/${id}`, data),
    delete: (id: string) => api.delete(`/roles/${id}`),
    assignPermissions: (id: string, permissions: string[]) => api.post(`/roles/${id}/permissions`, { permissions }),
    removePermissions: (id: string, permissions: string[]) => api.delete(`/roles/${id}/permissions`, { data: { permissions } }),
};

// Social Media APIs
export const socialMediaApi = {
    getAll: (): Promise<{ success: boolean, data: SocialMediaPost[] }> => api.get('/social-media'),
    getById: (id: string): Promise<{ success: boolean, data: SocialMediaPost }> => api.get(`/social-media/${id}`),
    create: (data: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/social-media', data),
    update: (id: string, data: Partial<SocialMediaPost>) => api.patch(`/social-media/${id}`, data),
    delete: (id: string) => api.delete(`/social-media/${id}`),
    getByPlatform: (platform: SocialMediaPost['platform']): Promise<{ success: boolean, data: SocialMediaPost[] }> => api.get(`/social-media/platform/${platform}`),
    getByStatus: (status: SocialMediaPost['status']): Promise<{ success: boolean, data: SocialMediaPost[] }> => api.get(`/social-media/status/${status}`),
    schedule: (id: string, scheduledTime: Date) => api.post(`/social-media/${id}/schedule`, { scheduledTime }),
    publish: (id: string) => api.post(`/social-media/${id}/publish`),
    getAnalytics: (id: string): Promise<{ success: boolean, data: SocialMediaPost['analytics'] }> => api.get(`/social-media/${id}/analytics`),
};

// Calendar APIs
export const calendarApi = {
    getAll: (): Promise<{ success: boolean, data: CalendarEvent[] }> => api.get('/calendar'),
    getById: (id: string): Promise<{ success: boolean, data: CalendarEvent }> => api.get(`/calendar/${id}`),
    create: (data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => api.post('/calendar', data),
    update: (id: string, data: Partial<CalendarEvent>) => api.patch(`/calendar/${id}`, data),
    delete: (id: string) => api.delete(`/calendar/${id}`),
    getByDate: (date: string): Promise<{ success: boolean, data: CalendarEvent[] }> => api.get(`/calendar/date/${date}`),
    getByType: (type: CalendarEvent['type']): Promise<{ success: boolean, data: CalendarEvent[] }> => api.get(`/calendar/type/${type}`),
    getByStatus: (status: CalendarEvent['status']): Promise<{ success: boolean, data: CalendarEvent[] }> => api.get(`/calendar/status/${status}`),
    addParticipant: (id: string, userId: string) => api.post(`/calendar/${id}/participants`, { userId }),
    removeParticipant: (id: string, userId: string) => api.delete(`/calendar/${id}/participants/${userId}`),
    updateStatus: (id: string, status: CalendarEvent['status']) => api.patch(`/calendar/${id}/status`, { status }),
};

export const communicationsApi = {
    getAll: async (academyId: string) => {
        const response = await fetch(`/api/communications?academyId=${academyId}`);
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`/api/communications/${id}`);
        return response.json();
    },
    create: async (data: {
        title: string;
        content: string;
        type: string;
        status: string;
        academyId: string;
        createdByAdminId: string;
    }) => {
        const response = await fetch('/api/communications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    update: async (
        id: string,
        data: {
            title?: string;
            content?: string;
            type?: string;
            status?: string;
            updatedByAdminId: string;
        }
    ) => {
        const response = await fetch(`/api/communications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (id: string) => {
        const response = await fetch(`/api/communications/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};

export const secretaryApi = {
    getAllTasks: async (academyId: string) => {
        const response = await fetch(`/api/secretary/tasks?academyId=${academyId}`);
        return response.json();
    },
    getTaskById: async (id: string) => {
        const response = await fetch(`/api/secretary/tasks/${id}`);
        return response.json();
    },
    createTask: async (data: {
        title: string;
        description: string;
        type: string;
        status: string;
        priority: string;
        dueDate: string;
        academyId: string;
        createdByAdminId: string;
    }) => {
        const response = await fetch('/api/secretary/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    updateTask: async (
        id: string,
        data: {
            title?: string;
            description?: string;
            type?: string;
            status?: string;
            priority?: string;
            dueDate?: string;
            updatedByAdminId: string;
        }
    ) => {
        const response = await fetch(`/api/secretary/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    deleteTask: async (id: string) => {
        const response = await fetch(`/api/secretary/tasks/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};

export const legalApi = {
    getAll: async (academyId: string) => {
        const response = await fetch(`/api/legal?academyId=${academyId}`);
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`/api/legal/${id}`);
        return response.json();
    },
    create: async (data: {
        title: string;
        description: string;
        type: string;
        status: string;
        dueDate: string;
        assignedTo: string;
        academyId: string;
        createdByAdminId: string;
    }) => {
        const response = await fetch('/api/legal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    update: async (
        id: string,
        data: {
            title?: string;
            description?: string;
            type?: string;
            status?: string;
            dueDate?: string;
            assignedTo?: string;
            updatedByAdminId: string;
        }
    ) => {
        const response = await fetch(`/api/legal/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (id: string) => {
        const response = await fetch(`/api/legal/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};

// Admin Auth APIs
export const adminAuthApi = {
    login: async (credentials: { email: string; password: string }) => {
        try {
            const response = await api.post('/admin-auth/login', credentials);
            const { access_token, refreshToken } = response.data;
            await authService.setTokens(access_token, refreshToken);

            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getDashboardStats: async (timeRange: 'day' | 'week' | 'month' | 'year' = 'month') => {
        const response = await api.get(`/admin-auth/dashboard/stats?timeRange=${timeRange}`);
        return response.data;
    },
};

export default api; 