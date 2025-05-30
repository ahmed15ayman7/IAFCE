'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Skeleton from '@/components/common/Skeleton';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Button,
    Chip,
    Avatar,
    AvatarGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    FormControlLabel,
    Divider,
    Card,
    CardContent,
    LinearProgress,
    Collapse,
    ListItemButton,
    Alert,
    TextField,
    CircularProgress,
} from '@mui/material';
import {
    PlayCircleOutline,
    AccessTime,
    School,
    Person,
    VideoLibrary,
    Description,
    Lock,
    LockOpen,
    Visibility,
    Edit,
    Delete,
    CheckCircle,
    Cancel,
    ExpandLess,
    ExpandMore,
    PictureAsPdf,
    Image,
    AudioFile,
    Description as DescriptionIcon,
    VideoFile,
    Add,
} from '@mui/icons-material';
import { courseApi, lessonApi } from '@/lib/api';
import { Course, Lesson, LessonStatus, User, FileType, Quiz, File as FileModel, Enrollment, Submission, Question, Option } from '@shared/prisma';
import QuizDialog from './components/QuizDialog';
import QuizSubmissions from './components/QuizSubmissions';


let initialCourse: Course & {
    lessons: (Lesson & { files: FileModel[], quizzes: (Quiz & { submissions: Submission[], questions: (Question & { options: Option[] })[] })[] })[];
    enrollments: (Enrollment & { user: User })[];
} = {
    id: 'js-course-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    academyId: 'academy-frontend',
    title: 'مقدمة في JavaScript',
    description: 'دورة شاملة للمبتدئين لتعلم أساسيات لغة JavaScript من البداية حتى الاحتراف.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*snTDISrdwI0rjx3xCzQq4Q.jpeg',
    level: 'BEGINNER',
    lessons: [
        {
            id: 'lesson-1',
            title: 'مقدمة إلى JavaScript',
            content: 'تعرف في هذه المحاضرة على تاريخ JavaScript، ولماذا تعتبر من أهم لغات الويب.',
            files: [
                {
                    id: 'video-1',
                    name: 'ما هي JavaScript؟',
                    url: 'https://www.youtube.com/embed/W6NZfCO5SIk',
                    type: 'VIDEO',
                    createdAt: new Date(),
                    lessonId: 'lesson-1',
                },
                {
                    id: 'pdf-1',
                    name: 'ملف مقدمة',
                    url: 'https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1214/handouts/01-JavaScript-Intro.pdf',
                    type: 'PDF',
                    createdAt: new Date(),
                    lessonId: 'lesson-1',
                }
            ],
            quizzes: [
                {
                    id: 'quiz-1',
                    title: 'اختبار المقدمة',
                    description: 'اختبار المقدمة',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lessonId: 'lesson-1',
                    timeLimit: 10,
                    passingScore: 70,
                    upComing: false,
                    isCompleted: true,
                    submissions: [],
                    questions: [
                        {
                            id: 'question-1',
                            createdAt: new Date(),
                            type: 'MULTIPLE_CHOICE',
                            quizId: 'quiz-1',
                            text: 'ما هي اللغة التي تستخدم لبرمجة الويب؟',
                            options: [
                                {
                                    id: 'option-1',
                                    text: 'JavaScript',
                                    isCorrect: true,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-1',
                                },
                                {
                                    id: 'option-2',
                                    text: 'Python',
                                    isCorrect: false,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-1',
                                },
                                {
                                    id: 'option-3',
                                    text: 'Java',
                                    isCorrect: false,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-1',
                                },
                                {
                                    id: 'option-4',
                                    text: 'C++',
                                    isCorrect: false,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-1',
                                },
                            ],
                            isMultiple: true,
                            points: 1,
                            isAnswered: false,
                        }
                    ],
                }
            ],
            status: 'COMPLETED',
            courseId: 'js-course-1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'lesson-2',
            title: 'المتغيرات وأنواع البيانات',
            content: 'ستتعلم أنواع البيانات الأساسية مثل الأرقام، النصوص، البوليان، وكيفية تعريف المتغيرات باستخدام let و const.',
            files: [
                {
                    id: 'video-2',
                    name: 'شرح المتغيرات وأنواع البيانات',
                    url: 'https://www.youtube.com/embed/Bv_5Zv5c-Ts',
                    type: 'VIDEO',
                    createdAt: new Date(),
                    lessonId: 'lesson-2',
                },
                {
                    id: 'doc-1',
                    name: 'توثيق أنواع البيانات',
                    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures',
                    type: 'DOCUMENT',
                    createdAt: new Date(),
                    lessonId: 'lesson-2',
                },
                {
                    id: 'audio-1',
                    name: 'مراجعة صوتية للدرس',
                    url: 'https://soundcloud.com/user-652361680/js-data-types-overview',
                    type: 'AUDIO',
                    createdAt: new Date(),
                    lessonId: 'lesson-2',
                },
                {
                    id: 'pdf-2',
                    name: 'ملف شرح إضافي',
                    url: 'https://cs50.harvard.edu/weeks/0/notes/0.pdf',
                    type: 'PDF',
                    createdAt: new Date(),
                    lessonId: 'lesson-2',
                }
            ],
            quizzes: [
                {
                    id: 'quiz-2',
                    title: 'اختبار المتغيرات وأنواع البيانات',
                    description: 'اختبار المتغيرات وأنواع البيانات',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lessonId: 'lesson-2',
                    timeLimit: 10,
                    passingScore: 70,
                    upComing: false,
                    isCompleted: false,
                    submissions: [],
                    questions: [
                        {
                            id: 'question-2',
                            createdAt: new Date(),
                            type: 'MULTIPLE_CHOICE',
                            quizId: 'quiz-2',
                            text: 'ما هي اللغة التي تستخدم لبرمجة الويب؟',
                            options: [],
                            isMultiple: true,
                            points: 1,
                            isAnswered: false,
                        }
                    ],
                }
            ],
            status: 'IN_PROGRESS',
            courseId: 'js-course-1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            title: 'المحاضرة الثانية',
            content: 'هذه هي المحاضرة الثانية',
            files: [
                {
                    id: '4',
                    name: 'الملف الأول',
                    url: 'https://www.youtube.com/embed/4fRvHVre3n0',
                    type: 'VIDEO',
                    createdAt: new Date(),
                    lessonId: '2',
                },
                {
                    id: '5',
                    name: 'الملف الثاني',
                    url: 'https://www.google.com',
                    type: 'IMAGE',
                    createdAt: new Date(),
                    lessonId: '2',
                },
                {
                    id: '6',
                    name: 'الملف الثالث',
                    url: 'https://docs.google.com/document/d/1zgkauCCOCzzUKDgfgyO2SUBQDbWCY9DfIs0Wp4Bs55U/edit?tab=t.0',
                    type: 'DOCUMENT',
                    createdAt: new Date(),
                    lessonId: '2',
                },
                {
                    id: '7',
                    name: 'الملف الثالث',
                    url: 'https://soundcloud.com/beatlabaudio/stonebank-hard-essentials-vol-1-serum-2-presets?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
                    type: 'AUDIO',
                    createdAt: new Date(),
                    lessonId: '2',
                },
                {
                    id: '8',
                    name: 'الملف الثالث',
                    url: 'https://drive.uqu.edu.sa/_/yhafeef/files/JAVA%20Basics.pdf',
                    type: 'PDF',
                    createdAt: new Date(),
                    lessonId: '2',
                }
            ],
            quizzes: [
                {
                    id: 'quiz-3',
                    title: 'اختبار المحاضرة الثانية',
                    description: 'اختبار المحاضرة الثانية',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lessonId: '2',
                    timeLimit: 10,
                    passingScore: 70,
                    upComing: false,
                    isCompleted: false,
                    submissions: [],
                    questions: [
                        {
                            id: 'question-3',
                            createdAt: new Date(),
                            type: 'MULTIPLE_CHOICE',
                            quizId: 'quiz-3',
                            text: 'ما هي اللغة التي تستخدم لبرمجة الويب؟',
                            options: [
                                {
                                    id: 'option-1',
                                    text: 'JavaScript',
                                    isCorrect: true,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-3',
                                },
                                {
                                    id: 'option-2',
                                    text: 'Python',
                                    isCorrect: false,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    questionId: 'question-3',
                                },
                            ],
                            isMultiple: true,
                            points: 1,
                            isAnswered: false,
                        }
                    ],
                }
            ],
            status: 'NOT_STARTED',
            courseId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }],

    enrollments: [
        {
            id: 'enroll-1',
            userId: 'user-1',
            courseId: 'js-course-1',
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'COMPLETED',
            progress: 100,
            user: {
                id: 'user-1',
                role: 'STUDENT',
                email: 'student@example.com',
                academyId: 'academy-frontend',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: 'password',
                phone: '1234567890',
                firstName: 'John',
                lastName: 'Doe',
                age: 20,
                subRole: 'STUDENT',
                avatar: 'https://via.placeholder.com/150',
                isOnline: true,
                isVerified: true,
            }
        }
    ]
};


const InstructorCoursePage = ({ params }: { params: { id: string } }) => {
    const [selectedLesson, setSelectedLesson] = useState<Lesson & { files: FileModel[], quizzes: (Quiz & { submissions: Submission[], questions: Question[] })[] } | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileModel | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [lsessonStatus, setLsessonStatus] = useState<{ lessonId: string, status: LessonStatus } | null>(null);
    const [expandedLessons, setExpandedLessons] = useState<{ [key: string]: boolean }>({});
    const queryClient = useQueryClient();
    const [openQuizDialog, setOpenQuizDialog] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

    const { data: courseResponse, isLoading: isCourseLoading } = useQuery({
        queryKey: ['course', params.id],
        queryFn: () => courseApi.getById(params.id),
    });

    const { data: lessonResponse, isLoading: isLessonLoading } = useQuery({
        queryKey: ['lesson', params.id],
        queryFn: () => lessonApi.getById(params.id),
    });

    const toggleLessonStatus = useMutation({
        mutationFn: (lessonId: string) => lessonApi.update(lessonId, { ...selectedLesson!, status: selectedLesson?.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED' as LessonStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons', params.id] });
        },
    });

    const handleLessonExpand = (lessonId: string) => {
        setExpandedLessons(prev => ({
            ...prev,
            [lessonId]: !prev[lessonId]
        }));
    };

    const getFileIcon = (type: FileType) => {
        switch (type) {
            case 'VIDEO':
                return <VideoFile />;
            case 'PDF':
                return <PictureAsPdf />;
            case 'IMAGE':
                return <Image />;
            case 'AUDIO':
                return <AudioFile />;
            case 'DOCUMENT':
                return <DescriptionIcon />;
            default:
                return <DescriptionIcon />;
        }
    };

    const renderFilePreview = (file: FileModel) => {
        if (selectedQuiz) {
            return (
                <QuizSubmissions quizId={selectedQuiz} />
            );
        }

        return (
            <>
                <iframe
                    src={file.url}
                    style={{ width: '100%', height: '500px', border: 'none' }}
                    allowFullScreen
                />
                <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                            اختبارات المحاضرة
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpenQuizDialog(true)}
                        >
                            إضافة اختبار
                        </Button>
                    </Box>
                    {selectedLesson?.quizzes && selectedLesson.quizzes.length > 0 ? (
                        <List>
                            {selectedLesson.quizzes.map((quiz) => (
                                <ListItem key={quiz.id} style={{ justifyContent: "space-between" }} className="flex items-center w-full">
                                    <ListItemText
                                        className="flex flex-col justify-center items-start"
                                        primary={quiz.title}
                                        secondary={quiz.description}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => setSelectedQuiz(quiz.id)}
                                    >
                                        عرض النتائج
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Alert severity="info">
                            لا توجد اختبارات لهذه المحاضرة
                        </Alert>
                    )}
                </Box>
                <QuizDialog
                    open={openQuizDialog}
                    onClose={() => setOpenQuizDialog(false)}
                    lessonId={params.id}
                />
            </>
        );
    };

    const course = courseResponse?.data || initialCourse;
    const lesson = lessonResponse?.data || initialCourse.lessons[0];

    if (isCourseLoading || isLessonLoading) {
        return (
            <div className="space-y-6">
                <Skeleton height={40} width={300} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} height={120} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton height={300} />
                    <Skeleton height={300} />
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography>لم يتم العثور على الكورس</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4, position: "relative" }}>
            {/* عنوان الكورس */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        {course.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
                        {course.description}
                    </Typography>
                </Box>
            </motion.div>

            <Grid container spacing={4}>
                {/* القسم الرئيسي */}
                <Grid item xs={12} md={4}>
                    {/* إحصائيات الكورس */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Description /> إحصائيات الكورس
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                عدد الطلاب
                                            </Typography>
                                            <Typography variant="h3">
                                                {course.enrollments?.length || 0}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                عدد المحاضرات
                                            </Typography>
                                            <Typography variant="h3">
                                                {course.lessons.length}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                نسبة الإكمال
                                            </Typography>
                                            <Typography variant="h3">
                                                {Math.round((course.lessons.filter(l => l.status === 'COMPLETED').length / course.lessons.length) * 100)}%
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </motion.div>

                    {/* قائمة المحاضرات */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VideoLibrary /> المحاضرات
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Edit />}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    إدارة المحاضرات
                                </Button>
                            </Box>
                            <List>
                                {course.lessons.map((lesson) => (
                                    <Box key={lesson.id}>
                                        <ListItem
                                            button
                                            selected={selectedLesson?.id === lesson.id}
                                            onClick={() => {
                                                setSelectedLesson(lesson as Lesson & { files: FileModel[], quizzes: (Quiz & { submissions: Submission[], questions: Question[] })[] });
                                                handleLessonExpand(lesson.id);
                                            }}
                                            sx={{
                                                mb: 1,
                                                borderRadius: 1,
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <PlayCircleOutline />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={lesson.title}
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <AccessTime fontSize="small" />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {lesson.files?.length || 0} ملفات مرفقة
                                                        </Typography>
                                                        <Chip
                                                            size="small"
                                                            label={lesson.status === 'COMPLETED' ? 'مكتملة' : lesson.status === 'IN_PROGRESS' ? 'قيد التنفيذ' : ' مغلقه'}
                                                            color={lesson.status === 'COMPLETED' ? 'success' : lesson.status === 'IN_PROGRESS' ? 'warning' : "error"}
                                                        />
                                                    </Box>
                                                }
                                            />
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLessonStatus.mutate(lesson.id);
                                                }}
                                            >
                                                {lesson.status === 'COMPLETED' ? <LockOpen /> : lesson.status === 'IN_PROGRESS' ? <LockOpen /> : <Lock />}
                                            </IconButton>
                                            <IconButton onClick={() => handleLessonExpand(lesson.id)}>
                                                {expandedLessons[lesson.id] ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </ListItem>
                                        <Collapse in={expandedLessons[lesson.id]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {lesson.files?.map((file) => (
                                                    <ListItemButton
                                                        key={file.id}
                                                        sx={{ pl: 4 }}
                                                        onClick={() => setSelectedFile(file)}
                                                    >
                                                        <ListItemIcon>
                                                            {getFileIcon(file.type)}
                                                        </ListItemIcon>
                                                        <ListItemText primary={file.name} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </Box>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                </Grid>

                {/* القسم الجانبي */}
                <Grid item xs={12} md={8}>
                    <motion.div
                        style={{ position: "sticky", top: "10vh", zIndex: 1000 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* تفاصيل المحاضرة المحددة */}
                        {selectedLesson && (
                            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                                {selectedFile && (
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {selectedFile.name}
                                        </Typography>
                                        {renderFilePreview(selectedFile)}
                                    </Box>
                                )}
                                <Typography variant="h6" gutterBottom>
                                    تفاصيل المحاضرة
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {selectedLesson.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {selectedLesson.content}
                                </Typography>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        الطلاب الذين شاهدوا المحاضرة
                                    </Typography>
                                    <AvatarGroup max={4}>
                                        {course.enrollments?.map((enrollment) => (
                                            <Avatar key={enrollment.user.id} alt={enrollment.user?.firstName}>
                                                {enrollment.user?.firstName?.[0]}
                                            </Avatar>
                                        ))}
                                    </AvatarGroup>
                                </Box>
                            </Paper>
                        )}

                        {/* إحصائيات الطلاب */}
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                إحصائيات الطلاب
                            </Typography>
                            {course.enrollments?.map((enrollment) => (
                                <Box key={enrollment.id} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">
                                            {enrollment.user?.firstName} {enrollment.user?.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {Math.round(enrollment.progress)}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={enrollment.progress}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                            ))}
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            {/* نافذة إدارة المحاضرات */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>إدارة المحاضرات</DialogTitle>
                <DialogContent>
                    <List>
                        {course.lessons.map((lesson) => (
                            <ListItem key={lesson.id}>
                                <ListItemText
                                    primary={lesson.title}
                                    secondary={lesson.status === 'COMPLETED' ? 'مكتملة' : lesson.status === 'IN_PROGRESS' ? "قيد التنفيذ" : "مغلقة"}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={lsessonStatus?.lessonId === lesson.id || lesson.status === 'COMPLETED' || lesson.status === 'IN_PROGRESS'}
                                            onChange={() => {
                                                setLsessonStatus({ lessonId: lesson.id, status: lesson.status === 'COMPLETED' || lesson.status === 'IN_PROGRESS' ? 'NOT_STARTED' : 'COMPLETED' as LessonStatus })
                                                console.log(lsessonStatus)
                                                toggleLessonStatus.mutate(lesson.id)
                                            }}
                                        />
                                    }
                                    label={lesson.status === 'COMPLETED' ? 'مفتوحة' : lesson.status === 'IN_PROGRESS' ? "مفتوحة" : 'مغلقة'}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>إغلاق</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default InstructorCoursePage; 