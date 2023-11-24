const express = require('express');
const NewsRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/news-uploads' })
const NewsController = require('../../controllers/admin/NewsController');


NewsRouter.post('/admin-api/news/add', upload.single('file'), NewsController.add)
NewsRouter.post('/admin-api/news/list', upload.single('file'), NewsController.updateList)
NewsRouter.get('/admin-api/news/list', NewsController.getList)
NewsRouter.get('/admin-api/news/list/:id', NewsController.getList)
NewsRouter.delete('/admin-api/news/list/:id', NewsController.deletList)
NewsRouter.put('/admin-api/news/publish', NewsController.publish)


module.exports = NewsRouter;