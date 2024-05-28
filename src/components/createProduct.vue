<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
    <img :src="product.imageUrl" alt="" class="w-full h-96 object-cover mb-4" />
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <button @click="deleteProduct" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProduct(route.params.id)
})

const product = productStore.product

const deleteProduct = async () => {
  await productStore.deleteProduct(product.id)
  router.push('/')
}
</script>
