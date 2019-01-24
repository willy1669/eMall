var model = require('../models/User');
var BaseRepository = require('../repositories/BaseRepository');

function UserRepository(){

}
UserRepository.prototype = BaseRepository(model);

module.exports = new UserRepository();