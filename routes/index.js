var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/users');
});

router.get('/login', function(req, res, next){
	res.render('main/login', { layout: false, message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/users',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('login');
});

router.get('/signup', function(req, res, next){
	console.log(req.flash);
	res.render('main/signup', { layout: false, message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/blankpage',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;
