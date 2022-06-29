import {reqGetorUpdateShopCart,reqDeleteCartById,reqUpdataChechedByid} from '@/api'

const shopcartOptions = {
    namespaced:true,
    actions:{
        // 获取购物车列表数据
        async getCartList({commit}){
            let reslut = await reqGetorUpdateShopCart()
            if(reslut.code == 200){
                commit('GETCARTLIST',reslut.data)
            }
        },
        // 删除购物车某一个产品的操作
        async deleteCartListBySkuId({commit},skuId){
            let reslut = await reqDeleteCartById(skuId)
            if(reslut.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('false'))
            }
        },
        // 切换商品的状态
        async UpdateChechedByid({commit},{skuId,isChecked}){
            let reslut = await reqUpdataChechedByid(skuId,isChecked)
            if(reslut.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('flase'))
            }
        },
        // 删除全部勾选的状态的产品
        deleteAllCheckedCart({dispatch,getters}){
            // context：小仓库 commit【提交mutations修改state】 getters【计算属性】 
            // 获取购物车中全部产品（是一个数组）
            let PromiseAll = []
            getters.cartLIst.cartInfoList.forEach((item)=>{
                let promise = item.isChecked == 1? dispatch('deleteCartListBySkuId',item.skuId):''
                // 将每一次返回的promise添加到数组当中
                PromiseAll.push(promise)
            })
            // 只要全部的 都成功返回的结果为成功  如果有一个失败返回的就是一个失败的结果
            return Promise.all(PromiseAll)
        },
        // 修改全部产品状态全选
        updateAllCartChecked({dispatch,state},isChecked){
            // 数组
            let promiseAll = []
            state.cartLIst[0].cartInfoList.forEach((item)=>{
                let promise = dispatch('UpdateChechedByid',{skuId:item.skuId,isChecked:isChecked})
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    mutations:{
        GETCARTLIST(state,cartLIst){
            state.cartLIst = cartLIst
        }
    },
    state:{
        cartLIst:[]
    },
    getters:{
        cartLIst(state){
            return state.cartLIst[0] || {}
         },
    },
}
export default shopcartOptions