function selectRule(bbm){
	route_rule_selected = bbm;
	rule = route_rule_selected.attributes;
	$("#drive_rule_speed").val(rule.speed_limit);
	$("#drive_rule_comment").val(rule.comment);
	$("#drive_rule_stop").prop('checked', rule.full_stop);			
	var p = new L.LatLng(rule.latitude, rule.longitude);
	if(!window.route_rule_selected_circle){ window.route_rule_selected_circle = new L.CircleMarker(p); window.route_rule_selected_circle.setRadius(200); }
	window.route_rule_selected_circle.setLatLng(p);
}

function storeRule(){
	if (!route_rule_selected){ alert("No rule selected"); return; }
	var range = 1;
	route_rule_selected.save({"range": range, "speed_limit":$("#drive_rule_speed").val(), "comment":$("#drive_rule_comment").val(), "full_stop": $("#drive_rule_stop").is(':checked')});
}

function saveRule(){
	storeRule();
	alert("Saved with current values");
}

function removeRule(){
	route_rule_selected.destroy();
	route_rule_selected = undefined;
	map.clearLayer("route");
	setTimeout(function(){showRoute($("#route_name").val());}, 500);
}

function destroyRoute(name){
	var route = vehicle_readings.where({route: true, route_name:name, userid:localStorage.getItem("userid")});
	for (var i in route){
		route[i].destroy();
	}
	
}

function showRoute(name){
	name = name || $("#route_name").val();
	var route = vehicle_readings.where({route: true, route_name:name, userid:localStorage.getItem("userid")});
	var model;
	map.clearLayer("route");
	for (var i in route){
		model = route[i];
		addRule(model.get("latitude"), model.get("longitude"), model);
	}	
}

function reloadRoute(){
	vehicle_readings.fetch({success:function(){ vehicle_readings.forEach(function(m){ addRule(m.get("latitude"), m.get("longitude"), m);}); }})
}

function addRule(latitude, longitude, bbm){
	map.appendLineToPosition(latitude, longitude, "route", {"color": "darkblue", "opacity": 0.35});
	var _bbm = bbm;
	var marker = map.addMarker(latitude, longitude, "route", function(mrkr){
		selectRule(_bbm);
	});
	marker._bbm = bbm;
	selectRule(_bbm);
}

