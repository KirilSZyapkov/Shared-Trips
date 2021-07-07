const er = require('../../config/errors');

module.exports = {
    async openDetails(req, res) {
        const id = req.params.id;
        const trip = await req.storage.getTripById(id) || {};
        
        let freeseat;
        if(trip.numSeats === 0){
            freeseat = false;
        } else {
            freeseat = true;
        };
        if (req.user) {
            trip.freeSeats = freeseat;
            trip.isOwner = trip.owner[0]._id.toString() === req.user._id;
            trip.isBooked = trip.buddis.find(c => c._id.toString() === req.user._id);
        }

        const isLog = req.user !== undefined;

        let email;
        if (req.user) {
            email = req.user.email;
        }
        res.render('tripDetails', {
            title: 'Details',
            trip,
            isLog,
            email:  email 
        });
    },

    async deleteTrip(req, res) {
        let trip;
        try {
            const tripId = req.params.id
            trip = await req.storage.getTripById(tripId);
            await req.storage.removeTripById(tripId);
            res.redirect('/trips/sharedTrips');
        } catch (err) {
            const errorList = er(err);
            const isLog = req.user !== undefined;
            let email;
            if (req.user) {
                email = req.user.email;
            }
            res.render('tripDetails', {
                title: 'Details',
                trip,
                errors: errorList.split('\n'),
                isLog,
                email:  email 
            })
        }
    }
}