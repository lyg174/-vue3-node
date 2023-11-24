import axios from "axios";

// 表单数据上传
const upload = (path, userForm) => {
    const params = new FormData();
    for (let i in userForm) {
        params.append(i, userForm[i])
    }

    return axios.post(path, params).then(res => res.data)
}

export default upload;