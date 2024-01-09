import axios from 'axios'

const TIME_OUT = 20000
export const axiosInstance = axios.create({
  timeout: TIME_OUT,
  baseURL: process.env.REACT_APP_URL,
  timeoutErrorMessage: 'The request took too long. Please try again',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    try {
      config.headers.Authorization = `Bearer ${'token'}`
      return config
    } catch (error) {
      throw new Error(
        'An error occurred while processing your request. Please try again later.'
      )
    }
  },
  error => {
    return Promise.reject(error)
  }
)
