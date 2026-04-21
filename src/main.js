import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './app/router'
import { hydrateAuthFromToken } from './app/store/auth.store'
import { getToken } from './shared/services/token.service'

hydrateAuthFromToken(getToken())

createApp(App).use(router).mount('#app')
