const er = require('../../config/errors');

module.exports = {
    async openLogin(req, res) {
        res.render('login', {
            title: 'Login'
        });
    },

    async loginUser(req, res) {
        
        try {
            await req.auth.login(req.body);
            res.redirect('/trips');
        } catch (err) {
            const errorList = er(err);
           
            res.render('login', {
                errors: errorList.split('\n'),
                
            })

        }

    }
}