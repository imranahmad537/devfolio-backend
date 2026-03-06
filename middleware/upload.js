const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

// ── Image storage ──────────────────────────────────────────────────────────────
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/images');
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});

const imageFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|avif|jfif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext || mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
};

// ── Resume storage ─────────────────────────────────────────────────────────────
const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/resume');
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, 'resume' + path.extname(file.originalname));
    },
});

const resumeFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
};

exports.uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.uploadResume = multer({ storage: resumeStorage, fileFilter: resumeFilter, limits: { fileSize: 10 * 1024 * 1024 } });
