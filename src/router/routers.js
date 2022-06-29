// 引入路由组件  一级路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由组件
// import GroupOrder from '@/pages/Center/GroupOrder'
// import MyOrder from '@/pages/Center/MyOrder'
// const foo = ()=>{
//     console.log(123);
//     return import('@/pages/Home')
// }
// 可以简写  ()=>{import('@/pages/Home')}
export default [   
    {
        // 第一次跳转的地址
        path:'*',
        redirect:'/home'
    },
    {
        
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:'/login',
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:'/register',
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        name:'search',
        path:'/search/:keyWord?',
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        // 函数写法
        // props:($route)=>{
        //     return {keyWord:{$route.}}
        // }
    },
    {
        name:'detail',
        path:'/detail/:skuid?',
        component:()=>import('@/pages/Detail'),
        meta:{show:true},

    },
    {
        name:'addCartSuccess',
        path:'/addCartSuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true},
    },
    {
        name:'shopCart',
        path:'/shopCart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        name:'trade',
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面 必须从 购物车 去
            if(from.path == '/shopCart'){
                next()
            }else if(from.path == '/login'){
                // 从其他的路由组件而来 停留在当前
                next('/shopCart')
            }else{
                next(false)
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    
    },
    {
        name:'paySuccess',
        path:'/paySuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}     
    },
    {
        name:'center',
        path:'/center',
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        children:[
            {
                name:'groupOrder',
                path:'groupOrder',
                component:()=>import('@/pages/Center/GroupOrder'),
            },
            {
                name:'myOrder',
                path:'myOrder',
                component:()=>import('@/pages/Center/MyOrder'),
            },{
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    },

]