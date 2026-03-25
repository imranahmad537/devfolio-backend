const multer = require('multer');
const path = require('path');

// ── Image storage ──────────────────────────────────────────────────────────────
const imageStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|avif|jfif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext || mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
};

// ── Resume storage ─────────────────────────────────────────────────────────────
const resumeStorage = multer.memoryStorage();

const resumeFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
};

exports.uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.uploadResume = multer({ storage: resumeStorage, fileFilter: resumeFilter, limits: { fileSize: 10 * 1024 * 1024 } });
