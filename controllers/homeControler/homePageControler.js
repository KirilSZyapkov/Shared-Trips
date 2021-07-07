module.exports = (req, res) => {
    const isLog = req.user !== undefined;
    let email;
    if (req.user) {
        email = req.user.email;
    }
    res.render('home',{
        title: 'Home Page',
        isLog,
        email: email
    });
}