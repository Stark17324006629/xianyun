import createPersistedState from 'vuex-persistedstate'
// 用户的数据存在store，缓存中，一旦刷新了数据就会丢失，所以
// 我们可以将数据存储在本地中，这样数据就能存储下来了
export default ({store})=>{
    window.onNuxtReady(()=>{
        createPersistedState({
            // 读取本地存储的数据到store
            key:'store',

        })(store)
    })
}