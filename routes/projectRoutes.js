const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, uploadImage.single('bgimg'), create);
router.put('/:id', auth, uploadImage.single('bgimg'), update);
router.delete('/:id', auth, remove);

module.exports = router;
