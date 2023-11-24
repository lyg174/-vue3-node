const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../../controllers/web/ProductController');


ProductRouter.get('/web-api/product/list', ProductController.getList)




module.exports = ProductRouter;