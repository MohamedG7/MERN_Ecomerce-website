import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMsg: "",
    success: false,
    successMsg: ""
}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        startAuth: ( state ) => {
            state.isFetching = true;
        },
        successAuth: ( state, action ) => {
            state.isFetching = false;
            state.success = true;
            state.successMsg = action.payload.msg;
            state.currentUser = action.payload.user;
        },
        failureAuth: ( state, action ) => {
            state.isFetching = false;
            state.error = true;
            state.errorMsg = action.payload.msg;
        },
        logoutAuth: ( state ) => {
            state.currentUser = null;
        },
        EndAuth: ( state ) => {
            state.errorMsg = "";
            state.successMsg = "";
        }
    }
});

export const {
    startAuth,
    successAuth,
    failureAuth,
    logoutAuth,
    EndAuth
} = userReducer.actions
export default userReducer.reducer