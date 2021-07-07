const er = require('../../config/errors');

module.exports = {
    async openEdit(req, res) {
        const id = req.params.id;
        const data = await req.storage.getTripById(id);
        const isLog = req.user !== undefined;
        let email;
        if (req.user) {
            email = req.user.email;
        }
        res.render('tripEdit', {
            title: 'Edit Trip',
            data,
            isLog,
            email: email
        });
    },
    async editTrip(req, res) {
        const id = req.params.id;
        let creatorId = req.user._id;
        try {
            await req.storage.updateTripById(id, req.body, creatorId);
            res.redirect('/trips/details/' + id);
        } catch (err) {
            const errorList = er(err);
            const data = req.body;
            data._id = id;
            const isLog = req.user !== undefined;
            let email;
            if (req.user) {
                email = req.user.email;
            }
            res.render('tripEdit', {
                title: 'Edit Trip',
                data,
                errors: errorList.split('\n'),
                isLog,
                email: email

            })
        }
    }
}