'use strict';

var arrType = {'1': 'Residential', '2': 'Commercial'};
var arrTypeForResidential = {'1': "Single Family", "2": "Multi Family", "3": "Condo/ Town house"};
var arrTypeForCommercial = {'4': 'Office', '5': 'Industrial', '6': 'Retail', '7': 'Shopping Center', '8': 'Storage', '9': 'Packing space'};
var arrAllSubType = _.assign({}, arrTypeForResidential, arrTypeForCommercial);

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
				t_property.row.add([r.name, r['tblowner.firstname'], arrType[r.propertytype], arrAllSubType[r.subtype], r.addr1])
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
	
	// call api get all owners
	$.ajax({
		type: "GET",
		url: '/owners/api/getAll',
		dataType: 'json',
		success: function(data) {
			populate_owners(data);
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
	
	// apply individual column search
	$('#property_master tfoot th').each(function(i){
		var title = $('#property_master thead th').eq($(this).index()).text();
		$(this).html('<input type="text" placeholder="Search ' + title + '" data-index="' + i + '" />');
	});
	
	$( t_property.table().container()).on('keyup', 'tfoot input', function(){
		t_property
			.column($(this).data('index'))
			.search(this.value)
			.draw()
	});
	
	default_populate_yearbuilt();
	default_populate_propertytype();
	
	// attach onchange event to select
	e_onchange_propertytype();
	// trigger the change for default selected
	$("#property_type").trigger('change');
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
	$.each(arrType, function(key, value){
		$('#property_type').append("<option value='" + key + "'>" + value + "</option>")
	});
};

var e_onchange_propertytype = function(){
	$('#property_type').on('change', function(){
		default_populate_subtype(this.value);
	});
};

var default_populate_subtype = function(propertytype){
	
	var mapPropeTypetoSubType = {
		'1': arrTypeForResidential,
		'2': arrTypeForCommercial
	};
	
	$('#property_subtype').empty();
	$.each(mapPropeTypetoSubType[propertytype], function(key, val){
		$('#property_subtype').append("<option value='" + key + "'>" + val + "</option>");
	})
};

var populate_owners = function(objArr) {
	objArr.forEach(function(obj){
		$('#property_rentalownerid').append("<option value='" + obj.id + "'>" + obj.firstname + "</option>");
	});
};
