const Trip = require('../model/Trip');

function isGuest() {
    return (req, res, next) => {
        if (req.user === undefined) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    };
};

function isUser() {
    return (req, res, next) => {
        if (req.user !== undefined) {
            res.redirect('/trips');
        } else {
            next();
        }
    };
};

 function isOwner() {
    return async (req, res, next) => {
        if (req.user !== undefined) {
            
            const trip = await Trip.findById(req.params.id).lean();
            if (trip.owner[0]._id.toString() === req.user._id) {

                next();
            } else {
                res.redirect('/trips');
            }

        } else {
            res.redirect('/trips');
        }
    };
};

function isNotOwner() {
    return async (req, res, next) => {
        if (req.user !== undefined) {
            
            const trip = await Trip.findById(req.params.id).lean();
            if (trip.owner[0]._id.toString() === req.user._id) {

                res.redirect('/trips');
            } else {
                next();
            }

        } else {
            res.redirect('/trips');
        }
    };
};

module.exports = {
    isGuest,
    isUser,
    isOwner,
    isNotOwner
}