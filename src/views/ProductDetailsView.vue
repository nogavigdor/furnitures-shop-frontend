<template>
  <div class="container mx-auto p-8 bg-white shadow rounded-lg">
    <div v-if="product">
      <!-- Product Details Header with Back Button on the left and Title in the middle -->
      <div class="flex justify-between items-center border-b pb-4">
        <button
          @click="router.push('/products')"
          class="px-5 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition duration-300"
        >
          Back to Products
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mx-auto">{{ product.name }}</h1>
        <div class="w-24"></div>
        <!-- Spacer to balance the flex alignment -->
      </div>

      <div class="flex mt-8">
        <img
          :src="product.imageUrl"
          alt="Product image"
          class="w-1/2 h-auto max-h-96 object-cover rounded-lg"
        />

        <!-- Product Details on the right -->
        <div class="ml-8 w-1/2">
          <p class="text-xl text-gray-800 font-semibold">
            Price: {{ currencyFormat(product.price) }}
          </p>
          <div class="mt-4 text-lg text-gray-600">
            <span class="font-semibold">Description:</span> {{ product.description }}
          </div>
          <div class="mt-2 text-lg text-gray-600">
            <span class="font-semibold">Categories:</span> {{ product.categories.join(', ') }}
          </div>
          <div class="mt-2 text-md text-gray-500">
            Created on: {{ dateFormat(product.createdAt) }}
          </div>
          <div class="mt-2 text-md text-gray-500">
            Last updated: {{ dateFormat(product.updatedAt) }}
          </div>
          <!-- In-Stock Indicator -->
          <div class="mt-4">
            <span
              class="text-xl font-semibold"
              :class="{ 'text-green-500': product.inStock, 'text-red-500': !product.inStock }"
            >
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading product details or product does not exist...</p>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Create a reactive reference to the product
const product = computed(() => productStore.product)

// Fetch the product when the component is mounted
onMounted(async () => {
  await productStore.fetchProduct(route.params.id)
})

// Define currency format function
const currencyFormat = (value) => {
  return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value)
}

// Define date format function
const dateFormat = (date) => {
  return new Date(date).toLocaleDateString('da-DK')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
