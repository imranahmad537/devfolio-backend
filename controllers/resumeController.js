const path = require('path');
const fs = require('fs');
const Resume = require('../models/resumeModel');

// GET /api/resume  – returns metadata
exports.getMeta = async (req, res, next) => {
    try {
        const doc = await Resume.findOne().sort({ uploadedAt: -1 });
        res.json({ success: true, data: doc || null });
    } catch (err) { next(err); }
};

// GET /api/resume/download  – streams the file
exports.download = async (req, res, next) => {
    try {
        const doc = await Resume.findOne().sort({ uploadedAt: -1 });
        if (!doc) return res.status(404).json({ success: false, message: 'No resume found' });
        const filePath = path.join(__dirname, '..', doc.filePath);
        if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: 'File not found on disk' });
        res.download(filePath, doc.fileName || 'resume.pdf');
    } catch (err) { next(err); }
};

// POST /api/resume/upload  (auth)
exports.upload = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
        const doc = await Resume.create({
            filePath: `uploads/resume/${req.file.filename}`,
            fileName: req.file.originalname,
        });
        res.status(201).json({ success: true, data: doc });
    } catch (err) { next(err); }
};
