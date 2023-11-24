const ProductService = require("../../services/admin/ProductService");

const ProductController = {
    add: async (req, res) => {
        const cover = req.file ? `/product-uploads/${req.file.filename}` : ''

        await ProductService.add({
            ...req.body,
            cover,
            editTime: new Date(),
        });

        res.send({
            ActionType: 'ok'
        })
    },
    getList: async (req, res) => {
        const result = await ProductService.getList(req.params.id);

        res.send({
            ActionType: 'ok',
            data: result
        })
    },
    deleteList: async (req, res) => {
        await ProductService.deleteList(req.params.id);

        res.send({
            ActionType: 'ok'
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/product-uploads/${req.file.filename}` : ''

        await ProductService.updateList({
            ...req.body,
            cover,
            editTime: new Date(),
        });

        res.send({
            ActionType: 'ok'
        })

    }
}


module.exports = ProductController;