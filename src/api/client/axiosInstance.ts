import axios from 'axios'

const TIME_OUT = 20000
export const axiosInstance = axios.create({
  timeout: TIME_OUT,
  baseURL: process.env.REACT_APP_URL,
  timeoutErrorMessage: 'The request took too long. Please try again',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
