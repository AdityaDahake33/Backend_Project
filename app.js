const express = require('express');
const app = express();
const UserRoute = require('./Routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./Config/DB');
connectDB();
const cookieParser = require('cookie-parser');
const indexRoute = require('./Routes/index.route');
const uploadRoute = require('./Routes/upload.route');



//Middleware
app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use('/', indexRoute);
app.use('/user', UserRoute);
app.use('/', uploadRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})