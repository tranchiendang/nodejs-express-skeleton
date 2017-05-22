'use strict';

$(document).ready(function() {
	var properties_data = []; 
	// call api get all properties
	$.ajax({
		type: 'GET',
		url: '/properties/api/getAllProperties',
		dataType: 'json',
		success: function (data) {
			properties_data = data;
			
			data.forEach(function(r){
				t_property.row.add([r.name, r.rentalownerid, r.propertytype, r.subtype, r.addr1])
				.draw(false)
				.nodes()
				.to$()
				.attr('data-id', r.id);
			});
		}
	});
	
	// call api get all states
	$.ajax({
		type: 'GET',
		url: '/states/api/getAll',
		dataType: 'json',
		success: function(data) {
			populate_states(data);
		}
	});
	
	$('#property_master tbody').on('click', 'tr', function(){
		if ($(this).hasClass('selected') ){
			$(this).removeClass('selected');
		} else {
			t_property.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
			var property_id = $(this).data('id');
			populateForm(_.find(properties_data, { 'id': property_id }));
		}
	});
	
	default_populate_yearbuilt();
	default_populate_propertytype();
});

var clearForm = function(){
	$('#detail_property').reset();
};

var populateForm = function(obj){
	var property_form = $('#detail_property');
	
	$.each(obj, function(key, value){
		$('[name=' + key + ']', $('#detail_property')).val(value);
	});
};

var t_property = $('#property_master').DataTable();

var default_populate_yearbuilt = function(){
	for (var i=1980; i<=2020; i++){
		$('#property_yearbuilt').append("<option value='" + i + "'>" + i + "</option>");
	}
};

var populate_states = function(objArr) {
	objArr.forEach(function(obj){
		$('#property_stateid').append("<option value='" + obj.id + "'>" + obj.shortname + "</option>");
	});
};

var default_populate_propertytype = function(){
	var arrType = {'residential': 'Residential', 'commercial': 'Commercial'};
	$.each(arrType, function(key, value){
		$('#property_type').append("<option value='" + key + "'>" + value + "</option>")
	});
};
