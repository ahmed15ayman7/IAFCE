import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    CircularProgress,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { quizApi } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Quiz, Question, Option } from '@shared/prisma';

interface QuizSidebarProps {
    quizId: string;
    lessonId: string;
}


interface QuizResponse {
    data: Quiz & {
        questions: Question[];
    };
}

interface SubmissionRequest {
    answers: { questionId: string, optionId: string, isMultipleChoice: boolean }[];
}

interface SubmissionResponse {
    data: {
        score: number;
    };
}
let initialQuiz: Quiz & { questions: (Question & { options: Option[] })[] } = {
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
    // submissions: [],
    questions: [
        {
            id: 'question-1',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            quizId: 'quiz-1',
            text: 'ما هي اللغة التي تستخدم لبرمجة الويب؟',
            isMultiple: false,
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
            points: 1,
            isAnswered: false,
        },
        {
            id: 'question-2',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            quizId: 'quiz-1',
            isMultiple: true,
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
                    isCorrect: true,
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

            points: 1,
            isAnswered: false,
        },
        {
            id: 'question-1',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            quizId: 'quiz-1',
            isMultiple: true,
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
                    isCorrect: true,
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
            points: 1,
            isAnswered: false,
        },
        {
            id: 'question-1',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            quizId: 'quiz-1',
            isMultiple: true,
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
                    isCorrect: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    questionId: 'question-1',
                },
            ],
            points: 1,
            isAnswered: false,
        },
        {
            id: 'question-1',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            quizId: 'quiz-1',
            isMultiple: false,
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
            points: 1,
            isAnswered: false,
        },
        {
            id: 'question-1',
            createdAt: new Date(),
            type: 'MULTIPLE_CHOICE',
            isMultiple: false,
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
            points: 1,
            isAnswered: false,
        },

    ],
}

export default function QuizSidebar({ quizId, lessonId }: QuizSidebarProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<{ questionId: string, optionId: string, isMultipleChoice: boolean }[]>([]);
    const [showResults, setShowResults] = useState(false);

    const { data: quizResponse, isLoading } = useQuery<QuizResponse>({
        queryKey: ['quiz', quizId],
        queryFn: () => quizApi.getById(quizId),
    });

    const submitQuizMutation = useMutation<SubmissionResponse, Error, SubmissionRequest>({
        mutationFn: (data) => quizApi.submit(quizId, data),
        onSuccess: () => {
            setShowResults(true);
        },
    });

    const handleAnswerChange = (questionId: string, optionId: string, isMultipleChoice: boolean) => {
        const newAnswers = [...selectedAnswers];
        let alreadyExists = newAnswers.find(answer => answer.questionId === questionId);
        if (alreadyExists && !alreadyExists.isMultipleChoice) {
            alreadyExists.optionId = optionId;
        } else {
            newAnswers.push({ questionId, optionId, isMultipleChoice });
        }
        setSelectedAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (quizResponse?.data && selectedAnswers.length === quizResponse.data.questions.length) {
            submitQuizMutation.mutate({
                answers: selectedAnswers,
            });
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    const quiz = initialQuiz;

    // if (!quizResponse?.data) {
    //     return (
    //         <Alert severity="error">
    //             لم يتم العثور على الاختبار
    //         </Alert>
    //     );
    // }


    if (showResults) {
        return (
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    نتائج الاختبار
                </Typography>
                <Typography variant="body1" gutterBottom>
                    النتيجة: {submitQuizMutation.data?.data.score} من {quiz.questions.length}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    {quiz.questions.map((question, index) => {
                        const isCorrect = selectedAnswers.find(answer => answer.questionId === question.id)?.optionId === question.options.find(option => option.isCorrect)?.id;
                        return (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    {isCorrect ? (
                                        <CheckCircle color="success" />
                                    ) : (
                                        <Cancel color="error" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={question.text}
                                    secondary={`إجابتك: ${String.fromCharCode(65 + (question.options.findIndex(option => option.id === selectedAnswers.find(answer => answer.questionId === question.id)?.optionId) ?? -1))} - الإجابة الصحيحة: ${String.fromCharCode(65 + (question.options.findIndex(option => option.isCorrect) ?? -1))}`}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                {quiz.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {quiz.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <AnimatePresence>
                {quiz.questions.map((question, questionIndex) => (
                    <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                {questionIndex + 1}. {question.text}
                            </Typography>
                            {question.isMultiple ? (
                                <Box
                                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                                >
                                    {question.options.map((option, optionIndex) => (
                                        <FormControlLabel
                                            key={optionIndex}
                                            onClick={() => handleAnswerChange(question.id, option.id, question.isMultiple ?? false)}
                                            value={option.id}
                                            control={<Checkbox checked={selectedAnswers.find(answer => answer.questionId === question.id)?.optionId === option.id} />}
                                            label={option.text}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <RadioGroup
                                    value={selectedAnswers.find(answer => answer.questionId === question.id)?.optionId ?? ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value, question.isMultiple ?? false)}
                                >
                                    {question.options.map((option, optionIndex) => (
                                        <FormControlLabel
                                            key={optionIndex}
                                            value={option.id}
                                            control={<Radio />}
                                            label={option.text}
                                        />
                                    ))}
                                </RadioGroup>
                            )}
                        </Box>
                    </motion.div>
                ))}
            </AnimatePresence>
            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={selectedAnswers.length !== quiz.questions.length}
                sx={{ mt: 2 }}
            >
                إرسال الإجابات
            </Button>
        </Paper>
    );
} 