<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-2 w-full" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 mb-2 w-full"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const userStore = useUserStore()

const loginUser = async () => {
  error.value = null
  try {
    await userStore.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
