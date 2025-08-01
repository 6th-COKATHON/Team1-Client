import axios from 'axios'

export const BASE_URL = 'https://cokathon.r-e.kr/'

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
