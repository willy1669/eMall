const User = require('../models/User');
const Joi = require('joi');
const passwordHash = require('password-hash');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = require('../configs/Secret');
const service = require('../services/UserServices');

const schema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email()
}); 

exports.addUser = function(req, res){
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
Joi.validate({username:data.username, email:data.email, password:data.password}, schema, function (err) {
        if (err){
            return res.json ({err:err.message});
        } 
        else {
            const hashPassword = passwordHash.generate(data.password);
            data.password = hashPassword;
            console.log(data.password);
            try {
                return service.addUser(req, res, data);
            }
            catch (exception){
                console.log("Error: " +exception);
            }
        }
    });
}

function isValidPassword(user, password){
    return passwordHash.verify(password, user.password);
}

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

exports.loginUser = function(req, res) {
    passport.authenticate('login', {
        successRedirect: '/users',
        failureRedirect: '/login'
    });
    try {
        passport.use('login', new LocalStrategy(
            User.findOne({email: req.body.email}, function (err, user) { 
                if (err) {
                    res.json({err: err});
                } 
                if (user && isValidPassword(user, req.body.password)) {
                    var token = jwt.sign({email: user.email, id: user._id}, secret.key, {expiresIn: '12h'});
                    res.json({ userId:user._id, email:user.email, username: user.username, token: token, message: 'Login successful.'});
                } 
                else {
                    res.json({ message: 'Incorrect username or password.' });
                    console.log(isValidPassword (req.body.password));
                }; 
                console.log(user)
            }), function(email, password, done) {
                console.log(email);
            }))
        } 
        catch(exception) {
            console.log(exception);
        }
    }

