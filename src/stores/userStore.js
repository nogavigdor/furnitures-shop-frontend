import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async register(userData) {
      await axios.post('http://localhost:4000/api/user/register', userData)
    },
    async login(userData) {
      const response = await axios.post('http://localhost:4000/api/user/login', userData)
      this.token = response.data.data.token
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
