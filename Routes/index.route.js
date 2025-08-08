const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');
const FileModel = require('../models/FileModel');

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

module.exports = router;