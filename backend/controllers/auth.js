const UserSchema = require('../model/user');

const register = async(req, res) => {
    const user = await UserSchema.create({ ...req.body });
    const token = user.createJWT();
    res.status(200).json({ user: user.username, token});
}

const login = async(req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        res.status()
    }
}



module.exports = {register, login};