// config/passport.js

var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id).then(user => {
			done(null, user);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
			function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({where: {username: email}})
			.then(user => {
				if(user){
					return done(null, false, req.flash('msg_error', 'That email is already taken.'));
				}else{
					var hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
					User.create({ 
						username: email, 
						password: hashedPass
						})
						.then(newUser => {
						done(null, newUser);
						});
				}
			}).catch(err =>{
				return done(err);
			})
		})
	}));
	
	passport.use('local-login', new LocalStrategy({ passReqToCallback: true },
			function(req, email, password, done) {
		User.findOne({ where: {username: email}})
		.then(user => {
			if (!user) {
				return done(null, false, req.flash('msg_error', 'No user found'));
			}else{
				var hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
				comparePass = bcrypt.compareSync(password, user.password);
				if (!comparePass) {
					return done(null, false, req.flash('msg_error', 'Oops! Wrong password.'));
				}
				return done(null, user);
			}
		}).catch (err => {
			return done(err);
		})
	}));
}