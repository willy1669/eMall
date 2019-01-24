var repository = require('../repositories/UserRepositorys');

exports.addUser = function(req, res, data){
    repository.add(data, function(err, user){
        if (err) res.json({err:err, message:'error, user cannot be created'});
        res.json({message:'user created successfully'});
    });
}