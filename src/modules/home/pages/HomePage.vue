<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authState } from '../../../app/store/auth.store'
import { useAuth } from '../../auth/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const userName = computed(() => authState.user?.nombre || authState.user?.email || authState.user || 'Usuario')

function handleLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <main class="home-page">
    <div class="card">
      <h1>Panel privado</h1>
      <p>Bienvenido, {{ userName }}.</p>
      <button @click="handleLogout">Cerrar sesion</button>
    </div>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 16px;
}

.card {
  width: min(600px, 100%);
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  background: #fff;
}

button {
  margin-top: 12px;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
</style>
