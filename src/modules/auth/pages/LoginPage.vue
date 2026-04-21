<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

async function handleLogin(payload) {
  await login(payload)
  await router.push({ name: 'home' })
}
</script>

<template>
  <main class="login-page">
    <LoginForm :on-submit="handleLogin" />
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 16px;
  background: #f7f7f8;
}
</style>
