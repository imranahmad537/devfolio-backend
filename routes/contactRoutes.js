const router = require('express').Router();
const { get, update, submitContact, getMessages, deleteMessage, updateMessageStatus } = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.get('/', get);
router.put('/', auth, update);

router.post('/', submitContact);
router.get('/messages', auth, getMessages);
router.put('/messages/:id', auth, updateMessageStatus);
router.delete('/messages/:id', auth, deleteMessage);

module.exports = router;
