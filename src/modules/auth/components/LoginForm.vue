<script setup>
import { reactive, ref } from 'vue'
import { validateLoginPayload } from '../validators/auth.validator'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
})

const form = reactive({
  app: 'ecf',
  usuario: '',
  clave: '',
})

const errors = reactive({
  usuario: '',
  clave: '',
})

const serverError = ref('')
const loading = ref(false)

function resetErrors() {
  errors.usuario = ''
  errors.clave = ''
  serverError.value = ''
}

function applyServerErrors(payload) {
  const apiErrors = payload?.errors || {}

  if (apiErrors.usuario) errors.usuario = apiErrors.usuario
  if (apiErrors.clave) errors.clave = apiErrors.clave
  if (apiErrors.app) serverError.value = apiErrors.app
}

async function onSubmit() {
  resetErrors()
  const validation = validateLoginPayload(form)

  if (!validation.valid) {
    Object.assign(errors, validation.errors)
    return
  }

  loading.value = true
  try {
    await props.onSubmit({ ...form })
  } catch (error) {
    applyServerErrors(error?.payload)
    serverError.value = error?.message || 'No se pudo iniciar sesion.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <h1>Iniciar sesion</h1>

    <label>
      Usuario (correo)
      <input v-model="form.usuario" type="email" autocomplete="username" />
      <small v-if="errors.usuario">{{ errors.usuario }}</small>
    </label>

    <label>
      Clave
      <input v-model="form.clave" type="password" autocomplete="current-password" />
      <small v-if="errors.clave">{{ errors.clave }}</small>
    </label>

    <small v-if="serverError">{{ serverError }}</small>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Entrando...' : 'Entrar' }}
    </button>
  </form>
</template>

<style scoped>
.login-form {
  width: min(420px, 100%);
  margin: 40px auto;
  display: grid;
  gap: 12px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  text-align: left;
  background: #fff;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

input {
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

small {
  color: #c0392b;
  font-size: 12px;
}

button {
  margin-top: 6px;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
