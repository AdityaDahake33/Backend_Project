const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    path: String,
    originalname: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);