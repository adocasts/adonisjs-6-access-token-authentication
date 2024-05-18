import { ref, unref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  async function api(method, url, payload = {}) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: method !== 'GET' ? JSON.stringify(unref(payload)) : null
    })

    return response.json()
  }

  function authenticate(result) {
    token.value = result.token
    localStorage.setItem('token', token.value)
  }

  async function login(payload) {
    const result = await api('POST', '/login', payload)
    authenticate(result)
  }

  async function register(payload) {
    const result = await api('POST', '/register', payload)
    authenticate(result)
  }

  async function logout() {
    await api('DELETE', '/logout')
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  async function me() {
    const result = await api('GET', '/me')
    user.value = result.user
    return user.value
  }

  return { user, login, register, logout, me }
})
