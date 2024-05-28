<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Product List</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4 rounded-lg">
        <img :src="product.imageUrl" alt="" class="w-full h-48 object-cover mb-2" />
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>${{ product.price }}</p>
        <router-link :to="`/products/${product.id}`" class="text-blue-500"
          >View Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

const products = productStore.products
</script>
