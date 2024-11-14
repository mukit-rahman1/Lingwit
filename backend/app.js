const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const connectDB = require('./db/connect');

//import routes
const authRouter = require('./routes/auth');

app.use('/', authRouter);

//french word list
app.get('/api/french', (req, res) => {
    const frenchData = require(path.join(__dirname, 'data', 'french.js'));
    res.json(frenchData); 
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

const port = 3000;
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