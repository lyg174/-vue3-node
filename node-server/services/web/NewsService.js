const NewsModel = require('../../models/NewsModels');

// 定义新闻服务
const NewsService = {
    // 获取新闻列表
    getList: async (_id) => {
        // 如果传入_id，则根据_id查询，并且按照编辑时间倒序排序
        return _id ? await NewsModel.find({ isPublish: '1', _id }).sort({ editTime: -1 }) : await NewsModel.find({ isPublish: '1' }).sort({ editTime: -1 });
    },
    // 获取置顶新闻列表
    getTopList: async (limit) => {
        // 返回查询到的新闻列表，并且按照编辑时间倒序排序，只取前limit条数据
        return await NewsModel.find({ isPublish: '1' }).sort({ editTime: -1 }).limit(limit);
    }
}

module.exports = NewsService;