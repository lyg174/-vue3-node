import { defineStore } from 'pinia'
import { ref } from 'vue'

// 存储用户信息
const useInfoStore = defineStore('userInfo', () => {

    const userInfo = ref({})

    const changeUserInfo = (value) => {
        for (let key in value) userInfo.value[key] = value[key]
    }

    const clearUserInfo = () => {
        userInfo.value = {};
    }

    return {
        userInfo,
        changeUserInfo,
        clearUserInfo,
    }
},
    {
        persist: {
            enable: true,
            storage: sessionStorage
        }
    }
)

export default useInfoStore