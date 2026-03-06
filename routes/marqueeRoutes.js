const router = require('express').Router();
const { get, update } = require('../controllers/marqueeController');
const auth = require('../middleware/auth');

router.get('/', get);
router.put('/', auth, update);

module.exports = router;
