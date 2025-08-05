const express = require('express');
const app = express();
const UserRoute = require('./Routes/user.routes');


app.set('view engine','ejs');

app.use('/user', UserRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})