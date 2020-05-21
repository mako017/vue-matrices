import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import builder from '@/views/builder.vue'
import database from '@/views/database.vue'
import editor from '@/views/editor.vue'

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
  {
    path: '/database',
    name: 'Database',
    component: database
  },
  {
    path: '/editor',
    name: 'Editor',
    component: editor
  },
]

const router = new VueRouter({
  routes
})

export default router
