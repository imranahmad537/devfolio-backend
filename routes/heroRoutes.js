const router = require('express').Router();
const { getHero, updateHero } = require('../controllers/heroController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/', getHero);
router.put('/', auth, uploadImage.single('profileImage'), updateHero);

module.exports = router;
