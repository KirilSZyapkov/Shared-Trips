const router = require('express').Router();
const { isUser } = require('../../middleWares/guards');

const { openLogin, loginUser } = require('./loginControler');
const { openRegister, newRegister } = require('./registerControler');
const logoutControler = require('./logoutControler');

router.get('/login', isUser(), openLogin);
router.get('/register', isUser(), openRegister);
router.get('/logout', logoutControler);

router.post('/register', isUser(), newRegister);
router.post('/login', isUser(), loginUser);

module.exports = router;