const er = require('../../config/errors');

module.exports = {
    async openRegister(req, res) {
        
        res.render('register',{
            title: 'Register',
        });
    },

    async newRegister(req, res) {
               
        try {
            await req.auth.register(req.body);
            res.redirect('/trips');
        } catch (err) {
            const errorList = er(err);
            
            const data = req.body;
            res.render('register', {
                title: 'Register',
                errors: errorList.split('\n'),
                data
            })
        }
    }
}