import {reqAddressInfo,reqOrderInfo} from '@/api'
const tradeOptions ={
    namespaced:true,
    actions:{
        // 获取用户地址信息
        async getUserAdddress({commit}){
            let reslut = await reqAddressInfo()
            if(reslut.code == 200){
                commit('GETUSERADDRESS',reslut.data)
            }
        },
        // 获取订单详情信息 
        async getOrderInfo({commit}){
            let reslut = await reqOrderInfo()
            if(reslut.code == 200){
                commit('GETORDERINFO',reslut.data)
            }
        }
    },
    mutations:{
        // 将获取到的地址信息存储到 仓库
        GETUSERADDRESS(state,addressInfo){
            state.addressInfo = addressInfo
        },
        // 将获取到的订单详情信息储存到 仓库
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    },
    state:{
        addressInfo:[],
        orderInfo:{}
    },
    getters:{}
}
export default tradeOptions