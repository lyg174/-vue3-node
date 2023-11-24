const express = require('express');
// 图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/avatar-uploads/' })

const UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController')

UserRouter.post('/admin-api/user/login', UserController.login)
UserRouter.post('/admin-api/user/upload', upload.single('file'), UserController.upload)
//用户数据增删改查
UserRouter.post('/admin-api/user/add', upload.single('file'), UserController.add)
UserRouter.get('/admin-api/user/list', UserController.getList)
UserRouter.get('/admin-api/user/list/:id', UserController.getList)//获取单一数据
UserRouter.delete('/admin-api/user/list/:id', UserController.delList)
UserRouter.put('/admin-api/user/list/:id', UserController.putList)



module.exports = UserRouter;