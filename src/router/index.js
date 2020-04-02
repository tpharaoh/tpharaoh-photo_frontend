import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Login from '../views/Login.vue'
import Tag from '../views/Tag.vue'
import Blog from '../views/Blog.vue'
import Photo from '../views/Photo.vue'
import Show from '../views/Show.vue'
// import ViewBlog from '../views/ViewBlog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/viewBlog',
    name: 'ViewBlog',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewBlog.vue')
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Portfolio.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/tag',
    name: 'Tag',
    component: Tag,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/show/:id',
    name: 'Show',
    component: Show,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let token = store.getters['auth/jwtDecoded'] || null
  let authorized = token && token.exp > Date.now() / 1000
  if (authorized) {
    if (to.matched.some(record => !record.meta.requiresAuth)) {
      next({ name: 'About' })
    }
  } else {
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ name: 'Login' })
    }
  }
  
  next()
})


export default router
