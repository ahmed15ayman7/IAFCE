import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#FBB34C',
            light: '#FFD699',
            dark: '#002D32',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#002D32',
            light: '#004A52',
            dark: '#001A1D',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
        },
        text: {
            primary: '#002D32',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: 'var(--font-cairo)',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1.5rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.5rem',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 45, 50, 0.1), 0 2px 4px -1px rgba(0, 45, 50, 0.06)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#002D32',
                    boxShadow: '0 1px 3px 0 rgba(0, 45, 50, 0.1), 0 1px 2px 0 rgba(0, 45, 50, 0.06)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    color: '#002D32',
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: '#FBB34C',
                    color: '#FFFFFF',
                },
            },
        },
    },
}); 