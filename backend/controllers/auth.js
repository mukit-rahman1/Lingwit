const UserSchema = require('../model/user');

const register = async(req, res) => {
    const user = await UserSchema.create({ ...req.body });
    const token = user.createJWT();
    res.status(200).json({ user: user.username, token});
}

const login = async(req, res) => {
    //Obtain username and password
    const {username, password} = req.body;

    //Check if any are missing
    if (!username || !password){
        return res.status(400).json({ msg: "Please enter all fields"});
    }

    //find user from input username
    const user = UserSchema.findOne({ username });
    if(!user) {
        return res.status(400).json({ msg: "User not found"});
    }

    //Compare password
    const isCorrect = await user.comparePassword(password);
    if(!isCorrect){
       return res.status(400).json({ msg: "Incorrect password"});
    }
    
    //Create JWT
    const token = user.createJWT();
    res.status(200).json({ token, msg: `Welcome ${username}`});
}



module.exports = {register, login};