<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const form = ref({
  email: '',
  password: ''
})

async function submit() {
  await auth.register(form)
  router.push({ name: 'home' })
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      <span>Email</span>
      <input type="email" v-model="form.email" />
    </label>

    <label>
      <span>Password</span>
      <input type="password" v-model="form.password" />
    </label>

    <button type="submit"> Register </button>
  </form>
</template>
