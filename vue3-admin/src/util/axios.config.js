import axios from 'axios'


//拦截器
axios.interceptors.request.use(config => {// 请求拦截

    const token = sessionStorage.getItem('token');
    config.headers.authorization = token;


    return config
}, error => {



    return Promise.reject(error)
})

axios.interceptors.response.use(response => {// 响应拦截


    const { authorization } = response.headers;
    // authorization && localStorage.setItem('token', authorization);
    authorization && sessionStorage.setItem('token', authorization);



    return response
}, error => {
    console.log(error.response.status);
    if (error.response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '#/login';
    }
    

    return Promise.reject(error)
})
