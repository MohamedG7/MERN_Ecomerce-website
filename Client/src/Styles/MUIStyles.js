import { makeStyles } from '@material-ui/core';

////================== COLORS =======================////
//? -----> IN MUI STYLE
const Colors = {
    blue: '#0d6efd',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#d63384',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#198754',
    teal: '#20c997',
    cyan: '#0dcaf0',
    white: '#fff',
    gray: '#6c757d',
    grayDark: '#343a40',
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    info: '#0dcaf0',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#212529',
}

////============ MUI STYLY ================//
const drawerWidth = 0;
export default makeStyles((theme) => ({
    roots: {
        maxWidth: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
        display: "block",
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
}));
