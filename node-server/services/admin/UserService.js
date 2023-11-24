const UserModel = require('../../models/UserModels');
const fs = require('fs');


const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {

            const result = await UserModel.find({ _id });
            const oldAvatar = result[0].avatar;

            if (oldAvatar) {// 删除旧头像
                const oldAvatarPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\avatar-uploads' + oldAvatar.replace('/avatar-uploads', '')
                fs.unlinkSync(oldAvatarPath)
            }

            return UserModel.updateOne({ _id }, { username, introduction, gender, avatar });
        } else {
            return UserModel.updateOne({ _id }, { username, introduction, gender });
        }

    },
    add: async ({ username, password, introduction, gender, avatar, role }) => {
        const result = await UserModel.find({ username });

        if (result.length) {// 检测是否有重复用户名
            return false;
        }

        return UserModel.create({ username, password, introduction, gender, avatar, role });
    },
    getList: async (_id) => {
        return _id ? UserModel.find({ _id }, ['username', 'role', 'avatar', 'introduction', 'gender', 'password']) : UserModel.find({}, ['username', 'role', 'avatar', 'introduction', 'gender']);
    },
    delList: async (_id) => {

        const result = await UserModel.find({ _id });
        const oldAvatar = result[0].avatar;

        if (oldAvatar) {// 删除旧头像
            const oldAvatarPath = 'C:\\Users\\Luo\\Desktop\\myapp-vue3+node\\node-server\\public\\avatar-uploads' + oldAvatar.replace('/avatar-uploads', '')
            fs.unlinkSync(oldAvatarPath)
        }

        return UserModel.deleteOne({ _id });
    },
    putList: async (_id, newData) => {
        const oldUsername = await UserModel.find({ _id }, ['username']);

        await UserModel.updateOne({ _id }, newData);

        const result = await UserModel.find({ username: newData.username });//检测是否有重复用户名

        if (result.length > 1) {
            await UserModel.updateOne({ _id }, { username: oldUsername[0].username });
            return false;
        }

        return true;
    }
}


module.exports = UserService;