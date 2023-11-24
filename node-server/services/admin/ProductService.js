const ProductModel = require('../../models/ProductModels');
const fs = require('fs')


const ProductService = {
    add: async ({ title, introduction, detail, editTime, cover }) => {
        return await ProductModel.create({ title, introduction, detail, editTime, cover })
    },
    getList: async (_id) => {
        return _id ? await ProductModel.find({ _id }) : await ProductModel.find({})
    },
    deleteList: async (_id) => {
        const result = await ProductModel.find({ _id }, ['cover']);
        const oldCoverPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\product-uploads' + result[0].cover.replace('/product-uploads', '')
        fs.unlinkSync(oldCoverPath)// 删除产品图片


        return await ProductModel.deleteOne({ _id })
    },
    updateList: async ({ _id, title, introduction, detail, editTime, cover }) => {
        const result = await ProductModel.find({ _id }, ['cover']);
        if (cover) {//判断是否更新产品图片
            const oldCoverPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\product-uploads' + result[0].cover.replace('/product-uploads', '')
            fs.unlinkSync(oldCoverPath)// 删除旧图片
        }
        return cover ? await ProductModel.updateOne({ _id }, { title, introduction, detail, cover, editTime }) : await ProductModel.updateOne({ _id }, { title, introduction, detail, editTime })
    }
}


module.exports = ProductService;