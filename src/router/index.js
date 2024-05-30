import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailsView from '../views/ProductDetails.vue'
import AddProductView from '../views/AddProductView.vue'
import EditProductView from '../views/EditProductView.vue'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/'),
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
      path: '/products/:id',
      name: 'productDetails',
      component: ProductDetailsView
    },
    {
      path: '/products/add',
      name: 'addProduct',
      component: AddProductView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/:id/edit',
      name: 'editProduct',
      component: EditProductView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const publicPages = ['/', '/login', '/register', '/products', '/instock']
  const authRequired = !publicPages.includes(to.path)
  const isAuthenticated = userStore.token !== null

  if (authRequired && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
