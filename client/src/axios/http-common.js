import axios from 'axios';

export const AuthPost = axios.create({
    baseURL: process.env.HOST_BACKEND,
    headers: {
        Authorization: 'Bearer {token}'
    }
})
export const LogPost = axios.create({
    baseURL: process.env.HOST_BACKEND
})