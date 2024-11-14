const user = require("../model/user");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")){//Check header
        return res.status(400).json({msg : "not logged in" });
    }

    const token = authHeader.split(' ')[1];//extract token

    try {
        const payload = jwt.verify(token, process.env.jwt_top_secret);//Verify token and load it
        req.payload = {userId: payload.userId, username: payload.username};
        next();
    } catch (error) {
        return res.status(400).json({msg : "not logged in" });
    }
}

module.exports = authMiddleware;