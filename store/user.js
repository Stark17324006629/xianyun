// // 用户管理
// export const state=()=>({
//     // 采用接口返回的数据结构
//     userInfo:{
//         token:'',
//         user:{},
//     }
// })
// export const mutations={
//     // 保存用户信息到state中
//     setUserInfo(state,data){
//         state.userInfo=data;
//     },
//     // 退出登录，清除用户数据
//     cleanUserInfo(state,data){
//         if(process.brower){
//             localStorage.removeItem('setUserInfo')
//         }
//         state.userInfo={};
//     }

// }

// // export const actions={
// //     // 登录
// //     login({commit},data){
// //         return this.$axios({
// //             url:'/accounts/login',
// //             method:'POST',
// //             data:data
// //         }).then(res=>{
// //             const data=res.data;
// //             // 保存在state
// //             commit('setUserInfo',data)
// //             return data
// //         })
// //     }
// // }

// export const actions = {
//     // 登录
//     login({commit}, data){
//         return this.$axios({
//             url: "/accounts/login",
//             method: "POST",
//             data: data
//         }).then(res => {
//             const data = res.data;
//             // 保存到state
//             commit("setUserInfo", data);
//             console.log(data)
//             return data;
//         })
//     }
// };






// 用户管理 
export const state=()=>({
    // 采用接口的返回的数据结构
    userInfo:{
        token:'',
        user:{}
    }
})

export const mutations={
    // 保存用户信息到state中
    setUserInfo(state,data){
        console.log(data)
        state.userInfo=data
    },
    // 清除用户数据
    cleanUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }

}

export const actions={

    // 登录
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res=>{
            // 保存到state中
            commit('setUserInfo',res.data)
            Promise.resolve()
        })
    },
    
    
}