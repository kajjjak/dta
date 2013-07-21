
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
	carReader.onDataRead = function(d){
		$("#vehicle_speed").html("vehicle_speed: " + d.vehicle_speed);
		$("#engine_speed").html("engine_speed: " + d.engine_speed);
		$("#torque_at_transmission").html("torque_at_transmission: " + d.torque_at_transmission);
		$("#engine_speed").html("engine_speed: " + d.engine_speed);
		$("#parking_brake_status").html("parking_brake_status: " + d.parking_brake_status);
		$("#transmission_gear_position").html("transmission_gear_position: " + d.transmission_gear_position);
		$("#odometer").html("odometer: " + d.odometer);
		$("#ignition_status").html("ignition_status: " + d.ignition_status);
		$("#fuel_consumed_since_restart").html("fuel_consumed_since_restart: " + d.fuel_consumed_since_restart);
		$("#fuel_level").html("fuel_level: " + d.fuel_level);
		$("#headlamp_status").html("headlamp_status: " + d.headlamp_status);
		$("#high_beam_status").html("high_beam_status: " + d.high_beam_status);
		$("#brake_pedal_status").html("brake_pedal_status: " + d.brake_pedal_status);
		$("#fine_odometer_since_restart").html("fine_odometer_since_restart: " + d.fine_odometer_since_restart);
		$("#accelerator_pedal_position").html("accelerator_pedal_position: " + d.accelerator_pedal_position);
	};
	
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
