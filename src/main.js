import Vue from 'vue'
import App from './App.vue'

// 引入store
import store from '@/store'

// 引入路由
import router from '@/router'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//注册 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

// 轮播图 ---- 全局组件
import Carsousel from '@/components/Carsousel'
Vue.component(Carsousel.name,Carsousel)

// 分页器---- 全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

// 引入elementui 的弹窗组件 
import {MessageBox,Button } from 'element-ui'
Vue.component(Button.name,Button)

// elementui 注册组件挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入懒加载图片插件
import VueLazyload from 'vue-lazyload'
// 使用懒加载图片插件 配置对象 默认图片  使用图片和json 文件需要引入
import atm from '@/assets/images/1.png'
Vue.use(VueLazyload,{loading: atm}) 

// 引入表单验证插件
import '@/plugins/validate'


// 提示生成警告 禁用
Vue.config.productionTip = false

// 引入mockServe.js---- mock数据
import '@/mock/mockServe'

// 引入 swiper 轮播图样式
import 'swiper/css/swiper.css'

// 统一引入 api文件夹里面全部请求  包含模块中所有的请求接口
import * as API from '@/api'

new Vue({
  render: h => h(App),
  // 注册路由 :可以简写 key value一致 而且是小写的router
  router:router,
  store:store,
  beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this
    // 给所有的原型身上挂载 api
    Vue.prototype.$API = API
  }
}).$mount('#app')
