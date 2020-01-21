import Vue from 'vue'
import VueRouter from 'vue-router'
const Page = () => import('@/pages/Page.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/pages/home/Home.vue')
const My = () => import(/* webpackChunkName: "my" */ '@/pages/my/My.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'page',
    component: Page,
    redirect: '/home',
    children: [
      { path: '/home', name: 'name', component: Home },
      { path: '/my', name: 'my', component: My,  }
    ]
  },
  {
    path: '/my/ranking',
    name: 'ranking',
    meta: { need_login: true },
    component: () => import(/* webpackChunkName: "ranking" */ '@/pages/my/ranking/Ranking.vue')
  },
  {
    path: '/home/answer',
    name: 'answer',
    meta: { need_login: true },
    component: () => import(/* webpackChunkName: "answer" */ '@/pages/home/answer/Answer.vue')
  },
  {
    path: '/my/duan',
    name: 'duan',
    meta: { need_login: true },
    component: () => import(/* webpackChunkName: "answer" */ '@/pages/my/ranking/Duan.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "answer" */ '@/pages/login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: '/datiweb/',
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to != undefined) {
    if (to.meta.need_login) {
      if(!token) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else {
      if(to.path === '/') {
        next({
          path: '/home'
        })
      } else {
        next()
      }
    }
  }
})

export default router
