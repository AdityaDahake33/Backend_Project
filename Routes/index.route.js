const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');
const FileModel = require('../models/FileModel');
const { v2: cloudinary } = require('cloudinary');
require('../Config/Cloudinary.config');

router.get('/home', auth, async (req, res) => {
    const files = await FileModel.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    res.render('home', { files });
});


router.get('/download/:path', auth, async (req, res) => {
    const loggedInUserId = req.user.id;
    const path = req.params.path;

    const file = await FileModel.findOne({ 
        user: loggedInUserId,
        path: path
    });

    if (!file) return res.status(404).send('File not found');

    // Redirect to Cloudinary URL for download
    res.redirect(file.path);
});

// Delete file route
router.get('/delete/:id', auth, async (req, res) => {
    try {
        const fileId = req.params.id;
        const loggedInUserId = req.user.id;
        
        // Find the file and ensure it belongs to the logged-in user
        const file = await FileModel.findOne({
            _id: fileId,
            user: loggedInUserId
        });
        
        if (!file) return res.status(404).send('File not found');
        
        // Extract the public_id from the Cloudinary URL
        // Cloudinary URLs typically look like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/public_id.jpg
        const urlParts = file.path.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        
        // Delete from database
        await FileModel.deleteOne({ _id: fileId });
        
        res.redirect('/home');
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Error deleting file');
    }
});

module.exports = router;