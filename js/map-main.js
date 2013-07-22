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

	this.drawLine = function(latlngs, layer_name, options){
		latlng_array = [];
		for (var i = 0; i < latlngs.length; i++){
			latlng_array.push(new L.LatLng(latlngs[i][0], latlngs[i][1]));
		}
		this.addLineByLatLng(latlng_array, layer_name, options);
	};
	

	this.appendLineToPosition = function(latitude, longitude, layer_name, options){
		var latlng = [latitude, longitude];
		if(!this.layers[layer_name]){this.layers[layer_name] = new L.LayerGroup(); this.layers[layer_name].addTo(this.map);}
		if(!this.layers[layer_name]._latlngs){this.layers[layer_name]._latlngs = [latlng]; return;}
		var l = this.layers[layer_name]._latlngs.length;
		var pold = this.layers[layer_name]._latlngs[l - 1];
		var pnew = latlng;
		var a = new L.LatLng(pold[0], pold[1]);
		var b = new L.LatLng(pnew[0], pnew[1]);
		this.addLineByLatLng([a,b], layer_name, options);
		this.layers[layer_name]._latlngs.push(latlng);
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
	
	this.clearLayer = function(layer_name){
		if(this.layers[layer_name]){this.layers[layer_name].clearLayers();}
	};
	
	
}
var map = new Map();
