const NewsModel = require('../../models/NewsModels');
const fs = require('fs')


const NewsService = {
    add: async ({ author, title, content, category, cover, isPublish, editTime }) => {
        return await NewsModel.create({ author, title, content, category, cover, isPublish, editTime })
    },
    getList: async (id, role, username) => {
        return id ? await NewsModel.find({ _id: id }) : role === 1 ? await NewsModel.find({}) : await NewsModel.find({ author: username })
    },
    publish: async ({ _id, isPublish, editTime }) => {
        return await NewsModel.updateOne({ _id }, { isPublish, editTime });
    },
    deletList: async (_id) => {
        const result = await NewsModel.find({ _id }, ['cover']);
        const coverPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\news-uploads' + result[0].cover.replace('/news-uploads', '')
        fs.unlinkSync(coverPath)// 删除封面

        return await NewsModel.deleteOne({ _id })

    },
    updateList: async ({ title, content, category, cover, isPublish, editTime, _id }) => {
        const result = await NewsModel.find({ _id }, ['cover']);
        if (cover) {//判断是否更新封面封面
            const oldCoverPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\news-uploads' + result[0].cover.replace('/news-uploads', '')
            fs.unlinkSync(oldCoverPath)// 删除旧封面
        }
        return cover ? await NewsModel.updateOne({ _id }, { title, content, category, cover, isPublish, editTime }) : await NewsModel.updateOne({ _id }, { title, content, category, isPublish, editTime })
    }
}

module.exports = NewsService;