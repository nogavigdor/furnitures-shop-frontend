<template>
  <nav class="bg-gray-800 p-4 text-white flex pr-20 pl-20">
    <img alt="shop-logo" class="w-52" src="@/assets/logo.png" width="125" height="125" />
    <div class="container mx-auto flex justify-between items-center text-xl">
      <div class="pl-20">
        <router-link to="/" class="mr-4">Home</router-link>
        <router-link to="/products" class="mr-4">Products</router-link>
        <router-link to="/products/add" class="mr-4">
          <button class="bg-green-500 px-4 py-2 rounded">Add Product</button></router-link
        >
      </div>
      <div>
        <router-link v-if="!isAuthenticated" to="/login" class="mr-4">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/register" class="mr-4">Register</router-link>
        <template v-if="isAuthenticated">
          <span class="mr-4">Welcome back, {{ userName }}</span>
          <button @click="logout" class="bg-red-500 px-4 py-2 rounded">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const isAuthenticated = computed(() => userStore.token !== null)

const userName = computed(() => (userStore.user ? userStore.user.name : ''))

const logout = () => {
  userStore.logout()
}
</script>

<style scoped></style>
