import { apiFetch } from '../../../shared/services/http.client'

export function sistemaLogin({ app, usuario, clave }) {
  return apiFetch('/sistema_login', {
    method: 'POST',
    auth: false,
    body: { app, usuario, clave },
  })
}
