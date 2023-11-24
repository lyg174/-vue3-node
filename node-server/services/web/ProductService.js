const ProductModel = require('../../models/ProductModels');

const ProductService = {
    getList: async () => {
        return await ProductModel.find();
    }
}

module.exports = ProductService;