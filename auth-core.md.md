# Core: Autenticación, Empresas y Acceso

## Convención API

- NO enviar `session` en el body
- Usar siempre:
  
  Authorization: Bearer <token>

- Respuesta estándar:

{
  "ok": true,
  "message": "",
  "data": {}
}

---

# 🔐 AUTENTICACIÓN

## sistema_login

### Descripción
Login inicial con app, usuario y clave.

- Valida credenciales
- Selecciona empresa (última o disponible)
- Devuelve token Bearer

### Request

{
  "app": "ecf",
  "usuario": "correo@ejemplo.com",
  "clave": "contraseña"
}

### Response

{
  "ok": true,
  "data": {
    "usuario": {},
    "empresa": {},
    "app": "ecf",
    "token": "Bearer eyJ..."
  }
}

### Reglas

- NO enviar Authorization aquí
- Guardar token en localStorage

---

## sistema_session

### Descripción
Recupera sesión usando token existente.

### Request

Headers:
Authorization: Bearer <token>

Body:
{}

### Response

{
  "ok": true,
  "data": {
    "usuario": {},
    "empresa": {},
    "app": "ecf"
  }
}

### Reglas

- No devuelve nuevo token
- Se usa al recargar la app

---

## sistema_session_empresa

### Descripción
Cambia la empresa activa.

### Request

Headers:
Authorization: Bearer <token>

{
  "cambiar_a_empresa": "id"
}

### Response

{
  "ok": true,
  "data": {
    "empresa": {},
    "token": "Bearer nuevo..."
  }
}

### Reglas

- SIEMPRE actualizar el token

---

## sistema_multi_empresa_list

### Descripción
Lista empresas disponibles.

### Request

Headers:
Authorization: Bearer <token>

{
  "q": "",
  "limit": 50,
  "offset": 0
}

### Response

{
  "ok": true,
  "data": {
    "result": []
  }
}

---

# 👥 INVITACIONES

## sistema_usuario_invite_create

- Crear invitación (~2 horas)

Request:
{
  "email": "correo@ejemplo.com"
}

---

## sistema_usuario_invite_accept_session

- Aceptar invitación con sesión activa

{
  "invite_token": "abc"
}

---

## sistema_usuario_invite_accept_new

- Crear usuario desde invitación

{
  "invite_token": "abc",
  "nombre": "Carlos",
  "clave": "123"
}

---

## sistema_usuario_invite_preview

- Vista pública sin login

{
  "invite_token": "abc"
}

---

# 🔑 PERFILES Y PERMISOS

## ecf_perfil_insert
Crear perfil

## ecf_perfil_update
Actualizar perfil

## ecf_perfil_list
Listar perfiles + funciones disponibles

## ecf_perfil_miembros_add
Agregar usuario a perfil

## ecf_perfil_miembros_remove
Quitar usuario

---

# 🏢 EMPRESAS

## sistema_empresa_select
Listar o ver empresa

## sistema_empresa_insert
Crear empresa

## sistema_empresa_update
Actualizar empresa

---

# ⚙️ REGLAS FRONTEND

- Guardar token en localStorage
- Usar Axios con interceptor
- Enviar Bearer automáticamente
- Manejar errores (401, login inválido)
- Recuperar sesión al iniciar app
- Actualizar token al cambiar empresa

---

# 🎯 OBJETIVO FRONTEND

Construir en Vue:

- Login
- Persistencia de sesión
- Selector de empresas
- Cambio de empresa
- Manejo de permisos