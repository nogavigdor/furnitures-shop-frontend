import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:4000/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null
  }),
  actions: {
    async fetchProducts() {
      const response = await axios.get(`${API_URL}/products`)
      this.products = response.data
    },
    async fetchProduct(id) {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`)
        if (response.data) {
          this.product = response.data
        } else {
          console.error('No product found')
          this.product = null // Ensure product is set to null if no data is returned
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        this.product = null // Ensure product is set to null on error
      }
    },
    async createProduct(productData) {
      const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token')
        }
      })
      this.products.push(response.data)
    },
    async updateProduct(id, productData) {
      await axios.put(`${API_URL}/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token')
        }
      })
      this.fetchProducts()
    },
    async deleteProduct(id) {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      this.fetchProducts()
    },
    toggleInStockFilter() {
      this.showInStockOnly = !this.showInStockOnly
    }
  },
  getters: {
    filteredProducts(state) {
      if (state.showInStockOnly) {
        return state.products.filter((product) => product.inStock)
      }
      return state.products
    }
  }
})
