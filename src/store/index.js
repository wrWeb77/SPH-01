import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)

// 引入小仓库
import homeOptions from '@/store/home/index'
import searchOptions from '@/store/search/index'
import detailOptions from '@/store/detail'
import shopcartOptions from '@/store/shopcart'
import userOptions from '@/store/user'
import tradeOptions from '@/store/trade'
// 创建store并向外暴露
export default new Vuex.Store({
    modules:{
        // 实现vuex仓库模块式开发储存数据
        homeOptions,
        searchOptions,
        detailOptions,
        shopcartOptions,
        userOptions,
        tradeOptions,
    }
})