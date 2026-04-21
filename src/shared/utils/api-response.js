export function parseApiResponse(json) {
  const payload = json || {}
  const ok = Boolean(payload.ok)
  const message = payload.message || ''
  const data = payload.data ?? null

  return { ok, message, data }
}

export function createApiError({ message, data }) {
  const error = new Error(message || 'err.unknown')
  error.payload = data
  return error
}
