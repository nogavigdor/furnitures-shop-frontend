<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      v-for="product in products"
      :key="product.id"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        :src="product.imageUrl ? product.imageUrl : defaultImage"
        alt="Product Image"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
        <p class="text-gray-700 mb-2">{{ product.price }} Kr.</p>
        <p class="text-sm text-green-500" v-if="product.inStock">In Stock</p>
        <p class="text-sm text-red-500" v-else>Out of Stock</p>
        <div class="flex justify-between mt-4">
          <button @click="editProduct(product.id)" class="bg-blue-500 text-white px-3 py-1 rounded">
            Edit
          </button>
          <!-- Info button -->
          <button
            @click="viewProductDetails(product.id)"
            class="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Info
          </button>
          <button
            @click="deleteProduct(product.id)"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const defaultImage = 'path/to/default-image.jpg' // Replace with actual path to your default image
const router = useRouter()
const productStore = useProductStore()

const editProduct = (id) => {
  router.push({ name: 'editProduct', params: { id } })
}

const deleteProduct = async (id) => {
  await productStore.deleteProduct(id)
}
const viewProductDetails = (id) => {
  router.push({ name: 'productDetails', params: { id } })
}
</script>

<style scoped>
.product-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
}

.product-details {
  flex-grow: 1;
}

.product-details button {
  margin-right: 8px;
}
</style>
