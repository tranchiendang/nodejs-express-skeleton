var express = require('express');
var router = express.Router();
var models = require('../models');

var session_store;
/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/users');
});

router.get('/login', function(req, res, next){
	res.render('main/login', { layout: false });
});

router.post('/login', function(req, res, next){
	session_store = req.session;
	req.assert('txtEmail', 'Please fill the Username').notEmpty();
	req.assert('txtEmail', 'Email not valid').isEmail();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		var v_pass = req.sanitize( 'txtPassword' ).escape().trim();
		var v_email = req.sanitize( 'txtEmail' ).escape().trim();
		models.User.findOne({ where: {username: v_email, password: v_pass} })
		.then(user => {
			if (!user){
				req.flash('msg_error', "Wrong email address or password!");
				res.redirect('/login');
			} else {
				session_store.is_login = true;
				res.redirect('/users');
			}
		})
		.catch(err => {
			var errornya = ("Error Selecting: %s", err.code);
			console.log(errornya);
			req.flash('msg_error', errornya);
			res.redirect('/login');
		})
	}
	else {
		errors_detail = "Sorry there are errors <ul>";
		for (i in errors) {
			error = errors[i];
			errors_detail += "<li>" + error.msg + "</li>";
		}
		errors_detail += "</ul>";
		console.log(errors_detail);
		req.flash('msg_error', errors_detail);
		res.redirect('login');
	};
});

router.get('/logout', function(req, res, next){
	req.session.destroy(function(err){
		if (err) {
			console.log(err);
		} else {
			res.redirect('login');
		}
	});
});

module.exports = router;
