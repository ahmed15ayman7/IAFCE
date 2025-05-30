import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { quizApi, submissionApi } from '@/lib/api';
import { Option, Question, Quiz, Submission, User, UserRole } from '@/generated/prisma_client';
import { } from "@shared/prisma"

interface QuizSubmissionsProps {
    quizId: string;
}



let initialSubmissions: (Submission & { user: User, quiz: Quiz & { questions: Question[] } })[] = [
    {
        id: '1',
        userId: '1',
        quizId: '1',
        score: 10,
        feedback: 'Good job',
        passed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        quiz: {
            id: '1',
            title: 'Quiz 1',
            questions: [
                {
                    id: '1',
                    text: 'Question 1',
                    points: 10,
                    createdAt: new Date(),
                    type: 'multiple_choice',
                    isAnswered: true,
                    quizId: '1',
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            description: 'Quiz 1',
            lessonId: '1',
            timeLimit: 10,
            passingScore: 10,
            upComing: false,
            isCompleted: false,
        },
        answers: [
            {
                questionId: '1',
                optionId: '1',
            }
        ],

        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            role: UserRole.STUDENT,
            subRole: 'student',
            createdAt: new Date(),
            updatedAt: new Date(),
            password: '1234567890',
            avatar: 'https://via.placeholder.com/150',
            isOnline: true,
            isVerified: true,
            academyId: '1',
        }
    }
]

export default function QuizSubmissions({ quizId }: QuizSubmissionsProps) {
    const { data: submissionsResponse, isLoading } = useQuery({
        queryKey: ['quiz-submissions', quizId],
        queryFn: () => submissionApi.getByQuiz(quizId),
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!submissionsResponse?.data || submissionsResponse.data.length === 0) {
        return (
            <Alert severity="info">
                لم يتم تقديم أي إجابات بعد
            </Alert>
        );
    }

    const submissions = submissionsResponse.data ?? initialSubmissions;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                نتائج الطلاب
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>اسم الطالب</TableCell>
                            <TableCell align="center">النتيجة</TableCell>
                            <TableCell align="center">النسبة المئوية</TableCell>
                            <TableCell align="center">تاريخ التقديم</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((submission) => {
                            let fullScore = 0;
                            for (let question of submission.quiz.questions) {
                                fullScore += question.points;
                            }
                            return (
                                <TableRow key={submission.id}>
                                    <TableCell>{submission.user.firstName} {submission.user.lastName}</TableCell>
                                    <TableCell align="center">
                                        {submission.score} من {fullScore}
                                    </TableCell>
                                    <TableCell align="center">
                                        {Math.round((submission.score || 0 / fullScore) * 100)}%
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(submission.createdAt).toLocaleDateString('ar-SA')}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
} 