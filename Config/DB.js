const Mongoose = require('mongoose');

function connectDB(){
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI environment variable is not set");
        process.exit(1);
    }
    
    Mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        console.error("Please check your MONGO_URI environment variable and ensure it's a valid MongoDB Atlas connection string for production deployment.");
        console.error("See MONGODB_ATLAS_SETUP.md for setup instructions.");
    });
}

module.exports = connectDB;