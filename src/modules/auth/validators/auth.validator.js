export function validateLoginPayload({ usuario, clave }) {
  const errors = {}


  if (!usuario?.trim()) errors.usuario = 'El usuario es obligatorio.'
  if (!clave?.trim()) errors.clave = 'La clave es obligatoria.'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
