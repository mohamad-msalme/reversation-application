import axios from 'axios'

const TIME_OUT = 20000
export const axiosInstance = axios.create({
  timeout: TIME_OUT,
  baseURL: "/api/v1",
  timeoutErrorMessage: 'The request took too long. Please try again',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
