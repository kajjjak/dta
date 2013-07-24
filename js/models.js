// http://find-a-driving-school.ca/top-tips-reducing-fuel-consumption/

$(function(){
	Backbone.couch_connector.config.db_name = "dta";
	Backbone.couch_connector.config.ddoc_name = "preview";
	Backbone.couch_connector.config.global_changes = false;	
  var VehicleReading = Backbone.Model.extend({
  	url : "/rules",
    defaults: function() {
      return {
      };
       
    },
    initialize: function() {
    },

    clear: function() {
      this.destroy();
    }

  });

  var VehicleReadingList = Backbone.Collection.extend({
    model: VehicleReading,
  });

  window.vehicle_readings = new VehicleReadingList;

  var AppView = Backbone.View.extend({

    events: {
    },
    initialize: function() {

      vehicle_readings.bind('add', this.addOne, this);
      vehicle_readings.bind('reset', this.addAll, this);
      vehicle_readings.bind('all', this.render, this);

      vehicle_readings.fetch();
    },

    render: function() {

      if (vehicle_readings.length) {
      }
    },

    addOne: function(vehicle_reading) {
      
    },

    addAll: function() {
      vehicle_readings.each(this.addOne);
    },
    
    clearAll: function() {
    	while(vehicle_readings.length){ vehicle_readings.pop();}
    },
    
    removeAll: function() {
    	PouchDB.destroy('vehicle_readings-backbone-0.0.12', function(){ console.info("Cleared database"); });
    }

  });
  window.vehicle_data_view = new AppView;	
});

