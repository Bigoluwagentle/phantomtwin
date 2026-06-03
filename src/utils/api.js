import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

export const startAnalysis = async (url) => {
  const response = await api.post('/analysis/start', { url })
  return response.data
}

export const getAnalysisStatus = async (sessionId) => {
  const response = await api.get(`/analysis/status/${sessionId}`)
  return response.data
}

export const generateCode = async (sessionId) => {
  const response = await api.get(`/generate/${sessionId}`)
  return response.data
}

export const redesignWebsite = async (sessionId, style) => {
  const response = await api.post(`/redesign/${sessionId}`, { style })
  return response.data
}

export default api
// sharp