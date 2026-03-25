const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    base64Data: { type: String, required: true },
    fileName: { type: String },
    uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
