import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/worktable',
    component: Layout,
    redirect: '/worktable/search-book',
    meta: { title: '总工作台', icon: 'el-icon-menu' },
    children: [
      {
        path: 'book',
        name: 'SearchBook',
        component: () => import('@/views/worktable/search-book'),
        meta: { title: '查询书籍', icon: '' },
      },
      {
        path: 'idle',
        name: 'SearchIdle',
        component: () => import('@/views/worktable/search-idle'),
        meta: { title: '查询闲置', icon: '' },
      },
      {
        path: 'service',
        name: 'SearchService',
        component: () => import('@/views/worktable/search-service'),
        meta: { title: '查询服务', icon: '' },
      },
      {
        path: 'ad',
        name: 'SearchAd',
        component: () => import('@/views/worktable/get-ad'),
        meta: { title: '查看广告', icon: '' },
      },
      {
        path: 'user',
        name: 'SearchUser',
        component: () => import('@/views/worktable/search-user'),
        meta: { title: '查询用户', icon: '' },
      },

    ]
  },
  {
    path: '/add',
    component: Layout,
    redirect: '/add/add-book',
    meta: { title: '添加功能', icon: 'el-icon-menu' },
    children: [
      {
        path: 'book',
        name: 'AddBook',
        component: () => import('@/views/add/add-book'),
        meta: { title: '添加书籍', icon: '' },
      },
      {
        path: 'idle',
        name: 'AddIdle',
        component: () => import('@/views/add/add-idle'),
        meta: { title: '添加闲置', icon: '' },
      },
      {
        path: 'service',
        name: 'AddService',
        component: () => import('@/views/add/add-service'),
        meta: { title: '添加服务', icon: '' },
      },
      {
        path: 'ad',
        name: 'AddAd',
        component: () => import('@/views/add/add-ad'),
        meta: { title: '添加广告', icon: '' },
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
