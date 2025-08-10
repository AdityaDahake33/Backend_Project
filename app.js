const express = require('express');
const app = express();
const path = require('path');
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
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



// Add root route to redirect to login page
app.get('/', (req, res) => {
    res.redirect('/user/login');
});

app.use('/', indexRoute);
app.use('/user', UserRoute);
app.use('/', uploadRoute);


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).render('error', { 
        message: 'Something went wrong!', 
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Page not found', 
        error: {}
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})