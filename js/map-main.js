function Map(){
	this.layers = {};
	
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;


	this.createMap = function(el, latlng, zoom, max_zoom){
		this.map = L.map(el).setView(latlng, zoom || 13);
		var key = "kajjjak.map-wgrdoudp";
		var url = "http://api.tiles.mapbox.com/v3/" + key + "/{z}/{x}/{y}.png";
		L.tileLayer(url, {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		    maxZoom: max_zoom
		}).addTo(this.map);
		return this.map;
	};

	this.addLine = function(latlngs, layer_name, options){
		latlng_array = [];
		for (var i = 0; i < latlngs.length; i++){
			latlng_array.push(new L.LatLng(latlngs[i][0], latlngs[i][1]));
		}
		this.addLineByLatLng(latlng_array, layer_name, options);
	};

	this.addLineByLatLng = function(latlngs, layer_name, options){
		options = options || {};
		options.color = options.color || "red";
		options.opacity = options.opacity || 0.8;
		options.weight = options.weight || 8;
		options.smoothFactor = options.smoothFactor || 0.5;
		if(!this.layers[layer_name]){this.layers[layer_name] = new L.LayerGroup(); this.layers[layer_name].addTo(this.map);}
		var pl = L.polyline(latlngs, options)
		pl.addTo(this.layers[layer_name]);
	};
}
var map = new Map();
