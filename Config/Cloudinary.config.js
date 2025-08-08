const Cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// Check if Cloudinary environment variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary environment variables are not properly set");
    console.error("Please ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in your environment variables.");
}

try {
    Cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
    console.log("Cloudinary configured successfully");
} catch (error) {
    console.error("Error configuring Cloudinary:", error.message);
}