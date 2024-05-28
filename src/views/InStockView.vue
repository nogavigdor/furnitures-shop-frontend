<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">In Stock Products</h1>
    <div v-if="loading" class="text-center">
      <span>Loading...</span>
    </div>
    <div v-else>
      <div v-if="inStockProducts.length === 0" class="text-center">
        <span>No products in stock</span>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in inStockProducts" :key="product.id" class="border p-4 rounded">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="mb-2">{{ product.description }}</p>
          <p class="mb-2">Price: ${{ product.price }}</p>
          <p class="mb-2">Categories: {{ product.categories.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const inStockProducts = ref([])
const loading = ref(true)

const fetchInStockProducts = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/products/instock')
    inStockProducts.value = response.data
  } catch (error) {
    console.error('Error fetching in-stock products:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchInStockProducts()
})
</script>

<style scoped>
/* Add any scoped styles here */
</style>
