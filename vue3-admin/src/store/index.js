import { defineStore } from 'pinia'
import { ref } from 'vue'


// 控制第一次添加路由
const useCountStore = defineStore('count', () => {
    const isGetterRouter = ref(false);

    const change = (value) => {
        isGetterRouter.value = value;
    }

    return {
        isGetterRouter,
        change
    }
})

export default useCountStore