const express = require('express');
const app = express();
const UserRoute = require('./Routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./Config/DB');
connectDB();


//Middleware
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/user', UserRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})