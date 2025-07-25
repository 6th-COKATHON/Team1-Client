import axios from 'axios'

export const BASE_URL = 'http://15.165.221.34:8080/'

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
