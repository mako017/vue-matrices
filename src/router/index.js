import Vue from 'vue'
import VueRouter from 'vue-router'
import builder from '@/components/builder.vue'
import home from '@/views/home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/builder',
    name: 'Builder',
    component: builder
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/components/builder.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
