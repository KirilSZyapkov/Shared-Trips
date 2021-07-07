const Trip = require('../model/Trip');
const User = require('../model/User');

async function init() {
    return (req, res, next) => {
        req.storage = {
            getAllTrips,
            getTripById,
            creatTrip,
            updateTripById,
            bookTrip,
            removeTripById
        }
        next();
    }
};

async function getAllTrips() {
    return Trip.find({}).lean();
};

async function getTripById(id) {
    return Trip.findById(id).populate('buddis').populate('owner').lean();
};

async function creatTrip(body, owner) {
    const start = body.start.trim();
    const end = body.end.trim();
    const date = body.date.trim();
    const time = body.time.trim();
    const imageUrl = body.imageUrl.trim();
    const carBrand = body.carBrand.trim();
    const numSeats = Number(body.numSeats.trim());
    const price = Number(body.price.trim());
    const descriptiont = body.description.trim();

    if (start === '' || end === '' || date === '' || time === '' || imageUrl === '' || carBrand === '' || numSeats === '' || price === '' || descriptiont === '') {
        throw new Error('All fields are required!');
    };

    const trip = new Trip({ owner, start, end, date, time, imageUrl, carBrand, numSeats, price, descriptiont });
    const user = await User.findById(owner);
    
    await trip.save();
    user.historyTrips.push(trip._id);
    await user.save();

};

async function updateTripById(tripId, body, owner) {

    const start = body.start.trim();
    const end = body.end.trim();
    const date = body.date.trim();
    const time = body.time.trim();
    const imageUrl = body.imageUrl.trim();
    const carBrand = body.carBrand.trim();
    const numSeats = Number(body.numSeats.trim());
    const price = Number(body.price.trim());
    const descriptiont = body.description.trim();

    if (start === '' || end === '' || date === '' || time === '' || imageUrl === '' || carBrand === '' || numSeats === '' || price === '' || descriptiont === '') {
        throw new Error('All fields are required!');
    };

    const item = await Trip.findById(tripId);

    await item.updateOne({ owner, start, end, date, time, imageUrl, carBrand, numSeats, price, descriptiont });

};

async function bookTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);

    trip.clients.push(user);
    user.bookdHotels.push(trip);

    await trip.save();
    await user.save();
};

async function removeTripById(tripId) {
    await Trip.findByIdAndDelete(tripId);
};

module.exports = init;