var model = require('../models/User');
var BaseRepository = require('../repositorires/BaseRepository');

function UserRepository(){

}
UserRepository.prototype = BaseRepository(model);

module.exports = new UserRepository();