import { reqGetSearchInfo } from "@/api"
// search 模块的小仓库
const searchOptions = {
    namespaced:true,
    actions:{
        // 获取search 搜索模块的数据，
        async getSearchList({commit},params){
            // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
            // params形参，是当用户派发actions 的时候，第二个参数传递过来，至少是一个空对象
           let result = await reqGetSearchInfo(params)
           if(result.code == 200){
               commit('GETSEARCHLIST',result.data)
           }
        }
    },
    mutations:{
        GETSEARCHLIST(state,SearchList){
            state.SearchList = SearchList
        }
    },
    state:{
        SearchList:{},
    },
    // 计算属性，在项目当中是为了简化仓库中的数据
    // 可以把我们将来在组件当中需要的数据简化一下【将来组件在获取数据的时候就方便了】
    getters:{
        // 简化searchList中的数据
        // 形参state，当前仓库中的state，并非大仓库中的那个state
        goodsList(state){
            // 这样书写有问题  因为数据有两种状态 一种有 空对象 一种由goodsList这个属性
            return state.SearchList.goodsList || {}
        },
        trademarkList(state){
            return state.SearchList.trademarkList || {}
        },
        attrsList(state){
            return state.SearchList.attrsList || {}
        }
    }
}
export default searchOptions