function OpenXCReader(){
	/* collects the data and flushes */
	this.buffer = {}
	this.readLine = function(line){
		//expects json data having format
		// {"timestamp": 1351181576.64078, "name": "engine_speed", "value": 714.0}
		// where name can have different properties
		this.buffer[line.name] = line.value;
		if (this.hasReadLineFlush(line.name)){
			this.flush();
		}
	};
	
	this.hasReadLineFlush = function(attr){
		if (this.buffer.vehicle_speed && this.buffer.latitude && this.buffer.longitude){
			return true;
		}
		return false;
	};
	
	this.flush = function(){
		console.info("saving " + JSON.stringify(this.buffer));
		this.buffer = {};
	};
}

var carReader = new OpenXCReader();