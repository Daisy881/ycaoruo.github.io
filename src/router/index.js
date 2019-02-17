import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/index'
import frameRouter from '@/router/frame/index'

Vue.use(Router)

export const constantRouterMap = [
    {
      path: '/',
      name: 'layout',
      redirect: 'layout',
      component: layout,
      children: [{
      	path: '/layout',
      	name: 'layout',
      	component: layout,
        meta: {
          requireAuth: false
        }
      }]
    }
  ]

const router = new Router({
  routes: constantRouterMap.concat(frameRouter)
})

// 注册一个全局守卫，作用是在路由跳转前对路由进行判断，因为某些页面必须是用户登录之后才可以进入
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('myToken')
  if (token) { // 用户已经登录
    next()
  } else {
    // 用户未登录且访问此三个页面时直接跳转到登录页面
    if (to.path === '/orderManagement' || to.path === '/personalCenter') {
      next({
        path: '/login',
        query: {
          type: 'use'
        }
      })
    } else { // 用户未登录访问的其他页面
      next()
    }
  }
})
 

export default router
