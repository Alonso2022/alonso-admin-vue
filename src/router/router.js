import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      //component: Home,
      meta:{},
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
     
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        isAuth:false
      },
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta:{},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
