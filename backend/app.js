const express = require("express");
const app = express();

//import routes
const authRouter = require('./routes/auth');

app.use('/', authRouter);


//Start port
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
