const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const connectDB = require('./db/connect');
const UserSchema = require('./model/user');
const cors = require('cors');


//cors
const corsFunction = {
    origin:"https://lingwit-frontend.onrender.com",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeader: ["Content-Type","Authorization"],
    credentials: true
};
app.use(cors(corsFunction));
app.options('*', cors(corsFunction));

//import routes
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');


app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/api/user', authMiddleware, async(req, res) => {
    try {
        const user = await UserSchema.findById(req.payload.userId);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({
            userId: user._id,
            username: user.username,
            frenchIndex: user.frenchIndex
        })
    } catch (error) {
        res.status(500).json({error: error, msg: "err fetching user data"});
    }
})

//french word list
app.get('/api/french', (req, res) => {
    try {
        const frenchData = require(path.join(__dirname, 'data', 'french.js'));
        if (!Array.isArray(frenchData)) {
            return res.status(500).json({ error: "Invalid data format", words: frenchData });
        }
        res.json(frenchData);
    } catch (error) {
        console.error("error loading words:", error);
        res.status(500).json({ error: "Error loading words" });
    }
})

const port = process.env.PORT || 3000;
//Connect to DB and Start
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server running on port ${port} and`, "\x1b[32mconnected to DB\x1b[0m");
        });
    } catch (error) {
        console.log(error);
    }
}
start();