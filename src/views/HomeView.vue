<template>
  <div class="container mx-auto px-4 sm:px-0">
    <div class="flex flex-col items-center mt-14 min-h-screen bg-gray-50">
      <h1 class="font-bold text-4xl text-gray-800 mb-4">Welcome to Our Online Furniture Store!</h1>
      <p class="text-xl text-gray-600 mb-8">Discover our range of high-quality products.</p>
      <router-link
        to="/products"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        Browse Products
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
