<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <ProductFilter :showInStock="showInStock" @updateShowInStock="toggleShowInStock" />
    <div v-if="loading" class="text-center">
      <span>Loading...</span>
    </div>
    <div v-else>
      <div v-if="filteredProducts.length === 0" class="text-center mt-4">
        <span>No products available</span>
      </div>
      <ProductList :products="filteredProducts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductFilter from '../components/ProductFilter.vue'
import ProductList from '../components/ProductList.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const showInStock = ref(route.query.inStock === 'true')
const loading = ref(true)

const fetchProducts = async () => {
  await productStore.fetchProducts()
  loading.value = false
}

const filteredProducts = computed(() => {
  if (showInStock.value) {
    return productStore.products.filter((product) => product.inStock)
  }
  return productStore.products
})

const toggleShowInStock = (value) => {
  showInStock.value = value
  router.push({ query: { ...route.query, inStock: value } })
}

onMounted(() => {
  fetchProducts()
})
</script>
