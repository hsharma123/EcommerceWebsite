import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        success: {
            main: '#4caf50',
        },
        white: {
            main:'#fff',
        },
        danger: {
            main:'#ea4226',
        }
    },
    typography: {
        fontSize: 16,
        fontFamily: 'Roboto',
        h3: {
            fontWeight: 700,
            fontSize: '2.2rem',
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                    boxSizing:'border-box',
                 },
                body: {
                    margin: 0,
                    padding: 0,
                },
                a: {
                    textDecoration: 'none',
                    color: '#000',
                },
                
            }
        }
    }
});

export default theme;
