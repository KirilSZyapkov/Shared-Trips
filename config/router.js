const router = require('express').Router();

const productControler = require('../controllers/homeControler/productControler');
const authControler = require('../controllers/authControler/authControler');
const userControler = require('../controllers/userControler/userControler');

router.get('/', (req, res) => {
    res.redirect('/trips')
})

router.use('/trips', productControler);
router.use('/auth', authControler);
router.use('/user', userControler);

router.get('*', (req, res) => {
    const isLog = req.user !== undefined;
    let email;
    if (req.user) {
        email = req.user.email;
    }
    res.render('404',{
        title: '404 Not Fund!',
        email: email,
        isLog
    });
})


module.exports = router;