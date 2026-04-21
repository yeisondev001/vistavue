import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './app/router'
import { hydrateAuthFromToken } from './app/store/auth.store'
import { getToken, clearToken } from './shared/services/token.service'
import { useAuth } from './modules/auth/composables/useAuth'

const { refreshSession } = useAuth()

const token = getToken()
if (token) {
  hydrateAuthFromToken(token)  // Temporal, para marcar isAuthenticated
  try {
    await refreshSession()  // Refresca sesión completa desde API
  } catch (error) {
    console.error('Error al refrescar sesión:', error)
    clearToken()  // Limpia token inválido
    // Opcional: redirigir a login, e.g., router.push('/login')
  }
}

createApp(App).use(router).mount('#app')