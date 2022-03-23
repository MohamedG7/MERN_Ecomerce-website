import { generateMedia } from 'styled-media-query';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

////================== COLORS =======================////
//? -----> IN MUI STYLE
export const Colors = {
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

////================== MEDIA QUERYS ==================////

const BREAKPOINT_XS = 480,
      BREAKPOINT_SM = 576,
      BREAKPOINT_MD = 768,
      BREAKPOINT_LG = 992,
      BREAKPOINT_XL = 1366,
      BREAKPOINT_XXL = 1600;

export const media = generateMedia({
  xs: `${BREAKPOINT_XS}px`,
  sm: `${BREAKPOINT_SM}px`,
  md: `${BREAKPOINT_MD}px`,
  lg: `${BREAKPOINT_LG}px`,
  xl: `${BREAKPOINT_XL}px`,
  xxl: `${BREAKPOINT_XXL}px`
})


export const Row = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   ${media.lessThan('md')`
       flex-direction: column;
       margin-left: 1px;
   `};
`;
export const col_1 = styled.div`
   width: 8.3333333333%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_2 = styled.div`
   width: 16.6666666667%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_3 = styled.div`
   width: 25%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_4 = styled.div`
   width: 33.3333333333%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_5 = styled.div`
   width: 41.6666666667%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_6 = styled.div`
   width: 50%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_7 = styled.div`
   width: 58.3333333333%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_8 = styled.div`
   width: 66.6666666667%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_9 = styled.div`
   width: 75%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_10 = styled.div`
   width: 83.3333333333%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_11 = styled.div`
   width: 91.6666666667%;
   ${media.lessThan('md')`
       width: 100%;
   `};
`;
export const col_12 = styled.div`
   width: 100%;
`;

////===================== comps ========================////
