// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入routers 文件 模块
import routers from './routers'

// 避免冗余导航到当前位置:的解决办法 
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    
  return originalPush.call(this, location).catch(err => err)
}
// 修改原型对象中的replace方法
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    
  return originalReplace.call(this, location).catch(err => err)
}

// 引入 store 
import store from '@/store/index'

// 配置路由生成路由
const router = new VueRouter({
    // 配置路由组件
    routes:routers,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部   现在的文档 top 用不了 需要改 y : 0
        return { y : 0 }
      },
})
// 全局守卫：前置守卫（在路由跳转之前）
// to:可以获取到要到那个路由去 
// from： 可以获取到 从来里来
// next: 放行函数  next()  next(path) 放行到指定路由   next(false)
router.beforeEach(async (to,from,next)=>{
  // next()
  // 用户登录了才会有token，未登录一定不会有token
  let token = store.state.userOptions.token
  // 用户信息
  let name = store.state.userOptions.userInfo.name
  // 用户已经登录了
  if(token){
    // 用户已经登录了去 login 不行
    if(to.path == '/login'){
      next('/home')
    }else{
      // 登录了但是去的不是 login
      // 如果用户名已有
      if(name){
        next()
      }else{
        // 如果没有用户信息 派发 actions让仓库存储用户信息 在跳转 
        try {
          // 获取用户信息成功
          await store.dispatch('userOptions/getUserInfo')
          next()
        } catch (error) {
          // token失效获取不到用户信息
          // 1.清除token 和退出登录一样
          await store.dispatch('userOptions/userLogout')
          // 去到login重新登录
          next('/login')
        }
      }
    }

  }else{
    // 用户未登录 不能 去 交易相关的 pay paysuccess 不能去个人中心
    let toPath = to.path
    if(toPath.indexOf('/trade')!= -1 || toPath.indexOf('/pay') !=  -1 || toPath.indexOf('/center') != -1){
      // 把未登录想去而没有去成的信息，存储在地址栏中
      next('/login?redirect=' + toPath)
    }
    next()
  }
})

export default router