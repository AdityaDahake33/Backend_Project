const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const { v2: cloudinary } = require('cloudinary');
const auth = require('../middlewares/Auth');
const FileModel = require('../models/FileModel');
require('../Config/Cloudinary.config');

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
router.post('/upload', auth, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                // Save file info to MongoDB
                await FileModel.create({
                    path: result.secure_url,
                    originalname: req.file.originalname,
                    user: req.user.id
                });

                res.redirect('/home');
            }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;