const NewsService = require("../../services/admin/NewsService");



const NewsController = {
    add: async (req, res) => {
        const { author, title, content, category, isPublish, _id } = req.body;
        const cover = req.file ? `/news-uploads/${req.file.filename}` : ''

        await NewsService.add({
            author,
            title,
            content,
            cover,
            category: Number(category),
            isPublish: Number(isPublish),
            editTime: new Date(),
        });

        res.send({
            ActionType: 'ok'
        })
    },
    getList: async (req, res) => {
        const {role, username} = req.query;
        const result = await NewsService.getList(req.params.id, Number(role), username);
        console.log(role, username);
        console.log(req.query);

        res.send({
            ActionType: 'ok',
            data: result
        })
    },
    publish: async (req, res) => {

        await NewsService.publish({
            ...req.body,
            editTime: new Date()
        });

        res.send({
            ActionType: 'ok'
        })
    },
    deletList: async (req, res) => {
        const _id = req.params.id;

        await NewsService.deletList(_id);

        res.send({
            ActionType: 'ok'
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/news-uploads/${req.file.filename}` : ''

        await NewsService.updateList({
            ...req.body,
            cover,
            editTime: new Date(),
        });

        res.send({
            ActionType: 'ok'
        })
    }
}

module.exports = NewsController;