const TOKEN_KEY = 'auth_token'

function normalizeToken(token) {
  if (!token) return ''
  return String(token).replace(/^Bearer\s+/i, '').trim()
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  const normalizedToken = normalizeToken(token)
  if (!normalizedToken) return
  localStorage.setItem(TOKEN_KEY, normalizedToken)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
