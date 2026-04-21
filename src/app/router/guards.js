import { authState } from '../store/auth.store'

export function authGuard(to) {
  if (to.meta?.requiresAuth && !authState.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta?.guestOnly && authState.isAuthenticated) {
    return { name: 'home' }
  }

  return true
}
