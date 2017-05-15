var express = require('express');
var router = express.Router();
var models = require('../models');
var authentication_mdl = require('../middlewares/authentication');
var session_store;

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
	models.User.findAll().then(function(users) {
		res.render('index', {
			title: 'MakersBnB',
			users: users
		});
	});
});
*/
router.get('/', authentication_mdl.is_login, function(req, res, next) {
	res.render('blankpage', { title: 'Express' });
});

/* POST users creating. */
router.post('/', function(req, res, next) {
	models.User.create({ username: req.body.username}).then(function(){
		res.redirect('/');
	});
});

router.post('/:UserId/listings', function(req, res) {
	  models.Listing.create({
	    UserId: req.params.UserId,
	    title: req.body.title,
	    description: req.body.description
	  }).then(function() {
	    res.redirect('/');
	  });
	});

module.exports = router;
