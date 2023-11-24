const express = require('express');
const ProductRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/product-uploads' })
const ProductController = require('../../controllers/admin/ProductController');

ProductRouter.post('/admin-api/product/add', upload.single('file'), ProductController.add)
ProductRouter.get('/admin-api/product/list/:id', ProductController.getList)
ProductRouter.get('/admin-api/product/list', ProductController.getList)
ProductRouter.post('/admin-api/product/list', upload.single('file'), ProductController.updateList)
ProductRouter.delete('/admin-api/product/list/:id', ProductController.deleteList)



module.exports = ProductRouter;