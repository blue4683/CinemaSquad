import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import BoardView from '@/views/BoardView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import ProfileView from '../views/ProfileView.vue'
import SearchView from '../views/SearchView.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => {
        return window.location.reload()
    })
};

Vue.use(VueRouter)

const routes = [
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
    path: '/movies',
    name: 'BoardView',
    component: BoardView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   const isLogin = true
//   const authPages = ['profile']
//   const isAuthRequired = authPages.includes(to.name)
//   if (isAuthRequired && !isLogin){
//     console.log('Login으로 이동!')
//     next({name: 'LoginView'})
//   } else {
//     console.log('to로 이동')
//     next()
//   }
// })
