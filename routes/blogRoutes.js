const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/blogController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, uploadImage.single('image'), create);
router.put('/:id', auth, uploadImage.single('image'), update);
router.delete('/:id', auth, remove);

module.exports = router;
