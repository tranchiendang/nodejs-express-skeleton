/**
 * http://usejsdoc.org/
 */
'use strict'

var express = require('express');
var router = express.Router();
var models = require('../models');

/* Get All Properties */
router.get('/', function(req, res, next){
	models.tblproperties.findAll({ raw: true })
	.then(properties => {
		properties.forEach(function(p){
			console.dir(p.name);
		});
		res.render('properties/main');
	});
});

/* Post add / update properties*/
router.post('/update', function(req, res, next){
	Object.keys(req.body).forEach((key) => (req.body[key] == '') && delete req.body[key]);
	models.tblproperties.create(req.body)
	  .then(function(newProperty) {
		  req.flash('msg_info', 'Create properties success');
		  res.render('properties/main', { selectedProperty: newProperty });
	  });
	
});

router.get('/api/getAllProperties', function(req, res) {
	models.tblproperties.findAll({ 
		raw: true,
		include: [{
			model: models.tblowners
		}]
	})
	.then(result => {
		console.log(result[0]['tblowner.firstname']);
		console.log(typeof result[0]["tblowner.firstname"]);
		res.json(result);
	});
});

module.exports = router;