import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块--->生成一个随机数字（不能在变了）
import {getUUID} from '@/utils/uuid_token'
const detailOptions = {
    namespaced:true,
    actions:{
        // 获取产品信息
        async getGoodInfo({commit},skuId){
            let result = await reqGoodsInfo(skuId)
            if(result.code == 200){
                commit('GETGOODINFO',result.data)
            }
        },
        // 将产品添加到购物车中
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只返回code == 200，代表操作成功
        // 因为服务器没有返回其余数，因此不需要三连环
        async addOrUpdateShirCart({commit},{skuId,skuNum}){
            let result = await reqAddOrUpdateShopCart(skuId,skuNum)
            // 当前这个函数如果执行返回的是 promise 要么成功要么失败
            // promise.reject 表示 失败  
            if(result.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('false'))
            }
        }
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo = goodInfo
        }
    },
    state:{
        goodInfo:{},
        // 调用封装的uuid 获取临时身份
        uuid_token:getUUID()
    },
    getters:{
        // 当前计算出来的属性值 至少是一个空对象  不会报错 
        // 为什么会出现这个 是应该 这个是计算得到了 在没计算之前是 undefined 没有 但页面里面写的有所有会报错
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        // 简化产品信息
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        // 简化产品售卖属性的
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        },
    },
}
export default detailOptions