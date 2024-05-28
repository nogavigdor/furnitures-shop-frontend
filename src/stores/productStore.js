import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null
  }),
  actions: {
    async fetchProducts() {
      const response = await axios.get('http://localhost:4000/api/products')
      this.products = response.data
    },
    async fetchProduct(id) {
      const response = await axios.get(`http://localhost:4000/api/products/${id}`)
      this.product = response.data
    },
    async createProduct(productData) {
      const response = await axios.post('http://localhost:4000/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token')
        }
      })
      this.products.push(response.data)
    },
    async updateProduct(id, productData) {
      await axios.put(`http://localhost:4000/api/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token')
        }
      })
      this.fetchProducts()
    },
    async deleteProduct(id) {
      await axios.delete(`http://localhost:4000/api/products/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      this.fetchProducts()
    }
  }
})
