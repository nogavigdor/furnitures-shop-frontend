<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="registerUser">
      <input v-model="name" type="text" placeholder="Name" class="border p-2 mb-2 w-full" />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-2 w-full" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 mb-2 w-full"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const userStore = useUserStore()

const registerUser = async () => {
  error.value = null
  try {
    await userStore.register({ name: name.value, email: email.value, password: password.value })
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  }
}
</script>

<style scoped></style>
