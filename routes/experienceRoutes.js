const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/experienceController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/', getAll);
router.post('/', auth, uploadImage.single('logo'), create);
router.put('/:id', auth, uploadImage.single('logo'), update);
router.delete('/:id', auth, remove);

module.exports = router;
