// 登录注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken ,getToken,removeToken} from '@/utils/token'
const userOptions = {
    namespaced:true,
    actions:{
        // 获取验证码 把验证码返回 但是 正常情况，后台把验证码发到用户手机上
        async getCode({commit},phone){
            let reslut = await reqGetCode(phone)
            // 实际工作中不需要下一步的
            if(reslut.code == 200){
                commit('GETCODE',reslut.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister({commit},user){
             let reslut = await reqUserRegister(user)
             console.log(reslut);
             if(reslut.code == 200){
                 return 'ok'
             }else{
                 return Promise.reject(new Error('faile'))
             }
        },
        // 用户登录[token]
        async userLogin({commit},user){
            let reslut = await reqUserLogin(user)
            console.log(reslut);
            // 服务器下发发token ,用户的唯一标识符
            // 将来经常带 token 去服务器要信息
            if(reslut.code == 200){
                // 用户已经登录成功且获取到token
                commit('USERLOGIN',reslut.data.token)
                // 持久化存储 token
                setToken(reslut.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error('falie'+reslut.message))
            }
        },
        // 获取用户信息
        async getUserInfo({commit}){
            let reslut = await reqUserInfo()
            if(reslut.code == 200){
                commit('GETUSERINFO',reslut.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
        async userLogout({commit}){
            // 只是向服务器发请求,通知服务器清除token
            let reslut = await reqLogout()
            if(reslut.code == 200){
                commit('CLEARUSER')
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations:{
        // 将验证码存储到 仓库
        GETCODE(state,code){
            state.code = code
        },
        // 
        USERLOGIN(state,token){
            state.token = token

        },
        // 存储用户信息
        GETUSERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        // 清除本地数据
        CLEARUSER(state){
            // 把仓库中相关信息清空
            state.token = ''
            state.userInfo = {}
            // 把本地存储数据清空
            removeToken()
        }
    },
    state:{
        code:'',
        token:getToken(),
        userInfo:{}
    },
    getters:{},
}
export default userOptions