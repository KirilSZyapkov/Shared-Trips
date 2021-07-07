const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const regexMail = /^[a-zA-Z0-9]*@[a-z]*\.[a-z]{2,3}$/g;

async function initAuth() {
    return (req, res, next) => {
        req.auth = {
            login,
            register,
            logout
        }
        if (readToken(req)) {
            next();
        }

        async function login(data) {
            const mail = data.email.trim();


            if (mail === '' || data.password.trim() === '') {
                throw new Error('All fields are required!');
            }

            const uSer =  await User.findOne({email: mail}).lean() || {};

            
            if (uSer.email === mail) {
                const itMatch = await bcrypt.compare(data.password.trim(), uSer.hashPassword);
                if (itMatch) {
                    req.user = creatToken(uSer);
                } else {
                    throw new Error('Wrong user name or password!');
                }
            } else {
                throw new Error('Wrong user name or password!');
            }
        };

        async function register(body) {

            const email = body.email.trim();
            const gender = body.male || body.femail;
            const hasMail = await User.findOne({ email: email }).lean();



            if (req.body.email.trim() === '' || req.body.rePass.trim() === '' || req.body.password.trim() === '' || gender === undefined) {
                throw new Error('All fields are required!');
            };
            if (req.body.password.trim().length < 4) {
                throw new Error('The password should be at least 4 characters long!');
            };
            if (req.body.password.trim() !== req.body.rePass.trim()) {
                throw new Error('Passwords do not match!');
            };
            if (hasMail || !body.email.match(regexMail)) {
                throw new Error('Invalid email!');
            };

            const hashPassword = await bcrypt.hash(body.password.trim(), 10);

            const user = new User({
                email: req.body.email,
                hashPassword: hashPassword,
                gender
            });
            await user.save();
            req.user = creatToken(user);

        };

        async function logout() {
            res.clearCookie('Trip_Cookie');
        };

        function creatToken(user) {
            const viewToken = {
                _id: user._id,
                gender: user.userName,
                email: user.email
            };
            const token = jwt.sign(viewToken, 'trip');
            res.cookie('Trip_Cookie', token, { hhtpOnly: true });

            return viewToken;
        };

        function readToken(req) {
            const token = req.cookies['Trip_Cookie'];

            if (token) {
                try {
                    const data = jwt.verify(token, 'trip');
                    req.user = data;

                } catch (err) {
                    res.clearCookie('Trip_Cookie');
                    res.redirect('/auth/login');
                    return false
                }
            }
            return true
        };
    };
};


module.exports = initAuth;