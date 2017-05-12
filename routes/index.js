var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	var locals = {
		title: 'Say Hi!'
	};
	res.render('index', locals);
});

module.exports = router;
