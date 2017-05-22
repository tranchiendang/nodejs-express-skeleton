'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/api/getAll', function(req, res){
	models.tblowners.findAll({ raw: true })
	.then(result => {
		res.json(result);
	});
});

module.exports = router;