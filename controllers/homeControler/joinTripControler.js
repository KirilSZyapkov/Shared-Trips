const Trip = require('../../model/Trip');

module.exports = async (req, res) => {
    const tripId = req.params.id;
    const userId = req.user._id;

    const trip = await Trip.findById(tripId);
    trip.buddis.push(userId);

    if(trip.numSeats > 0){
        trip.numSeats--;
    }

    await trip.save();

    res.redirect('/trips/details/' + tripId);

}