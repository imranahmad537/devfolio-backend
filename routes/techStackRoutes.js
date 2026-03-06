const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/techStackController');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
