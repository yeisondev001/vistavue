import axios from 'axios'
import { getToken } from './token.service'
import { createApiError, parseApiResponse } from '../utils/api-response'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = getToken()

  if (config.auth !== false && token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }

  return config
})

export async function apiFetch(path, { method = 'POST', body, auth = true } = {}) {
  try {
    const response = await http.request({
      url: path,
      method,
      data: body || {},
      auth,
    })

    const apiResponse = parseApiResponse(response.data)

    if (!apiResponse.ok) {
      throw createApiError(apiResponse)
    }

    return apiResponse
  } catch (error) {
    const responseData = error?.response?.data
    const apiResponse = parseApiResponse(responseData)

    if (responseData) {
      throw createApiError(apiResponse)
    }

    throw createApiError({
      message: error?.message || 'err.network',
      data: null,
    })
  }
}
