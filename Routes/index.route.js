const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');
const FileModel = require('../models/FileModel');

router.get('/home', auth, async (req, res) => {
    const files = await FileModel.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    res.render('home', { files });
});

module.exports = router;