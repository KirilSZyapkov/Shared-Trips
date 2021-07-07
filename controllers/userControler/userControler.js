const router = require('express').Router();
const User = require('../../model/User');

router.get('/profile', async (req, res) => {
    const isLog = req.user !== undefined;
    const user = await User.findById(req.user._id).populate('historyTrips').lean();

    const male = user.gender === 'male';

    res.render('profile',{
        title: 'Profile',
        isLog,
        email: user.email,
        user,
        male
    });
})

module.exports = router;