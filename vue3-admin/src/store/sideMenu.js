import { defineStore } from 'pinia'
import { ref } from 'vue'

// 控制侧边栏菜单折叠
const useMenuStore = defineStore('menu', () => {


    const isCollapse = ref(false);

    const change = () => {
        isCollapse.value = !isCollapse.value;
    }

    return {
        isCollapse,
        change
    }
},
    {
        persist: true//开启持久化
    }
)

export default useMenuStore