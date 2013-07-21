
function readLines(){
  window.vehicle_data_view.clearAll();
	for (var i in vehicle_data){
		carReader.readLine(vehicle_data[i]);
	}
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function showDriversPath(){
	vehicle_readings.forEach(function(m){
		addDriversPath(m);
	});
}

function addDriversPath(m){
	var speed = m.attributes.vehicle_speed[0];
	var lat = m.attributes.latitude[0];
	var lng = m.attributes.longitude[0];
	var opacity = speed/80;
	console.info("color " + 255*(speed/80));
	map.appendLineToPosition(lat, lng, "myredline", {"color": "blue", "opacity": opacity});	
}

function runDriversPathSimulation(){
	vehicle_index = 0;
	setInterval(function(){
		if (vehicle_data.length > vehicle_index){
			var d = vehicle_data[vehicle_index];
			var m = carReader.readLine(d);
			vehicle_index = vehicle_index + 1;
			if (m){
				addDriversPath(m);
			}
		}
	}, 10);
}
