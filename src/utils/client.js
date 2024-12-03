import axios from 'axios'
import { baseURL } from '../config/api'
import { jwt } from './jwt';

const client = axios.create({
    baseURL,
    timeout: 2000,
    withCredentials: true
})

client.interceptors.request.use(function (config) {
    const tokens = jwt.getFromLocalStorage()

    if (!tokens) return config

    config.headers.Authorization = `Bearer ${tokens.access}`
    return config;
})

const get = client.get
const post = client.post
const put = client.put
const patch = client.patch
const del = client.delete

export { get, post, put, patch, del }