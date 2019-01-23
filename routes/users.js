var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserControllers');


/* GET users listing. */
router.post('/create', userController.addUser);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
