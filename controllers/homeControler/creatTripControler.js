const er = require('../../config/errors');

module.exports = {
    openCreat(req, res) {
        const isLog = req.user !== undefined;
        let email;
        if (req.user) {
            email = req.user.email;
        }
        res.render('tripCreate', {
            title: 'Creat Trip',
            isLog,
            email: email
        });
    },

    async creatNew(req, res) {
        const creatorId = req.user._id;
        try {
            await req.storage.creatTrip(req.body, creatorId);
            res.redirect('/trips/sharedTrips');
        } catch (err) {
            
            const errorList = er(err);
            const data = req.body
            const isLog = req.user !== undefined;
            let email;
            if (req.user) {
                email = req.user.email;
            }
            res.render('tripCreate', {
                title: 'Creat Trip',
                data,
                errors: errorList.split('\n'),
                isLog,
                email: email
            })
        }

    }
}