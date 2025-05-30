import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Checkbox,
} from '@mui/material';
import { Delete, Add, Edit } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quizApi } from '@/lib/api';
import { Option, Question, Quiz } from '@shared/prisma';


interface QuizDialogProps {
    open: boolean;
    onClose: () => void;
    lessonId: string;
}

export default function QuizDialog({ open, onClose, lessonId }: QuizDialogProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<(Question & { options: Option[] })[]>([
        {
            id: '0',
            type: '',
            points: 0,
            isAnswered: false,
            quizId: '',
            createdAt: new Date(),
            text: '',
            options: [],
            isMultiple: false,
        },
    ]);
    const [currentQuestion, setCurrentQuestion] = useState<Question & { options: Option[] }>(questions[0]);

    const queryClient = useQueryClient();

    const createQuizMutation = useMutation({
        mutationFn: (data: Quiz & { questions: (Question & { options: Option[] })[] }) => quizApi.create({ ...data, lessonId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes', lessonId] });
            onClose();
        },
    });

    const handleAddQuestion = (isEdit?: boolean) => {
        if (currentQuestion.text && currentQuestion.options.every(opt => opt.text.trim() !== '')) {
            if (questions.filter(e => e.id === currentQuestion.id).length > 0) {
                setQuestions([...questions.map(e => e.id === currentQuestion.id ? currentQuestion : e),]);
            }
            else { setQuestions([...questions, currentQuestion]); }
            !isEdit && setCurrentQuestion({
                id: `${Math.random().toString(36).substring(2, 15)}`,
                type: '',
                points: 0,
                isAnswered: false,
                quizId: '',
                createdAt: new Date(),
                text: '',
                options: [],
                isMultiple: false,
            });
        }
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        let q = [...questions]
        if (currentQuestion.text && currentQuestion.options.every(opt => opt.text.trim() !== '') && !questions.some(opt => opt.id === currentQuestion.id)) {
            q.push(currentQuestion)
        } else {
            q = questions.map(q => q.id === currentQuestion.id ? currentQuestion : q)
        }
        if (title && description && questions.length > 0) {
            // console.log({
            //     title,
            //     description,
            //     questions: q,
            //     lessonId,
            //     id: '',
            //     createdAt: new Date(),
            //     updatedAt: new Date(),
            //     timeLimit: 0,
            //     passingScore: 0,
            //     upComing: false,
            //     isCompleted: false,
            // });
            createQuizMutation.mutate({
                title,
                description,
                questions: q,
                lessonId,
                id: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                timeLimit: 0,
                passingScore: 0,
                upComing: false,
                isCompleted: false,
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>إضافة اختبار جديد</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="عنوان الاختبار"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="وصف الاختبار"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={2}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    الأسئلة
                </Typography>

                <List>
                    {questions.map((question, index) => {
                        if (question.id === currentQuestion.id && index === 0) {
                            return (
                                <></>
                            )
                        }
                        return (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={question.text}
                                    secondary={`الإجابة الصحيحة: ${String.fromCharCode(65 + question.options.length)}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => {
                                        handleAddQuestion(true)
                                        setCurrentQuestion(question)
                                    }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleRemoveQuestion(index)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>

                <Box sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="نص السؤال"
                        value={currentQuestion.text}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>الخيارات</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Typography variant="h6" gutterBottom>متعدد الاختيار</Typography>
                            <Checkbox
                                checked={currentQuestion.isMultiple || currentQuestion.options.filter(opt => opt.isCorrect).length > 1}
                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, isMultiple: e.target.checked })}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Button variant="contained" color="primary" onClick={() => {
                                setCurrentQuestion({
                                    ...currentQuestion,
                                    options: [...currentQuestion.options, { id: '', text: '', isCorrect: false, createdAt: new Date(), questionId: '', updatedAt: new Date() }]
                                })
                            }}>إضافة خيار</Button>
                        </div>
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <TextField
                                    fullWidth
                                    label={`الخيار ${String.fromCharCode(65 + index)}`}
                                    value={option.text}
                                    onChange={(e) => {
                                        const newOptions = [...currentQuestion.options];
                                        newOptions[index] = {
                                            id: `${index}`,
                                            text: e.target.value,
                                            createdAt: new Date(),
                                            questionId: '',
                                            isCorrect: newOptions[index].isCorrect ?? false,
                                            updatedAt: new Date(),
                                        };
                                        console.log(newOptions);
                                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                    }}
                                    sx={{ mb: 1 }}
                                />
                                <Checkbox
                                    checked={option.isCorrect}
                                    onChange={(e) => {
                                        const newOptions = [...currentQuestion.options];
                                        newOptions[index] = { ...option, isCorrect: e.target.checked };
                                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                    }}
                                />
                            </div>
                        ))}
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => handleAddQuestion()}
                        disabled={!currentQuestion.text || currentQuestion.options.some(opt => opt.text.trim() === '')}
                        sx={{ mt: 2 }}
                    >
                        إضافة السؤال
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>إلغاء</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!title || !description || questions.length === 0}
                >
                    حفظ
                </Button>
            </DialogActions>
        </Dialog>
    );
} 