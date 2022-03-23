import { startAuth, successAuth, failureAuth, EndAuth } from './userReducer';
import { publicRequest } from '../App/Request';
import { v4 as uuidv4 } from 'uuid';
const moment = require('moment');

export const login = async (dispatch, theUser) => {
    dispatch(startAuth());

    try {
        const { data } = await publicRequest.post("/auth/login", theUser);
        dispatch(successAuth({ user: data }));
    } catch (error) {
        dispatch(failureAuth({ msg: error.response.data.error }));
    }

    setTimeout(() => {
        dispatch(EndAuth());
    }, 5000);
};

export const register = async (dispatch, theUser) => {
    dispatch(startAuth());

    try {
        const { data } = await publicRequest.post("/auth/register", theUser);
        dispatch(successAuth({ user: data }));
    } catch (error) {
        dispatch(failureAuth({ msg: error.response.data.error }));
    }

    setTimeout(() => {
        dispatch(EndAuth());
    }, 5000);
};

export const forgotPassword = async (dispatch, email) => {
    dispatch(startAuth());

    try {
        const { data } = await publicRequest.post("/auth/forgotpassword", email);
        dispatch(successAuth({ msg: data.data }));
    } catch (error) {
        dispatch(failureAuth({ msg: error.response.data.error }));
    }

    setTimeout(() => {
        dispatch(EndAuth());
    }, 5000);
};

export const resetUserPassword = async (dispatch, password, match) => {
    dispatch(startAuth());

    try {
        const { data } = await publicRequest.put(`/auth/resetpassword/${match.params.resetToken}`, password);
        dispatch(successAuth({ msg: data.data }));
    } catch (error) {
        dispatch(failureAuth({ msg: error.response.data.error }));
    }
    
    setTimeout(() => {
        dispatch(EndAuth());
    }, 5000);
};

export const loginWithGoogle = (dispatch, theUser, verifyAdmin) => {
    dispatch(startAuth());
    try {
        dispatch(successAuth({
            user: {
               _id: uuidv4(),
               username: theUser.displayName,
               email: theUser.email,
               photo: theUser.photoURL,
               isAdmin: verifyAdmin,
               logedAt: moment().format(),
               accessToken: uuidv4()
            }
        }))
    } catch (error) {
        console.log(error);
    }
};
