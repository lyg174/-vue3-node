const NewsService = require("../../services/web/NewsService");

// 定义NewsController对象，用于控制NewsService
const NewsController = {
    // 获取列表
    getList: async (req, res) => {
        // 调用NewsService的getList方法，获取结果
        const result = await NewsService.getList(req.params.id);

        // 返回结果
        res.send({
            ActionType: 'ok',
            data: result
        })
    },
    // 获取置顶列表
    getTopList: async (req, res) => {
        // 调用NewsService的getTopList方法，获取结果
        const result = await NewsService.getTopList(req.query.limit);

        // 返回结果
        res.send({
            ActionType: 'ok',
            data: result
        })
    }
}

// 导出NewsController对象
module.exports = NewsController;