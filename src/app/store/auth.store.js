import { reactive } from 'vue'

const initialState = {
  token: null,
  user: null,
  empresa: null,
  app: null,
  permisos: [],
  isAuthenticated: false,
}

export const authState = reactive({ ...initialState })

export function setAuthSession(session) {
  authState.token = session?.token || null
  authState.user = session?.usuario || null
  authState.empresa = session?.empresa || null
  authState.app = session?.app || null
  authState.permisos = session?.permisos || []
  authState.isAuthenticated = Boolean(session?.token)
}

export function clearAuthSession() {
  Object.assign(authState, initialState)
}

export function hydrateAuthFromToken(token) {
  authState.token = token || null
  authState.isAuthenticated = Boolean(token)
}
