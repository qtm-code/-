import Vue from 'vue'
import Router from 'vue-router'
//导入页面
import Home from './pages/home'
// import Login from './pages/login'
import Index from './pages/index'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Register from './pages/register'
//引入购物车
// import Cart from './pages/cart'
// import Order from './pages/order'//订单
// import OrderConfirm from './pages/orderConfirm'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'
// import AliPay from './pages/alipay'
Vue.use(Router);//通过vue把Router插件加载进去了

export default new Router({//通过export导出
  //路由配置
  routes:[
    {
      path:'/',//路由路径
      name:'home',//首页和产品站公用的父路由 即根路由
      component:Home,
      redirect:'/index',
      //子路由
      children:[
        {
          path: '/index',//主页
          name: 'index',
          component: Index,
        }, {
          path: '/product/:id',//产品 这个路由是动态路由 每个产品都会有编号 所以添加id添加他的子路由
          name: 'product',
          component:  () => import('./pages/product.vue')
        }, {
          path: '/detail/:id',//商品详情
          name: 'detail',
          component: () => import('./pages/detail.vue')
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/register.vue')
    },
    //因为cart和其他页面的头尾不一样 所以不用home路由 所以单独拿出来
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order.vue'),
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue')
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue')
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay.vue')
        }
      ]
    }
  ]
});