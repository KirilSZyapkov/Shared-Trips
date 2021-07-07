const router = require('express').Router();
const { isGuest, isOwner, isNotOwner } = require('../../middleWares/guards');

const homePage = require('./homePageControler');
const { creatNew, openCreat } = require('./creatTripControler');
const { openDetails, deleteTrip } = require('./detailsTripControler');
const { openEdit, editTrip } = require('./editTripControler');
const sharedTrips = require('./sharedTrips');
const joinTripControler = require('./joinTripControler');

router.get('/', homePage);
router.get('/sharedTrips', sharedTrips);
router.get('/createTrip', isGuest(), openCreat);
router.get('/details/:id', openDetails);
router.get('/details/delete/:id', isGuest(), isOwner(), deleteTrip);
router.get('/details/edit/:id', isGuest(), isOwner(), openEdit);
router.get('/details/join/:id', isGuest(), isNotOwner(), joinTripControler);

router.post('/createTrip', isGuest(), creatNew);
router.post('/details/edit/:id', isGuest(), isOwner(), editTrip);

module.exports = router;