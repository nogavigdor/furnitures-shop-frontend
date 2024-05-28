<template>
  <nav class="bg-gray-800 p-4 text-white">
    <div class="container mx-auto flex justify-between">
      <div>
        <router-link to="/" class="mr-4">Home</router-link>
        <router-link to="/products" class="mr-4">Products</router-link>
        <router-link to="/instock" class="mr-4">In Stock</router-link>
      </div>
      <div>
        <router-link v-if="!isAuthenticated" to="/login" class="mr-4">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/register" class="mr-4">Register</router-link>
        <button v-if="isAuthenticated" @click="logout" class="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const isAuthenticated = computed(() => userStore.token !== null)

const logout = () => {
  userStore.logout()
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
