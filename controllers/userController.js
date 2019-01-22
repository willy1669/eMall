const User = require('../models/User');
const Joi = require('joi');
const passwordHash = require('password-hash');
const service = require('../services/UserService');

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
Joi.validate({username:data.username, email:data.email, password:data.password}, schema, function (err){
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
