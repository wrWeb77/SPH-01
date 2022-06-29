// 当前这个模块：API进行统一管理
import requests from "./request";

// 三级联动的接口
// /api/product/getBaseCategoryList  get请求 

export const reqCategoryList = ()=>{
    // 发请求：axios发请求返回结果Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 引入 mock 虚假数据
import mockRequests from './mockAjax'
// 使用mock获取banner（Home页面轮播图数据）
export const reqGetBannerList = ()=>{
    return mockRequests.get('/banner')
}

// 获取floor数据
export const reqFloorList = ()=>{
    return mockRequests.get('/floor')
}

// 获取search搜索模块数据  地址/api/list 请求的方式post  需要带参数
// 当前这个接口，给服务器传递参数params，传递的默认参数至少是一个空对象 
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

// 获取detail商品详情模块数据  地址 /api/item/{ skuId }   请求方式 get 需要带参数
export const reqGoodsInfo = (skuId)=>{
    return requests({url:`/item/${skuId}`,method:'get'})
}

//将产品加入购物车中 或更新某一个产品 /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post',})
}

// 获取购物车商品数据  地址/api/cart/cartList 请求方式get 不需要带参数
export const reqGetorUpdateShopCart = ()=>{
    return requests({url:'/cart/cartList',method:'get'})
}

// 删除购物车商品 地址 /api/cart/deleteCart/{skuId}  请求方式 delete
export const reqDeleteCartById =(skuId)=>{
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

//切换商品的状态  地址/api/cart/checkCart/{skuId}/{isChecked} 请求方式 get 需要参数  skuIdD ischecked
export const reqUpdataChechedByid = (skuId,isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

// 获取注册手机号验证码  地址/api/user/passport/sendCode/{phone} 请求方式 get  需要带参数
export const reqGetCode = (phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

// 注册完成 接口 地址 /api/user/passport/register 请求方式 post  参数 phone password code
export const reqUserRegister = (data)=>{
    return requests({url:'/user/passport/register',method:'post',data})
}

// 登录接口 地址 /api/user/passport/login 请求方式 post 参数 phone password
export const reqUserLogin = (data)=>{
    return requests({url:'/user/passport/login',method:'post',data})
}
// 获取用户信息需要带着 用户的token 向服务器要用户信息 地址 /api/user/passport/auth/getUserInfo method: get
export const reqUserInfo = ()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}

// 退出登录 地址 /api/user/passport/logout method:get
export const reqLogout = ()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}

// 获取用户收件地址信息 /api/user/userAddress/auth/findUserAddressList method get
export const reqAddressInfo = ()=>{
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

// 获取订单交易页面信息 /api/order/auth/trade method：get
export const reqOrderInfo = ()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} method：post
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
}

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}  method：get
export const reqpayInfo = (orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

// 获取支付订单状态  /api/payment/weixin/queryPayStatus/{orderId} method：get
export const reqPayStatus = (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

// 获取个人中心的数据  /api/order/auth/{page}/{limit}  method：get
export const reqMyOrderList = (page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}
