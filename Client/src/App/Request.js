import axios from "axios";

const BASE_URL = "https://mern-smart.herokuapp.com/api/";

/*
const TOKEN = localStorage.getItem("persist:root") 
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
    : null;
const token = `Bearer ${TOKEN}`;
*/

const config = {
    'Content-Type': 'application/json',
    //token,
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: config
});