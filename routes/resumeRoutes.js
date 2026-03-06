const router = require('express').Router();
const { getMeta, download, upload } = require('../controllers/resumeController');
const auth = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');

router.get('/', getMeta);
router.get('/download', download);
router.post('/upload', auth, uploadResume.single('resume'), upload);

module.exports = router;