import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ProductsView.vue'
import InStockView from '../views/InStockView.vue'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/instock',
      name: 'instock',
      component: InStockView
    }
  ]
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const isAuthenticated = userStore.token !== null

  if (authRequired && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
