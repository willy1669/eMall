var model = require('../models/User');
var BaseRepository = require('./BaseRepositorys');

function UserRepository(){

}
UserRepository.prototype = BaseRepository(model);

module.exports = new UserRepository();