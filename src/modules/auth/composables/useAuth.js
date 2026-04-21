import { clearAuthSession, setAuthSession } from '../../../app/store/auth.store'
import { clearToken, setToken } from '../../../shared/services/token.service'
import { sistemaLogin, sistemaSession } from '../services/auth.api'  // Agrega sistemaSession al import

function extractToken(rawToken) {
  if (!rawToken) return null
  return String(rawToken).replace(/^Bearer\s+/i, '').trim() || null
}

function normalizeSession(data) {
  const source = data || {}
  return {
    token: extractToken(source.token || source.access_token || null),
    usuario: source.usuario || source.user || null,
    empresa: source.empresa || source.company || null,
    app: source.app || null,
    permisos: source.permisos || source.permissions || [],
  }
}

export function useAuth() {
  const login = async (credentials) => {
    const response = await sistemaLogin(credentials)
    const session = normalizeSession(response.data)

    if (!session.token) {
      throw new Error('err.session.token_missing')
    }

    setToken(session.token)
    setAuthSession(session)

    return response
  }

  const refreshSession = async () => {
    const response = await sistemaSession()
    const session = normalizeSession(response.data)
    setAuthSession(session)  // Actualiza estado sin token nuevo
    return response
  }

  const logout = () => {
    clearToken()
    clearAuthSession()
  }

  return { login, logout, refreshSession }  // Agrega refreshSession al return
}
