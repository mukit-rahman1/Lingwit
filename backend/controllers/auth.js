const UserSchema = require('../model/user');

const register = async(req, res) => {
    const {username, password} = req.body;
    const userCheck = await UserSchema.findOne({ username });
    if (userCheck){
        return res.status(400).json({ msg: 'User with this name exists'});
    }

    const user = await UserSchema.create({ ...req.body });
    const token = user.createJWT();
    res.status(200).json({ user: user.username, userId:user._id, token});
}

const login = async(req, res) => {
    //Obtain username and password
    const {username, password} = req.body;

    //Check if any are missing
    if (!username || !password){
        return res.status(400).json({ msg: "Please enter all fields"});
    }

    //find user from input username
    const user = await UserSchema.findOne({ username });
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
    res.status(200).json({ token, userId:user._id, msg: `Welcome ${username}`});
}


//send data
const sendFrenchIndex = async(req, res) => {
    try {
        const {userId} = req.params;
        const user = await UserSchema.findById(userId);
        
        if (!user){
            return res.status(404).json({error: "user not found"});
        }
        
        res.status(200).json({frenchIndex: user.frenchIndex});
        console.log("send frI 200")
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
}

//update index
const updateFrenchIndex = async(req, res) => {
    try {
        
    const {userId} = req.params;
    const {frenchIndex} = req.body;

    const user = await UserSchema.findById(userId);
    if(!user){
        return res.status(404).json({error: "user not found"});
    }

    user.frenchIndex = frenchIndex;
    await user.save();

    res.status(200).json({msg: "French index saved", frenchIndex})
    console.log("update frI 200")
    } catch (error) {
        console.log("index saving err", error);
        res.status(500).json({error: "Internal server error"});
    };
}


module.exports = {register, login, sendFrenchIndex, updateFrenchIndex};