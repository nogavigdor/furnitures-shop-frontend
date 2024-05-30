<template>
  <div class="container mx-auto p-4 max-w-lg">
    <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
    <form @submit.prevent="editProduct" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          id="name"
          v-model="name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description:</label
        >
        <textarea
          id="description"
          v-model="description"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
        <input
          id="price"
          type="number"
          v-model="price"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="inStock" class="block text-sm font-medium text-gray-700">In Stock:</label>
        <input
          id="inStock"
          type="checkbox"
          v-model="inStock"
          class="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="categories" class="block text-sm font-medium text-gray-700">Categories:</label>
        <input
          id="categories"
          v-model="categories"
          placeholder="Comma separated"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Image:</label>
        <input
          id="image"
          type="file"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        />
      </div>
      <div v-if="existingImageUrl" class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Current Image:</label>
        <img :src="existingImageUrl" alt="Current Product Image" class="mt-2 w-full h-auto" />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Changes
      </button>
    </form>
    <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const name = ref('')
const description = ref('')
const price = ref(0)
const inStock = ref(false)
const categories = ref('')
const image = ref(null)
const existingImageUrl = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

const handleImageUpload = (event) => {
  image.value = event.target.files[0]
}

const fetchProduct = async () => {
  const productId = route.params.id
  const response = await productStore.fetchProduct(productId)
  const product = productStore.product

  name.value = product.name
  description.value = product.description
  price.value = product.price
  inStock.value = product.inStock
  categories.value = product.categories.join(', ')
  existingImageUrl.value = product.imageUrl // Assuming the API response contains the image URL
}

const editProduct = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  formData.append('inStock', inStock.value)
  formData.append(
    'categories',
    categories.value.split(',').map((cat) => cat.trim())
  )
  if (image.value) {
    formData.append('image', image.value)
  }

  try {
    const productId = route.params.id
    await productStore.updateProduct(productId, formData)
    successMessage.value = 'Product updated successfully!'
    router.push('/products')
  } catch (error) {
    errorMessage.value = error.response ? error.response.data.message : error.message
  }
}

onMounted(fetchProduct)
</script>

<style scoped></style>
