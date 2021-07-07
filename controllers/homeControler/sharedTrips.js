module.exports = async (req, res) => {

    const trips = await req.storage.getAllTrips();
    
    let email;
    if (req.user) {
        email = req.user.email;
    }
    const isLog = req.user !== undefined;
    
    res.render('sharedTrips', {
        title: 'Shared Trips',
        trips,
        isLog,
        email: email
    })

}