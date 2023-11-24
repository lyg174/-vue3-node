const express = require('express');
const NewsRouter = express.Router();
const NewsController = require('../../controllers/web/NewsController');


NewsRouter.get('/web-api/news/list', NewsController.getList)
NewsRouter.get('/web-api/news/list/:id', NewsController.getList)
NewsRouter.get('/web-api/news/toplist', NewsController.getTopList)


module.exports = NewsRouter;