const UserService = require('../../services/admin/UserService');
const JWT = require('../../util/JWT')



const UserController = {
    login: async (req, res) => {
        let result = await UserService.login(req.body);


        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名或密码错误',
            })
        } else {
            const token = JWT.generate({
                id: result[0]._id,
                username: result[0].username
            }, '1d')

            res.header('Authorization', token)
            res.send({
                ActionType: 'ok',
                data: {
                    username: result[0].username,
                    password: result[0].password,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role,
                }
            })
        }
    },
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body;

        const avatar = req.file ? `/avatar-uploads/${req.file.filename}` : '';

        const token = req.headers.authorization;
        const tokenData = JWT.verify(token);

        const data = {
            username,
            introduction,
            gender: Number(gender),
            avatar
        };

        if (!avatar) delete data.avatar;

        await UserService.upload({ _id: tokenData.id, username, introduction, gender: Number(gender), avatar })

        res.send({
            ActionType: 'ok',
            data
        })
    },
    add: async (req, res) => {
        const { username, introduction, gender, password, role } = req.body;

        const avatar = req.file ? `/avatar-uploads/${req.file.filename}` : '';


        const data = {
            username,
            introduction,
            gender,
            avatar,
            password,
            role
        };

        const result = await UserService.add(data);

        if (!result) {
            res.send({
                ActionType: 'no',
            })
            return;
        }

        res.send({
            ActionType: 'ok',
        })

    },
    getList: async (req, res) => {
        const result = await UserService.getList(req.params.id);

        res.send({
            ActionType: 'ok',
            data: result
        })
    },
    delList: async (req, res) => {

        await UserService.delList(req.params.id)

        res.send({
            ActionType: 'ok'
        })
    },
    putList: async (req, res) => {

        const result = await UserService.putList(req.params.id, req.body)

        if (!result) {
            res.send({
                ActionType: 'no',
            })
            return;
        }

        res.send({
            ActionType: 'ok'
        })
    }
}


module.exports = UserController;