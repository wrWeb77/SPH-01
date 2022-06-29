import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index'
// home 模块的小仓库
const homeOptions = {
    namespaced: true,
    actions: {
        // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据  
        // async 声明一个函数是异步的  await 用于等待一个异步方法执行完成。
        async categoryList({commit}){
            let result = await reqCategoryList()
            if(result.code === 200){
                commit('CATEGORYLIST',result.data)
            }
        },
        // 获取首页轮播图的数据
        async getBannerList({commit}){
            let result = await reqGetBannerList()
            if(result.code == 200){
                commit('GETBANNERLIST',result.data)
            }
        },
        async getFloorList({commit}){
            let result = await reqFloorList()
            if(result.code == 200){
                commit('GETFLOORLIST',result.data)
            }
        }

    },
    mutations: {
        // 这个是三级菜单的数据
        CATEGORYLIST(state,categoryList){
            state.categoryList = categoryList
        },
        // 这个是banner轮播图的数据
        GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        // 这个是floor组件的数据
        GETFLOORLIST(state,floorList){
            state.floorList = floorList
        }
    },
    state: {
        // state中的数据默认值是根据接口返回的值一样的，返回的数组就写数组，返回的对象就写对象
        categoryList:[],
        bannerList:[],
        floorList:[],
    },
    getters: {}

}
export default homeOptions